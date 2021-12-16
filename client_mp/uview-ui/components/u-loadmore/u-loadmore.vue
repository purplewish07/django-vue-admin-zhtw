<template>
	<view class="u-load-more-wrap" :style="{
		backgroundColor: bgColor,
		marginBottom: marginBottom + 'rpx',
		marginTop: marginTop + 'rpx',
		height: $u.addUnit(height)
	}">
		<u-line color="#d4d4d4" length="50"></u-line>
		<!-- 加載中和沒有更多的狀態才顯示兩邊的橫線 -->
		<view :class="status == 'loadmore' || status == 'nomore' ? 'u-more' : ''" class="u-load-more-inner">
			<view class="u-loadmore-icon-wrap">
				<u-loading class="u-loadmore-icon" :color="iconColor" :mode="iconType == 'circle' ? 'circle' : 'flower'" :show="status == 'loading' && icon"></u-loading>
			</view>
			<!-- 如果沒有更多的狀態下，顯示內容為dot（粗點），加載特定樣式 -->
			<view class="u-line-1" :style="[loadTextStyle]" :class="[(status == 'nomore' && isDot == true) ? 'u-dot-text' : 'u-more-text']" @tap="loadMore">
				{{ showText }}
			</view>
		</view>
		<u-line color="#d4d4d4" length="50"></u-line>
	</view>
</template>

<script>
	/**
	 * loadmore 加載更多
	 * @description 此組件一般用於標識頁面底部加載數據時的狀態。
	 * @tutorial https://www.uviewui.com/components/loadMore.html
	 * @property {String} status 組件狀態（默認loadmore）
	 * @property {String} bg-color 組件背景顏色，在頁面是非白色時會用到（默認#ffffff）
	 * @property {Boolean} icon 加載中時是否顯示圖標（默認true）
	 * @property {String} icon-type 加載中時的圖標類型（默認circle）
	 * @property {String} icon-color icon-type為circle時有效，加載中的動畫圖標的顏色（默認#b7b7b7）
	 * @property {Boolean} is-dot status為nomore時，內容顯示為一個"●"（默認false）
	 * @property {String} color 字體顏色（默認#606266）
	 * @property {String Number} margin-top 到上一個相鄰元素的距離
	 * @property {String Number} margin-bottom 到下一個相鄰元素的距離
	 * @property {Object} load-text 自定義顯示的文字，見上方說明示例
	 * @event {Function} loadmore status為loadmore時，點擊組件會發出此事件
	 * @example <u-loadmore :status="status" icon-type="iconType" load-text="loadText" />
	 */
	export default {
		name: "u-loadmore",
		props: {
			// 組件背景色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// 是否顯示加載中的圖標
			icon: {
				type: Boolean,
				default: true
			},
			// 字體大小
			fontSize: {
				type: String,
				default: '28'
			},
			// 字體顏色
			color: {
				type: String, 
				default: '#606266'
			},
			// 組件狀態，loadmore-加載前的狀態，loading-加載中的狀態，nomore-沒有更多的狀態
			status: {
				type: String,
				default: 'loadmore'
			},
			// 加載中狀態的圖標，flower-花朵狀圖標，circle-圓圈狀圖標
			iconType: {
				type: String,
				default: 'circle'
			},
			// 顯示的文字
			loadText: {
				type: Object,
				default () {
					return {
						loadmore: '加載更多',
						loading: '正在加載...',
						nomore: '沒有更多了'
					}
				}
			},
			// 在「沒有更多」狀態下，是否顯示粗點
			isDot: {
				type: Boolean,
				default: false
			},
			// 加載中顯示圓圈動畫時，動畫的顏色
			iconColor: {
				type: String,
				default: '#b7b7b7'
			},
			// 上邊距
			marginTop: {
				type: [String, Number],
				default: 0
			},
			// 下邊距
			marginBottom: {
				type: [String, Number],
				default: 0
			},
			// 高度，單位rpx
			height: {
				type: [String, Number],
				default: 'auto'
			}
		},
		data() {
			return {
				// 粗點
				dotText: "●"
			}
		},
		computed: {
			// 加載的文字顯示的樣式
			loadTextStyle() {
				return {
					color: this.color,
					fontSize: this.fontSize + 'rpx',
					position: 'relative',
					zIndex: 1,
					backgroundColor: this.bgColor,
					// 如果是加載中狀態，動畫和文字需要距離近一點
				}
			},
			// 加載中圓圈動畫的樣式
			cricleStyle() {
				return {
					borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
				}
			},
			// 加載中花朵動畫形式
			// 動畫由base64圖片生成，暫不支持修改
			flowerStyle() {
				return {
				}
			},
			// 顯示的提示文字
			showText() {
				let text = '';
				if(this.status == 'loadmore') text = this.loadText.loadmore;
				else if(this.status == 'loading') text = this.loadText.loading;
				else if(this.status == 'nomore' && this.isDot) text = this.dotText;
				else text = this.loadText.nomore;
				return text;
			}
		},
		methods: {
			loadMore() {
				// 只有在「加載更多」的狀態下才發送點擊事件，內容不滿一屏時無法觸發底部上拉事件，所以需要點擊來觸發
				if(this.status == 'loadmore') this.$emit('loadmore');
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	/* #ifdef MP */
	// 在mp.scss中，賦予了u-line為flex: 1，這裡需要一個明確的長度，所以重置掉它
	// 在組件內部，把組件名(u-line)當做選擇器，在微信開發工具會提示不合法，但不影響使用
	u-line {
		flex: none;
	}
	/* #endif */
	
	.u-load-more-wrap {
		@include vue-flex;
		justify-content: center;
		align-items: center;
	}
	
	.u-load-more-inner {
		@include vue-flex;
		justify-content: center;
		align-items: center;
		padding: 0 12rpx;
	}
	
	.u-more {
		position: relative;
		@include vue-flex;
		justify-content: center;
	}
	
	.u-dot-text {
		font-size: 28rpx;
	}
	
	.u-loadmore-icon-wrap {
		margin-right: 8rpx;
	}
	
	.u-loadmore-icon {
		@include vue-flex;
		align-items: center;
		justify-content: center;
	}
</style>
