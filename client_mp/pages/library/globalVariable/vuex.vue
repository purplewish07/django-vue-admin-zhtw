<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					此處為演示vuex全局變量的使用
				</view>
				<view class="u-demo-result-line">
					{{vuex_demo}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">修改vuex變量為如下值</view>
				<u-subsection vibrateShort :list="['墨綠', '黛藍', '淺紫']" @change="vuexChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			vuexChange(index) {
				let val = index == 0 ? '墨綠' : index == 1 ? '黛藍' : '淺紫';
				// 通過this.$u.vuex使用，方法見uView文檔
				this.$u.vuex('vuex_demo', val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>