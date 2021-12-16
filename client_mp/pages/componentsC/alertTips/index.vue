<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-alert-tips @close="close" :closeAble="closeAble" :show="show" @click="click"
				:type="type" :title="title" :description="description" :showIcon="showIcon"></u-alert-tips>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">左側圖標</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="showIconChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">關閉圖標</view>
				<u-subsection vibrateShort current="1" :list="['顯示', '隱藏']" @change="closeAbleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題</view>
				<u-subsection vibrateShort current="3" :list="['primary', 'success', 'error', 'warning', 'info']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :current="current" :list="['開啟', '關閉']" @change="showChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '大漠孤煙直，長河落日圓',
				description: "月落烏啼霜滿天，江楓漁火對愁眠。姑蘇城外寒山寺，夜半鐘聲到客船。飛流直下三千尺，疑是銀河落九天！",
				show: true,
				closeAble: false,
				showIcon: false,
				type: 'warning',
			}
		},
		computed: {
			current() {
				return this.show ? 0 : 1;
			}
		},
		methods: {
			showIconChange(index) {
				this.showIcon = index == 0 ? true : false;
			},
			showChange(index) {
				this.show = index == 0 ? true : false;
			},
			closeAbleChange(index) {
				this.closeAble = index == 0 ? true : false;
			},
			typeChange(index) {
				this.type = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning'  : 'info';
			},
			close() {
				this.show = false;
				this.$refs.uToast.show({
					type: 'warning',
					title: '點擊關閉按鈕'
				})
			},
			click() {
				this.$refs.uToast.show({
					type: 'warning',
					title: '點擊內容'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}
	
	.item {
		margin: 30rpx 0;
	}
</style>
