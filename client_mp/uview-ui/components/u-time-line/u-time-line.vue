<template>
	<view class="u-time-axis">
		<slot />
	</view>
</template>

<script>
	/**
	 * timeLine 時間軸
	 * @description 時間軸組件一般用於物流信息展示，各種跟時間相關的記錄等場景。
	 * @tutorial https://www.uviewui.com/components/timeLine.html
	 * @example <u-time-line></u-time-line>
	 */
	export default {
		name: "u-time-line",
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-time-axis {
		padding-left: 40rpx;
		position: relative;
	}

	.u-time-axis::before {
		content: " ";
		position: absolute;
		left: 0;
		top: 12rpx;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #ddd;
		transform-origin: 0 0;
		transform: scaleX(0.5);
	}
</style>
