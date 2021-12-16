<template>
	<view class="u-th" :style="[thStyle]">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * th th單元格
	 * @description 表格組件一般用於展示大量結構化數據的場景（搭配u-table使用）
	 * @tutorial https://www.uviewui.com/components/table.html#td-props
	 * @property {String Number} width 標題單元格寬度百分比或者具體帶單位的值，如30%，200rpx等，一般使用百分比，單元格寬度默認為均分tr的長度
	 * @example 暫無示例
	 */
	export default {
		name: "u-th",
		props: {
			// 寬度，百分比或者具體帶單位的值，如30%， 200rpx等，一般使用百分比
			width: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				thStyle: {}
			}
		},
		created() {
			this.parent = false;
		},
		mounted() {
			this.parent = this.$u.$parent.call(this, 'u-table');
			if (this.parent) {
				// 將父組件的相關參數，合併到本組件
				let style = {};
				if (this.width) style.flex = `0 0 ${this.width}`;
				style.textAlign = this.parent.align;
				style.padding = this.parent.padding;
				style.borderBottom = `solid 1px ${this.parent.borderColor}`;
				style.borderRight = `solid 1px ${this.parent.borderColor}`;
				Object.assign(style, this.parent.style);
				this.thStyle = style;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-th {
		@include vue-flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		font-size: 28rpx;
		color: $u-main-color;
		font-weight: bold;
		background-color: rgb(245, 246, 248);
	}
</style>
