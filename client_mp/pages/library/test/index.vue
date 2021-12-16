<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<view class="u-no-demo-here" style="text-align: left;">
					這裡僅對部分驗證規則進行演示，目前總的驗證規則有如下：
				</view>
				<u-table style="margin-top: 20rpx;">
					<u-tr>
						<u-td>郵箱號</u-td>
						<u-td>手機號</u-td>
						<u-td>URL</u-td>
						<u-td>普通日期</u-td>
					</u-tr>
					<u-tr>
						<u-td>十進制數</u-td>
						<u-td>身份證號</u-td>
						<u-td>車牌號</u-td>
						<u-td>金額</u-td>
					</u-tr>
					<u-tr>
						<u-td>漢字</u-td>
						<u-td>字母</u-td>
						<u-td>字母|數字</u-td>
						<u-td>包含值</u-td>
					</u-tr>
					<u-tr>
						<u-td>數值範圍</u-td>
						<u-td>長度範圍</u-td>
						<u-td width="50%"></u-td>
					</u-tr>
				</u-table>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">郵箱</view>
				<u-subsection vibrateShort :list="email" @change="emailChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">手機號</view>
				<u-subsection vibrateShort :list="mobile" @change="mobileChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">中文</view>
				<u-subsection vibrateShort :list="chinese" @change="chineseChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">整數</view>
				<u-subsection vibrateShort :list="digits" @change="digitsChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: ['google@gmail.com', 'google艾特gmail.com'],
				mobile: ['13478561273', '0778-3423082'],
				chinese: ['天青色等煙雨', 'Beat it'],
				digits: [283, '下雨的聲音']
			}
		},
		methods: {
			toast(type) {
				this.$refs.uToast.show({
					type: type ? 'success' : 'error',
					title: type ? '驗證通過' : '驗證失敗'
				})
			},
			emailChange(index)  {
				this.toast(this.$u.test.email(this.email[index]));
			},
			mobileChange(index) {
				this.toast(this.$u.test.mobile(this.mobile[index]));
			},
			chineseChange(index) {
				this.toast(this.$u.test.chinese(this.chinese[index]));
			},
			digitsChange(index) {
				this.toast(this.$u.test.digits(this.digits[index]));
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
