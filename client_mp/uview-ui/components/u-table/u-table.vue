<template>
	<view class="u-table" :style="[tableStyle]">
		<slot />
	</view>
</template>

<script>
	/**
	 * table 表格
	 * @description 表格組件一般用於展示大量結構化數據的場景
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @property {String} border-color 表格邊框的顏色（默認#e4e7ed）
	 * @property {String} bg-color 表格的背景顏色（默認#ffffff）
	 * @property {String} align 單元格的內容對齊方式，作用類似css的text-align（默認center）
	 * @property {String} padding 單元格的內邊距，同css的padding寫法（默認10rpx 0）
	 * @property {String Number} font-size 單元格字體大小，單位rpx（默認28）
	 * @property {String} color 單元格字體顏色（默認#606266）
	 * @property {Object} th-style th單元格的樣式，對像形式(將th所需參數放在table組件，是為了避免每一個th組件要寫一遍）
	 * @event {Function} click 點擊組件時觸發
	 * @event {Function} close 點擊關閉按鈕時觸發
	 * @example <u-table></u-table>
	 */
	export default {
		name: "u-table",
		props: {
			borderColor: {
				type: String,
				default: '#e4e7ed'
			},
			align: {
				type: String,
				default: 'center'
			},
			// td的內邊距
			padding: {
				type: String,
				default: '10rpx 6rpx'
			},
			// 字體大小
			fontSize: {
				type: [String, Number],
				default: 28
			},
			// 字體顏色
			color: {
				type: String,
				default: '#606266'
			},
			// th的自定義樣式
			thStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// table的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			}
		},
		data() {
			return {}
		},
		computed: {
			tableStyle() {
				let style = {};
				style.borderLeft = `solid 1px ${this.borderColor}`;
				style.borderTop = `solid 1px ${this.borderColor}`;
				style.backgroundColor = this.bgColor;;
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-table {
		width: 100%;
		box-sizing: border-box;
	}
</style>
