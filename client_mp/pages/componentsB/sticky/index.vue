<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-sticky :offset-top="offsetTop" :enable="enable" @fixed="fixed" @unfixed="unfixed">
					<view class="sticky">
						寶劍鋒從磨礪出,梅花香自苦寒來
					</view>
				</u-sticky>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">吸頂高度</view>
				<u-subsection vibrateShort :list="[0, 120, 200]" @change="offsetTopChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :list="['允許吸頂', '禁止吸頂']" @change="enableChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offsetTop: 0,
				enable: true,
			}
		},
		methods: {
			offsetTopChange(index) {
				this.offsetTop = index == 0 ? 0 : index == 1 ? 120 : 200;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
			enableChange(index) {
				this.enable = index == 0 ? true : false;
			},
			fixed() {
				this.$refs.uToast.show({
					type: 'warning',
					title: '觸發吸頂'
				})
			},
			unfixed() {
				this.$refs.uToast.show({
					type: 'success',
					title: '取消吸頂'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo-area {
		overflow: hidden;
	}
	
	.u-config-wrap {
		height: 200vh;
	}
	
	.u-demo-title {
		margin-bottom: 140rpx;
	}
	
	.sticky {
		background-color: $u-type-primary;
		color: #fff;
		padding: 24rpx;
		margin: auto;
		font-size: 28rpx;
		line-height: 1;
		border-radius: 5px;
	}
</style>
