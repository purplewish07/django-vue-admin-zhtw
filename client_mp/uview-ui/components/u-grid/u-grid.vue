<template>
	<view class="u-grid" :class="{'u-border-top u-border-left': border}" :style="[gridStyle]"><slot /></view>
</template>

<script>
/**
 * grid 宮格佈局
 * @description 宮格組件一般用於同時展示多個同類項目的場景，可以給宮格的項目設置徽標組件(badge)，或者圖標等，也可以擴展為左右滑動的輪播形式。
 * @tutorial https://www.uviewui.com/components/grid.html
 * @property {String Number} col 宮格的列數（默認3）
 * @property {Boolean} border 是否顯示宮格的邊框（默認true）
 * @property {Boolean} hover-class 點擊宮格的時候，是否顯示按下的灰色背景（默認false）
 * @event {Function} click 點擊宮格觸發
 * @example <u-grid :col="3" @click="click"></u-grid>
 */
export default {
	name: 'u-grid',
	props: {
		// 分成幾列
		col: {
			type: [Number, String],
			default: 3
		},
		// 是否顯示邊框
		border: {
			type: Boolean,
			default: true
		},
		// 宮格對齊方式，表現為數量少的時候，靠左，居中，還是靠右
		align: {
			type: String,
			default: 'left'
		},
		// 宮格按壓時的樣式類，"none"為無效果
		hoverClass: {
			type: String,
			default: 'u-hover-class'
		}
	},
	data() {
		return {
			index: 0,
		}
	},
	watch: {
		// 當父組件需要子組件需要共享的參數發生了變化，手動通知子組件
		parentData() {
			if(this.children.length) {
				this.children.map(child => {
					// 判斷子組件(u-radio)如果有updateParentData方法的話，就就執行(執行的結果是子組件重新從父組件拉取了最新的值)
					typeof(child.updateParentData) == 'function' && child.updateParentData();
				})
			}
		},
	},
	created() {
		// 如果將children定義在data中，在微信小程序會造成循環引用而報錯
		this.children = [];
	},
	computed: {
		// 計算父組件的值是否發生變化
		parentData() {
			return [this.hoverClass, this.col, this.size, this.border];
		},
		// 宮格對齊方式
		gridStyle() {
			let style = {};
			switch(this.align) {
				case 'left':
					style.justifyContent = 'flex-start';
					break;
				case 'center':
					style.justifyContent = 'center';
					break;
				case 'right':
					style.justifyContent = 'flex-end';
					break;
				default: style.justifyContent = 'flex-start';
			};
			return style;
		}
	},
	methods: {
		click(index) {
			this.$emit('click', index);
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-grid {
	width: 100%;
	/* #ifdef MP */
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	/* #endif */
	
	/* #ifndef MP */
	@include vue-flex;
	flex-wrap: wrap;
	align-items: center;
	/* #endif */
}
</style>
