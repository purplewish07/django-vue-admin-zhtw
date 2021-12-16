<template>
	<view class="u-cell-box">
		<view class="u-cell-title" v-if="title" :style="[titleStyle]">
			{{title}}
		</view>
		<view class="u-cell-item-box" :class="{'u-border-bottom u-border-top': border}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * cellGroup 單元格父組件Group
	 * @description cell單元格一般用於一組列表的情況，比如個人中心頁，設置頁等。搭配u-cell-item
	 * @tutorial https://www.uviewui.com/components/cell.html
	 * @property {String} title 分組標題
	 * @property {Boolean} border 是否顯示外邊框（默認true）
	 * @property {Object} title-style 分組標題的的樣式，對像形式，如{'font-size': '24rpx'} 或 {'fontSize': '24rpx'}
	 * @example <u-cell-group title="設置喜好">
	 */
	export default {
		name: "u-cell-group",
		props: {
			// 分組標題
			title: {
				type: String,
				default: ''
			},
			// 是否顯示分組list上下邊框
			border: {
				type: Boolean,
				default: true
			},
			// 分組標題的樣式，對像形式，注意駝峰屬性寫法
			// 類似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
			titleStyle: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				index: 0,
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-cell-box {
		width: 100%;
	}

	.u-cell-title {
		padding: 30rpx 32rpx 10rpx 32rpx;
		font-size: 30rpx;
		text-align: left;
		color: $u-tips-color;
	}

	.u-cell-item-box {
		background-color: #FFFFFF;
		flex-direction: row;
	}
</style>
