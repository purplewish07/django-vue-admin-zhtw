<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-top-tips ref="uTips"></u-top-tips>
				<text class="u-no-demo-here">點擊參數配置查看效果</text>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題選擇</view>
				<u-subsection vibrateShort :list="['primary', 'success', 'error', 'warning', 'info']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顯示時間</view>
				<u-subsection vibrateShort current="1" :list="['長', '正常', '短']" @change="durationChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				duration: 2000,
				title: '忽如一夜春風來，千樹萬樹梨花開',
				type: 'primary'
			}
		},
		methods: {
			showTips() {
				this.$refs.uTips.show({
					duration: this.duration,
					title: this.title,
					type: this.type
				});
			},
			typeChange(index) {
				this.type = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning'  : 'info';
				this.showTips();
			},
			durationChange(index) {
				this.duration = index == 0 ? 4000 : index == 1 ? 2000 : 500;
				this.showTips();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>