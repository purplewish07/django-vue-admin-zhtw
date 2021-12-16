<template>
	<view class="u-tips" :class="['u-' + type, isShow ? 'u-tip-show' : '']" :style="{
		top: navbarHeight + 'px',
		zIndex: uZIndex
	}">{{ title }}</view>
</template>

<script>
	/**
	 * topTips 頂部提示
	 * @description 該組件一般用於頁面頂部向下滑出一個提示，爾後自動收起的場景。
	 * @tutorial https://www.uviewui.com/components/topTips.html
	 * @property {String Number} navbar-height 導航欄高度(包含狀態欄高度在內)，單位PX
	 * @property {String Number} z-index z-index值（默認975）
	 * @example <u-top-tips ref="uTips"></u-top-tips>
	 */
	export default {
		name: "u-top-tips",
		props: {
			// 導航欄高度，用於提示的初始化
			navbarHeight: {
				type: [Number, String],
				// #ifndef H5
				default: 0,
				// #endif
				// #ifdef H5
				default: 44,
				// #endif
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				timer: null, // 定時器
				isShow: false, // 是否顯示消息組件
				title: '', // 組件中顯示的消息內容
				type: 'primary', // 消息的類型（顏色不同），primary，success，error，warning，info
				duration: 2000, // 組件顯示的時間，單位為毫秒
			};
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.topTips;
			}
		},
		methods: {
			show(config = {}) {
				// 先清除定時器（可能是上一次定義的，需要清除了再開始新的）
				clearTimeout(this.timer);
				// 時間，內容，類型主題(type)等參數
				if (config.duration) this.duration = config.duration;
				if (config.type) this.type = config.type;
				this.title = config.title;
				this.isShow = true;
				// 倒計時
				this.timer = setTimeout(() => {
					this.isShow = false;
					clearTimeout(this.timer);
					this.timer = null;
				}, this.duration);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	view {
		box-sizing: border-box;
	}

	// 頂部彈出類型樣式
	.u-tips {
		width: 100%;
		position: fixed;
		z-index: 1;
		padding: 20rpx 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		left: 0;
		right: 0;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		// 此處為最核心點，translateY(-100%)意味著將其從Y軸隱藏（隱藏到頂部(h5)或者說導航欄(app)下面）
		transform: translateY(-100%);
		transition: all 0.35s linear;
	}

	.u-tip-show {
		transform: translateY(0);
		opacity: 1;
		z-index: 99;
	}

	.u-primary {
		background: $u-type-primary;
	}

	.u-success {
		background: $u-type-success;
	}

	.u-warning {
		background: $u-type-warning;
	}

	.u-error {
		background: $u-type-error;
	}

	.u-info {
		background: $u-type-info;
	}
</style>
