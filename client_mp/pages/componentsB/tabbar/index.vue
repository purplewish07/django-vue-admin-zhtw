<template>
	<view class="">
		<view class="u-demo">
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">
					參數配置
				</view>
				<view class="u-config-item">
					<view class="u-item-title">狀態</view>
					<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="showChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">凸起按鈕</view>
					<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="minButtonChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">背景色</view>
					<u-subsection vibrateShort :list="['#ffffff', '#1f1f1d']" @change="bgColorChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">頂部邊框</view>
					<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="borderTopChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">提示角標</view>
					<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="badgeChange"></u-subsection>
				</view>
			</view>
		</view>
		<u-tabbar
		    v-model="current"
		    :show="show"
		    :bg-color="bgColor"
		    :border-top="borderTop"
		    :list="list"
			:mid-button="midButton"
			:inactive-color="inactiveColor"
			:activeColor="activeColor"
		></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首頁',
						count: 2,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '放映廳',
						customIcon: false,
					},
					{
						iconPath: "/static/uview/example/min_button.png",
						selectedIconPath: "/static/uview/example/min_button_select.png",
						text: '發佈',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '直播',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
					},
				],
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
			}
		},
		methods: {
			beforeSwitch(index) {
				return true;
			},
			showChange(index) {
				this.show = !index;
			},
			bgColorChange(index) {
				if(index == 0) {
					this.activeColor = '#5098FF';
					this.inactiveColor = '#909399';
				}
				if(index == 1) {
					this.activeColor = '#D0D0D0';
					this.inactiveColor = '#5A5A5A';
				}
				this.bgColor = ['#ffffff', '#1f1f1d'][index];
			},
			borderTopChange(index) {
				this.borderTop = !index;
			},
			badgeChange(index) {
				if (index == 1) {
					this.list[0].count = 0;
					this.list[4].count = 0;
				} else {
					this.list[0].count = 2;
					this.list[4].count = 23;
				}
			},
			minButtonChange(index) {
				this.midButton = !index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo-area {
		margin: 0 -40rpx;
	}
</style>
