<template>
	<view class="u-slider" @tap="onClick" :class="[disabled ? 'u-slider--disabled' : '']" :style="{
		backgroundColor: inactiveColor
	}">
		<view
			class="u-slider__gap"
			:style="[
				barStyle,
				{
					height: height + 'rpx',
					backgroundColor: activeColor
				}
			]"
		>
			<view class="u-slider__button-wrap" @touchstart="onTouchStart" 
				@touchmove="onTouchMove" @touchend="onTouchEnd" 
				@touchcancel="onTouchEnd">
				<slot v-if="$slots.default  || $slots.$default"/>
				<view v-else class="u-slider__button" :style="[blockStyle, {
					height: blockWidth + 'rpx',
					width: blockWidth + 'rpx',
					backgroundColor: blockColor
				}]"></view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * slider 滑塊選擇器
 * @tutorial https://uviewui.com/components/slider.html
 * @property {Number | String} value 滑塊默認值（默認0）
 * @property {Number | String} min 最小值（默認0）
 * @property {Number | String} max 最大值（默認100）
 * @property {Number | String} step 步長（默認1）
 * @property {Number | String} blockWidth 滑塊寬度，高等於寬（30）
 * @property {Number | String} height 滑塊條高度，單位rpx（默認6）
 * @property {String} inactiveColor 底部條背景顏色（默認#c0c4cc）
 * @property {String} activeColor 底部選擇部分的背景顏色（默認#2979ff）
 * @property {String} blockColor 滑塊顏色（默認#ffffff）
 * @property {Object} blockStyle 給滑塊自定義樣式，對像形式
 * @property {Boolean} disabled 是否禁用滑塊(默認為false)
 * @event {Function} start 滑動觸發
 * @event {Function} moving 正在滑動中
 * @event {Function} end 滑動結束
 * @example <u-slider v-model="value" />
 */
export default {
	name: 'u-slider',
	props: {
		// 當前進度百分比值，範圍0-100
		value: {
			type: [Number, String],
			default: 0
		},
		// 是否禁用滑塊
		disabled: {
			type: Boolean,
			default: false
		},
		// 滑塊寬度，高等於寬，單位rpx
		blockWidth: {
			type: [Number, String],
			default: 30
		},
		// 最小值
		min: {
			type: [Number, String],
			default: 0
		},
		// 最大值
		max: {
			type: [Number, String],
			default: 100
		},
		// 步進值
		step: {
			type: [Number, String],
			default: 1
		},
		// 滑塊條高度，單位rpx
		height: {
			type: [Number, String],
			default: 6
		},
		// 進度條的激活部分顏色
		activeColor: {
			type: String,
			default: '#2979ff'
		},
		// 進度條的背景顏色
		inactiveColor: {
			type: String,
			default: '#c0c4cc'
		},
		// 滑塊的背景顏色
		blockColor: {
			type: String,
			default: '#ffffff'
		},
		// 用戶對滑塊的自定義顏色
		blockStyle: {
			type: Object,
			default() {
				return {};
			}
		},
	},
	data() {
		return {
			startX: 0,
			status: 'end',
			newValue: 0,
			distanceX: 0,
			startValue: 0,
			barStyle: {},
			sliderRect: {
				left: 0,
				width: 0
			}
		};
	},
	watch: {
		value(n) {
			// 只有在非滑動狀態時，才可以通過value更新滑塊值，這裡監聽，是為了讓用戶觸發
			if(this.status == 'end') this.updateValue(this.value, false);
		}
	},
	created() {
		this.updateValue(this.value, false);
	},
	mounted() {
		// 獲取滑塊條的尺寸信息
		this.$uGetRect('.u-slider').then(rect => {
			this.sliderRect = rect;
		});
	},
	methods: {
		onTouchStart(event) {
			if (this.disabled) return;
			this.startX = 0;
			// 觸摸點集
			let touches = event.touches[0];
			// 觸摸點到屏幕左邊的距離
			this.startX = touches.clientX;
			// 此處的this.value雖為props值，但是通過$emit('input')進行了修改
			this.startValue = this.format(this.value);
			// 標示當前的狀態為開始觸摸滑動
			this.status = 'start';
		},
		onTouchMove(event) {
			if (this.disabled) return;
			// 連續觸摸的過程會一直觸發本方法，但只有手指觸發且移動了才被認為是拖動了，才發出事件
			// 觸摸後第一次移動已經將status設置為moving狀態，故觸摸第二次移動不會觸發本事件
			if (this.status == 'start') this.$emit('start');
			let touches = event.touches[0];
			// 滑塊的左邊不一定跟屏幕左邊接壤，所以需要減去最外層父元素的左邊值
			this.distanceX = touches.clientX - this.sliderRect.left;
			// 獲得移動距離對整個滑塊的百分比值，此為帶有多位小數的值，不能用此更新視圖
			// 否則造成通信阻塞，需要每改變一個step值時修改一次視圖
			this.newValue = (this.distanceX / this.sliderRect.width) * 100;
			this.status = 'moving';
			// 發出moving事件
			this.$emit('moving');
			this.updateValue(this.newValue, true);
		},
		onTouchEnd() {
			if (this.disabled) return;
			if (this.status === 'moving') {
				this.updateValue(this.newValue, false);
				this.$emit('end');
			}
			this.status = 'end';
		},
		updateValue(value, drag) {
			// 去掉小數部分，同時也是對step步進的處理
			const width = this.format(value);
			// 不允許滑動的值超過max最大值，百分比也不能超過100
			if(width > this.max || width > 100) return;
			// 設置移動的百分比值
			let barStyle = {
				width: width + '%'
			};
			// 移動期間無需過渡動畫
			if (drag == true) {
				barStyle.transition = 'none';
			} else {
				// 非移動期間，刪掉對過渡為空的聲明，讓css中的聲明起效
				delete barStyle.transition;
			}
			// 修改value值
			this.$emit('input', width);
			this.barStyle = barStyle;
		},
		format(value) {
			// 將小數變成整數，為了減少對視圖的更新，造成視圖層與邏輯層的阻塞
			return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
		},
		onClick(event) {
			if (this.disabled) return;
			// 直接點擊滑塊的情況，計算方式與onTouchMove方法相同
			const value = ((event.detail.x - this.sliderRect.left) / this.sliderRect.width) * 100;
			this.updateValue(value, false);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-slider {
	position: relative;
	border-radius: 999px;
	border-radius: 999px;
	background-color: #ebedf0;
}

.u-slider:before {
	position: absolute;
	right: 0;
	left: 0;
	content: '';
	top: -8px;
	bottom: -8px;
	z-index: -1;
}

.u-slider__gap {
	position: relative;
	border-radius: inherit;
	transition: width 0.2s;
	transition: width 0.2s;
	background-color: #1989fa;
}

.u-slider__button {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	background-color: #fff;
	cursor: pointer;
}

.u-slider__button-wrap {
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate3d(50%, -50%, 0);
}

.u-slider--disabled {
	opacity: 0.5;
}
</style>
