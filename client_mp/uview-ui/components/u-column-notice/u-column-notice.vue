<template>
	<view
		class="u-notice-bar"
		:style="{
			background: computeBgColor,
			padding: padding
		}"
		:class="[
			type ? `u-type-${type}-light-bg` : ''
		]"
	>
		<view class="u-icon-wrap">
			<u-icon class="u-left-icon" v-if="volumeIcon" name="volume-fill" :size="volumeSize" :color="computeColor"></u-icon>
		</view>
		<swiper :disable-touch="disableTouch" @change="change" :autoplay="autoplay && playState == 'play'" :vertical="vertical" circular :interval="duration" class="u-swiper">
			<swiper-item v-for="(item, index) in list" :key="index" class="u-swiper-item">
				<view
					class="u-news-item u-line-1"
					:style="[textStyle]"
					@tap="click(index)"
					:class="['u-type-' + type]"
				>
					{{ item }}
				</view>
			</swiper-item>
		</swiper>
		<view class="u-icon-wrap">
			<u-icon @click="getMore" class="u-right-icon" v-if="moreIcon" name="arrow-right" :size="26" :color="computeColor"></u-icon>
			<u-icon @click="close" class="u-right-icon" v-if="closeIcon" name="close" :size="24" :color="computeColor"></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 顯示的內容，數組
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 顯示的主題，success|error|primary|info|warning
		type: {
			type: String,
			default: 'warning'
		},
		// 是否顯示左側的音量圖標
		volumeIcon: {
			type: Boolean,
			default: true
		},
		// 是否顯示右側的右箭頭圖標
		moreIcon: {
			type: Boolean,
			default: false
		},
		// 是否顯示右側的關閉圖標
		closeIcon: {
			type: Boolean,
			default: false
		},
		// 是否自動播放
		autoplay: {
			type: Boolean,
			default: true
		},
		// 文字顏色，各圖標也會使用文字顏色
		color: {
			type: String,
			default: ''
		},
		// 背景顏色
		bgColor: {
			type: String,
			default: ''
		},
		// 滾動方向，row-水平滾動，column-垂直滾動
		direction: {
			type: String,
			default: 'row'
		},
		// 是否顯示
		show: {
			type: Boolean,
			default: true
		},
		// 字體大小，單位rpx
		fontSize: {
			type: [Number, String],
			default: 26
		},
		// 滾動一個週期的時間長，單位ms
		duration: {
			type: [Number, String],
			default: 2000
		},
		// 音量喇叭的大小
		volumeSize: {
			type: [Number, String],
			default: 34
		},
		// 水平滾動時的滾動速度，即每秒滾動多少rpx，這有利於控制文字無論多少時，都能有一個恆定的速度
		speed: {
			type: Number,
			default: 160
		},
		// 水平滾動時，是否採用銜接形式滾動
		isCircular: {
			type: Boolean,
			default: true
		},
		// 滾動方向，horizontal-水平滾動，vertical-垂直滾動
		mode: {
			type: String,
			default: 'horizontal'
		},
		// 播放狀態，play-播放，paused-暫停
		playState: {
			type: String,
			default: 'play'
		},
		// 是否禁止用手滑動切換
		// 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付寶小程序、字節跳動小程序
		disableTouch: {
			type: Boolean,
			default: true
		},
		// 通知的邊距
		padding: {
			type: [Number, String],
			default: '18rpx 24rpx'
		}
	},
	computed: {
		// 計算字體顏色，如果沒有自定義的，就用uview主題顏色
		computeColor() {
			if (this.color) return this.color;
			// 如果是無主題，就默認使用content-color
			else if(this.type == 'none') return '#606266';
			else return this.type;
		},
		// 文字內容的樣式
		textStyle() {
			let style = {};
			if (this.color) style.color = this.color;
			else if(this.type == 'none') style.color = '#606266';
			style.fontSize = this.fontSize + 'rpx';
			return style;
		},
		// 垂直或者水平滾動
		vertical() {
			if(this.mode == 'horizontal') return false;
			else return true;
		},
		// 計算背景顏色
		computeBgColor() {
			if (this.bgColor) return this.bgColor;
			else if(this.type == 'none') return 'transparent';
		}
	},
	data() {
		return {
			// animation: false
		};
	},
	methods: {
		// 點擊通告欄
		click(index) {
			this.$emit('click', index);
		},
		// 點擊關閉按鈕
		close() {
			this.$emit('close');
		},
		// 點擊更多箭頭按鈕
		getMore() {
			this.$emit('getMore');
		},
		change(e) {
			let index = e.detail.current;
			if(index == this.list.length - 1) {
				this.$emit('end');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-notice-bar {
	width: 100%;
	@include vue-flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	padding: 18rpx 24rpx;
	overflow: hidden;
}

.u-swiper {
	font-size: 26rpx;
	height: 32rpx;
	@include vue-flex;
	align-items: center;
	flex: 1;
	margin-left: 12rpx;
}

.u-swiper-item {
	@include vue-flex;
	align-items: center;
	overflow: hidden;
}

.u-news-item {
	overflow: hidden;
}

.u-right-icon {
	margin-left: 12rpx;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
}

.u-left-icon {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
}
</style>
