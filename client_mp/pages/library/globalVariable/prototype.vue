<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here" style="text-align: left;">
					此處為演示定義在main.js中的"Vue.prototype"全局變量的使用，它不是動態響應的，修改後本頁面和上一個頁面的值，都不會自動刷新
				</view>
				<view class="u-demo-result-line">
					{{vuePrototype}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">修改vuePrototype為如下值</view>
				<u-subsection vibrateShort :list="['鵝黃', '橙黃', '茶綠']" @change="vuePrototypeChange"></u-subsection>
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
			
		},
		methods: {
			vuePrototypeChange(index) {
				// 你會發現，此處修改/main.js中通過Vue.prototype綁定的值，它是靜態的
				// 此頁面修改後，返回上一個頁面，無法全局響應
				this.vuePrototype = index == 0 ? '鵝黃' : index == 1 ? '橙黃' : '茶綠';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
