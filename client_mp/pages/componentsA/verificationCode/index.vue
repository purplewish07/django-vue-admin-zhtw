<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-verification-code :keep-running="true" :seconds="seconds" @end="end" @start="start" ref="uCode" 
				@change="codeChange" :startText="startText" :changeText="changeText" 
				:endText="endText"></u-verification-code>
				<u-button @click="getCode">{{tips}}</u-button>
				<u-button :custom-style="{marginTop: '30rpx'}" @tap="reset" style="margin-top: 30rpx;">重置</u-button>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">倒計時間</view>
				<u-subsection vibrateShort :current="0" :list="['60s', '10s', '5s']" @change="secondsChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義提示語</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="textChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				seconds: 60,
				refCode: null,
				startText: '獲取驗證碼',
				changeText: 'X秒重新獲取',
				endText: '重新獲取'
			}
		},
		onReady() {
			// 注意這裡為錯誤示例，目前微信小程序最新穩定版開發工具如此
			// 賦值會報錯，很詭異，其他端無此問題
			// this.refCode = this.$refs.uCode;
		},
		methods: {
			codeChange(text) {
				// console.log(text);
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模擬向後端請求驗證碼
					uni.showLoading({
						title: '正在獲取驗證碼'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 這裡此提示會被this.start()方法中的提示覆蓋
						this.$u.toast('驗證碼已發送');
						// 通知驗證碼組件內部開始倒計時
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒計時結束後再發送');
				}
			},
			secondsChange(index) {
				this.seconds = index == 0 ? 60 : index == 1 ? 10 : 5;
			},
			textChange(index) {
				if(index == 0) {
					this.startText = '點一下獲取',
					this.changeText = '重新獲取Xs',
					this.endText = '再次獲取'
				} else {
					this.startText = '獲取驗證碼',
					this.changeText = 'X秒重新獲取',
					this.endText = '重新獲取'
				}
			},
			end() {
				this.$u.toast('倒計時結束');
			},
			start() {
				this.$u.toast('倒計時開始');
			},
			reset() {
				this.$refs.uCode.reset();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
