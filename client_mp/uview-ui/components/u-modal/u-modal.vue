<template>
	<view>
		<u-popup :zoom="zoom" mode="center" :popup="false" :z-index="uZIndex" v-model="value" :length="width"
		 :mask-close-able="maskCloseAble" :border-radius="borderRadius" @close="popupClose" :negative-top="negativeTop">
			<view class="u-model">
				<view v-if="showTitle" class="u-model__title u-line-1" :style="[titleStyle]">{{ title }}</view>
				<view class="u-model__content">
					<view :style="[contentStyle]" v-if="$slots.default  || $slots.$default">
						<slot />
					</view>
					<view v-else class="u-model__content__message" :style="[contentStyle]">{{ content }}</view>
				</view>
				<view class="u-model__footer u-border-top" v-if="showCancelButton || showConfirmButton">
					<view v-if="showCancelButton" :hover-stay-time="100" hover-class="u-model__btn--hover" class="u-model__footer__button"
					 :style="[cancelBtnStyle]" @tap="cancel">
						{{cancelText}}
					</view>
					<view v-if="showConfirmButton || $slots['confirm-button']" :hover-stay-time="100" :hover-class="asyncClose ? 'none' : 'u-model__btn--hover'"
					 class="u-model__footer__button hairline-left" :style="[confirmBtnStyle]" @tap="confirm">
						<slot v-if="$slots['confirm-button']" name="confirm-button"></slot>
						<block v-else>
							<u-loading mode="circle" :color="confirmColor" v-if="loading"></u-loading>
							<block v-else>
								{{confirmText}}
							</block>
						</block>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/**
	 * modal 模態框
	 * @description 彈出模態框，常用於消息提示、消息確認、在當前頁面內完成特定的交互操作
	 * @tutorial https://www.uviewui.com/components/modal.html
	 * @property {Boolean} value 是否顯示模態框
	 * @property {String | Number} z-index 層級
	 * @property {String} title 模態框標題（默認"提示"）
	 * @property {String | Number} width 模態框寬度（默認600）
	 * @property {String} content 模態框內容（默認"內容"）
	 * @property {Boolean} show-title 是否顯示標題（默認true）
	 * @property {Boolean} async-close 是否異步關閉，只對確定按鈕有效（默認false）
	 * @property {Boolean} show-confirm-button 是否顯示確認按鈕（默認true）
	 * @property {Stringr | Number} negative-top modal往上偏移的值
	 * @property {Boolean} show-cancel-button 是否顯示取消按鈕（默認false）
	 * @property {Boolean} mask-close-able 是否允許點擊遮罩關閉modal（默認false）
	 * @property {String} confirm-text 確認按鈕的文字內容（默認"確認"）
	 * @property {String} cancel-text 取消按鈕的文字內容（默認"取消"）
	 * @property {String} cancel-color 取消按鈕的顏色（默認"#606266"）
	 * @property {String} confirm-color 確認按鈕的文字內容（默認"#2979ff"）
	 * @property {String | Number} border-radius 模態框圓角值，單位rpx（默認16）
	 * @property {Object} title-style 自定義標題樣式，對像形式
	 * @property {Object} content-style 自定義內容樣式，對像形式
	 * @property {Object} cancel-style 自定義取消按鈕樣式，對像形式
	 * @property {Object} confirm-style 自定義確認按鈕樣式，對像形式
	 * @property {Boolean} zoom 是否開啟縮放模式（默認true）
	 * @event {Function} confirm 確認按鈕被點擊
	 * @event {Function} cancel 取消按鈕被點擊
	 * @example <u-modal :src="title" :content="content"></u-modal>
	 */
	export default {
		name: 'u-modal',
		props: {
			// 是否顯示Modal
			value: {
				type: Boolean,
				default: false
			},
			// 層級z-index
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 標題
			title: {
				type: [String],
				default: '提示'
			},
			// 彈窗寬度，可以是數值(rpx)，百分比，auto等
			width: {
				type: [Number, String],
				default: 600
			},
			// 彈窗內容
			content: {
				type: String,
				default: '內容'
			},
			// 是否顯示標題
			showTitle: {
				type: Boolean,
				default: true
			},
			// 是否顯示確認按鈕
			showConfirmButton: {
				type: Boolean,
				default: true
			},
			// 是否顯示取消按鈕
			showCancelButton: {
				type: Boolean,
				default: false
			},
			// 確認文案
			confirmText: {
				type: String,
				default: '確認'
			},
			// 取消文案
			cancelText: {
				type: String,
				default: '取消'
			},
			// 確認按鈕顏色
			confirmColor: {
				type: String,
				default: '#2979ff'
			},
			// 取消文字顏色
			cancelColor: {
				type: String,
				default: '#606266'
			},
			// 圓角值
			borderRadius: {
				type: [Number, String],
				default: 16
			},
			// 標題的樣式
			titleStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 內容的樣式
			contentStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 取消按鈕的樣式
			cancelStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 確定按鈕的樣式
			confirmStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否開啟縮放效果
			zoom: {
				type: Boolean,
				default: true
			},
			// 是否異步關閉，只對確定按鈕有效
			asyncClose: {
				type: Boolean,
				default: false
			},
			// 是否允許點擊遮罩關閉modal
			maskCloseAble: {
				type: Boolean,
				default: false
			},
			// 給一個負的margin-top，往上偏移，避免和鍵盤重合的情況
			negativeTop: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				loading: false, // 確認按鈕是否正在加載中
			}
		},
		computed: {
			cancelBtnStyle() {
				return Object.assign({
					color: this.cancelColor
				}, this.cancelStyle);
			},
			confirmBtnStyle() {
				return Object.assign({
					color: this.confirmColor
				}, this.confirmStyle);
			},
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		watch: {
			// 如果是異步關閉時，外部修改v-model的值為false時，重置內部的loading狀態
			// 避免下次打開的時候，狀態混亂
			value(n) {
				if (n === true) this.loading = false;
			}
		},
		methods: {
			confirm() {
				// 異步關閉
				if (this.asyncClose) {
					this.loading = true;
				} else {
					this.$emit('input', false);
				}
				this.$emit('confirm');
			},
			cancel() {
				this.$emit('cancel');
				this.$emit('input', false);
				// 目前popup彈窗關閉有一個延時操作，此處做一個延時
				// 避免確認按鈕文字變成了"確定"字樣，modal還沒消失，造成視覺不好的效果
				setTimeout(() => {
					this.loading = false;
				}, 300);
			},
			// 點擊遮罩關閉modal，設置v-model的值為false，否則無法第二次彈起modal
			popupClose() {
				this.$emit('input', false);
			},
			// 清除加載中的狀態
			clearLoading() {
				this.loading = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-model {
		height: auto;
		overflow: hidden;
		font-size: 32rpx;
		background-color: #fff;

		&__btn--hover {
			background-color: rgb(230, 230, 230);
		}

		&__title {
			padding-top: 48rpx;
			font-weight: 500;
			text-align: center;
			color: $u-main-color;
		}

		&__content {
			&__message {
				padding: 48rpx;
				font-size: 30rpx;
				text-align: center;
				color: $u-content-color;
			}
		}

		&__footer {
			@include vue-flex;

			&__button {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				box-sizing: border-box;
				cursor: pointer;
				text-align: center;
				border-radius: 4rpx;
			}
		}
	}
</style>
