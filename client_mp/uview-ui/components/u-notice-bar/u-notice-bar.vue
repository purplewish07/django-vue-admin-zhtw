<template>
	<view class="u-notice-bar-wrap" v-if="isShow" :style="{
		borderRadius: borderRadius + 'rpx',
	}">
		<block v-if="mode == 'horizontal' && isCircular">
			<u-row-notice
				:type="type"
				:color="color"
				:bgColor="bgColor"
				:list="list"
				:volumeIcon="volumeIcon"
				:moreIcon="moreIcon"
				:volumeSize="volumeSize"
				:closeIcon="closeIcon"
				:mode="mode"
				:fontSize="fontSize"
				:speed="speed"
				:playState="playState"
				:padding="padding"
				@getMore="getMore"
				@close="close"
				@click="click"
			></u-row-notice>
		</block>
		<block v-if="mode == 'vertical' || (mode == 'horizontal' && !isCircular)">
			<u-column-notice
				:type="type"
				:color="color"
				:bgColor="bgColor"
				:list="list"
				:volumeIcon="volumeIcon"
				:moreIcon="moreIcon"
				:closeIcon="closeIcon"
				:mode="mode"
				:volumeSize="volumeSize"
				:disable-touch="disableTouch"
				:fontSize="fontSize"
				:duration="duration"
				:playState="playState"
				:padding="padding"
				@getMore="getMore"
				@close="close"
				@click="click"
				@end="end"
			></u-column-notice>
		</block>
	</view>
</template>
<script>
/**
 * noticeBar 滾動通知
 * @description 該組件用於滾動通告場景，有多種模式可供選擇
 * @tutorial https://www.uviewui.com/components/noticeBar.html
 * @property {Array} list 滾動內容，數組形式，見上方說明
 * @property {String} type 顯示的主題（默認warning）
 * @property {Boolean} volume-icon 是否顯示小喇叭圖標（默認true）
 * @property {Boolean} more-icon 是否顯示右邊的向右箭頭（默認false）
 * @property {Boolean} close-icon 是否顯示關閉圖標（默認false）
 * @property {Boolean} autoplay 是否自動播放（默認true）
 * @property {String} color 文字顏色
 * @property {String Number} bg-color 背景顏色
 * @property {String} mode 滾動模式（默認horizontal）
 * @property {Boolean} show 是否顯示（默認true）
 * @property {String Number} font-size 字體大小，單位rpx（默認28）
 * @property {String Number} volume-size 左邊喇叭的大小（默認34）
 * @property {String Number} duration 滾動週期時長，只對步進模式有效，橫向銜接模式無效，單位ms（默認2000）
 * @property {String Number} speed 水平滾動時的滾動速度，即每秒移動多少距離，只對水平銜接方式有效，單位rpx（默認160）
 * @property {String Number} font-size 字體大小，單位rpx（默認28）
 * @property {Boolean} is-circular mode為horizontal時，指明是否水平銜接滾動（默認true）
 * @property {String} play-state 播放狀態，play - 播放，paused - 暫停（默認play）
 * @property {String Nubmer} border-radius 通知欄圓角（默認為0）
 * @property {String Nubmer} padding 內邊距，字符串，與普通的內邊距css寫法一直（默認"18rpx 24rpx"）
 * @property {Boolean} no-list-hidden 列表為空時，是否顯示組件（默認false）
 * @property {Boolean} disable-touch 是否禁止通過手動滑動切換通知，只有mode = vertical，或者mode = horizontal且is-circular = false時有效（默認true）
 * @event {Function} click 點擊通告文字觸發，只有mode = vertical，或者mode = horizontal且is-circular = false時有效
 * @event {Function} close 點擊右側關閉圖標觸發
 * @event {Function} getMore 點擊右側向右圖標觸發
 * @event {Function} end 列表的消息每次被播放一個週期時觸發，只有mode = vertical，或者mode = horizontal且is-circular = false時有效
 * @example <u-notice-bar :more-icon="true" :list="list"></u-notice-bar>
 */
export default {
	name: "u-notice-bar",
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
		// 音量喇叭的大小
		volumeSize: {
			type: [Number, String],
			default: 34
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
		// 滾動方向，horizontal-水平滾動，vertical-垂直滾動
		mode: {
			type: String,
			default: 'horizontal'
		},
		// 是否顯示
		show: {
			type: Boolean,
			default: true
		},
		// 字體大小，單位rpx
		fontSize: {
			type: [Number, String],
			default: 28
		},
		// 滾動一個週期的時間長，單位ms
		duration: {
			type: [Number, String],
			default: 2000
		},
		// 水平滾動時的滾動速度，即每秒滾動多少rpx，這有利於控制文字無論多少時，都能有一個恆定的速度
		speed: {
			type: [Number, String],
			default: 160
		},
		// 水平滾動時，是否採用銜接形式滾動
		// 水平銜接模式，採用的是swiper組件，水平滾動
		isCircular: {
			type: Boolean,
			default: true
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
		// 滾動通知設置圓角
		borderRadius: {
			type: [Number, String],
			default: 0
		},
		// 通知的邊距
		padding: {
			type: [Number, String],
			default: '18rpx 24rpx'
		},
		// list列表為空時，是否顯示組件
		noListHidden: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		// 如果設置show為false，或者設置了noListHidden為true，且list長度又為零的話，隱藏組件
		isShow() {
			if(this.show == false || (this.noListHidden == true && this.list.length == 0)) return false;
			else return true;
		}
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
		// 滾動一個週期結束，只對垂直，或者水平步進形式有效
		end() {
			this.$emit('end');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-notice-bar-wrap {
	overflow: hidden;
}

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
	@include vue-flex;
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
	@include vue-flex;
	align-items: center;
}

.u-notice-content {
	line-height: 1;
	white-space: nowrap;
	font-size: 26rpx;
	animation: u-loop-animation 10s linear infinite both;
	text-align: right;
	// 這一句很重要，為了能讓滾動左右連接起來
	padding-left: 100%;
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
