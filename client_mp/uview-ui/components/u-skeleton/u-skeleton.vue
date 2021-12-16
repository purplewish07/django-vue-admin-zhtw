<template>
	<view v-if="loading" :style="{
		width: windowWinth + 'px', 
		height: windowHeight + 'px', 
		backgroundColor: bgColor, 
		position: 'absolute', 
		left: left + 'px', 
		top: top + 'px', 
		zIndex: 9998, 
		overflow: 'hidden'
	}"
	 @touchmove.stop.prevent>
		<view v-for="(item, index) in RectNodes" :key="$u.guid()" :class="[animation ? 'skeleton-fade' : '']" :style="{
			width: item.width + 'px', 
			height: item.height + 'px', 
			backgroundColor: elColor, 
			position: 'absolute', 
			left: (item.left - left) + 'px', 
			top: (item.top - top) + 'px'
		}"></view>
		<view v-for="(item, index) in circleNodes" :key="$u.guid()" :class="animation ? 'skeleton-fade' : ''" :style="{
			width: item.width + 'px', 
			height: item.height + 'px', 
			backgroundColor: elColor, 
			borderRadius: item.width/2 + 'px', 
			position: 'absolute', 
			left: (item.left - left) + 'px',
			top: (item.top - top) + 'px'
		}"></view>
		<view v-for="(item, index) in filletNodes" :key="$u.guid()" :class="animation ? 'skeleton-fade' : ''" :style="{
			width: item.width + 'px', 
			height: item.height + 'px', 
			backgroundColor: elColor, 
			borderRadius: borderRadius + 'rpx', 
			position: 'absolute', 
			left: (item.left - left) + 'px',
			top: (item.top - top) + 'px'
		}"></view>
	</view>
</template>

<script>
	/**
	 * skeleton 骨架屏
	 * @description 骨架屏一般用於頁面在請求遠程數據尚未完成時，頁面用灰色塊預顯示本來的頁面結構，給用戶更好的體驗。
	 * @tutorial https://www.uviewui.com/components/skeleton.html
	 * @property {String} el-color 骨架塊狀元素的背景顏色（默認#e5e5e5）
	 * @property {String} bg-color 骨架組件背景顏色（默認#ffffff）
	 * @property {Boolean} animation 骨架塊是否顯示動畫效果（默認false）
	 * @property {String Number} border-radius u-skeleton-fillet類名元素，對應的骨架塊的圓角大小，單位rpx（默認10）
	 * @property {Boolean} loading 是否顯示骨架組件，請求完成後，將此值設置為false（默認true）
	 * @example <u-skeleton :loading="true" :animation="true"></u-skeleton>
	 */
	export default {
		name: "u-skeleton",
		props: {
			// 需要渲染的元素背景顏色，十六進制或者rgb等都可以
			elColor: {
				type: String,
				default: '#e5e5e5'
			},
			// 整個骨架屏頁面的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// 是否顯示加載動畫
			animation: {
				type: Boolean,
				default: false
			},
			// 圓角值，只對類名為u-skeleton-fillet的元素生效，為數值，不帶單位
			borderRadius: {
				type: [String, Number],
				default: "10"
			},
			// 是否顯示骨架，true-顯示，false-隱藏
			loading: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				windowWinth: 750, // 骨架屏寬度
				windowHeight: 1500, // 骨架屏高度
				filletNodes: [], // 圓角元素
				circleNodes: [], // 圓形元素
				RectNodes: [], // 矩形元素
				top: 0,
				left: 0,
			}
		},
		methods: {
			// 查詢各節點的信息
			selecterQueryInfo() {
				// 獲取整個父組件容器的高度，當做骨架屏的高度 
				// 在微信小程序中，如果把骨架屏放入組件中使用的話，需要調in(this)上下文為父組件才有效
				let query = '';
				// #ifdef MP-WEIXIN
				query = uni.createSelectorQuery().in(this.$parent);
				// #endif
				// #ifndef MP-WEIXIN
				query = uni.createSelectorQuery()
				// #endif
				query.selectAll('.u-skeleton').boundingClientRect().exec((res) => {
					this.windowHeight = res[0][0].height;
					this.windowWinth = res[0][0].width;
					this.top = res[0][0].bottom - res[0][0].height;
					this.left = res[0][0].left;
				});
				// 矩形骨架元素
				this.getRectEls();
				// 圓形骨架元素
				this.getCircleEls();
				// 圓角骨架元素
				this.getFilletEls();
			},
			// 矩形元素列表
			getRectEls() {
				let query = '';
				// 在微信小程序中，如果把骨架屏放入組件中使用的話，需要調in(this)上下文為父組件才有效
				// #ifdef MP-WEIXIN
				query = uni.createSelectorQuery().in(this.$parent);
				// #endif
				// #ifndef MP-WEIXIN
				query = uni.createSelectorQuery()
				// #endif
				query.selectAll('.u-skeleton-rect').boundingClientRect().exec((res) => {
					this.RectNodes = res[0];
				});
			},
			// 圓角元素列表
			getFilletEls() {
				let query = '';
				// 在微信小程序中，如果把骨架屏放入組件中使用的話，需要調in(this)上下文為父組件才有效
				// #ifdef MP-WEIXIN
				query = uni.createSelectorQuery().in(this.$parent);
				// #endif
				// #ifndef MP-WEIXIN
				query = uni.createSelectorQuery()
				// #endif
				query.selectAll('.u-skeleton-fillet').boundingClientRect().exec((res) => {
					this.filletNodes = res[0];
				});
			},
			// 圓形元素列表
			getCircleEls() {
				let query = '';
				// 在微信小程序中，如果把骨架屏放入組件中使用的話，需要調in(this)上下文為父組件才有效
				// #ifdef MP-WEIXIN
				query = uni.createSelectorQuery().in(this.$parent);
				// #endif
				// #ifndef MP-WEIXIN
				query = uni.createSelectorQuery()
				// #endif
				query.selectAll('.u-skeleton-circle').boundingClientRect().exec((res) => {
					this.circleNodes = res[0];
				});
			}
		},
		// 組件被掛載
		mounted() {
			// 獲取系統信息
			let systemInfo = uni.getSystemInfoSync();
			this.windowHeight = systemInfo.windowHeight;
			this.windowWinth = systemInfo.windowWidth;
			this.selecterQueryInfo();
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.skeleton-fade {
		width: 100%;
		height: 100%;
		background: rgb(194, 207, 214);
		animation-duration: 1.5s;
		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.4;
		}

		100% {
			opacity: 1;
		}
	}
</style>
