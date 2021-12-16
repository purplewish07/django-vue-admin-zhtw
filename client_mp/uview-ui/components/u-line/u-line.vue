<template>
	<view class="u-line" :style="[lineStyle]">
		
	</view>
</template>

<script>
	/**
	 * line 線條
	 * @description 此組件一般用於顯示一根線條，用於分隔內容塊，有橫向和豎向兩種模式，且能設置0.5px線條，使用也很簡單
	 * @tutorial https://www.uviewui.com/components/line.html
	 * @property {String} color 線條的顏色(默認#e4e7ed)
	 * @property {String} length 長度，豎向時表現為高度，橫向時表現為長度，可以為百分比，帶rpx單位的值等
	 * @property {String} direction 線條的方向，row-橫向，col-豎向(默認row)
	 * @property {String} border-style 線條的類型，solid-實線，dashed-方形虛線，dotted-圓點虛線(默認solid)
	 * @property {Boolean} hair-line 是否顯示細線條(默認true)
	 * @property {String} margin 線條與上下左右元素的間距，字符串形式，如"30rpx"
	 * @example <u-line color="red"></u-line>
	 */
	export default {
		name: 'u-line',
		props: {
			color: {
				type: String,
				default: '#e4e7ed'
			},
			// 長度，豎向時表現為高度，橫向時表現為長度，可以為百分比，帶rpx單位的值等
			length: {
				type: String,
				default: '100%'
			},
			// 線條方向，col-豎向，row-橫向
			direction: {
				type: String,
				default: 'row'
			},
			// 是否顯示細邊框
			hairLine: {
				type: Boolean,
				default: true
			},
			// 線條與上下左右元素的間距，字符串形式，如"30rpx"、"20rpx 30rpx"
			margin: {
				type: String,
				default: '0'
			},
			// 線條的類型，solid-實線，dashed-方形虛線，dotted-圓點虛線
			borderStyle: {
				type: String,
				default: 'solid'
			}
		},
		computed: {
			lineStyle() {
				let style = {};
				style.margin = this.margin;
				// 如果是水平線條，邊框高度為1px，再通過transform縮小一半，就是0.5px了
				if(this.direction == 'row') {
					// 此處採用兼容分開寫，兼容nvue的寫法
					style.borderBottomWidth = '1px';
					style.borderBottomStyle = this.borderStyle;
					style.width = this.$u.addUnit(this.length);
					if(this.hairLine) style.transform = 'scaleY(0.5)';
				} else {
					// 如果是豎向線條，邊框寬度為1px，再通過transform縮小一半，就是0.5px了
					style.borderLeftWidth = '1px';
					style.borderLeftStyle = this.borderStyle;
					style.height = this.$u.addUnit(this.length);
					if(this.hairLine) style.transform = 'scaleX(0.5)';
				}
				style.borderColor = this.color;
				return style;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-line {
		vertical-align: middle;
	}
</style>
