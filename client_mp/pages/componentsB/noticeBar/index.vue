<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast :type="type" ref="uToast"></u-toast>
				<u-notice-bar :autoplay="autoplay" :playState="playState" :speed="speed" @getMore="getMore" 
				:mode="mode" @end="end" @close="close" @click="click" :show="show" :type="type" :list="list"
				:moreIcon="moreIcon" :volumeIcon="volumeIcon" :duration="duration" :isCircular="isCircular"></u-notice-bar>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題</view>
				<u-subsection vibrateShort :current="3" :list="['primary', 'success', 'error', 'warning', 'none']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">滾動模式</view>
				<u-subsection vibrateShort :current="current" :list="['水平', '垂直']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否銜接(水平模式有效)</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="isCircularChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :list="['播放', '暫停']" @change="playStateChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">速度</view>
				<u-subsection vibrateShort :current="1" :list="['慢', '正常', '快']" @change="speedChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">圖標</view>
				<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="iconChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				autoplay: false,
				type: 'warning',
				list: [
					'錦瑟無端五十弦，一弦一柱思華年',
					'莊生曉夢迷蝴蝶，望帝春心托杜鵑',
					'滄海月明珠有淚，藍田日暖玉生煙'
				],
				mode: 'horizontal',
				playState: 'play',
				speed: 160,
				duration: 2000,
				moreIcon: true,
				volumeIcon: true,
				isCircular: true,
				current: 0
			}
		},
		onLoad() {
			
		},
		methods: {
			typeChange(index) {
				let type = ['primary', 'success', 'error', 'warning', 'none'];
				this.type = type[index];
			},
			modeChange(index) {
				this.current = index;
				this.mode = index == 0 ? 'horizontal' : 'vertical';
			},
			playStateChange(index) {
				this.playState = index == 0 ? 'play' : 'paused';
			},
			speedChange(index) {
				if(index == 0) {
					this.$nextTick(() => {
						this.speed = 50;
						this.duration = 6000;
					})
				} else if(index == 1) {
					this.$nextTick(() => {
						this.speed = 160;
						this.duration = 2000;
					})
				} else {
					this.$nextTick(() => {
						this.speed = 350;
						this.duration = 400;
					})
				}
			},
			iconChange(index) {
				if(index == 0) {
					this.moreIcon = true;
					this.volumeIcon = true;
				} else {
					this.moreIcon = false;
					this.volumeIcon = false;
				}
			},
			isCircularChange(index) {
				this.isCircular = index == 0 ? true : false;
				this.current = 0;
				this.mode = 'horizontal';
			},
			close() {
				this.toast(`點擊了關閉圖標`);
			},
			click(index) {
				if(this.mode == 'horizontal' && this.isCircular) {
					this.toast('此模式無法獲取Index值');
				} else {
					this.toast(`點擊了第${index + 1}條消息`);
				}
				
			},
			getMore() {
				this.toast(`點擊了更多圖標`);
			},
			toast(title) {
				this.$refs.uToast.show({
					title: title,
					type: 'warning'
				})
			},
			end() {
				// console.log('end');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin-top: 30px;
	}
</style>
