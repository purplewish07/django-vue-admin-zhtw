<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<view class="container u-skeleton">
					<view class="userinfo">
						<block>
							<!--u-skeleton-circle 繪製圓形-->
							<image class="userinfo-avatar u-skeleton-circle" :src="userInfo.avatarUrl"></image>
							<!--u-skeleton-fillet 繪製圓角矩形-->
							<text class="u-skeleton-fillet">{{userInfo.nickName}}</text>
						</block>
					</view>
					<view style="margin: 20px 0">
						<!--u-skeleton-rect 繪製矩形-->
						<view class="u-skeleton-rect lists" v-for="(item,index) in lists" :key="index">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<!--引用組件-->
				<u-skeleton bg-color="rgb(250, 250, 250)" :loading="loading" :animation="animation" 
				:el-color="elColor" :border-radius="borderRadius"></u-skeleton>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">加載狀態</view>
				<u-subsection vibrateShort :current="current" :list="['請求中', '請求結束']" @change="loadingChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">骨架動畫</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="animationChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義樣式</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatarUrl: 'https://cdn.uviewui.com/uview/common/logo.png',
					nickName: 'uView'
				},
				lists: [
					'君不見，黃河之水天上來，奔流到海不復回。君不見，高堂明鏡悲白髮，朝如青絲暮成雪。',
					'人生得意須盡歡，莫使金樽空對月',
					'天生我材必有用，千金散盡還復來',
				],
				loading: true, // 是否顯示骨架屏組件
				animation: false,
				elColor: '#e5e5e5',
				borderRadius: 10,
			}
		},
		computed: {
			current() {
				return this.loading ? 0 : 1;
			},
		},
		onLoad() {
			this.getData();
		},
		methods: {
			animationChange(index) {
				this.animation = index == 0 ? true : false;
				this.getData();
			},
			loadingChange(index) {
				this.loading = index == 0 ? true : false;
				if(index == 0) this.getData();
			},
			styleChange(index) {
				if(index == 0) {
					this.elColor = this.$u.color['primary'];
					this.borderRadius = 14;
				} else {
					this.elColor = '#e5e5e5';
					this.borderRadius = 10;
				}
				this.getData();
			},
			getData() {
				this.loading = true;
				// 通過延時模擬向後端請求數據，調隱藏骨架屏
				setTimeout(() => {
					this.loading = false;
				}, 3000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.lists {
		margin: 10px 0;
	}
</style>
