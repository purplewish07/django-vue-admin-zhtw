<template>
	<view
		class="u-count-num"
		:style="{
			fontSize: fontSize + 'rpx',
			fontWeight: bold ? 'bold' : 'normal',
			color: color
		}"
	>
		{{ displayValue }}
	</view>
</template>

<script>
/**
 * countTo 數字滾動
 * @description 該組件一般用於需要滾動數字到某一個值的場景，目標要求是一個遞增的值。
 * @tutorial https://www.uviewui.com/components/countTo.html
 * @property {String Number} start-val 開始值
 * @property {String Number} end-val 結束值
 * @property {String Number} duration 滾動過程所需的時間，單位ms（默認2000）
 * @property {Boolean} autoplay 是否自動開始滾動（默認true）
 * @property {String Number} decimals 要顯示的小數位數，見官網說明（默認0）
 * @property {Boolean} use-easing 滾動結束時，是否緩動結尾，見官網說明（默認true）
 * @property {String} separator 千位分隔符，見官網說明
 * @property {String} color 字體顏色（默認#303133）
 * @property {String Number} font-size 字體大小，單位rpx（默認50）
 * @property {Boolean} bold 字體是否加粗（默認false）
 * @event {Function} end 數值滾動到目標值時觸發
 * @example <u-count-to ref="uCountTo" :end-val="endVal" :autoplay="autoplay"></u-count-to>
 */
export default {
	name: 'u-count-to',
	props: {
		// 開始的數值，默認從0增長到某一個數
		startVal: {
			type: [Number, String],
			default: 0
		},
		// 要滾動的目標數值，必須
		endVal: {
			type: [Number, String],
			default: 0,
			required: true
		},
		// 滾動到目標數值的動畫持續時間，單位為毫秒（ms）
		duration: {
			type: [Number, String],
			default: 2000
		},
		// 設置數值後是否自動開始滾動
		autoplay: {
			type: Boolean,
			default: true
		},
		// 要顯示的小數位數
		decimals: {
			type: [Number, String],
			default: 0
		},
		// 是否在即將到達目標數值的時候，使用緩慢滾動的效果
		useEasing: {
			type: Boolean,
			default: true
		},
		// 十進制分割
		decimal: {
			type: [Number, String],
			default: '.'
		},
		// 字體顏色
		color: {
			type: String,
			default: '#303133'
		},
		// 字體大小
		fontSize: {
			type: [Number, String],
			default: 50
		},
		// 是否加粗字體
		bold: {
			type: Boolean,
			default: false
		},
		// 千位分隔符，類似金額的分割(￥23,321.05中的",")
		separator: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			localStartVal: this.startVal,
			displayValue: this.formatNumber(this.startVal),
			printVal: null,
			paused: false, // 是否暫停
			localDuration: Number(this.duration),
			startTime: null, // 開始的時間
			timestamp: null, // 時間戳
			remaining: null, // 停留的時間
			rAF: null,
			lastTime: 0 // 上一次的時間
		};
	},
	computed: {
		countDown() {
			return this.startVal > this.endVal;
		}
	},
	watch: {
		startVal() {
			this.autoplay && this.start();
		},
		endVal() {
			this.autoplay && this.start();
		}
	},
	mounted() {
		this.autoplay && this.start();
	},
	methods: {
		easingFn(t, b, c, d) {
			return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
		},
		requestAnimationFrame(callback) {
			const currTime = new Date().getTime();
			// 為了使setTimteout的盡可能的接近每秒60幀的效果
			const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
			const id = setTimeout(() => {
				callback(currTime + timeToCall);
			}, timeToCall);
			this.lastTime = currTime + timeToCall;
			return id;
		},

		cancelAnimationFrame(id) {
			clearTimeout(id);
		},
		// 開始滾動數字
		start() {
			this.localStartVal = this.startVal;
			this.startTime = null;
			this.localDuration = this.duration;
			this.paused = false;
			this.rAF = this.requestAnimationFrame(this.count);
		},
		// 暫定狀態，重新再開始滾動；或者滾動狀態下，暫停
		reStart() {
			if (this.paused) {
				this.resume();
				this.paused = false;
			} else {
				this.stop();
				this.paused = true;
			}
		},
		// 暫停
		stop() {
			this.cancelAnimationFrame(this.rAF);
		},
		// 重新開始(暫停的情況下)
		resume() {
			this.startTime = null;
			this.localDuration = this.remaining;
			this.localStartVal = this.printVal;
			this.requestAnimationFrame(this.count);
		},
		// 重置
		reset() {
			this.startTime = null;
			this.cancelAnimationFrame(this.rAF);
			this.displayValue = this.formatNumber(this.startVal);
		},
		count(timestamp) {
			if (!this.startTime) this.startTime = timestamp;
			this.timestamp = timestamp;
			const progress = timestamp - this.startTime;
			this.remaining = this.localDuration - progress;
			if (this.useEasing) {
				if (this.countDown) {
					this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration);
				} else {
					this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration);
				}
			} else {
				if (this.countDown) {
					this.printVal = this.localStartVal - (this.localStartVal - this.endVal) * (progress / this.localDuration);
				} else {
					this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration);
				}
			}
			if (this.countDown) {
				this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal;
			} else {
				this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal;
			}
			this.displayValue = this.formatNumber(this.printVal);
			if (progress < this.localDuration) {
				this.rAF = this.requestAnimationFrame(this.count);
			} else {
				this.$emit('end');
			}
		},
		// 判斷是否數字
		isNumber(val) {
			return !isNaN(parseFloat(val));
		},
		formatNumber(num) {
			// 將num轉為Number類型，因為其值可能為字符串數值，調用toFixed會報錯
			num = Number(num);
			num = num.toFixed(Number(this.decimals));
			num += '';
			const x = num.split('.');
			let x1 = x[0];
			const x2 = x.length > 1 ? this.decimal + x[1] : '';
			const rgx = /(\d+)(\d{3})/;
			if (this.separator && !this.isNumber(this.separator)) {
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + this.separator + '$2');
				}
			}
			return x1 + x2;
		},
		destroyed() {
			this.cancelAnimationFrame(this.rAF);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-count-num {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	text-align: center;
}
</style>
