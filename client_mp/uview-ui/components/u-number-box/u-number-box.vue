<template>
	<view class="u-numberbox">
		<view class="u-icon-minus" @touchstart.stop.prevent="btnTouchStart('minus')" @touchend.stop.prevent="clearTimer" :class="{ 'u-icon-disabled': disabled || inputVal <= min }"
		    :style="{
				background: bgColor,
				height: inputHeight + 'rpx',
				color: color
			}">
			<u-icon name="minus" :size="size"></u-icon>
		</view>
		<input :disabled="disabledInput || disabled" :cursor-spacing="getCursorSpacing" :class="{ 'u-input-disabled': disabled }"
		    v-model="inputVal" class="u-number-input" @blur="onBlur" @focus="onFocus"
		    type="number" :style="{
				color: color,
				fontSize: size + 'rpx',
				background: bgColor,
				height: inputHeight + 'rpx',
				width: inputWidth + 'rpx'
			}" />
		<view class="u-icon-plus" @touchstart.stop.prevent="btnTouchStart('plus')" @touchend.stop.prevent="clearTimer" :class="{ 'u-icon-disabled': disabled || inputVal >= max }"
		    :style="{
				background: bgColor,
				height: inputHeight + 'rpx',
				color: color
			}">
			<u-icon name="plus" :size="size"></u-icon>
		</view>
	</view>
</template>

<script>
	/**
	 * numberBox 步進器
	 * @description 該組件一般用於商城購物選擇物品數量的場景。注意：該輸入框只能輸入大於或等於0的整數，不支持小數輸入
	 * @tutorial https://www.uviewui.com/components/numberBox.html
	 * @property {Number} value 輸入框初始值（默認1）
	 * @property {String} bg-color 輸入框和按鈕的背景顏色（默認#F2F3F5）
	 * @property {Number} min 用戶可輸入的最小值（默認0）
	 * @property {Number} max 用戶可輸入的最大值（默認99999）
	 * @property {Number} step 步長，每次加或減的值（默認1）
	 * @property {Boolean} disabled 是否禁用操作，禁用後無法加減或手動修改輸入框的值（默認false）
	 * @property {Boolean} disabled-input 是否禁止輸入框手動輸入值（默認false）
	 * @property {Boolean} positive-integer 是否只能輸入正整數（默認true）
	 * @property {String | Number} size 輸入框文字和按鈕字體大小，單位rpx（默認26）
	 * @property {String} color 輸入框文字和加減按鈕圖標的顏色（默認#323233）
	 * @property {String | Number} input-width 輸入框寬度，單位rpx（默認80）
	 * @property {String | Number} input-height 輸入框和按鈕的高度，單位rpx（默認50）
	 * @property {String | Number} index 事件回調時用以區分當前發生變化的是哪個輸入框
	 * @property {Boolean} long-press 是否開啟長按連續遞增或遞減(默認true)
	 * @property {String | Number} press-time 開啟長按觸發後，每觸發一次需要多久，單位ms(默認250)
	 * @property {String | Number} cursor-spacing 指定光標於鍵盤的距離，避免鍵盤遮擋輸入框，單位rpx（默認200）
	 * @event {Function} change 輸入框內容發生變化時觸發，對像形式
	 * @event {Function} blur 輸入框失去焦點時觸發，對像形式
	 * @event {Function} minus 點擊減少按鈕時觸發(按鈕可點擊情況下)，對像形式
	 * @event {Function} plus 點擊增加按鈕時觸發(按鈕可點擊情況下)，對像形式
	 * @example <u-number-box :min="1" :max="100"></u-number-box>
	 */
	export default {
		name: "u-number-box",
		props: {
			// 預顯示的數字
			value: {
				type: Number,
				default: 1
			},
			// 背景顏色
			bgColor: {
				type: String,
				default: '#F2F3F5'
			},
			// 最小值
			min: {
				type: Number,
				default: 0
			},
			// 最大值
			max: {
				type: Number,
				default: 99999
			},
			// 步進值，每次加或減的值
			step: {
				type: Number,
				default: 1
			},
			// 是否禁用加減操作
			disabled: {
				type: Boolean,
				default: false
			},
			// input的字體大小，單位rpx
			size: {
				type: [Number, String],
				default: 26
			},
			// 加減圖標的顏色
			color: {
				type: String,
				default: '#323233'
			},
			// input寬度，單位rpx
			inputWidth: {
				type: [Number, String],
				default: 80
			},
			// input高度，單位rpx
			inputHeight: {
				type: [Number, String],
				default: 50
			},
			// index索引，用於列表中使用，讓用戶知道是哪個numberbox發生了變化，一般使用for循環出來的index值即可
			index: {
				type: [Number, String],
				default: ''
			},
			// 是否禁用輸入框，與disabled作用於輸入框時，為OR的關係，即想要禁用輸入框，又可以加減的話
			// 設置disabled為false，disabledInput為true即可
			disabledInput: {
				type: Boolean,
				default: false
			},
			// 輸入框於鍵盤之間的距離
			cursorSpacing: {
				type: [Number, String],
				default: 100
			},
			// 是否開啟長按連續遞增或遞減
			longPress: {
				type: Boolean,
				default: true
			},
			// 開啟長按觸發後，每觸發一次需要多久
			pressTime: {
				type: [Number, String],
				default: 250
			},
			// 是否只能輸入大於或等於0的整數(正整數)
			positiveInteger: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			value(v1, v2) {
				// 只有value的改變是來自外部的時候，才去同步inputVal的值，否則會造成循環錯誤
				if(!this.changeFromInner) {
					this.inputVal = v1;
					// 因為inputVal變化後，會觸發this.handleChange()，在其中changeFromInner會再次被設置為true，
					// 造成外面修改值，也導致被認為是內部修改的混亂，這裡進行this.$nextTick延時，保證在運行週期的最後處
					// 將changeFromInner設置為false
					this.$nextTick(function(){
						this.changeFromInner = false;
					})
				}
			},
			inputVal(v1, v2) {
				// 為了讓用戶能夠刪除所有輸入值，重新輸入內容，刪除所有值後，內容為空字符串
				if (v1 == '') return;
				let value = 0;
				// 首先判斷是否數值，並且在min和max之間，如果不是，使用原來值
				let tmp = this.$u.test.number(v1);
				if (tmp && v1 >= this.min && v1 <= this.max) value = v1;
				else value = v2;
				// 判斷是否只能輸入大於等於0的整數
				if(this.positiveInteger) {
					// 小於0，或者帶有小數點，
					if(v1 < 0 || String(v1).indexOf('.') !== -1) {
						value = v2;
						// 雙向綁定input的值，必須要使用$nextTick修改顯示的值
						this.$nextTick(() => {
							this.inputVal = v2;
						})
					}
				}
				// 發出change事件
				this.handleChange(value, 'change');
			}
		},
		data() {
			return {
				inputVal: 1, // 輸入框中的值，不能直接使用props中的value，因為應該改變props的狀態
				timer: null, // 用作長按的定時器
				changeFromInner: false, // 值發生變化，是來自內部還是外部
				innerChangeTimer: null, // 內部定時器
			};
		},
		created() {
			this.inputVal = Number(this.value);
		},
		computed: {
			getCursorSpacing() {
				// 先將值轉為px單位，再轉為數值
				return Number(uni.upx2px(this.cursorSpacing));
			}
		},
		methods: {
			// 點擊退格鍵
			btnTouchStart(callback) {
				// 先執行一遍方法，否則會造成鬆開手時，就執行了clearTimer，導致無法實現功能
				this[callback]();
				// 如果沒開啟長按功能，直接返回
				if (!this.longPress) return;
				clearInterval(this.timer); //再次清空定時器，防止重複註冊定時器
				this.timer = null;
				this.timer = setInterval(() => {
					// 執行加或減函數
					this[callback]();
				}, this.pressTime);
			},
			clearTimer() {
				this.$nextTick(() => {
					clearInterval(this.timer);
					this.timer = null;
				})
			},
			minus() {
				this.computeVal('minus');
			},
			plus() {
				this.computeVal('plus');
			},
			// 為了保證小數相加減出現精度溢出的問題
			calcPlus(num1, num2) {
				let baseNum, baseNum1, baseNum2;
				try {
					baseNum1 = num1.toString().split('.')[1].length;
				} catch (e) {
					baseNum1 = 0;
				}
				try {
					baseNum2 = num2.toString().split('.')[1].length;
				} catch (e) {
					baseNum2 = 0;
				}
				baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
				let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2; //精度
				return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
			},
			// 為了保證小數相加減出現精度溢出的問題
			calcMinus(num1, num2) {
				let baseNum, baseNum1, baseNum2;
				try {
					baseNum1 = num1.toString().split('.')[1].length;
				} catch (e) {
					baseNum1 = 0;
				}
				try {
					baseNum2 = num2.toString().split('.')[1].length;
				} catch (e) {
					baseNum2 = 0;
				}
				baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
				let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
				return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
			},
			computeVal(type) {
				uni.hideKeyboard();
				if (this.disabled) return;
				let value = 0;
				// 減
				if (type === 'minus') {
					value = this.calcMinus(this.inputVal, this.step);
				} else if (type === 'plus') {
					value = this.calcPlus(this.inputVal, this.step);
				}
				// 判斷是否小於最小值和大於最大值
				if (value < this.min || value > this.max) {
					return;
				}
				this.inputVal = value;
				this.handleChange(value, type);
			},
			// 處理用戶手動輸入的情況
			onBlur(event) {
				let val = 0;
				let value = event.detail.value;
				// 如果為非0-9數字組成，或者其第一位數值為0，直接讓其等於min值
				// 這裡不直接判斷是否正整數，是因為用戶傳遞的props min值可能為0
				if (!/(^\d+$)/.test(value) || value[0] == 0) val = this.min;
				val = +value;
				if (val > this.max) {
					val = this.max;
				} else if (val < this.min) {
					val = this.min;
				}
				this.$nextTick(() => {
					this.inputVal = val;
				})
				this.handleChange(val, 'blur');
			},
			// 輸入框獲得焦點事件
			onFocus() {
				this.$emit('focus');
			},
			handleChange(value, type) {
				if (this.disabled) return;
				// 清除定時器，避免造成混亂
				if(this.innerChangeTimer) {
					clearTimeout(this.innerChangeTimer);
					this.innerChangeTimer = null;
				}
				// 發出input事件，修改通過v-model綁定的值，達到雙向綁定的效果
				this.changeFromInner = true;
				// 一定時間內，清除changeFromInner標記，否則內部值改變後
				// 外部通過程序修改value值，將會無效
				this.innerChangeTimer = setTimeout(() => {
					this.changeFromInner = false;
				}, 150);
				this.$emit('input', Number(value));
				this.$emit(type, {
					// 轉為Number類型
					value: Number(value),
					index: this.index
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-numberbox {
		display: inline-flex;
		align-items: center;
	}

	.u-number-input {
		position: relative;
		text-align: center;
		padding: 0;
		margin: 0 6rpx;
		@include vue-flex;
		align-items: center;
		justify-content: center;
	}

	.u-icon-plus,
	.u-icon-minus {
		width: 60rpx;
		@include vue-flex;
		justify-content: center;
		align-items: center;
	}

	.u-icon-plus {
		border-radius: 0 8rpx 8rpx 0;
	}

	.u-icon-minus {
		border-radius: 8rpx 0 0 8rpx;
	}

	.u-icon-disabled {
		color: #c8c9cc !important;
		background: #f7f8fa !important;
	}

	.u-input-disabled {
		color: #c8c9cc !important;
		background-color: #f2f3f5 !important;
	}
</style>
