<template>
	<view class="u-wrap" :style="{
			  opacity: Number(opacity),
			  borderRadius: borderRadius + 'rpx',
			  // 因為time值需要改變,所以不直接用duration值(不能改變父組件prop傳過來的值)
			  transition: `opacity ${time / 1000}s ease-in-out`
		   }"
	 :class="'u-lazy-item-' + elIndex">
		<view :class="'u-lazy-item-' + elIndex">
			<image :style="{borderRadius: borderRadius + 'rpx', height: imgHeight}" v-if="!isError" class="u-lazy-item"
			 :src="isShow ? image : loadingImg" :mode="imgMode" @load="imgLoaded" @error="loadError" @tap="clickImg"></image>
			<image :style="{borderRadius: borderRadius + 'rpx', height: imgHeight}" class="u-lazy-item error" v-else :src="errorImg"
			 :mode="imgMode" @load="errorImgLoaded" @tap="clickImg"></image>
		</view>
	</view>
</template>

<script>
	/**
	 * lazyLoad 懶加載
	 * @description 懶加載使用的場景為：頁面有很多圖片時，APP會同時加載所有的圖片，導致頁面卡頓，各個位置的圖片出現前後不一致等.
	 * @tutorial https://www.uviewui.com/components/lazyLoad.html
	 * @property {String Number} index 用戶自定義值，在事件觸發時回調，用以區分是哪個圖片
	 * @property {String} image 圖片路徑
	 * @property {String} loading-img 預加載時的佔位圖
	 * @property {String} error-img 圖片加載出錯時的佔位圖
	 * @property {String} threshold 觸發加載時的位置，見上方說明，單位 rpx（默認300）
	 * @property {String Number} duration 圖片加載成功時，淡入淡出時間，單位ms（默認）
	 * @property {String} effect 圖片加載成功時，淡入淡出的css動畫效果（默認ease-in-out）
	 * @property {Boolean} is-effect 圖片加載成功時，是否啟用淡入淡出效果（默認true）
	 * @property {String Number} border-radius 圖片圓角值，單位rpx（默認0）
	 * @property {String Number} height 圖片高度，注意：實際高度可能受img-mode參數影響（默認450）
	 * @property {String Number} mg-mode 圖片的裁剪模式，詳見image組件裁剪模式（默認widthFix）
	 * @event {Function} click 點擊圖片時觸發
	 * @event {Function} load 圖片加載成功時觸發
	 * @event {Function} error 圖片加載失敗時觸發
	 * @example <u-lazy-load :image="image" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
	 */
	export default {
		name: 'u-lazy-load',
		props: {
			index: {
				type: [Number, String]
			},
			// 要顯示的圖片
			image: {
				type: String,
				default: ''
			},
			// 圖片裁剪模式
			imgMode: {
				type: String,
				default: 'widthFix'
			},
			// 佔位圖片路徑
			loadingImg: {
				type: String,
				default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM0QjNBQjkyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM0QjNBQkEyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzRCM0FCNzJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzRCM0FCODJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtRHfPcAAAAzUExURZWVldfX18PDw62trZubm9zc3Li4uKGhoebm5tLS0uHh4c3Nzaenp729vcjIyLKysuvr6141L40AAAcXSURBVHja7NzZlqpGAEBR5lG0//9rIw7IJKJi4or7PGTdtN10wr5SVAEGf/qqArsAiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAg+nmQFMi5Jis+sIniED23jSzIgLTtg2D//iYme/8QBM/9lQ+CAEhbNLM3N9hEHAThX7GPCiBfAxK1b51kD+R7QMLjXg7iCsgWIPUh7pfVozG791oeBPngm48G583uW5GkBvI+SBaM2xXDn1oqum423bX/mgF5FySc2cv93Voug9TdZotsggnkBZB2NzbhrSY5HnoG07jei8dvzsJB/c3W60SALILE46+WCztsbhPR7R2VJq0ukEcT49nyy8QhaKcRa3fYHZD4+ufqOJAcgDz8/59vtw1I3QP5K6JsOG0vm3hce4I8LQp/BaRZGJC3AAn7IKOKXbC+7EdA5vdmmVwOLksgRThqOqiH4XEGsht+peoPUE8U/jJIO5OLH4GEwUslV5G0PTBG5Uiw/Y2jyigO3l9HAHKv9PYb82LloH74dZBoBUgar+l48NsNvtD0fkez9iwrAvIYZDRCl+Xs149Hm/KZmQ+QjUCiO1ei4ru7EsgnQYrkznlQb7thCuRfAzlOAPN72427P4VA/i2Q/DKT/Ls/VR8fvIBsDZIuz7TPF6TCbnk4GJkB2RokejTjuE7/unlgCuSTIO0Cy+Plp6vDfnQlBchy8QtjSHVd3EgmK1bHLm+H6+nXYbz2DuQRSPnqoL7vvq0u70on4zvxgCyWD3b9UyDVdW24PaWaiGTnFZJwPIQAebDpIKheBIm7n124ZthMJipAlkqHO+IZkP1tbfzOJark/A7MgKyvvl60fRqkvXfhuow+t9+q00+0/yyBrK8ZngOtBzldhw2X9tvpNGty0gvkmbPeJ0Cy/r09s/stbmfo0yMWkEdjevgKyOn2t2pxv7UXoibTdCDLje9/Ww1ymqzn87dbp92242ZmMRjI8hASvwKSLq4udqN6ksw8nxXN3tszD9L8Gkg+2mFrQYql5az4tvFj5xOx4VwnSdeBtGdyPwUytxK77pBVlNHdO7OK3rh/eTPUvdutT3fO52tuHMqD4N7llv8pyOQQ//w19YVDfX27+Sfuby9/6nau4pdA8vEdOZuChEH/quHt0Jg+IRJ/5+PrHwKZXfjbDiS73Zo7mu5UkzX7uTsXe0e/7nC3ePf1O69+BUg2XDfZCqSqOu7rGVf8cHBe8zhC2b61dtUHXv0OkGo6ZL4JkpbRYXdUaFevivx2M/1GIOctNh949TtAoumQ+TpIHMX54CJu+8BDd8FkE5BqcZh/59XvAClmTvKfB0nDqIlHo3T70SftyW1eX9dXtgQJqs1f/Q6QaOa/7wmQKtxH8eiGoCRuovODIO3VxOMmruZbHrLyD7z6DSDtGyT7ew1kf9hNn07c986JTovzzem0Id9wUG+Vk/IDr34DSNR7huZJkMFT6vEhqrPx/j5cnlZML8N6/PAzh9Y99Flm5Yde/c9BquDOkvkKkMP58dA4qi9vivE8JOvGz/j8FokfPpr288+pH2ZPOZrLmeGD+7KOh6dqYWJ48ki7yUg0tz0go/fv/LLddfV3sgOLJyaGPY/zrSlh1a36Arkzoue9CyG35ze6E6/dzO2Ga0EGHqdRJIkfn9/8OEjTW8Vq91ZWh39FeehWA7Nu9ft8CpUEk1WWOyDF0OPyEU2Pnzf/bZC0P6IPzmAvu7KauQBVrgKpJ0tG2arHzX8e5Pb3PezNs/PrX+3JMyCLn9XXf37tPFHvt09WfCDDjx+yyn1/p1V11j7GnB/q3leLuVva79S/tzed+db08YpF4uOZtmz/9oXWMq6BCAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiAALELvqt/BBgACqVeUBXxcCkAAAAASUVORK5CYII='
			},
			// 加載失敗的錯誤佔位圖
			errorImg: {
				type: String,
				default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdDMjhENDYyQUQ2MTFFQTlDQ0VBODgxQjFFOEEyMEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdDMjhENDcyQUQ2MTFFQTlDQ0VBODgxQjFFOEEyMEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0MyOEQ0NDJBRDYxMUVBOUNDRUE4ODFCMUU4QTIwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0MyOEQ0NTJBRDYxMUVBOUNDRUE4ODFCMUU4QTIwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhLwhikAAAAzUExURZWVldfX162t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'
			},
			// 圖片進入可見區域前多少像素時，單位rpx，開始加載圖片
			// 負數為圖片超出屏幕底部多少距離後觸發懶加載，正數為圖片頂部距離屏幕底部多少距離時觸發(圖片還沒出現在屏幕上)
			threshold: {
				type: [Number, String],
				default: 100
			},
			// 淡入淡出動畫的過渡時間
			duration: {
				type: [Number, String],
				default: 500
			},
			// 渡效果的速度曲線，各個之間差別不大，因為這是淡入淡出，且時間很短，不是那些變形或者移動的情況，會明顯
			// linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
			effect: {
				type: String,
				default: 'ease-in-out'
			},
			// 是否使用過渡效果
			isEffect: {
				type: Boolean,
				default: true
			},
			// 圓角值
			borderRadius: {
				type: [Number, String],
				default: 0
			},
			// 圖片高度，單位rpx
			height: {
				type: [Number, String],
				default: '450'
			}
		},
		data() {
			return {
				isShow: false,
				opacity: 1,
				time: this.duration,
				loadStatus: '', // 默認是懶加載中的狀態
				isError: false, // 圖片加載失敗
				elIndex: this.$u.guid()
			}
		},
		computed: {
			// 將threshold從rpx轉為px
			getThreshold() {
				// 先取絕對值，因為threshold可能是負數，最後根據this.threshold是正數或者負數，重新還原
				let thresholdPx = uni.upx2px(Math.abs(this.threshold));
				return this.threshold < 0 ? -thresholdPx : thresholdPx;
			},
			// 計算圖片的高度，可能為auto，帶%，或者直接數值
			imgHeight() {
				return this.$u.addUnit(this.height);
			}
		},
		created() {
			// 由於一些特殊原因，不能將此變量放到data中定義
			this.observer = {};
		},
		watch: {
			isShow(nVal) {
				// 如果是不開啟過渡效果，直接返回
				if (!this.isEffect) return;
				this.time = 0;
				// 原來opacity為1(不透明，是為了顯示佔位圖)，改成0(透明，意味著該元素顯示的是背景顏色，默認的白色)，再改成1，是為了獲得過渡效果
				this.opacity = 0;
				// 延時30ms，否則在瀏覽器H5，過渡效果無效
				setTimeout(() => {
					this.time = this.duration;
					this.opacity = 1;
				}, 30)
			},
			// 圖片路徑發生變化時，需要重新標記一些變量，否則會一直卡在某一個狀態，比如isError
			image(n) {
				if(!n) {
					// 如果傳入null或者''，或者undefined，標記為錯誤狀態
					this.isError = true;
				} else {
					this.init();
					this.isError = false;
				}
			}
		},
		methods: {
			// 用於重新初始化
			init() {
				this.isError = false;
				this.loadStatus = '';
			},
			// 點擊圖片觸發的事件,loadlazy-還是懶加載中狀態，loading-圖片正在加載，loaded-圖片加加載完成
			clickImg() {
				let whichImg = '';
				// 如果isShow為false，意味著圖片還沒開始加載，點擊的只能是最開始的佔位圖
				if (this.isShow == false) whichImg = 'lazyImg';
				// 如果isError為true，意味著圖片加載失敗，這是只剩下錯誤的佔位圖，所以點擊的只能是錯誤佔位圖
				// 當然，也可以給錯誤的佔位圖元素綁定點擊事件，看你喜歡~
				else if (this.isError == true) whichImg = 'errorImg';
				// 總共三張圖片，除了兩個佔位圖，剩下的只能是正常的那張圖片了
				else whichImg = 'realImg';
				// 只通知當前圖片的index
				this.$emit('click', this.index);
			},
			// 圖片加載完成事件，可能是加載佔位圖時觸發，也可能是加載真正的圖片完成時觸發，通過isShow區分
			imgLoaded() {
				// 佔位圖加載完成
				if (this.loadStatus == '') {
					this.loadStatus = 'lazyed';
				}
				// 真正的圖片加載完成 
				else if (this.loadStatus == 'lazyed') {
					this.loadStatus = 'loaded';
					this.$emit('load', this.index);
				}
			},
			// 錯誤的圖片加載完成
			errorImgLoaded() {
				this.$emit('error', this.index);
			},
			// 圖片加載失敗
			loadError() {
				this.isError = true;
			},
			disconnectObserver(observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			},
		},
		beforeDestroy() {
			// 銷毀頁面時，可能還沒觸發某張很底部的懶加載圖片，所以把這個事件給去掉
			//observer.disconnect();
		},
		mounted() {
			// 此uOnReachBottom事件由mixin.js發出，目的是讓頁面到底時，保證所有圖片都進行加載，做到絕對穩定且可靠
			this.$nextTick(() => {
				uni.$once('uOnReachBottom', () => {
					if (!this.isShow) this.isShow = true;
				});
			})
			// mounted的時候，不一定掛載了這個元素，延時30ms，否則會報錯或者不報錯，但是也沒有效果
			setTimeout(() => {
				// 這裡是組件內獲取佈局狀態，不能用uni.createIntersectionObserver，而必須用this.createIntersectionObserver
				this.disconnectObserver('contentObserver');
				const contentObserver = uni.createIntersectionObserver(this);
				// 要理解這裡怎麼計算的，請看這個：
				// https://blog.csdn.net/qq_25324335/article/details/83687695
				contentObserver.relativeToViewport({
					bottom: this.getThreshold,
				}).observe('.u-lazy-item-' + this.elIndex, (res) => {
					if (res.intersectionRatio > 0) {
						// 懶加載狀態改變
						this.isShow = true;
						// 如果圖片已經加載，去掉監聽，減少性能的消耗
						this.disconnectObserver('contentObserver');
					}
				})
				this.contentObserver = contentObserver;
			}, 30)
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-wrap {
		background-color: #eee;
		overflow: hidden;
	}

	.u-lazy-item {
		width: 100%;
		// 騙系統開啟硬件加速
		transform: transition3d(0, 0, 0);
		// 防止圖片加載「閃一下」
		will-change: transform;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
</style>
