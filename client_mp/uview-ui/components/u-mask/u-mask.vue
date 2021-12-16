<template>
	<view class="u-mask" hover-stop-propagation :style="[maskStyle, zoomStyle]" @tap="click" @touchmove.stop.prevent="() => {}" :class="{
		'u-mask-zoom': zoom,
		'u-mask-show': show
	}">
		<slot />
	</view>
</template>

<script>
	/**
	 * mask 遮罩
	 * @description 創建一個遮罩層，用於強調特定的頁面元素，並阻止用戶對遮罩下層的內容進行操作，一般用於彈窗場景
	 * @tutorial https://www.uviewui.com/components/mask.html
	 * @property {Boolean} show 是否顯示遮罩（默認false）
	 * @property {String Number} z-index z-index 層級（默認1070）
	 * @property {Object} custom-style 自定義樣式對象，見上方說明
	 * @property {String Number} duration 動畫時長，單位毫秒（默認300）
	 * @property {Boolean} zoom 是否使用scale對遮罩進行縮放（默認true）
	 * @property {Boolean} mask-click-able 遮罩是否可點擊，為false時點擊不會發送click事件（默認true）
	 * @event {Function} click mask-click-able為true時，點擊遮罩發送此事件
	 * @example <u-mask :show="show" @click="show = false"></u-mask>
	 */
	export default {
		name: "u-mask",
		props: {
			// 是否顯示遮罩
			show: {
				type: Boolean,
				default: false
			},
			// 層級z-index
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 用戶自定義樣式
			customStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 遮罩的動畫樣式， 是否使用使用zoom進行scale進行縮放
			zoom: {
				type: Boolean,
				default: true
			},
			// 遮罩的過渡時間，單位為ms
			duration: {
				type: [Number, String],
				default: 300
			},
			// 是否可以通過點擊遮罩進行關閉
			maskClickAble: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				zoomStyle: {
					transform: ''
				},
				scale: 'scale(1.2, 1.2)'
			}
		},
		watch: {
			show(n) {
				if(n && this.zoom) {
					// 當展示遮罩的時候，設置scale為1，達到縮小(原來為1.2)的效果
					this.zoomStyle.transform = 'scale(1, 1)';
				} else if(!n && this.zoom) {
					// 當隱藏遮罩的時候，設置scale為1.2，達到放大(因為顯示遮罩時已重置為1)的效果
					this.zoomStyle.transform = this.scale;
				}
			}
		},
		computed: {
			maskStyle() {
				let style = {};
				style.backgroundColor = "rgba(0, 0, 0, 0.6)";
				if(this.show) style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
				else style.zIndex = -1;
				style.transition = `all ${this.duration / 1000}s ease-in-out`;
				// 判斷用戶傳遞的對象是否為空，不為空就進行合併
				if (Object.keys(this.customStyle).length) style = { 
					...style,
					...this.customStyle
				};
				return style;
			}
		},
		methods: {
			click() {
				if (!this.maskClickAble) return;
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		transition: transform 0.3s;
	}

	.u-mask-show {
		opacity: 1;
	}
	
	.u-mask-zoom {
		transform: scale(1.2, 1.2);
	}
</style>
