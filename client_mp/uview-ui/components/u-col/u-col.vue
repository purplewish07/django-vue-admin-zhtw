<template>
	<view class="u-col" :class="[
		'u-col-' + span
	]" :style="{
		padding: `0 ${Number(gutter)/2 + 'rpx'}`,
		marginLeft: 100 / 12 * offset + '%',
		flex: `0 0 ${100 / 12 * span}%`,
		alignItems: uAlignItem,
		justifyContent: uJustify,
		textAlign: textAlign
	}"
	 @tap="click">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * col 佈局單元格
	 * @description 通過基礎的 12 分欄，迅速簡便地創建佈局（搭配<u-row>使用）
	 * @tutorial https://www.uviewui.com/components/layout.html
	 * @property {String Number} span 柵格佔據的列數，總12等分（默認0）
	 * @property {String} text-align 文字水平對齊方式（默認left）
	 * @property {String Number} offset 分欄左邊偏移，計算方式與span相同（默認0）
	 * @example <u-col span="3"><view class="demo-layout bg-purple"></view></u-col>
	 */
	export default {
		name: "u-col",
		props: {
			// 占父容器寬度的多少等分，總分為12份
			span: {
				type: [Number, String],
				default: 12
			},
			// 指定柵格左側的間隔數(總12欄)
			offset: {
				type: [Number, String],
				default: 0
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
			// 文字對齊方式
			textAlign: {
				type: String,
				default: 'left'
			},
			// 是否阻止事件傳播
			stop: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				gutter: 20, // 給col添加間距，左右邊距各佔一半，從父組件u-row獲取
			}
		},
		created() {
			this.parent = false;
		},
		mounted() {
			// 獲取父組件實例，並賦值給對應的參數
			this.parent = this.$u.$parent.call(this, 'u-row');
			if (this.parent) {
				this.gutter = this.parent.gutter;
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

	.u-col {
		/* #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO */
		float: left;
		/* #endif */
	}

	.u-col-0 {
		width: 0;
	}

	.u-col-1 {
		width: calc(100%/12);
	}

	.u-col-2 {
		width: calc(100%/12 * 2);
	}

	.u-col-3 {
		width: calc(100%/12 * 3);
	}

	.u-col-4 {
		width: calc(100%/12 * 4);
	}

	.u-col-5 {
		width: calc(100%/12 * 5);
	}

	.u-col-6 {
		width: calc(100%/12 * 6);
	}

	.u-col-7 {
		width: calc(100%/12 * 7);
	}

	.u-col-8 {
		width: calc(100%/12 * 8);
	}

	.u-col-9 {
		width: calc(100%/12 * 9);
	}

	.u-col-10 {
		width: calc(100%/12 * 10);
	}

	.u-col-11 {
		width: calc(100%/12 * 11);
	}

	.u-col-12 {
		width: calc(100%/12 * 12);
	}
</style>
