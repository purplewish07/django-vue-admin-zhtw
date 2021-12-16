<template>
	<view
		v-if="show"
		class="u-notice-bar"
		:style="{
			background: computeBgColor,
			padding: padding
		}"
		:class="[
			type ? `u-type-${type}-light-bg` : ''
		]"
	>
		<view class="u-direction-row">
			<view class="u-icon-wrap">
				<u-icon class="u-left-icon" v-if="volumeIcon" name="volume-fill" :size="volumeSize" :color="computeColor"></u-icon>
			</view>
			<view class="u-notice-box" id="u-notice-box">
				<view
					class="u-notice-content"
					id="u-notice-content"
					:style="{
						animationDuration: animationDuration,
						animationPlayState: animationPlayState,
					}"
				>
					<text class="u-notice-text" @tap="click" :style="[textStyle]"
					:class="['u-type-' + type]">{{showText}}</text>
				</view>
			</view>
			<view class="u-icon-wrap">
				<u-icon @click="getMore" class="u-right-icon" v-if="moreIcon" name="arrow-right" :size="26" :color="computeColor"></u-icon>
				<u-icon @click="close" class="u-right-icon" v-if="closeIcon" name="close" :size="24" :color="computeColor"></u-icon>
			</view>
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
		// 顯示的主題，success|error|primary|info|warning|none
		// none主題默認為透明背景，黑色(contentColor)字體
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
		// 音量喇叭的大小
		volumeSize: {
			type: [Number, String],
			default: 34
		},
		// 水平滾動時的滾動速度，即每秒滾動多少rpx，這有利於控制文字無論多少時，都能有一個恆定的速度
		speed: {
			type: [Number, String],
			default: 160
		},
		// 播放狀態，play-播放，paused-暫停
		playState: {
			type: String,
			default: 'play'
		},
		// 通知的邊距
		padding: {
			type: [Number, String],
			default: '18rpx 24rpx'
		}
	},
	data() {
		return {
			textWidth: 0, // 滾動的文字寬度
			boxWidth: 0, // 供文字滾動的父盒子的寬度，和前者一起為了計算滾動速度
			animationDuration: '10s', // 動畫執行時間
			animationPlayState: 'paused', // 動畫的開始和結束執行
			showText: '' // 顯示的文本
		};
	},
	watch: {
		list: {
			immediate: true,
			handler(val) {
				this.showText = val.join('，');
				this.$nextTick(() => {
					this.initSize();
				});
			}
		},
		playState(val) {
			if(val == 'play') this.animationPlayState = 'running';
			else this.animationPlayState = 'paused';
		},
		speed(val) {
			this.initSize();
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
		// 計算背景顏色
		computeBgColor() {
			if (this.bgColor) return this.bgColor;
			else if(this.type == 'none') return 'transparent';
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initSize();
		});
	},
	methods: {
		initSize() {
			let query = [],
				boxWidth = 0,
				textWidth = 0;
			let textQuery = new Promise((resolve, reject) => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#u-notice-content`)
					.boundingClientRect()
					.exec(ret => {
						this.textWidth = ret[0].width;
						resolve();
					});
			});
			query.push(textQuery);
			Promise.all(query).then(() => {
				// 根據t=s/v(時間=路程/速度)，這裡為何不需要加上#u-notice-box的寬度，因為中設置了.u-notice-content樣式中設置了padding-left: 100%
				// 恰巧計算出來的結果中已經包含了#u-notice-box的寬度
				this.animationDuration = `${this.textWidth / uni.upx2px(this.speed)}s`;
				// 這裡必須這樣開始動畫，否則在APP上動畫速度不會改變(HX版本2.4.6，IOS13)
				this.animationPlayState = 'paused';
				setTimeout(() => {
					if(this.playState == 'play' && this.autoplay) this.animationPlayState = 'running';
				}, 10);
			});
		},
		// 點擊通告欄
		click(index) {
			this.$emit('click');
		},
		// 點擊關閉按鈕
		close() {
			this.$emit('close');
		},
		// 點擊更多箭頭按鈕
		getMore() {
			this.$emit('getMore');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
	
.u-notice-bar {
	padding: 18rpx 24rpx;
	overflow: hidden;
}

.u-direction-row {
	@include vue-flex;
	align-items: center;
	justify-content: space-between;
}

.u-left-icon {
	/* #ifndef APP-NVUE */
	display: inline-flex;
	/* #endif */
	align-items: center;
}

.u-notice-box {
	flex: 1;
	@include vue-flex;
	overflow: hidden;
	margin-left: 12rpx;
}

.u-right-icon {
	margin-left: 12rpx;
	display: inline-flex;
	align-items: center;
}

.u-notice-content {
	animation: u-loop-animation 10s linear infinite both;
	text-align: right;
	// 這一句很重要，為了能讓滾動左右連接起來
	padding-left: 100%;
	@include vue-flex;
	flex-wrap: nowrap;
}

.u-notice-text {
	font-size: 26rpx;
	word-break: keep-all;
	white-space: nowrap
}

@keyframes u-loop-animation {
	0% {
		transform: translate3d(0, 0, 0);
	}

	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
