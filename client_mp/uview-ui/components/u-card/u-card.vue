<template>
	<view
		class="u-card"
		@tap.stop="click"
		:class="{ 'u-border': border, 'u-card-full': full, 'u-card--border': borderRadius > 0 }"
		:style="{
			borderRadius: borderRadius + 'rpx',
			margin: margin,
			boxShadow: boxShadow
		}"
	>
		<view
			v-if="showHead"
			class="u-card__head"
			:style="[{padding: padding + 'rpx'}, headStyle]"
			:class="{
				'u-border-bottom': headBorderBottom
			}"
			@tap="headClick"
		>
			<view v-if="!$slots.head" class="u-flex u-row-between">
				<view class="u-card__head--left u-flex u-line-1" v-if="title">
					<image
						:src="thumb"
						class="u-card__head--left__thumb"
						mode="aspectfull"
						v-if="thumb"
						:style="{ 
							height: thumbWidth + 'rpx', 
							width: thumbWidth + 'rpx', 
							borderRadius: thumbCircle ? '100rpx' : '6rpx' 
						}"
					></image>
					<text
						class="u-card__head--left__title u-line-1"
						:style="{
							fontSize: titleSize + 'rpx',
							color: titleColor
						}"
					>
						{{ title }}
					</text>
				</view>
				<view class="u-card__head--right u-line-1" v-if="subTitle">
					<text
						class="u-card__head__title__text"
						:style="{
							fontSize: subTitleSize + 'rpx',
							color: subTitleColor
						}"
					>
						{{ subTitle }}
					</text>
				</view>
			</view>
			<slot name="head" v-else />
		</view>
		<view @tap="bodyClick" class="u-card__body" :style="[{padding: padding + 'rpx'}, bodyStyle]"><slot name="body" /></view>
		<view
			v-if="showFoot"
			class="u-card__foot"
			 @tap="footClick"
			:style="[{padding: $slots.foot ? padding + 'rpx' : 0}, footStyle]"
			:class="{
				'u-border-top': footBorderTop
			}"
		>
			<slot name="foot" />
		</view>
	</view>
</template>

<script>
/**
 * card 卡片
 * @description 卡片組件一般用於多個列表條目，且風格統一的場景
 * @tutorial https://www.uviewui.com/components/card.html
 * @property {Boolean} full 卡片與屏幕兩側是否留空隙（默認false）
 * @property {String} title 頭部左邊的標題
 * @property {String} title-color 標題顏色（默認#303133）
 * @property {String | Number} title-size 標題字體大小，單位rpx（默認30）
 * @property {String} sub-title 頭部右邊的副標題
 * @property {String} sub-title-color 副標題顏色（默認#909399）
 * @property {String | Number} sub-title-size 副標題字體大小（默認26）
 * @property {Boolean} border 是否顯示邊框（默認true）
 * @property {String | Number} index 用於標識點擊了第幾個卡片
 * @property {String} box-shadow 卡片外圍陰影，字符串形式（默認none）
 * @property {String} margin 卡片與屏幕兩邊和上下元素的間距，需帶單位，如"30rpx 20rpx"（默認30rpx）
 * @property {String | Number} border-radius 卡片整體的圓角值，單位rpx（默認16）
 * @property {Object} head-style 頭部自定義樣式，對像形式
 * @property {Object} body-style 中部自定義樣式，對像形式
 * @property {Object} foot-style 底部自定義樣式，對像形式
 * @property {Boolean} head-border-bottom 是否顯示頭部的下邊框（默認true）
 * @property {Boolean} foot-border-top 是否顯示底部的上邊框（默認true）
 * @property {Boolean} show-head 是否顯示頭部（默認true）
 * @property {Boolean} show-head 是否顯示尾部（默認true）
 * @property {String} thumb 縮略圖路徑，如設置將顯示在標題的左邊，不建議使用相對路徑
 * @property {String | Number} thumb-width 縮略圖的寬度，高等於寬，單位rpx（默認60）
 * @property {Boolean} thumb-circle 縮略圖是否為圓形（默認false）
 * @event {Function} click 整個卡片任意位置被點擊時觸發
 * @event {Function} head-click 卡片頭部被點擊時觸發
 * @event {Function} body-click 卡片主體部分被點擊時觸發
 * @event {Function} foot-click 卡片底部部分被點擊時觸發
 * @example <u-card padding="30" title="card"></u-card>
 */
export default {
	name: 'u-card',
	props: {
		// 與屏幕兩側是否留空隙
		full: {
			type: Boolean,
			default: false
		},
		// 標題
		title: {
			type: String,
			default: ''
		},
		// 標題顏色
		titleColor: {
			type: String,
			default: '#303133'
		},
		// 標題字體大小，單位rpx
		titleSize: {
			type: [Number, String],
			default: '30'
		},
		// 副標題
		subTitle: {
			type: String,
			default: ''
		},
		// 副標題顏色
		subTitleColor: {
			type: String,
			default: '#909399'
		},
		// 副標題字體大小，單位rpx
		subTitleSize: {
			type: [Number, String],
			default: '26'
		},
		// 是否顯示外部邊框，只對full=false時有效(卡片與邊框有空隙時)
		border: {
			type: Boolean,
			default: true
		},
		// 用於標識點擊了第幾個
		index: {
			type: [Number, String, Object],
			default: ''
		},
		// 用於隔開上下左右的邊距，帶單位的寫法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx"
		margin: {
			type: String,
			default: '30rpx'
		},
		// card卡片的圓角
		borderRadius: {
			type: [Number, String],
			default: '16'
		},
		// 頭部自定義樣式，對像形式
		headStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 主體自定義樣式，對像形式
		bodyStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 底部自定義樣式，對像形式
		footStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 頭部是否下邊框
		headBorderBottom: {
			type: Boolean,
			default: true
		},
		// 底部是否有上邊框
		footBorderTop: {
			type: Boolean,
			default: true
		},
		// 標題左邊的縮略圖
		thumb: {
			type: String,
			default: ''
		},
		// 縮略圖寬高，單位rpx
		thumbWidth: {
			type: [String, Number],
			default: '60'
		},
		// 縮略圖是否為圓形
		thumbCircle: {
			type: Boolean,
			default: false
		},
		// 給head，body，foot的內邊距
		padding: {
			type: [String, Number],
			default: '30'
		},
		// 是否顯示頭部
		showHead: {
			type: Boolean,
			default: true
		},
		// 是否顯示尾部
		showFoot: {
			type: Boolean,
			default: true
		},
		// 卡片外圍陰影，字符串形式
		boxShadow: {
			type: String,
			default: 'none'
		}
	},
	data() {
		return {};
	},
	methods: {
		click() {
			this.$emit('click', this.index);
		},
		headClick() {
			this.$emit('head-click', this.index);
		},
		bodyClick() {
			this.$emit('body-click', this.index);
		},
		footClick() {
			this.$emit('foot-click', this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
	
.u-card {
	position: relative;
	overflow: hidden;
	font-size: 28rpx;
	background-color: #ffffff;
	box-sizing: border-box;
	
	&-full {
		// 如果是與屏幕之間不留空隙，應該設置左右邊距為0
		margin-left: 0 !important;
		margin-right: 0 !important;
		width: 100%;
	}
	
	&--border:after {
		border-radius: 16rpx;
	}

	&__head {
		&--left {
			color: $u-main-color;
			
			&__thumb {
				margin-right: 16rpx;
			}
			
			&__title {
				max-width: 400rpx;
			}
		}

		&--right {
			color: $u-tips-color;
			margin-left: 6rpx;
		}
	}

	&__body {
		color: $u-content-color;
	}

	&__foot {
		color: $u-tips-color;
	}
}
</style>
