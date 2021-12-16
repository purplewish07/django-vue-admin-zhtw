<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">輸入驗證碼</view>
			<view class="tips">驗證碼已發送至 +150****9320</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">驗證碼錯誤，請重新輸入</text>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到驗證碼點這裡</text>
				<text :class="{ regain: !show }">{{ second }}秒後重新獲取驗證碼</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			maxlength: 4,
			value: '',
			second: 3,
			show: false,
			error: false
		};
	},
	computed: {},
	onLoad() {
		// this.getCaptcha()
		let interval = setInterval(() => {
			this.second--;
			if (this.second <= 0) {
				this.show = true;
				if (this.value.lenth != 4) {
					this.error = true;
				}
				clearInterval(interval);
			}
		}, 1000);
	},
	methods: {
		// 收不到驗證碼選擇時的選擇
		noCaptcha() {
			uni.showActionSheet({
				itemList: ['重新獲取驗證碼', '接聽語音驗證碼'],
				success: function(res) {
					
				},
				fail: function(res) {
					
				}
			});
		},
		// change事件偵聽
		change(value) {
			// console.log('change', value);
		},
		// 輸入完驗證碼最後一位執行
		finish(value) {
			// console.log('finish', value);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
