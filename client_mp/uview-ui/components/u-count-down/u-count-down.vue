<template>
	<view class="u-countdown">
		<view class="u-countdown-item" :style="[itemStyle]" v-if="showDays && (hideZeroDay || (!hideZeroDay && d != '00'))">
			<view class="u-countdown-time" :style="[letterStyle]">
				{{ d }}
			</view>
		</view>
		<view
			class="u-countdown-colon"
			:style="{fontSize: separatorSize + 'rpx', color: separatorColor, paddingBottom: separator == 'colon' ? '4rpx' : 0}"
			v-if="showDays && (hideZeroDay || (!hideZeroDay && d != '00'))"
		>
			{{ separator == 'colon' ? ':' : '天' }}
		</view>
		<view class="u-countdown-item" :style="[itemStyle]" v-if="showHours">
			<view class="u-countdown-time" :style="{ fontSize: fontSize + 'rpx', color: color}">
				{{ h }}
			</view>
		</view>
		<view
			class="u-countdown-colon"
			:style="{fontSize: separatorSize + 'rpx', color: separatorColor, paddingBottom: separator == 'colon' ? '4rpx' : 0}"
			v-if="showHours"
		>
			{{ separator == 'colon' ? ':' : '時' }}
		</view>
		<view class="u-countdown-item" :style="[itemStyle]" v-if="showMinutes">
			<view class="u-countdown-time" :style="{ fontSize: fontSize + 'rpx', color: color}">
				{{ i }}
			</view>
		</view>
		<view
			class="u-countdown-colon"
			:style="{fontSize: separatorSize + 'rpx', color: separatorColor, paddingBottom: separator == 'colon' ? '4rpx' : 0}"
			v-if="showMinutes"
		>
			{{ separator == 'colon' ? ':' : '分' }}
		</view>
		<view class="u-countdown-item" :style="[itemStyle]" v-if="showSeconds">
			<view class="u-countdown-time" :style="{ fontSize: fontSize + 'rpx', color: color}">
				{{ s }}
			</view>
		</view>
		<view
			class="u-countdown-colon"
			:style="{fontSize: separatorSize + 'rpx', color: separatorColor, paddingBottom: separator == 'colon' ? '4rpx' : 0}"
			v-if="showSeconds && separator == 'zh'"
		>
			秒
		</view>
	</view>
</template>

<script>
/**
 * countDown 倒計時
 * @description 該組件一般使用於某個活動的截止時間上，通過數字的變化，給用戶明確的時間感受，提示用戶進行某一個行為操作。
 * @tutorial https://www.uviewui.com/components/countDown.html
 * @property {String Number} timestamp 倒計時，單位為秒
 * @property {Boolean} autoplay 是否自動開始倒計時，如果為false，需手動調用開始方法。見官網說明（默認true）
 * @property {String} separator 分隔符，colon為英文冒號，zh為中文（默認colon）
 * @property {String Number} separator-size 分隔符的字體大小，單位rpx（默認30）
 * @property {String} separator-color 分隔符的顏色（默認#303133）
 * @property {String Number} font-size 倒計時字體大小，單位rpx（默認30）
 * @property {Boolean} show-border 是否顯示倒計時數字的邊框（默認false）
 * @property {Boolean} hide-zero-day 當"天"的部分為0時，隱藏該字段 （默認true）
 * @property {String} border-color 數字邊框的顏色（默認#303133）
 * @property {String} bg-color 倒計時數字的背景顏色（默認#ffffff）
 * @property {String} color 倒計時數字的顏色（默認#303133）
 * @property {String} height 數字高度值(寬度等同此值)，設置邊框時看情況是否需要設置此值，單位rpx（默認auto）
 * @property {Boolean} show-days 是否顯示倒計時的"天"部分（默認true）
 * @property {Boolean} show-hours 是否顯示倒計時的"時"部分（默認true）
 * @property {Boolean} show-minutes 是否顯示倒計時的"分"部分（默認true）
 * @property {Boolean} show-seconds 是否顯示倒計時的"秒"部分（默認true）
 * @event {Function} end 倒計時結束
 * @event {Function} change 每秒觸發一次，回調為當前剩餘的倒計秒數
 * @example <u-count-down ref="uCountDown" :timestamp="86400" :autoplay="false"></u-count-down>
 */
export default {
	name: 'u-count-down',
	props: {
		// 倒計時的時間，秒為單位
		timestamp: {
			type: [Number, String],
			default: 0
		},
		// 是否自動開始倒計時
		autoplay: {
			type: Boolean,
			default: true
		},
		// 用英文冒號(colon)或者中文(zh)當做分隔符，false的時候為中文，如："11:22"或"11時22秒"
		separator: {
			type: String,
			default: 'colon'
		},
		// 分隔符的大小，單位rpx
		separatorSize: {
			type: [Number, String],
			default: 30
		},
		// 分隔符顏色
		separatorColor: {
			type: String,
			default: "#303133"
		},
		// 字體顏色
		color: {
			type: String,
			default: '#303133'
		},
		// 字體大小，單位rpx
		fontSize: {
			type: [Number, String],
			default: 30
		},
		// 背景顏色
		bgColor: {
			type: String,
			default: '#fff'
		},
		// 數字框高度，單位rpx
		height: {
			type: [Number, String],
			default: 'auto'
		},
		// 是否顯示數字框
		showBorder: {
			type: Boolean,
			default: false
		},
		// 邊框顏色
		borderColor: {
			type: String,
			default: '#303133'
		},
		// 是否顯示秒
		showSeconds: {
			type: Boolean,
			default: true
		},
		// 是否顯示分鐘
		showMinutes: {
			type: Boolean,
			default: true
		},
		// 是否顯示小時
		showHours: {
			type: Boolean,
			default: true
		},
		// 是否顯示「天」
		showDays: {
			type: Boolean,
			default: true
		},
		// 當"天"的部分為0時，不顯示
		hideZeroDay: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		// 監聽時間戳的變化
		timestamp(newVal, oldVal) {
			// 如果倒計時間發生變化，清除定時器，重新開始倒計時
			this.clearTimer();
			this.start();
		}
	},
	data() {
		return {
			d: '00', // 天的默認值
			h: '00', // 小時的默認值
			i: '00', // 分鐘的默認值
			s: '00', // 秒的默認值
			timer: null ,// 定時器
			seconds: 0, // 記錄不停倒計過程中變化的秒數
		};
	},
	computed: {
		// 倒計時item的樣式，item為分別的時分秒部分的數字
		itemStyle() {
			let style = {};
			if(this.height) {
				style.height = this.height + 'rpx';
				style.width = this.height + 'rpx';
			}
			if(this.showBorder) {
				style.borderStyle = 'solid';
				style.borderColor = this.borderColor;
				style.borderWidth = '1px';
			}
			if(this.bgColor) {
				style.backgroundColor = this.bgColor;
			}
			return style;
		},
		// 倒計時數字的樣式
		letterStyle() {
			let style = {};
			if(this.fontSize) style.fontSize = this.fontSize +  'rpx';
			if(this.color) style.color = this.color;
			return style;
		}
	},
	mounted() {
		// 如果自動倒計時
		this.autoplay && this.timestamp && this.start();
	},
	methods: {
		// 倒計時
		start() {
			// 避免可能出現的倒計時重疊情況
			this.clearTimer();
			if (this.timestamp <= 0) return;
			this.seconds = Number(this.timestamp);
			this.formatTime(this.seconds);
			this.timer = setInterval(() => {
				this.seconds--;
				// 發出change事件
				this.$emit('change', this.seconds);
				if (this.seconds < 0) {
					return this.end();
				}
				this.formatTime(this.seconds);
			}, 1000);
		},
		// 格式化時間
		formatTime(seconds) {
			// 小於等於0的話，結束倒計時
			seconds <= 0 && this.end();
			let [day, hour, minute, second] = [0, 0, 0, 0];
			day = Math.floor(seconds / (60 * 60 * 24));
			// 判斷是否顯示「天」參數，如果不顯示，將天部分的值，加入到小時中
			// hour為給後面計算秒和分等用的(基於顯示天的前提下計算)
			hour = Math.floor(seconds / (60 * 60)) - day * 24;
			// showHour為需要顯示的小時
			let showHour = null;
			if(this.showDays) {
				showHour = hour;
			} else {
				// 如果不顯示天數，將「天」部分的時間折算到小時中去
				showHour = Math.floor(seconds / (60 * 60));
			}
			minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
			second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
			// 如果小於10，在前面補上一個"0"
			showHour = showHour < 10 ? '0' + showHour : showHour;
			minute = minute < 10 ? '0' + minute : minute;
			second = second < 10 ? '0' + second : second;
			day = day < 10 ? '0' + day : day;
			this.d = day;
			this.h = showHour;
			this.i = minute;
			this.s = second;
		},
		// 停止倒計時
		end() {
			this.clearTimer();
			this.$emit('end', {});
		},
		// 清除定時器
		clearTimer() {
			if(this.timer) {
				// 清除定時器
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	beforeDestroy() {
		clearInterval(this.timer);
		this.timer = null;
	}
};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-countdown {
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		align-items: center;
	}

	.u-countdown-item {
		@include vue-flex;
		align-items: center;
		justify-content: center;
		padding: 2rpx;
		border-radius: 6rpx;
		white-space: nowrap;
		transform: translateZ(0);
	}

	.u-countdown-time {
		margin: 0;
		padding: 0;
		line-height: 1;
	}

	.u-countdown-colon {
		@include vue-flex;
		justify-content: center;
		padding: 0 5rpx;
		line-height: 1;
		align-items: center;
		padding-bottom: 4rpx;
	}

	.u-countdown-scale {
		transform: scale(0.9);
		transform-origin: center center;
	}
</style>
