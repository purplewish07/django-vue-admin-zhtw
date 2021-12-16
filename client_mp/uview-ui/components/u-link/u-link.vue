<template>
	<text class="u-link" @tap.stop="openLink" :style="{
		color: color,
		fontSize: fontSize + 'rpx',
		borderBottom: underLine ? `1px solid ${lineColor ? lineColor : color}` : 'none',
		paddingBottom: underLine ? '0rpx' : '0'
	}">
		<slot></slot>
	</text>
</template>

<script>
	/**
	 * link 超鏈接
	 * @description 該組件為超鏈接組件，在不同平台有不同表現形式：在APP平台會通過plus環境打開內置瀏覽器，在小程序中把鏈接複製到粘貼板，同時提示信息，在H5中通過window.open打開鏈接。
	 * @tutorial https://www.uviewui.com/components/link.html
	 * @property {String} color 文字顏色（默認#606266）
	 * @property {String Number} font-size 字體大小，單位rpx（默認28）
	 * @property {Boolean} under-line 是否顯示下劃線（默認false）
	 * @property {String} href 跳轉的鏈接，要帶上http(s)
	 * @property {String} line-color 下劃線顏色，默認同color參數顏色 
	 * @property {String} mp-tips 各個小程序平台把鏈接複製到粘貼板後的提示語（默認「鏈接已複製，請在瀏覽器打開」）
	 * @example <u-link href="http://www.uviewui.com">蜀道難，難於上青天</u-link>
	 */
	export default {
		name: "u-link",
		props: {
			// 文字顏色
			color: {
				type: String,
				default: '#2979ff'
			},
			// 字體大小，單位rpx
			fontSize: {
				type: [String, Number],
				default: 28
			},
			// 是否顯示下劃線
			underLine: {
				type: Boolean,
				default: false
			},
			// 要跳轉的鏈接
			href: {
				type: String,
				default: ''
			},
			// 小程序中複製到粘貼板的提示語
			mpTips: {
				type: String,
				default: '鏈接已複製，請在瀏覽器打開'
			},
			// 下劃線顏色
			lineColor: {
				type: String,
				default: ''
			}
		},
		methods: {
			openLink() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.href)
				// #endif
				// #ifdef H5
				window.open(this.href)
				// #endif
				// #ifdef MP
				uni.setClipboardData({
					data: this.href,
					success: () => {
						uni.hideToast();
						this.$nextTick(() => {
							this.$u.toast(this.mpTips);
						})
					}
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-link {
		line-height: 1;
	}
</style>
