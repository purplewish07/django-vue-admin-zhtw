<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here" style="text-align: left;">
					此處演示為通過JS調用框架內置顏色值，此外還可以通過scss變量調用。
				</view>
				<view class="u-demo-result-line" :style="{color: color, backgroundColor: '#ffffff'}">
					曉鏡但愁雲鬢改，夜吟應覺月光寒
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題</view>
				<u-subsection vibrateShort :list="['primary', 'success', 'error', 'warning', 'info']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">常用顏色</view>
				<u-subsection vibrateShort :list="['主要文字', '常規文字', '次要文字', '佔位文字', '邊框顏色']" @change="colorChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: this.$u.color['primary'],
			}
		},
		methods: {
			modeChange(index) {
				let colorName = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning'  : 'info';
				this.color = this.$u.color[colorName];
			},
			colorChange(index) {
				this.color = index == 0 ? '#303133' : index == 1 ? '#606266' : index == 2 ? '#909399' : index == 3 ? '#c0c4cc' : '#e4e7ed';
			},
			getResult() {
				this.result = this.$u.trim(this.string, this.pos);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
