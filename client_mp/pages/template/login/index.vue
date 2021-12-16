<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">歡迎登錄美團</view>
			<input class="u-border-bottom" type="number" v-model="tel" placeholder="請輸入手機號" />
			<view class="tips">未註冊的手機號驗證後自動創建美團賬號</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">獲取短信驗證碼</button>
			<view class="alternative">
				<view class="password">密碼登錄</view>
				<view class="issue">遇到問題</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view>
			<view class="hint">
				登錄代表同意
				<text class="link">美團點評用戶協議、隱私政策，</text>
				並授權使用您的美團點評賬號信息（如暱稱、頭像、收穫地址）以便您統一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tel: ''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.tel) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		submit() {
			if(this.$u.test.mobile(this.tel)) {
				this.$u.route({
					url: 'pages/template/login/code'
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
