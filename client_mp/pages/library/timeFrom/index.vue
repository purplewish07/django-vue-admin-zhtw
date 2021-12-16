<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<view class="u-no-demo-here" style="text-align: left;">
					根據當前時間，返回類似"剛剛，5分鐘前，8小時前，3天前"等字樣
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
				<view class="u-item-title">時間</view>
				<u-subsection vibrateShort :list="timeArr1" @change="timeArr1Change"></u-subsection>
				<u-gap></u-gap>
				<u-subsection vibrateShort style="margin-top: 40rpx;" :list="timeArr2" @change="timeArr2Change"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			// 微信小程序無法動態修改u-subsection的list參數，導致onLoad中賦值timeArr1，timeArr2無效，故在data中直接賦值
			let nowTime = Number(+ new Date());
			let threeDayAgo = nowTime - 2 * 86400000;
			let arr1 = [0, 0], arr2 = [0, 0];
			[0, 0].map((val, index) => {
				arr1[index] = this.$u.timeFormat(this.$u.random(threeDayAgo, nowTime), 'yyyy/mm/dd hh:MM:ss');
				arr2[index] = this.$u.timeFormat(this.$u.random(threeDayAgo, nowTime), 'yyyy/mm/dd hh:MM:ss');
			})
			return {
				timeArr1: arr1,
				timeArr2: arr2,
				result: null
			}
		},
		onLoad() {
			this.timeArr1Change(0);
		},
		methods: {
			timeArr1Change(index) {
				this.result = this.$u.timeFrom((new Date(this.timeArr1[index])).getTime());
			},
			timeArr2Change(index) {
				this.result = this.$u.timeFrom((new Date(this.timeArr2[index])).getTime());
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
