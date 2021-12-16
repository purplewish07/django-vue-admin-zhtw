<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area u-flex u-row-center">
				<!-- 頭條小程序因為兼容性，必須要給組件寫上u-line類 -->
				<u-line class="u-line" :border-style="borderStyle" color="red" :color="color" :length="length" :direction="direction" :hair-line="hairLine"></u-line>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顏色</view>
				<u-subsection vibrateShort :list="['primary', 'success', 'warning', 'error', 'info']" @change="colorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">線條類型</view>
				<u-subsection vibrateShort :list="['實線', '方形虛線', '圓點虛線']" @change="borderStyleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">細邊</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="hairLineChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">方向</view>
				<u-subsection vibrateShort :list="['水平', '垂直']" @change="directionChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				direction: 'row',
				hairLine: true,
				length: '100%',
				color: this.$u.color['primary'],
				borderStyle: 'solid'
			}
		},
		methods: {
			colorChange(index) {
				this.color = this.$u.color[['primary', 'success', 'warning', 'error', 'info'][index]];
			},
			hairLineChange(index) {
				this.hairLine = !index;
			},
			directionChange(index) {
				this.direction = index == 0 ? 'row' : 'col';
				if(index == 0) this.length = '100%';
				else this.length = '50rpx';
			},
			borderStyleChange(index) {
				this.borderStyle = ['solid', 'dashed', 'dotted'][index];
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		
	}
</style>
