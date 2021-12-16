<template>
	<view class="u-grid-item" :hover-class="parentData.hoverClass"
	 :hover-stay-time="200" @tap="click" :style="{
			background: bgColor,
			width: width,
		}">
		<view class="u-grid-item-box" :style="[customStyle]" :class="[parentData.border ? 'u-border-right u-border-bottom' : '']">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * gridItem 提示
	 * @description 宮格組件一般用於同時展示多個同類項目的場景，可以給宮格的項目設置徽標組件(badge)，或者圖標等，也可以擴展為左右滑動的輪播形式。搭配u-grid使用
	 * @tutorial https://www.uviewui.com/components/grid.html
	 * @property {String} bg-color 宮格的背景顏色（默認#ffffff）
	 * @property {String Number} index 點擊宮格時，返回的值
	 * @property {Object} custom-style 自定義樣式，對像形式
	 * @event {Function} click 點擊宮格觸發
	 * @example <u-grid-item></u-grid-item>
	 */
	export default {
		name: "u-grid-item",
		props: {
			// 背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// 點擊時返回的index
			index: {
				type: [Number, String],
				default: ''
			},
			// 自定義樣式，對像形式
			customStyle: {
				type: Object,
				default() {
					return {
						padding: '30rpx 0'
					}
				}
			}
		},
		data() {
			return {
				parentData: {
					hoverClass: '', // 按下去的時候，是否顯示背景灰色
					col: 3, // 父組件劃分的宮格數
					border: true, // 是否顯示邊框，根據父組件決定
				}
			};
		},
		created() {
			// 父組件的實例
			this.updateParentData();
			// this.parent在updateParentData()中定義
			this.parent.children.push(this);
		},
		computed: {
			// 每個grid-item的寬度
			width() {
				return 100 / Number(this.parentData.col) + '%';
			},
		},
		methods: {
			// 獲取父組件的參數
			updateParentData() {
				// 此方法寫在mixin中
				this.getParentData('u-grid');
			},
			click() {
				this.$emit('click', this.index);
				this.parent && this.parent.click(this.index);
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-grid-item {
		box-sizing: border-box;
		background: #fff;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		
		/* #ifdef MP */
		position: relative;
		float: left;
		/* #endif */
	}

	.u-grid-item-hover {
		background: #f7f7f7 !important;
	}

	.u-grid-marker-box {
		position: absolute;
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		line-height: 0;
	}

	.u-grid-marker-wrap {
		position: absolute;
	}

	.u-grid-item-box {
		padding: 30rpx 0;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>
