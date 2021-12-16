<template>
	<view class="">
		<view class="u-sticky-wrap" :class="[elClass]" :style="{
			height: fixed ? height + 'px' : 'auto',
			backgroundColor: bgColor
		}">
			<view class="u-sticky" :style="{
				position: fixed ? 'fixed' : 'static',
				top: stickyTop + 'px',
				left: left + 'px',
				width: width == 'auto' ? 'auto' : width + 'px',
				zIndex: uZIndex
			}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * sticky 吸頂
	 * @description 該組件與CSS中position: sticky屬性實現的效果一致，當組件達到預設的到頂部距離時， 就會固定在指定位置，組件位置大於預設的頂部距離時，會重新按照正常的佈局排列。
	 * @tutorial https://www.uviewui.com/components/sticky.html
	 * @property {String Number} offset-top 吸頂時與頂部的距離，單位rpx（默認0）
	 * @property {String Number} index 自定義標識，用於區分是哪一個組件
	 * @property {Boolean} enable 是否開啟吸頂功能（默認true）
	 * @property {String} bg-color 組件背景顏色（默認#ffffff）
	 * @property {String Number} z-index 吸頂時的z-index值（默認970）
	 * @property {String Number} h5-nav-height 導航欄高度，自定義導航欄時(無導航欄時需設置為0)，需要傳入此值，單位px（默認44）
	 * @event {Function} fixed 組件吸頂時觸發
	 * @event {Function} unfixed 組件取消吸頂時觸發
	 * @example <u-sticky offset-top="200"><view>塞下秋來風景異，衡陽雁去無留意</view></u-sticky>
	 */
	export default {
		name: "u-sticky",
		props: {
			// 吸頂容器到頂部某個距離的時候，進行吸頂，在H5平台，NavigationBar為44px
			offsetTop: {
				type: [Number, String],
				default: 0
			},
			//列表中的索引值
			index: {
				type: [Number, String],
				default: ''
			},
			// 是否開啟吸頂功能
			enable: {
				type: Boolean,
				default: true
			},
			// h5頂部導航欄的高度
			h5NavHeight: {
				type: [Number, String],
				default: 44
			},
			// 吸頂區域的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				fixed: false,
				height: 'auto',
				stickyTop: 0,
				elClass: this.$u.guid(),
				left: 0,
				width: 'auto',
			};
		},
		watch: {
			offsetTop(val) {
				this.initObserver();
			},
			enable(val) {
				if (val == false) {
					this.fixed = false;
					this.disconnectObserver('contentObserver');
				} else {
					this.initObserver();
				}
			}
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.sticky;
			}
		},
		mounted() {
			this.initObserver();
		},
		methods: {
			initObserver() {
				if (!this.enable) return;
				// #ifdef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) + this.h5NavHeight : this.h5NavHeight;
				// #endif
				// #ifndef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) : 0;
				// #endif

				this.disconnectObserver('contentObserver');
				this.$uGetRect('.' + this.elClass).then((res) => {
					this.height = res.height;
					this.left = res.left;
					this.width = res.width;
					this.$nextTick(() => {
						this.observeContent();
					});
				});
			},
			observeContent() {
				this.disconnectObserver('contentObserver');
				const contentObserver = this.createIntersectionObserver({
					thresholds: [0.95, 0.98, 1]
				});
				contentObserver.relativeToViewport({
					top: -this.stickyTop
				});
				contentObserver.observe('.' + this.elClass, res => {
					if (!this.enable) return;
					this.setFixed(res.boundingClientRect.top);
				});
				this.contentObserver = contentObserver;
			},
			setFixed(top) {
				const fixed = top < this.stickyTop;
				if (fixed) this.$emit('fixed', this.index);
				else if(this.fixed) this.$emit('unfixed', this.index);
				this.fixed = fixed;
			},
			disconnectObserver(observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			},
		},
		beforeDestroy() {
			this.disconnectObserver('contentObserver');
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-sticky {
		z-index: 9999999999;
	}
</style>
