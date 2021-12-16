<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					此處為演示globalData全局變量的使用，需手動更新
				</view>
				<view class="u-demo-result-line">
					{{result}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">修改globalData為如下值</view>
				<u-subsection vibrateShort :list="['雅藍', '皓白', '橘黃']" @change="globalDataChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: null
			}
		},
		onShow() {
			// 對globalData的使用，應在onShow生命週期，而不是onLoad生命週期
			this.result = getApp().globalData.username;
		},
		methods: {
			globalDataChange(index) {
				getApp().globalData.username = index == 0 ? '雅藍' : index == 1 ? '皓白' : '橘黃';
				// 在此改變了globalData，想要再次觸發本頁內容更細，還必須手動操作
				this.result = getApp().globalData.username;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
