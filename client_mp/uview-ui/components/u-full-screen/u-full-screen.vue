<template>
	<u-modal v-model="show" :show-cancel-button="true" confirm-text="升級" title="發現新版本" @cancel="cancel" @confirm="confirm">
		<view class="u-update-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: `
					1. 修復badge組件的size參數無效問題<br>
					2. 新增Modal模態框組件<br>
					3. 新增壓窗屏組件，可以在APP上以彈窗的形式遮蓋導航欄和底部tabbar<br>
					4. 修復鍵盤組件在微信小程序上遮罩無效的問題
				`,
			}
		},
		onReady() {
			this.show = true;
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				this.closeModal();
			},
			closeModal() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-full-content {
		background-color: #00C777;
	}
	
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
</style>
