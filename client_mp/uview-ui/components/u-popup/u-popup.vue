<template>
	<view v-if="visibleSync" :style="[customStyle, {
		zIndex: uZindex - 1
	}]" class="u-drawer" hover-stop-propagation>
		<u-mask :duration="duration" :custom-style="maskCustomStyle" :maskClickAble="maskCloseAble" :z-index="uZindex - 2" :show="showDrawer && mask" @click="maskClick"></u-mask>
		<view
			class="u-drawer-content"
			@tap="modeCenterClose(mode)"
			:class="[
				safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
				'u-drawer-' + mode,
				showDrawer ? 'u-drawer-content-visible' : '',
				zoom && mode == 'center' ? 'u-animation-zoom' : ''
			]"
			@touchmove.stop.prevent
			@tap.stop.prevent
			:style="[style]"
		>
			<view class="u-mode-center-box" @tap.stop.prevent @touchmove.stop.prevent v-if="mode == 'center'" :style="[centerStyle]">
				<u-icon
					@click="close"
					v-if="closeable"
					class="u-close"
					:class="['u-close--' + closeIconPos]"
					:name="closeIcon"
					:color="closeIconColor"
					:size="closeIconSize"
				></u-icon>
				<scroll-view class="u-drawer__scroll-view" scroll-y="true">
					<slot />
				</scroll-view>
			</view>
			<scroll-view class="u-drawer__scroll-view" scroll-y="true" v-else>
				<slot />
			</scroll-view>
			<view @tap="close" class="u-close" :class="['u-close--' + closeIconPos]">
				<u-icon
					v-if="mode != 'center' && closeable"
					:name="closeIcon"
					:color="closeIconColor"
					:size="closeIconSize"
				></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * popup 彈窗
 * @description 彈出層容器，用於展示彈窗、信息提示等內容，支持上、下、左、右和中部彈出。組件只提供容器，內部內容由用戶自定義
 * @tutorial https://www.uviewui.com/components/popup.html
 * @property {String} mode 彈出方向（默認left）
 * @property {Boolean} mask 是否顯示遮罩（默認true）
 * @property {Stringr | Number} length mode=left | 見官網說明（默認auto）
 * @property {Boolean} zoom 是否開啟縮放動畫，只在mode為center時有效（默認true）
 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配（默認false）
 * @property {Boolean} mask-close-able 點擊遮罩是否可以關閉彈出層（默認true）
 * @property {Object} custom-style 用戶自定義樣式
 * @property {Stringr | Number} negative-top 中部彈出時，往上偏移的值
 * @property {Numberr | String} border-radius 彈窗圓角值（默認0）
 * @property {Numberr | String} z-index 彈出內容的z-index值（默認1075）
 * @property {Boolean} closeable 是否顯示關閉圖標（默認false）
 * @property {String} close-icon 關閉圖標的名稱，只能uView的內置圖標
 * @property {String} close-icon-pos 自定義關閉圖標位置（默認top-right）
 * @property {String} close-icon-color 關閉圖標的顏色（默認#909399）
 * @property {Number | String} close-icon-size 關閉圖標的大小，單位rpx（默認30）
 * @event {Function} open 彈出層打開
 * @event {Function} close 彈出層收起
 * @example <u-popup v-model="show"><view>出淤泥而不染，濯清漣而不妖</view></u-popup>
 */
export default {
	name: 'u-popup',
	props: {
		/**
		 * 顯示狀態
		 */
		show: {
			type: Boolean,
			default: false
		},
		/**
		 * 彈出方向，left|right|top|bottom|center
		 */
		mode: {
			type: String,
			default: 'left'
		},
		/**
		 * 是否顯示遮罩
		 */
		mask: {
			type: Boolean,
			default: true
		},
		// 抽屜的寬度(mode=left|right)，或者高度(mode=top|bottom)，單位rpx，或者"auto"
		// 或者百分比"50%"，表示由內容撐開高度或者寬度
		length: {
			type: [Number, String],
			default: 'auto'
		},
		// 是否開啟縮放動畫，只在mode=center時有效
		zoom: {
			type: Boolean,
			default: true
		},
		// 是否開啟底部安全區適配，開啟的話，會在iPhoneX機型底部添加一定的內邊距
		safeAreaInsetBottom: {
			type: Boolean,
			default: false
		},
		// 是否可以通過點擊遮罩進行關閉
		maskCloseAble: {
			type: Boolean,
			default: true
		},
		// 用戶自定義樣式
		customStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		value: {
			type: Boolean,
			default: false
		},
		// 此為內部參數，不在文檔對外使用，為了解決Picker和keyboard等融合了彈窗的組件
		// 對v-model雙向綁定多層調用造成報錯不能修改props值的問題
		popup: {
			type: Boolean,
			default: true
		},
		// 顯示顯示彈窗的圓角，單位rpx
		borderRadius: {
			type: [Number, String],
			default: 0
		},
		zIndex: {
			type: [Number, String],
			default: ''
		},
		// 是否顯示關閉圖標
		closeable: {
			type: Boolean,
			default: false
		},
		// 關閉圖標的名稱，只能uView的內置圖標
		closeIcon: {
			type: String,
			default: 'close'
		},
		// 自定義關閉圖標位置，top-left為左上角，top-right為右上角，bottom-left為左下角，bottom-right為右下角
		closeIconPos: {
			type: String,
			default: 'top-right'
		},
		// 關閉圖標的顏色
		closeIconColor: {
			type: String,
			default: '#909399'
		},
		// 關閉圖標的大小，單位rpx
		closeIconSize: {
			type: [String, Number],
			default: '30'
		},
		// 寬度，只對左，右，中部彈出時起作用，單位rpx，或者"auto"
		// 或者百分比"50%"，表示由內容撐開高度或者寬度，優先級高於length參數
		width: {
			type: String,
			default: ''
		},
		// 高度，只對上，下，中部彈出時起作用，單位rpx，或者"auto"
		// 或者百分比"50%"，表示由內容撐開高度或者寬度，優先級高於length參數
		height: {
			type: String,
			default: ''
		},
		// 給一個負的margin-top，往上偏移，避免和鍵盤重合的情況，僅在mode=center時有效
		negativeTop: {
			type: [String, Number],
			default: 0
		},
		// 遮罩的樣式，一般用於修改遮罩的透明度
		maskCustomStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		// 遮罩打開或收起的動畫過渡時間，單位ms
		duration: {
			type: [String, Number],
			default: 250
		}
	},
	data() {
		return {
			visibleSync: false,
			showDrawer: false,
			timer: null,
			closeFromInner: false, // value的值改變，是發生在內部還是外部
		};
	},
	computed: {
		// 根據mode的位置，設定其彈窗的寬度(mode = left|right)，或者高度(mode = top|bottom)
		style() {
			let style = {};
			// 如果是左邊或者上邊彈出時，需要給translate設置為負值，用於隱藏
			if (this.mode == 'left' || this.mode == 'right') {
				style = {
					width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
					height: '100%',
					transform: `translate3D(${this.mode == 'left' ? '-100%' : '100%'},0px,0px)`
				};
			} else if (this.mode == 'top' || this.mode == 'bottom') {
				style = {
					width: '100%',
					height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
					transform: `translate3D(0px,${this.mode == 'top' ? '-100%' : '100%'},0px)`
				};
			}
			style.zIndex = this.uZindex;
			// 如果用戶設置了borderRadius值，添加彈窗的圓角
			if (this.borderRadius) {
				switch (this.mode) {
					case 'left':
						style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
						break;
					case 'top':
						style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
						break;
					case 'right':
						style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
						break;
					case 'bottom':
						style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
						break;
					default:
				}
				// 不加可能圓角無效
				style.overflow = 'hidden';
			}
			if(this.duration) style.transition = `all ${this.duration / 1000}s linear`;
			return style;
		},
		// 中部彈窗的特有樣式
		centerStyle() {
			let style = {};
			style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
			// 中部彈出的模式，如果沒有設置高度，就用auto值，由內容撐開高度
			style.height = this.height ? this.getUnitValue(this.height) : 'auto';
			style.zIndex = this.uZindex;
			style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
			if (this.borderRadius) {
				style.borderRadius = `${this.borderRadius}rpx`;
				// 不加可能圓角無效
				style.overflow = 'hidden';
			}
			return style;
		},
		// 計算整理後的z-index值
		uZindex() {
			return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.open();
			} else if(!this.closeFromInner) {
				this.close();
			}
			this.closeFromInner = false;
		}
	},
	mounted() {
		// 組件渲染完成時，檢查value是否為true，如果是，彈出popup
		this.value && this.open();
	},
    methods: {
		// 判斷傳入的值，是否帶有單位，如果沒有，就默認用rpx單位
		getUnitValue(val) {
			if(/(%|px|rpx|auto)$/.test(val)) return val;
			else return val + 'rpx'
		},
		// 遮罩被點擊
		maskClick() {
			this.close();
		},
		close() {
			// 標記關閉是內部發生的，否則修改了value值，導致watch中對value檢測，導致再執行一遍close
			// 造成@close事件觸發兩次
			this.closeFromInner = true;
			this.change('showDrawer', 'visibleSync', false);
		},
		// 中部彈出時，需要.u-drawer-content將居中內容，此元素會鋪滿屏幕，點擊需要關閉彈窗
		// 讓其只在mode=center時起作用
		modeCenterClose(mode) {
			if (mode != 'center' || !this.maskCloseAble) return;
			this.close();
		},
		open() {
			this.change('visibleSync', 'showDrawer', true);
		},
		// 此處的原理是，關閉時先通過動畫隱藏彈窗和遮罩，再移除整個組件
		// 打開時，先渲染組件，延時一定時間再讓遮罩和彈窗的動畫起作用
		change(param1, param2, status) {
			// 如果this.popup為false，意味著為picker，actionsheet等組件調用了popup組件
			if (this.popup == true) {
				this.$emit('input', status);
			}
			this[param1] = status;
			if(status) {
				// #ifdef H5 || MP
				this.timer = setTimeout(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				}, 50);
				// #endif
				// #ifndef H5 || MP
				this.$nextTick(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				})
				// #endif
			} else {
				this.timer = setTimeout(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				}, this.duration);
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-drawer {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}

.u-drawer-content {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: absolute;
	z-index: 1003;
	transition: all 0.25s linear;
}

.u-drawer__scroll-view {
	width: 100%;
	height: 100%;
}

.u-drawer-left {
	top: 0;
	bottom: 0;
	left: 0;
	background-color: #ffffff;
}

.u-drawer-right {
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #ffffff;
}

.u-drawer-top {
	top: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
}

.u-drawer-bottom {
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
}

.u-drawer-center {
	@include vue-flex;
	flex-direction: column;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	justify-content: center;
	align-items: center;
	opacity: 0;
	z-index: 99999;
}

.u-mode-center-box {
	min-width: 100rpx;
	min-height: 100rpx;
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: relative;
	background-color: #ffffff;
}

.u-drawer-content-visible.u-drawer-center {
	transform: scale(1);
	opacity: 1;
}

.u-animation-zoom {
	transform: scale(1.15);
}

.u-drawer-content-visible {
	transform: translate3D(0px, 0px, 0px) !important;
}

.u-close {
	position: absolute;
	z-index: 3;
}

.u-close--top-left {
	top: 30rpx;
	left: 30rpx;
}

.u-close--top-right {
	top: 30rpx;
	right: 30rpx;
}

.u-close--bottom-left {
	bottom: 30rpx;
	left: 30rpx;
}

.u-close--bottom-right {
	right: 30rpx;
	bottom: 30rpx;
}
</style>
