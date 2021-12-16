<template>
	<view class="u-row" :style="{
			alignItems: uAlignItem,
			justifyContent: uJustify
		}"
		@tap="click"
	>
		<slot />
	</view>
</template>

<script>
	/**
	 * row 行佈局
	 * @description 通過基礎的 12 分欄，迅速簡便地創建佈局。
	 * @tutorial https://www.uviewui.com/components/layout.html#row-props
	 * @property {String Number} gutter 柵格間隔，左右各為此值的一半，單位rpx（默認0）
	 * @property {String} justify 水平排列方式(微信小程序暫不支持)默認（start(或flex-start)）
	 * @property {String} align 垂直排列方式（默認center）
	 * @example <u-row gutter="16"></u-row>
	 */
	export default {
		name: "u-row",
		props: {
			// 給col添加間距，左右邊距各佔一半
			gutter: {
				type: [String, Number],
				default: 20
			},
			// 水平排列方式，可選值為`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
			justify: {
				type: String,
				default: 'start'
			},
			// 垂直對齊方式，可選值為top、center、bottom
			align: {
				type: String,
				default: 'center'
			},
			// 是否阻止事件傳播
			stop: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			uJustify() {
				if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify;
				else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify;
				else return this.justify;
			},
			uAlignItem() {
				if (this.align == 'top') return 'flex-start';
				if (this.align == 'bottom') return 'flex-end';
				else return this.align;
			}
		},
		methods: {
			click(e) {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-row {
		// 由於微信小程序編譯後奇怪的頁面結構，只能使用float佈局實現，flex無法實現
		/* #ifndef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
		@include vue-flex;
		/* #endif */
		flex-wrap: wrap;
	}

	.u-row:after {
		/* #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
		display: table;
		clear: both;
		content: "";
		/* #endif */
	}
</style>
