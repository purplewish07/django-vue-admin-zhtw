<template>
	<view class="u-divider" :style="{
		height: height == 'auto' ? 'auto' : height + 'rpx',
		backgroundColor: bgColor,
		marginBottom: marginBottom + 'rpx',
		marginTop: marginTop + 'rpx'
	}" @tap="click">
		<view class="u-divider-line" :class="[type ? 'u-divider-line--bordercolor--' + type : '']" :style="[lineStyle]"></view>
		<view v-if="useSlot" class="u-divider-text" :style="{
			color: color,
			fontSize: fontSize + 'rpx'
		}"><slot /></view>
		<view class="u-divider-line" :class="[type ? 'u-divider-line--bordercolor--' + type : '']" :style="[lineStyle]"></view>
	</view>
</template>

<script>
/**
 * divider 分割線
 * @description 區隔內容的分割線，一般用於頁面底部"沒有更多"的提示。
 * @tutorial https://www.uviewui.com/components/divider.html
 * @property {String Number} half-width 文字左或右邊線條寬度，數值或百分比，數值時單位為rpx
 * @property {String} border-color 線條顏色，優先級高於type（默認#dcdfe6）
 * @property {String} color 文字顏色（默認#909399）
 * @property {String Number} fontSize 字體大小，單位rpx（默認26）
 * @property {String} bg-color 整個divider的背景顏色（默認呢#ffffff）
 * @property {String Number} height 整個divider的高度，單位rpx（默認40）
 * @property {String} type 將線條設置主題色（默認primary）
 * @property {Boolean} useSlot 是否使用slot傳入內容，如果不傳入，中間不會有空隙（默認true）
 * @property {String Number} margin-top 與前一個組件的距離，單位rpx（默認0）
 * @property {String Number} margin-bottom 與後一個組件的距離，單位rpx（0）
 * @event {Function} click divider組件被點擊時觸發
 * @example <u-divider color="#fa3534">長河落日圓</u-divider>
 */
export default {
	name: 'u-divider',
	props: {
		// 單一邊divider橫線的寬度(數值)，單位rpx。或者百分比
		halfWidth: {
			type: [Number, String],
			default: 150
		},
		// divider橫線的顏色，如設置，
		borderColor: {
			type: String,
			default: '#dcdfe6'
		},
		// 主題色，可以是primary|info|success|warning|error之一值
		type: {
			type: String,
			default: 'primary'
		},
		// 文字顏色
		color: {
			type: String,
			default: '#909399'
		},
		// 文字大小，單位rpx
		fontSize: {
			type: [Number, String],
			default: 26
		},
		// 整個divider的背景顏色
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		// 整個divider的高度單位rpx
		height: {
			type: [Number, String],
			default: 'auto'
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
		// 是否使用slot傳入內容，如果不用slot傳入內容，先的中間就不會有空隙
		useSlot: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		lineStyle() {
			let style = {};
			if(String(this.halfWidth).indexOf('%') != -1) style.width = this.halfWidth;
			else style.width = this.halfWidth + 'rpx';
			// borderColor優先級高於type值
			if(this.borderColor) style.borderColor = this.borderColor;
			return style;
		}
	},
	methods: {
		click() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
.u-divider {
	width: 100%;
	position: relative;
	text-align: center;
	@include vue-flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex-direction: row;
}

.u-divider-line {
	border-bottom: 1px solid $u-border-color;
	transform: scale(1, 0.5);
	transform-origin: center;
	
	&--bordercolor--primary {
		border-color: $u-type-primary;
	}
	
	&--bordercolor--success {
		border-color: $u-type-success;
	}
	
	&--bordercolor--error {
		border-color: $u-type-primary;
	}
	
	&--bordercolor--info {
		border-color: $u-type-info;
	}
	
	&--bordercolor--warning {
		border-color: $u-type-warning;
	}
}

.u-divider-text {
	white-space: nowrap;
	padding: 0 16rpx;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
}
</style>
