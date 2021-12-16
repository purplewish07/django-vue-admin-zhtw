<template>
	<view v-if="show" class="u-loading" :class="mode == 'circle' ? 'u-loading-circle' : 'u-loading-flower'" :style="[cricleStyle]">
	</view>
</template>

<script>
	/**
	 * loading 加載動畫
	 * @description 警此組件為一個小動畫，目前用在uView的loadmore加載更多和switch開關等組件的正在加載狀態場景。
	 * @tutorial https://www.uviewui.com/components/loading.html
	 * @property {String} mode 模式選擇，見官網說明（默認circle）
	 * @property {String} color 動畫活動區域的顏色，只對 mode = flower 模式有效（默認#c7c7c7）
	 * @property {String Number} size 加載圖標的大小，單位rpx（默認34）
	 * @property {Boolean} show 是否顯示動畫（默認true）
	 * @example <u-loading mode="circle"></u-loading>
	 */
	export default {
		name: "u-loading",
		props: {
			// 動畫的類型
			mode: {
				type: String,
				default: 'circle'
			},
			// 動畫的顏色
			color: {
				type: String,
				default: '#c7c7c7'
			},
			// 加載圖標的大小，單位rpx
			size: {
				type: [String, Number],
				default: '34'
			},
			// 是否顯示動畫
			show: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			// 加載中圓圈動畫的樣式
			cricleStyle() {
				let style = {};
				style.width = this.size + 'rpx';
				style.height = this.size + 'rpx';
				if (this.mode == 'circle') style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : '#c7c7c7'}`;
				return style;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-loading-circle {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		vertical-align: middle;
		width: 28rpx;
		height: 28rpx;
		background: 0 0;
		border-radius: 50%;
		border: 2px solid;
		border-color: #e5e5e5 #e5e5e5 #e5e5e5 #8f8d8e;
		animation: u-circle 1s linear infinite;
	}

	.u-loading-flower {
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align: middle;
		-webkit-animation: a 1s steps(12) infinite;
		animation: u-flower 1s steps(12) infinite;
		background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
		background-size: 100%;
	}

	@keyframes u-flower {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}

	@-webkit-keyframes u-circle {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
