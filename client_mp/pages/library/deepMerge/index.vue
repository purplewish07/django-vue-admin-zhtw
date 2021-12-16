<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					源對像1為："{info: {name: 'mary'}}"
					<view class="">
						
					</view>
					源對像2為："{info: {age: '22'}}"
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
				<view class="u-item-title">模式</view>
				<u-subsection vibrateShort :list="['淺拷貝', '深拷貝']" @change="modeChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj1: {
					info: {
						name: 'mary'
					}
				},
				obj2: {
					info: {
						age: '22'
					}
				},
				// obj1和obj3一樣，原因是Object.assign(this.obj1, this.obj2)會修改obj1的值
				obj3: {
					info: {
						name: 'mary'
					}
				},
				result: ''
			}
		},
		onLoad() {
			this.result = Object.assign(this.obj1, this.obj2);
			// 重新修改obj1為原來的值
			this.obj1 = this.$u.deepClone(this.obj3);
		},
		methods: {
			modeChange(index) {
				if(!index) {
					this.result = Object.assign(this.obj1, this.obj2);
					// 重新修改obj1為原來的值
					this.obj1 = this.$u.deepClone(this.obj3);
				} else {
					this.result = this.$u.deepMerge(this.obj1, this.obj2);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
