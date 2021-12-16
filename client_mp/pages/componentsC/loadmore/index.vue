<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast" />
				<u-loadmore :status="status" :loadText="loadText"
				:icon-type="iconType" :is-dot="isDot" @loadmore="loadmore"/>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">模式選擇</view>
				<u-subsection :current="current" vibrateShort :list="['加載前', '加載中', '加載後', '沒有更多']" @change="statusChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義提示語</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="loadTextChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">加載中圖標樣式</view>
				<u-subsection vibrateShort :list="['circle', 'flower']" @change="styleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">沒有更多時用點替代</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="isDotChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				iconType: 'circle',
				isDot: false,
				loadText: {
					loadmore: '點擊或上拉加載更多',
					loading: '正在加載...',
					nomore: '沒有更多了'
				},
				current: 0
			}
		},
		onReachBottom() {
			// 在此請求下一頁
		},
		methods: {
			statusChange(index) {
				this.current = index;
				this.status = index == 0 ? 'loadmore' : index == 1 ? 'loading' : index == 2 ? 'loadmore' : 'nomore';
			},
			loadTextChange(index) {
				if(index == 0) {
					this.loadText = {
						loadmore: '用力往上拉',
						loading: '正在加載，請喝杯茶...',
						nomore: '我也是有底線的'
					}
				} else {
					this.loadText = {
						loadmore: '點擊或上拉加載更多',
						loading: '正在加載...',
						nomore: '沒有更多了'
					}
				}
			},
			styleChange(index) {
				this.current = 1;
				this.statusChange(1);
				this.iconType = index == 0 ? 'circle' : 'flower';
			},
			isDotChange(index) {
				this.current = 3;
				this.statusChange(3);
				this.isDot = index == 0 ? true : false;
			},
			// 點擊組件，觸發加載更多事件(status為'loadmore'狀態下才觸發)
			loadmore() {
				this.$refs.uToast.show({
					title: '點擊觸發加載更多',
					type: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>