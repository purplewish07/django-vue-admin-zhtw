<template>
	<view class="u-collapse">
		<slot />
	</view>
</template>

<script>
	/**
	 * collapse 手風琴
	 * @description 通過折疊面板收納內容區域
	 * @tutorial https://www.uviewui.com/components/collapse.html
	 * @property {Boolean} accordion 是否手風琴模式（默認true）
	 * @property {Boolean} arrow 是否顯示標題右側的箭頭（默認true）
	 * @property {String} arrow-color 標題右側箭頭的顏色（默認#909399）
	 * @property {Object} head-style 標題自定義樣式，對像形式
	 * @property {Object} body-style 主體自定義樣式，對像形式
	 * @property {String} hover-class 樣式類名，按下時有效（默認u-hover-class）
	 * @event {Function} change 當前激活面板展開時觸發(如果是手風琴模式，參數activeNames類型為String，否則為Array)
	 * @example <u-collapse></u-collapse>
	 */
	export default {
		name:"u-collapse",
		props: {
			// 是否手風琴模式
			accordion: {
				type: Boolean,
				default: true
			},
			// 頭部的樣式
			headStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 主體的樣式
			bodyStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 每一個item的樣式
			itemStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否顯示右側的箭頭
			arrow: {
				type: Boolean,
				default: true
			},
			// 箭頭的顏色
			arrowColor: {
				type: String,
				default: '#909399'
			},
			// 標題部分按壓時的樣式類，"none"為無效果
			hoverClass: {
				type: String,
				default: 'u-hover-class'
			}
		},
		created() {
			this.childrens = []
		},
		data() {
			return {

			}
		},
		methods: {
			// 重新初始化一次內部的所有子元素的高度計算，用於異步獲取數據渲染的情況
			init() {
				this.childrens.forEach((vm, index) => {
					vm.init();
				})
			},
			// collapse item被點擊，由collapse item調用父組件方法
			onChange() {
				let activeItem = [];
				this.childrens.forEach((vm, index) => {
					if (vm.isShow) {
						activeItem.push(vm.nameSync);
					}
				})
				// 如果是手風琴模式，只有一個匹配結果，也即activeItem長度為1，將其轉為字符串
				if (this.accordion) activeItem = activeItem.join('');
				this.$emit('change', activeItem);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
</style>
