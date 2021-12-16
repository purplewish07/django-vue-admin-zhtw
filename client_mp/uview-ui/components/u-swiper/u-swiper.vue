<template>
	<view class="u-swiper-wrap" :style="{
		borderRadius: `${borderRadius}rpx`
	}">
		<swiper :current="elCurrent" @change="change" @animationfinish="animationfinish" :interval="interval" :circular="circular" :duration="duration" :autoplay="autoplay"
		 :previous-margin="effect3d ? effect3dPreviousMargin + 'rpx' : '0'" :next-margin="effect3d ? effect3dPreviousMargin + 'rpx' : '0'"
		 :style="{
				height: height + 'rpx',
				backgroundColor: bgColor
			}">
			<swiper-item class="u-swiper-item" v-for="(item, index) in list" :key="index">
				<view class="u-list-image-wrap" @tap.stop.prevent="listClick(index)" :class="[uCurrent != index ? 'u-list-scale' : '']" :style="{
						borderRadius: `${borderRadius}rpx`,
						transform: effect3d && uCurrent != index ? 'scaleY(0.9)' : 'scaleY(1)',
						margin: effect3d && uCurrent != index ? '0 20rpx' : 0,
					}">
					<image class="u-swiper-image" :src="item[name] || item" :mode="imgMode"></image>
					<view v-if="title && item.title" class="u-swiper-title u-line-1" :style="[{
							'padding-bottom': titlePaddingBottom
						}, titleStyle]">
						{{ item.title }}
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="u-swiper-indicator" :style="{
				top: indicatorPos == 'topLeft' || indicatorPos == 'topCenter' || indicatorPos == 'topRight' ? '12rpx' : 'auto',
				bottom: indicatorPos == 'bottomLeft' || indicatorPos == 'bottomCenter' || indicatorPos == 'bottomRight' ? '12rpx' : 'auto',
				justifyContent: justifyContent,
				padding: `0 ${effect3d ? '74rpx' : '24rpx'}`
			}">
			<block v-if="mode == 'rect'">
				<view class="u-indicator-item-rect" :class="{ 'u-indicator-item-rect-active': index == uCurrent }" v-for="(item, index) in list"
				 :key="index"></view>
			</block>
			<block v-if="mode == 'dot'">
				<view class="u-indicator-item-dot" :class="{ 'u-indicator-item-dot-active': index == uCurrent }" v-for="(item, index) in list"
				 :key="index"></view>
			</block>
			<block v-if="mode == 'round'">
				<view class="u-indicator-item-round" :class="{ 'u-indicator-item-round-active': index == uCurrent }" v-for="(item, index) in list"
				 :key="index"></view>
			</block>
			<block v-if="mode == 'number'">
				<view class="u-indicator-item-number">{{ uCurrent + 1 }}/{{ list.length }}</view>
			</block>
		</view>
	</view>
</template>

<script>
	/**
	 * swiper 輪播圖
	 * @description 該組件一般用於導航輪播，廣告展示等場景,可開箱即用
	 * @tutorial https://www.uviewui.com/components/swiper.html
	 * @property {Array} list 輪播圖數據，見官網"基本使用"說明
	 * @property {Boolean} title 是否顯示標題文字，需要配合list參數，見官網說明（默認false）
	 * @property {String} mode 指示器模式，見官網說明（默認round）
	 * @property {String Number} height 輪播圖組件高度，單位rpx（默認250）
	 * @property {String} indicator-pos 指示器的位置（默認bottomCenter）
	 * @property {Boolean} effect3d 是否開啟3D效果（默認false）
	 * @property {Boolean} autoplay 是否自動播放（默認true）
	 * @property {String Number} interval 自動輪播時間間隔，單位ms（默認2500）
	 * @property {Boolean} circular 是否銜接播放，見官網說明（默認true）
	 * @property {String} bg-color 背景顏色（默認#f3f4f6）
	 * @property {String Number} border-radius 輪播圖圓角值，單位rpx（默認8）
	 * @property {Object} title-style 自定義標題樣式
	 * @property {String Number} effect3d-previous-margin mode = true模式的情況下，激活項與前後項之間的距離，單位rpx（默認50）
	 * @property {String} img-mode 圖片的裁剪模式，詳見image組件裁剪模式（默認aspectFill）
	 * @event {Function} click 點擊輪播圖時觸發
	 * @example <u-swiper :list="list" mode="dot" indicator-pos="bottomRight"></u-swiper>
	 */
	export default {
		name: "u-swiper",
		props: {
			// 輪播圖的數據,格式如：[{image: 'xxxx', title: 'xxxx'}，{image: 'yyyy', title: 'yyyy'}]，其中title字段可選
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否顯示title標題
			title: {
				type: Boolean,
				default: false
			},
			// 用戶自定義的指示器的樣式
			indicator: {
				type: Object,
				default () {
					return {};
				}
			},
			// 圓角值
			borderRadius: {
				type: [Number, String],
				default: 8
			},
			// 隔多久自動切換
			interval: {
				type: [String, Number],
				default: 3000
			},
			// 指示器的模式，rect|dot|number|round
			mode: {
				type: String,
				default: 'round'
			},
			// list的高度，單位rpx
			height: {
				type: [Number, String],
				default: 250
			},
			// 指示器的位置，topLeft|topCenter|topRight|bottomLeft|bottomCenter|bottomRight
			indicatorPos: {
				type: String,
				default: 'bottomCenter'
			},
			// 是否開啟縮放效果
			effect3d: {
				type: Boolean,
				default: false
			},
			// 3D模式的情況下，激活item與前後item之間的距離，單位rpx
			effect3dPreviousMargin: {
				type: [Number, String],
				default: 50
			},
			// 是否自動播放
			autoplay: {
				type: Boolean,
				default: true
			},
			// 自動輪播時間間隔，單位ms
			duration: {
				type: [Number, String],
				default: 500
			},
			// 是否銜接滑動，即到最後一張時接著滑動，是否自動切換到第一張
			circular: {
				type: Boolean,
				default: true
			},
			// 圖片的裁剪模式 
			imgMode: {
				type: String,
				default: 'aspectFill'
			},
			// 從list數組中讀取的圖片的屬性名
			name: {
				type: String,
				default: 'image'
			},
			// 背景顏色
			bgColor: {
				type: String,
				default: '#f3f4f6'
			},
			// 初始化時，默認顯示第幾項
			current: {
				type: [Number, String],
				default: 0
			},
			// 標題的樣式，對像形式
			titleStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		watch: {
			// 如果外部的list發生變化，判斷長度是否被修改，如果前後長度不一致，重置uCurrent值，避免溢出
			list(nVal, oVal) {
				if(nVal.length !== oVal.length) this.uCurrent = 0;
			},
			// 監聽外部current的變化，實時修改內部依賴於此測uCurrent值，如果更新了current，而不是更新uCurrent，
			// 就會錯亂，因為指示器是依賴於uCurrent的
			current(n) {
				this.uCurrent = n;
			}
		},
		data() {
			return {
				uCurrent: this.current // 當前活躍的swiper-item的index
			};
		},
		computed: {
			justifyContent() {
				if (this.indicatorPos == 'topLeft' || this.indicatorPos == 'bottomLeft') return 'flex-start';
				if (this.indicatorPos == 'topCenter' || this.indicatorPos == 'bottomCenter') return 'center';
				if (this.indicatorPos == 'topRight' || this.indicatorPos == 'bottomRight') return 'flex-end';
			},
			titlePaddingBottom() {
				let tmp = 0;
				if (this.mode == 'none') return '12rpx';
				if (['bottomLeft', 'bottomCenter', 'bottomRight'].indexOf(this.indicatorPos) >= 0 && this.mode == 'number') {
					tmp = '60rpx';
				} else if (['bottomLeft', 'bottomCenter', 'bottomRight'].indexOf(this.indicatorPos) >= 0 && this.mode != 'number') {
					tmp = '40rpx';
				} else {
					tmp = '12rpx';
				}
				return tmp;
			},
			// 因為uni的swiper組件的current參數只接受Number類型，這裡做一個轉換
			elCurrent() {
				return Number(this.current);
			}
		},
		methods: {
			listClick(index) {
				this.$emit('click', index);
			},
			change(e) {
				let current = e.detail.current;
				this.uCurrent = current;
				// 發出change事件，表示當前自動切換的index，從0開始
				this.$emit('change', current);
			},
			// 頭條小程序不支持animationfinish事件，改由change事件
			// 暫不監聽此事件，因為不再給swiper綁定uCurrent屬性
			animationfinish(e) {
				// #ifndef MP-TOUTIAO
				// this.uCurrent = e.detail.current;
				// #endif
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-swiper-wrap {
		position: relative;
		overflow: hidden;
		transform: translateY(0);
	}

	.u-swiper-image {
		width: 100%;
		will-change: transform;
		height: 100%;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		/* #ifdef H5 */
		pointer-events: none;
		/* #endif */
	}

	.u-swiper-indicator {
		padding: 0 24rpx;
		position: absolute;
		@include vue-flex;
		width: 100%;
		z-index: 1;
	}

	.u-indicator-item-rect {
		width: 26rpx;
		height: 8rpx;
		margin: 0 6rpx;
		transition: all 0.5s;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.u-indicator-item-rect-active {
		background-color: rgba(255, 255, 255, 0.8);
	}

	.u-indicator-item-dot {
		width: 14rpx;
		height: 14rpx;
		margin: 0 6rpx;
		border-radius: 20rpx;
		transition: all 0.5s;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.u-indicator-item-dot-active {
		background-color: rgba(255, 255, 255, 0.8);
	}

	.u-indicator-item-round {
		width: 14rpx;
		height: 14rpx;
		margin: 0 6rpx;
		border-radius: 20rpx;
		transition: all 0.5s;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.u-indicator-item-round-active {
		width: 34rpx;
		background-color: rgba(255, 255, 255, 0.8);
	}

	.u-indicator-item-number {
		padding: 6rpx 16rpx;
		line-height: 1;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 100rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.u-list-scale {
		transform-origin: center center;
	}

	.u-list-image-wrap {
		width: 100%;
		height: 100%;
		flex: 1;
		transition: all 0.5s;
		overflow: hidden;
		box-sizing: content-box;
		position: relative;
	}

	.u-swiper-title {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 28rpx;
		padding: 12rpx 24rpx;
		color: rgba(255, 255, 255, 0.9);
	}

	.u-swiper-item {
		@include vue-flex;
		overflow: hidden;
		align-items: center;
	}
</style>
