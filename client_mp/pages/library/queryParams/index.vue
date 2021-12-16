<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">源對像：{{JSON.stringify(params)}}</view>
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
				<view class="u-item-title">是否帶問號</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="prefixChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prefix: true,
				params: {
					name: '典韋',
					age: 32
				},
				result: ''
			}
		},
		onLoad() {
			this.getResult();
		},
		methods: {
			prefixChange(index) {
				this.prefix = index == 0 ? true : false;
				this.getResult();
			},
			async getResult() {
				this.result = this.$u.queryParams(this.params, this.prefix)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
