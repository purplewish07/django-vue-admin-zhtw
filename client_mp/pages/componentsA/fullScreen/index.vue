<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					通過壓窗屏打開的模態框，可以遮蓋頂部原生的導航欄和底部tabbar欄。
					注意：壓窗屏只對APP有效，其他端無效。
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :current="current" :list="['打開', '關閉']" @change="openModal"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1
			}
		},
		onShow() {
			this.$nextTick(() => {
				this.current = 1;
			})
		},
		methods: {
			openModal(index) {
				// 可以傳遞參數
				if(index == 0) {
					this.$u.route("/uview-ui/components/u-full-screen/u-full-screen?id=1");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
