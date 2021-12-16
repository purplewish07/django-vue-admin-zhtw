<template>
	<view
		@tap="click"
		class="u-cell"
		:class="{ 'u-border-bottom': borderBottom, 'u-border-top': borderTop, 'u-col-center': center, 'u-cell--required': required }"
		hover-stay-time="150"
		:hover-class="hoverClass"
		:style="{
			backgroundColor: bgColor
		}"
	>
		<u-icon :size="iconSize" :name="icon" v-if="icon" :custom-style="iconStyle" class="u-cell__left-icon-wrap"></u-icon>
		<view class="u-flex" v-else>
			<slot name="icon"></slot>
		</view>
		<view
			class="u-cell_title"
			:style="[
				{
					width: titleWidth ? titleWidth + 'rpx' : 'auto'
				},
				titleStyle
			]"
		>
			<block v-if="title">{{ title }}</block>
			<slot name="title" v-else></slot>

			<view class="u-cell__label" v-if="label || $slots.label" :style="[labelStyle]">
				<block v-if="label">{{ label }}</block>
				<slot name="label" v-else></slot>
			</view>
		</view>

		<view class="u-cell__value" :style="[valueStyle]">
			<block class="u-cell__value" v-if="value">{{ value }}</block>
			<slot v-else></slot>
		</view>
		<view class="u-flex u-cell_right" v-if="$slots['right-icon']">
			<slot name="right-icon"></slot>
		</view>
		<u-icon v-if="arrow" name="arrow-right" :style="[arrowStyle]" class="u-icon-wrap u-cell__right-icon-wrap"></u-icon>
	</view>
</template>

<script>
/**
 * cellItem 單元格Item
 * @description cell單元格一般用於一組列表的情況，比如個人中心頁，設置頁等。搭配u-cell-group使用
 * @tutorial https://www.uviewui.com/components/cell.html
 * @property {String} title 左側標題
 * @property {String} icon 左側圖標名，只支持uView內置圖標，見Icon 圖標
 * @property {Object} icon-style 左邊圖標的樣式，對像形式
 * @property {String} value 右側內容
 * @property {String} label 標題下方的描述信息
 * @property {Boolean} border-bottom 是否顯示cell的下邊框（默認true）
 * @property {Boolean} border-top 是否顯示cell的上邊框（默認false）
 * @property {Boolean} center 是否使內容垂直居中（默認false）
 * @property {String} hover-class 是否開啟點擊反饋，none為無效果（默認true）
 * // @property {Boolean} border-gap border-bottom為true時，Cell列表中間的條目的下邊框是否與左邊有一個間隔（默認true）
 * @property {Boolean} arrow 是否顯示右側箭頭（默認true）
 * @property {Boolean} required 箭頭方向，可選值（默認right）
 * @property {Boolean} arrow-direction 是否顯示左邊表示必填的星號（默認false）
 * @property {Object} title-style 標題樣式，對像形式
 * @property {Object} value-style 右側內容樣式，對像形式
 * @property {Object} label-style 標題下方描述信息的樣式，對像形式
 * @property {String} bg-color 背景顏色（默認transparent）
 * @property {String Number} index 用於在click事件回調中返回，標識當前是第幾個Item
 * @property {String Number} title-width 標題的寬度，單位rpx
 * @example <u-cell-item icon="integral-fill" title="會員等級" value="新版本"></u-cell-item>
 */
export default {
	name: 'u-cell-item',
	props: {
		// 左側圖標名稱(只能uView內置圖標)，或者圖標src
		icon: {
			type: String,
			default: ''
		},
		// 左側標題
		title: {
			type: [String, Number],
			default: ''
		},
		// 右側內容
		value: {
			type: [String, Number],
			default: ''
		},
		// 標題下方的描述信息
		label: {
			type: [String, Number],
			default: ''
		},
		// 是否顯示下邊框
		borderBottom: {
			type: Boolean,
			default: true
		},
		// 是否顯示上邊框
		borderTop: {
			type: Boolean,
			default: false
		},
		// 多個cell中，中間的cell顯示下劃線時，下劃線是否給一個到左邊的距離
		// 1.4.0版本廢除此參數，默認邊框由border-top和border-bottom提供，此參數會造成干擾
		// borderGap: {
		// 	type: Boolean,
		// 	default: true
		// },
		// 是否開啟點擊反饋，即點擊時cell背景為灰色，none為無效果
		hoverClass: {
			type: String,
			default: 'u-cell-hover'
		},
		// 是否顯示右側箭頭
		arrow: {
			type: Boolean,
			default: true
		},
		// 內容是否垂直居中
		center: {
			type: Boolean,
			default: false
		},
		// 是否顯示左邊表示必填的星號
		required: {
			type: Boolean,
			default: false
		},
		// 標題的寬度，單位rpx
		titleWidth: {
			type: [Number, String],
			default: ''
		},
		// 右側箭頭方向，可選值：right|up|down，默認為right
		arrowDirection: {
			type: String,
			default: 'right'
		},
		// 控制標題的樣式
		titleStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 右側顯示內容的樣式
		valueStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 描述信息的樣式
		labelStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 背景顏色
		bgColor: {
			type: String,
			default: 'transparent'
		},
		// 用於識別被點擊的是第幾個cell
		index: {
			type: [String, Number],
			default: ''
		},
		// 是否使用lable插槽
		useLabelSlot: {
			type: Boolean,
			default: false
		},
		// 左邊圖標的大小，單位rpx，只對傳入icon字段時有效
		iconSize: {
			type: [Number, String],
			default: 34
		},
		// 左邊圖標的樣式，對像形式
		iconStyle: {
			type: Object,
			default() {
				return {}
			}
		},
	},
	data() {
		return {

		};
	},
	computed: {
		arrowStyle() {
			let style = {};
			if (this.arrowDirection == 'up') style.transform = 'rotate(-90deg)';
			else if (this.arrowDirection == 'down') style.transform = 'rotate(90deg)';
			else style.transform = 'rotate(0deg)';
			return style;
		}
	},
	methods: {
		click() {
			this.$emit('click', this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
.u-cell {
	@include vue-flex;
	align-items: center;
	position: relative;
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	/* #endif */
	width: 100%;
	padding: 26rpx 32rpx;
	font-size: 28rpx;
	line-height: 54rpx;
	color: $u-content-color;
	background-color: #fff;
	text-align: left;
}

.u-cell_title {
	font-size: 28rpx;
}

.u-cell__left-icon-wrap {
	margin-right: 10rpx;
	font-size: 32rpx;
}

.u-cell__right-icon-wrap {
	margin-left: 10rpx;
	color: #969799;
	font-size: 28rpx;
}

.u-cell__left-icon-wrap,
.u-cell__right-icon-wrap {
	@include vue-flex;
	align-items: center;
	height: 48rpx;
}

.u-cell-border:after {
	position: absolute; 
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	content: ' ';
	pointer-events: none;
	border-bottom: 1px solid $u-border-color;
	/* #endif */
	right: 0;
	left: 0;
	top: 0;
	transform: scaleY(0.5);
}

.u-cell-border {
	position: relative;
}

.u-cell__label {
	margin-top: 6rpx;
	font-size: 26rpx;
	line-height: 36rpx;
	color: $u-tips-color;
	/* #ifndef APP-NVUE */
	word-wrap: break-word;
	/* #endif */
}

.u-cell__value {
	overflow: hidden;
	text-align: right;
	/* #ifndef APP-NVUE */
	vertical-align: middle;
	/* #endif */
	color: $u-tips-color;
	font-size: 26rpx;
}

.u-cell__title,
.u-cell__value {
	flex: 1;
}

.u-cell--required {
	/* #ifndef APP-NVUE */
	overflow: visible;
	/* #endif */
	@include vue-flex;
	align-items: center;
}

.u-cell--required:before {
	position: absolute;
	/* #ifndef APP-NVUE */
	content: '*';
	/* #endif */
	left: 8px;
	margin-top: 4rpx;
	font-size: 14px;
	color: $u-type-error;
}

.u-cell_right {
	line-height: 1;
}
</style>
