<template>
	<view class="u-gap" :style="[gapStyle]"></view>
</template>

<script>
/**
 * gap 間隔槽
 * @description 該組件一般用於內容塊之間的用一個灰色塊隔開的場景，方便用戶風格統一，減少工作量
 * @tutorial https://www.uviewui.com/components/gap.html
 * @property {String} bg-color 背景顏色（默認#f3f4f6）
 * @property {String Number} height 分割槽高度，單位rpx（默認30）
 * @property {String Number} margin-top 與前一個組件的距離，單位rpx（默認0）
 * @property {String Number} margin-bottom 與後一個組件的距離，單位rpx（0）
 * @example <u-gap height="80" bg-color="#bbb"></u-gap>
 */
export default {
	name: "u-gap",
	props: {
		bgColor: {
			type: String,
			default: 'transparent ' // 背景透明
		},
		// 高度
		height: {
			type: [String, Number],
			default: 30
		},
		// 與上一個組件的距離
		marginTop: {
			type: [String, Number],
			default: 0
		},
		// 與下一個組件的距離
		marginBottom: {
			type: [String, Number],
			default: 0
		},
	},
	computed: {
		gapStyle() {
			return {
				backgroundColor: this.bgColor,
				height: this.height + 'rpx',
				marginTop: this.marginTop + 'rpx',
				marginBottom: this.marginBottom + 'rpx'
			};
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
</style>
