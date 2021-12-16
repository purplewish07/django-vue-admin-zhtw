<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-button @click="showAction">喚起ActionSheet</u-button>
				<u-action-sheet :cancel-btn="cancel" :mask-close-able="maskClick" :tips="tips" 
				@click="click" :list="list" v-model="show" :safe-area-inset-bottom="true"></u-action-sheet>
			</view> 
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">取消按鈕</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="cancelChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">點擊遮罩關閉</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="maskClickChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '最是人間留不住',
				}, {
					text: '朱顏辭鏡花辭樹',
					disabled: true
				}, {
					text: '正是江南好風景',
					subText: '春江水暖鴨先知'
				}, {
					text: '落花時節又逢君'
				}],
				tips: {
					text: ''
				},
				show: false,
				cancel: true,
				maskClick: true
			}
		},
		methods: {
			showAction() {
				this.show = true;
			},
			click(index) {
				this.$refs.uToast.show({
					type: 'success',
					title: '點擊了第' + (index + 1) + '項'
				})
			},
			tipsChange(index) {
				if(index == 0) this.show = true;
				this.tips.text = index == 0 ? '請謹慎執行您的操作' : ''
			},
			cancelChange(index) {
				this.show = true;
				this.cancel = index == 0 ? true : false
			},
			maskClickChange(index) {
				if(index == 1) this.cancel = true;
				this.show = true;
				this.maskClick = index == 0 ? true : false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}
</style>
