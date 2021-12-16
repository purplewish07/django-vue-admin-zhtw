<template>
	<view class="u-image" @tap="onClick" :style="[wrapStyle, backgroundStyle]">
		<image
			v-if="!isError"
			:src="src"
			:mode="mode"
			@error="onErrorHandler"
			@load="onLoadHandler"
			:lazy-load="lazyLoad"
			class="u-image__image"
			:style="{
				borderRadius: shape == 'circle' ? '50%' : $u.addUnit(borderRadius)
			}"
		></image>
		<view
			v-if="showLoading && loading"
			class="u-image__loading"
			:style="{
				borderRadius: shape == 'circle' ? '50%' : $u.addUnit(borderRadius),
				backgroundColor: this.bgColor
			}"
		>
			<slot v-if="$slots.loading" name="loading" />
			<u-icon v-else :name="loadingIcon" :width="width" :height="height"></u-icon>
		</view>
		<view
			v-if="showError && isError && !loading"
			class="u-image__error"
			:style="{
				borderRadius: shape == 'circle' ? '50%' : $u.addUnit(borderRadius)
			}"
		>
			<slot v-if="$slots.error" name="error" />
			<u-icon v-else :name="errorIcon" :width="width" :height="height"></u-icon>
		</view>
	</view>
</template>

<script>
/**
 * Image 圖片
 * @description 此組件為uni-app的image組件的加強版，在繼承了原有功能外，還支持淡入動畫、加載中、加載失敗提示、圓角值和形狀等。
 * @tutorial https://uviewui.com/components/image.html
 * @property {String} src 圖片地址
 * @property {String} mode 裁剪模式，見官網說明
 * @property {String | Number} width 寬度，單位任意，如果為數值，則為rpx單位（默認100%）
 * @property {String | Number} height 高度，單位任意，如果為數值，則為rpx單位（默認 auto）
 * @property {String} shape 圖片形狀，circle-圓形，square-方形（默認square）
 * @property {String | Number} border-radius 圓角值，單位任意，如果為數值，則為rpx單位（默認 0）
 * @property {Boolean} lazy-load 是否懶加載，僅微信小程序、App、百度小程序、字節跳動小程序有效（默認 true）
 * @property {Boolean} show-menu-by-longpress 是否開啟長按圖片顯示識別小程序碼菜單，僅微信小程序有效（默認 false）
 * @property {String} loading-icon 加載中的圖標，或者小圖片（默認 photo）
 * @property {String} error-icon 加載失敗的圖標，或者小圖片（默認 error-circle）
 * @property {Boolean} show-loading 是否顯示加載中的圖標或者自定義的slot（默認 true）
 * @property {Boolean} show-error 是否顯示加載錯誤的圖標或者自定義的slot（默認 true）
 * @property {Boolean} fade 是否需要淡入效果（默認 true）
 * @property {String Number} width 傳入圖片路徑時圖片的寬度
 * @property {String Number} height 傳入圖片路徑時圖片的高度
 * @property {Boolean} webp 只支持網絡資源，只對微信小程序有效（默認 false）
 * @property {String | Number} duration 搭配fade參數的過渡時間，單位ms（默認 500）
 * @event {Function} click 點擊圖片時觸發
 * @event {Function} error 圖片加載失敗時觸發
 * @event {Function} load 圖片加載成功時觸發
 * @example <u-image width="100%" height="300rpx" :src="src"></u-image>
 */
export default {
	name: 'u-image',
	props: {
		// 圖片地址
		src: {
			type: String,
			default: ''
		},
		// 裁剪模式
		mode: {
			type: String,
			default: 'aspectFill'
		},
		// 寬度，單位任意
		width: {
			type: [String, Number],
			default: '100%'
		},
		// 高度，單位任意
		height: {
			type: [String, Number],
			default: 'auto'
		},
		// 圖片形狀，circle-圓形，square-方形
		shape: {
			type: String,
			default: 'square'
		},
		// 圓角，單位任意
		borderRadius: {
			type: [String, Number],
			default: 0
		},
		// 是否懶加載，微信小程序、App、百度小程序、字節跳動小程序
		lazyLoad: {
			type: Boolean,
			default: true
		},
		// 開啟長按圖片顯示識別微信小程序碼菜單
		showMenuByLongpress: {
			type: Boolean,
			default: true
		},
		// 加載中的圖標，或者小圖片
		loadingIcon: {
			type: String,
			default: 'photo'
		},
		// 加載失敗的圖標，或者小圖片
		errorIcon: {
			type: String,
			default: 'error-circle'
		},
		// 是否顯示加載中的圖標或者自定義的slot
		showLoading: {
			type: Boolean,
			default: true
		},
		// 是否顯示加載錯誤的圖標或者自定義的slot
		showError: {
			type: Boolean,
			default: true
		},
		// 是否需要淡入效果
		fade: {
			type: Boolean,
			default: true
		},
		// 只支持網絡資源，只對微信小程序有效
		webp: {
			type: Boolean,
			default: false
		},
		// 過渡時間，單位ms
		duration: {
			type: [String, Number],
			default: 500
		},
		// 背景顏色，用於深色頁面加載圖片時，為了和背景色融合
		bgColor: {
			type: String,
			default: '#f3f4f6'
		}
	},
	data() {
		return {
			// 圖片是否加載錯誤，如果是，則顯示錯誤佔位圖
			isError: false,
			// 初始化組件時，默認為加載中狀態
			loading: true,
			// 不透明度，為了實現淡入淡出的效果
			opacity: 1,
			// 過渡時間，因為props的值無法修改，故需要一個中間值
			durationTime: this.duration,
			// 圖片加載完成時，去掉背景顏色，因為如果是png圖片，就會顯示灰色的背景
			backgroundStyle: {}
		};
	},
	watch: {
		src: {
			immediate: true,
			handler (n) {
				if(!n) {
					// 如果傳入null或者''，或者false，或者undefined，標記為錯誤狀態
					this.isError = true;
					this.loading = false;
				} else {
					this.isError = false;
				}
			}
		}
	},
	computed: {
		wrapStyle() {
			let style = {};
			// 通過調用addUnit()方法，如果有單位，如百分比，px單位等，直接返回，如果是純粹的數值，則加上rpx單位
			style.width = this.$u.addUnit(this.width);
			style.height = this.$u.addUnit(this.height);
			// 如果是配置了圓形，設置50%的圓角，否則按照默認的配置值
			style.borderRadius = this.shape == 'circle' ? '50%' : this.$u.addUnit(this.borderRadius);
			// 如果設置圓角，必須要有hidden，否則可能圓角無效
			style.overflow = this.borderRadius > 0 ? 'hidden' : 'visible';
			if (this.fade) {
				style.opacity = this.opacity;
				style.transition = `opacity ${Number(this.durationTime) / 1000}s ease-in-out`;
			}
			return style;
		}
	},
	methods: {
		// 點擊圖片
		onClick() {
			this.$emit('click');
		},
		// 圖片加載失敗
		onErrorHandler() {
			this.loading = false;
			this.isError = true;
			this.$emit('error');
		},
		// 圖片加載完成，標記loading結束
		onLoadHandler() {
			this.loading = false;
			this.isError = false;
			this.$emit('load');
			// 如果不需要動畫效果，就不執行下方代碼，同時移除加載時的背景顏色
			// 否則無需fade效果時，png圖片依然能看到下方的背景色
			if (!this.fade) return this.removeBgColor();
			// 原來opacity為1(不透明，是為了顯示佔位圖)，改成0(透明，意味著該元素顯示的是背景顏色，默認的灰色)，再改成1，是為了獲得過渡效果
			this.opacity = 0;
			// 這裡設置為0，是為了圖片展示到背景全透明這個過程時間為0，延時之後延時之後重新設置為duration，是為了獲得背景透明(灰色)
			// 到圖片展示的過程中的淡入效果
			this.durationTime = 0;
			// 延時50ms，否則在瀏覽器H5，過渡效果無效
			setTimeout(() => {
				this.durationTime = this.duration;
				this.opacity = 1;
				setTimeout(() => {
					this.removeBgColor();
				}, this.durationTime);
			}, 50);
		},
		// 移除圖片的背景色
		removeBgColor() {
			// 淡入動畫過渡完成後，將背景設置為透明色，否則png圖片會看到灰色的背景
			this.backgroundStyle = {
				backgroundColor: 'transparent'
			};
		}
	}
};
</script>

<style scoped lang="scss">
@import '../../libs/css/style.components.scss';

.u-image {
	position: relative;
	transition: opacity 0.5s ease-in-out;

	&__image {
		width: 100%;
		height: 100%;
	}

	&__loading,
	&__error {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		background-color: $u-bg-color;
		color: $u-tips-color;
		font-size: 46rpx;
	}
}
</style>
