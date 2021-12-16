<template>
	<view v-if="show" :class="[
		disabled ? 'u-disabled' : '',
		'u-size-' + size,
		'u-shape-' + shape,
		'u-mode-' + mode + '-' + type
	]"
	 class="u-tag" :style="[customStyle]" @tap="clickTag">
		{{text}}
		<view class="u-icon-wrap" @tap.stop>
			<u-icon @click="close" size="22" v-if="closeable" :color="closeIconColor" 
			name="close" class="u-close-icon" :style="[iconStyle]"></u-icon>
		</view>
	</view>
</template>

<script>
	/**
	 * tag 提示
	 * @description 該組件一般用於標記和選擇
	 * @tutorial https://www.uviewui.com/components/tag.html
	 * @property {String} type 主題類型（默認primary）
	 * @property {String} size 標籤大小（默認default）
	 * @property {String} shape 標籤形狀（默認square）
	 * @property {String} text 標籤的文字內容
	 * @property {String} bg-color 自定義標籤的背景顏色
	 * @property {String} border-color 標籤的邊框顏色
	 * @property {String} close-color 關閉按鈕的顏色
	 * @property {String Number} index 點擊標籤時，會通過click事件返回該值
	 * @property {String} mode 模式選擇，見官網說明（默認light）
	 * @property {Boolean} closeable 是否可關閉，設置為true，文字右邊會出現一個關閉圖標（默認false）
	 * @property {Boolean} show 標籤顯示與否（默認true）
	 * @event {Function} click 點擊標籤觸發
	 * @event {Function} close closeable為true時，點擊標籤關閉按鈕觸發
	 * @example <u-tag text="雪月夜" type="success" />
	 */
	export default {
		name: 'u-tag',
		// 是否禁用這個標籤，禁用的話，會屏蔽點擊事件
		props: {
			// 標籤類型info、primary、success、warning、error
			type: {
				type: String,
				default: 'primary'
			},
			disabled: {
				type: [Boolean, String],
				default: false
			},
			// 標籤的大小，分為default（默認），mini（較小）
			size: {
				type: String,
				default: 'default'
			},
			// tag的形狀，circle（兩邊半圓形）, square（方形，帶圓角），circleLeft（左邊是半圓），circleRight（右邊是半圓）
			shape: {
				type: String,
				default: 'square'
			},
			// 標籤文字
			text: {
				type: [String, Number],
				default: ''
			},
			// 背景顏色，默認為空字符串，即不處理
			bgColor: {
				type: String,
				default: ''
			},
			// 標籤字體顏色，默認為空字符串，即不處理
			color: {
				type: String,
				default: ''
			},
			// 鏤空形式標籤的邊框顏色
			borderColor: {
				type: String,
				default: ''
			},
			// 關閉按鈕圖標的顏色
			closeColor: {
				type: String,
				default: ''
			},
			// 點擊時返回的索引值，用於區分例遍的數組哪個元素被點擊了
			index: {
				type: [Number, String],
				default: ''
			},
			// 模式選擇，dark|light|plain
			mode: {
				type: String,
				default: 'light'
			},
			// 是否可關閉
			closeable: {
				type: Boolean,
				default: false
			},
			// 是否顯示
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			customStyle() {
				let style = {};
				// 文字顏色（如果有此值，會覆蓋type值的顏色）
				if(this.color) style.color = this.color;
				// tag的背景顏色（如果有此值，會覆蓋type值的顏色）
				if(this.bgColor) style.backgroundColor = this.bgColor;
				// 如果是鏤空型tag，沒有傳遞邊框顏色（borderColor）的話，使用文字的顏色（color屬性）
				if(this.mode == 'plain' && this.color && !this.borderColor) style.borderColor = this.color;
				else style.borderColor = this.borderColor;
				return style;
			},
			iconStyle() {
				if(!this.closeable) return ;
				let style = {};
				if(this.size == 'mini') style.fontSize = '20rpx';
				else style.fontSize = '22rpx';
				if(this.mode == 'plain' || this.mode == 'light') style.color = this.type;
				else if(this.mode == 'dark')  style.color = "#ffffff";
				if(this.closeColor) style.color = this.closeColor;
				return style;
			},
			// 關閉圖標的顏色
			closeIconColor() {
				// 如果定義了關閉圖標的顏色，就用此值，否則用字體顏色的值
				// 如果上面的二者都沒有，如果是dark深色模式，圖標就為白色
				// 最後如果上面的三者都不合適，就返回type值給圖標獲取顏色
				let color = '';
				if(this.closeColor) return this.closeColor;
				else if(this.color) return this.color;
				else if(this.mode == 'dark') return '#ffffff';
				else return this.type;
			}
		},
		methods: {
			// 標籤被點擊
			clickTag() {
				// 如果是disabled狀態，不發送點擊事件
				if(this.disabled) return ;
				this.$emit('click', this.index);
			},
			// 點擊標籤關閉按鈕
			close() {
				this.$emit('close', this.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-tag {
		box-sizing: border-box;
		align-items: center;
		border-radius: 6rpx;
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		line-height: 1;
	}
	
	.u-size-default {
		font-size: 22rpx;
		padding: 12rpx 22rpx;
	}
	
	.u-size-mini {
		font-size: 20rpx;
		padding: 6rpx 12rpx;
	}

	.u-mode-light-primary {
		background-color: $u-type-primary-light;
		color: $u-type-primary;
		border: 1px solid $u-type-primary-disabled;
	}
	
	.u-mode-light-success {
		background-color: $u-type-success-light;
		color: $u-type-success;
		border: 1px solid $u-type-success-disabled;
	}
	
	.u-mode-light-error {
		background-color: $u-type-error-light;
		color: $u-type-error;
		border: 1px solid $u-type-error-disabled;
	}
	
	.u-mode-light-warning {
		background-color: $u-type-warning-light;
		color: $u-type-warning;
		border: 1px solid $u-type-warning-disabled;
	}
	
	.u-mode-light-info {
		background-color: $u-type-info-light;
		color: $u-type-info;
		border: 1px solid $u-type-info-disabled;
	}
	
	.u-mode-dark-primary {
		background-color: $u-type-primary;
		color: #FFFFFF;
	}
	
	.u-mode-dark-success {
		background-color: $u-type-success;
		color: #FFFFFF;
	}
	
	.u-mode-dark-error {
		background-color: $u-type-error;
		color: #FFFFFF;
	}
	
	.u-mode-dark-warning {
		background-color: $u-type-warning;
		color: #FFFFFF;
	}
	
	.u-mode-dark-info {
		background-color: $u-type-info;
		color: #FFFFFF;
	}
	
	.u-mode-plain-primary {
		background-color: #FFFFFF;
		color: $u-type-primary;
		border: 1px solid $u-type-primary;
	}
	
	.u-mode-plain-success {
		background-color: #FFFFFF;
		color: $u-type-success;
		border: 1px solid $u-type-success;
	}
	
	.u-mode-plain-error {
		background-color: #FFFFFF;
		color: $u-type-error;
		border: 1px solid $u-type-error;
	}
	
	.u-mode-plain-warning {
		background-color: #FFFFFF;
		color: $u-type-warning;
		border: 1px solid $u-type-warning;
	}
	
	.u-mode-plain-info {
		background-color: #FFFFFF;
		color: $u-type-info;
		border: 1px solid $u-type-info;
	}
	
	.u-disabled {
		opacity: 0.55;
	}

	.u-shape-circle {
		border-radius: 100rpx;
	}
	
	.u-shape-circleRight {
		border-radius:  0 100rpx 100rpx 0;
	}

	.u-shape-circleLeft {
		border-radius: 100rpx 0 0 100rpx;
	}
	
	.u-close-icon {
		margin-left: 14rpx;
		font-size: 22rpx;
		color: $u-type-success;
	}
	
	.u-icon-wrap {
		display: inline-flex;
		transform: scale(0.86);
	}
</style>
