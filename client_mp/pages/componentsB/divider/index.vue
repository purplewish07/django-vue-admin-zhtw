<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-divider :type="type" :borderColor="borderColor" :bg-color="bgColor" @click="click"
				:half-width="halfWidth" :color="color" :font-size="fontSize">{{text}}</u-divider>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">提示內容</view>
				<u-subsection vibrateShort :list="['沒有更多了', '到底了']" @change="textChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">單邊線寬</view>
				<u-subsection vibrateShort current="1" :list="['50', '150', '250']" @change="halfWidthChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">橫線顏色</view>
				<u-subsection vibrateShort :list="['#dcdfe6', 'primary', 'error', 'warning', 'success']" @change="borderColorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">內容樣式</view>
				<u-subsection vibrateShort :list="['默認', '自定義']" @change="contentChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '沒有更多了',
				bgColor: '#fafafa',
				halfWidth: 150,
				borderColor: '#dcdfe6',
				type: 'primary',
				color: '#909399',
				fontSize: '26'
			}
		},
		methods: {
			textChange(index) {
				this.text = index == 0 ? '沒有更多了' : '到底了';
			},
			halfWidthChange(index) {
				this.halfWidth = index == 0 ? 50 : index == 1 ? 150 : 250;
			},
			borderColorChange(index) {
				if(index == 0) {
					this.borderColor = '#dcdfe6';
				} else {
					// 因為border-color參數優先級高於type，要讓type起作用，就需要設置border-color為空
					this.borderColor = '';
					this.type = index == 1 ? 'primary' : index == 2 ? 'error' : index == 3 ? 'warning' : 'success';
				}
			},
			contentChange(index) {
				if(index == 0) {
					 this.color = '#909399';
					 this.fontSize = 26;
				} else {
					this.color = this.$u.color['primary'];
					this.fontSize = 30;
				}
			},
			click() {
				console.log('click');
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {}
</style>
