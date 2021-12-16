<template>
	<view class="u-section">
		<view class="u-section__title" :style="{
			fontWeight: bold ? 'bold' : 'normal',
			color: color,
			fontSize: fontSize + 'rpx',
			paddingLeft: showLine ? (fontSize * 0.7) + 'rpx' : 0
		}" :class="{
			'u-section--line': showLine
		}">
			<view class="u-section__title__icon-wrap u-flex" :style="[lineStyle]" v-if="showLine">
				<u-icon top="0" name="column-line" :size="fontSize * 1.25" bold :color="lineColor ? lineColor : color"></u-icon>
			</view>
			<text class="u-flex u-section__title__text">{{title}}</text>
		</view>
		<view class="u-section__right-info" v-if="right || $slots.right" :style="{
			color: subColor
		}" @tap="rightClick"> 
			<slot name="right" v-if="$slots.right" />
			<block v-else>
				{{subTitle}}
				<view class="u-section__right-info__icon-arrow u-flex" v-if="arrow">
					<u-icon name="arrow-right" size="24" :color="subColor"></u-icon>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	/**
	 * section 查看更多
	 * @description 該組件一般用於分類信息有很多，但是限於篇幅只能列出一部分，讓用戶通過"查看更多"獲得更多信息的場景，實際效果見演示。
	 * @tutorial https://www.uviewui.com/components/section.html
	 * @property {String} title 左邊主標題
	 * @property {String} sub-title 右邊副標題（默認更多）
	 * @property {Boolean} right 是否顯示右邊的內容（默認true）
	 * @property {Boolean} showLine 是否顯示左邊的豎條（默認true）
	 * @property {Boolean} arrow 是否顯示右邊箭頭（默認true）
	 * @property {String Number} font-size 主標題的字體大小（默認28）
	 * @property {Boolean} bold 主標題是否加粗（默認true）
	 * @property {String} color 主標題顏色（默認#303133）
	 * @event {Function} click 組件右側的內容被點擊時觸發，用於跳轉"更多"
	 * @example <u-section title="今日熱門" :right="false"></u-section>
	 */
	export default {
		name: "u-section",
		props: {
			// 標題信息
			title: {
				type: String,
				default: ''
			},
			// 右邊副標題內容
			subTitle: {
				type: String,
				default: '更多'
			},
			// 是否顯示右邊的內容
			right: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: [Number, String],
				default: 28
			},
			// 主標題是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// 主標題的顏色
			color: {
				type: String,
				default: '#303133'
			},
			// 右邊副標題的顏色
			subColor: {
				type: String,
				default: '#909399'
			},
			// 是否顯示左邊的豎條
			showLine: {
				type: Boolean,
				default: true
			},
			// 左邊豎線的顏色
			lineColor: {
				type: String,
				default: ''
			},
			// 是否顯示右邊箭頭
			arrow: {
				type: Boolean,
				default: true
			},
		},
		computed: {
			// 左邊豎條的樣式
			lineStyle() {
				// 由於安卓和iOS的，需要稍微調整絕對定位的top值，才能讓左邊的豎線和右邊的文字垂直居中
				return {
					// 由於豎線為字體圖標，具有比實際線寬更寬的寬度，所以也需要根據字體打下動態調整
					left: -(Number(this.fontSize) * 0.9) + 'rpx',
					top: -(Number(this.fontSize) * (this.$u.os() == 'ios' ? 0.14 : 0.15)) + 'rpx',
				}
			}
		},
		methods: {
			rightClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-section {
		@include vue-flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		
		&__title {
			position: relative;
			font-size: 28rpx;
			padding-left: 20rpx;
			@include vue-flex;
			align-items: center;
			
			&__icon-wrap {
				position: absolute;
			}
			
			&__text {
				line-height: 1;
			}
		}
		
		&__right-info {
			color: $u-tips-color;
			font-size: 26rpx;
			@include vue-flex;
			align-items: center;
			
			&__icon-arrow {
				margin-left: 6rpx;
			}
		}
	}
</style>
