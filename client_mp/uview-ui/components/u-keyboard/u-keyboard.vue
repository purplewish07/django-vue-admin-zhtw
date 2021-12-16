<template>
	<u-popup class="" :mask="mask" :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
	 :safeAreaInsetBottom="safeAreaInsetBottom" @close="popupClose" :zIndex="uZIndex">
		<slot />
		<view class="u-tooltip" v-if="tooltip">
			<view class="u-tooltip-item u-tooltip-cancel" hover-class="u-tooltip-cancel-hover" @tap="onCancel">
				{{cancelBtn ? cancelText : ''}}
			</view>
			<view v-if="showTips" class="u-tooltip-item u-tooltip-tips">
				{{tips ? tips : mode == 'number' ? '數字鍵盤' : mode == 'card' ? '身份證鍵盤' : '車牌號鍵盤'}}
			</view>
			<view v-if="confirmBtn" @tap="onConfirm" class="u-tooltip-item u-tooltips-submit" hover-class="u-tooltips-submit-hover">
				{{confirmBtn ? confirmText : ''}}
			</view>
		</view>
		<block v-if="mode == 'number' || mode == 'card'">
			<u-number-keyboard :random="random" @backspace="backspace" @change="change" :mode="mode" :dotEnabled="dotEnabled"></u-number-keyboard>
		</block>
		<block v-else>
			<u-car-keyboard :random="random" @backspace="backspace" @change="change"></u-car-keyboard>
		</block>
	</u-popup>
</template>

<script>
	/**
	 * keyboard 鍵盤
	 * @description 此為uViw自定義的鍵盤面板，內含了數字鍵盤，車牌號鍵，身份證號鍵盤3中模式，都有可以打亂按鍵順序的選項。
	 * @tutorial https://www.uviewui.com/components/keyboard.html
	 * @property {String} mode 鍵盤類型，見官網基本使用的說明（默認number）
	 * @property {Boolean} dot-enabled 是否顯示"."按鍵，只在mode=number時有效（默認true）
	 * @property {Boolean} tooltip 是否顯示鍵盤頂部工具條（默認true）
	 * @property {String} tips 工具條中間的提示文字，見上方基本使用的說明，如不需要，請傳""空字符
	 * @property {Boolean} cancel-btn 是否顯示工具條左邊的"取消"按鈕（默認true）
	 * @property {Boolean} confirm-btn 是否顯示工具條右邊的"完成"按鈕（默認true）
	 * @property {Boolean} mask 是否顯示遮罩（默認true）
	 * @property {String} confirm-text 確認按鈕的文字
	 * @property {String} cancel-text 取消按鈕的文字
	 * @property {Number String} z-index 彈出鍵盤的z-index值（默認1075）
	 * @property {Boolean} random 是否打亂鍵盤按鍵的順序（默認false）
	 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配（默認false）
	 * @property {Boolean} mask-close-able 是否允許點擊遮罩收起鍵盤（默認true）
	 * @event {Function} change 按鍵被點擊(不包含退格鍵被點擊)
	 * @event {Function} cancel 鍵盤頂部工具條左邊的"取消"按鈕被點擊
	 * @event {Function} confirm 鍵盤頂部工具條右邊的"完成"按鈕被點擊
	 * @event {Function} backspace 鍵盤退格鍵被點擊
	 * @example <u-keyboard mode="number" v-model="show"></u-keyboard> 
	 */
	export default {
		name: "u-keyboard",
		props: {
			// 鍵盤的類型，number-數字鍵盤，card-身份證鍵盤，car-車牌號鍵盤
			mode: {
				type: String,
				default: 'number'
			},
			// 是否顯示鍵盤的"."符號
			dotEnabled: {
				type: Boolean,
				default: true
			},
			// 是否顯示頂部工具條
			tooltip: {
				type: Boolean,
				default: true
			},
			// 是否顯示工具條中間的提示
			showTips: {
				type: Boolean,
				default: true
			},
			// 工具條中間的提示文字
			tips: {
				type: String,
				default: ''
			},
			// 是否顯示工具條左邊的"取消"按鈕
			cancelBtn: {
				type: Boolean,
				default: true
			},
			// 是否顯示工具條右邊的"完成"按鈕
			confirmBtn: {
				type: Boolean,
				default: true
			},
			// 是否打亂鍵盤按鍵的順序
			random: {
				type: Boolean,
				default: false
			},
			// 是否開啟底部安全區適配，開啟的話，會在iPhoneX機型底部添加一定的內邊距
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否允許通過點擊遮罩關閉鍵盤
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 通過雙向綁定控制鍵盤的彈出與收起
			value: {
				type: Boolean,
				default: false
			},
			// 是否顯示遮罩，某些時候數字鍵盤時，用戶希望看到自己的數值，所以可能不想要遮罩
			mask: {
				type: Boolean,
				default: true
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 取消按鈕的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 確認按鈕的文字
			confirmText: {
				type: String,
				default: '確認'
			}
		},
		data() {
			return {
				//show: false
			}
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			change(e) {
				this.$emit('change', e);
			},
			// 鍵盤關閉
			popupClose() {
				// 通過發送input這個特殊的事件名，可以修改父組件傳給props的value的變量，也即雙向綁定
				this.$emit('input', false);
			},
			// 輸入完成
			onConfirm() {
				this.popupClose();
				this.$emit('confirm');
			},
			// 取消輸入
			onCancel() {
				this.popupClose();
				this.$emit('cancel');
			},
			// 退格鍵
			backspace() {
				this.$emit('backspace');
			},
			// 關閉鍵盤
			// close() {
			// 	this.show = false;
			// },
			// // 打開鍵盤
			// open() {
			// 	this.show = true;
			// }
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-keyboard {
		position: relative;
		z-index: 1003;
	}

	.u-tooltip {
		@include vue-flex;
		justify-content: space-between;
	}

	.u-tooltip-item {
		color: #333333;
		flex: 0 0 33.333333%;
		text-align: center;
		padding: 20rpx 10rpx;
		font-size: 28rpx;
	}

	.u-tooltips-submit {
		text-align: right;
		flex-grow: 1;
		flex-wrap: 0;
		padding-right: 40rpx;
		color: $u-type-primary;
	}

	.u-tooltip-cancel {
		text-align: left;
		flex-grow: 1;
		flex-wrap: 0;
		padding-left: 40rpx;
		color: #888888;
	}

	.u-tooltips-submit-hover {
		color: $u-type-success;
	}

	.u-tooltip-cancel-hover {
		color: #333333;
	}
</style>
