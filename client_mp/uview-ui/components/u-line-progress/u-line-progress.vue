<template>
	<view class="u-progress" :style="{
		borderRadius: round ? '100rpx' : 0,
		height: height + 'rpx',
		backgroundColor: inactiveColor
	}">
		<view :class="[
			type ? `u-type-${type}-bg` : '',
			striped ? 'u-striped' : '',
			striped && stripedActive ? 'u-striped-active' : ''
		]" class="u-active" :style="[progressStyle]">
			<slot v-if="$slots.default || $slots.$default" />
			<block v-else-if="showPercent">
				{{percent + '%'}}
			</block>
		</view>
	</view>
</template>

<script>
	/**
	 * lineProgress 線型進度條
	 * @description 展示操作或任務的當前進度，比如上傳文件，是一個線形的進度條。
	 * @tutorial https://www.uviewui.com/components/lineProgress.html
	 * @property {String Number} percent 進度條百分比值，為數值類型，0-100
	 * @property {Boolean} round 進度條兩端是否為半圓（默認true）
	 * @property {String} type 如設置，active-color值將會失效
	 * @property {String} active-color 進度條激活部分的顏色（默認#19be6b）
	 * @property {String} inactive-color 進度條的底色（默認#ececec）
	 * @property {Boolean} show-percent 是否在進度條內部顯示當前的百分比值數值（默認true）
	 * @property {String Number} height 進度條的高度，單位rpx（默認28）
	 * @property {Boolean} striped 是否顯示進度條激活部分的條紋（默認false）
	 * @property {Boolean} striped-active 條紋是否具有動態效果（默認false）
	 * @example <u-line-progress :percent="70" :show-percent="true"></u-line-progress>
	 */
	export default {
		name: "u-line-progress",
		props: {
			// 兩端是否顯示半圓形
			round: {
				type: Boolean,
				default: true
			},
			// 主題顏色
			type: {
				type: String,
				default: ''
			},
			// 激活部分的顏色
			activeColor: {
				type: String,
				default: '#19be6b'
			},
			inactiveColor: {
				type: String,
				default: '#ececec'
			},
			// 進度百分比，數值
			percent: {
				type: Number,
				default: 0
			},
			// 是否在進度條內部顯示百分比的值
			showPercent: {
				type: Boolean,
				default: true
			},
			// 進度條的高度，單位rpx
			height: {
				type: [Number, String],
				default: 28
			},
			// 是否顯示條紋
			striped: {
				type: Boolean,
				default: false
			},
			// 條紋是否顯示活動狀態
			stripedActive: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		computed: {
			progressStyle() {
				let style = {};
				style.width = this.percent + '%';
				if(this.activeColor) style.backgroundColor = this.activeColor;
				return style;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-progress {
		overflow: hidden;
		height: 15px;
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		align-items: center;
		width: 100%;
		border-radius: 100rpx;
	}

	.u-active {
		width: 0;
		height: 100%;
		align-items: center;
		@include vue-flex;
		justify-items: flex-end;
		justify-content: space-around;
		font-size: 20rpx;
		color: #ffffff;
		transition: all 0.4s ease;
	}

	.u-striped {
		background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
		background-size: 39px 39px;
	}

	.u-striped-active {
		animation: progress-stripes 2s linear infinite;
	}

	@keyframes progress-stripes {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: 39px 0;
		}
	}
</style>
