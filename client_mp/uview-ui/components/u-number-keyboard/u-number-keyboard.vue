<template>
	<view class="u-keyboard" @touchmove.stop.prevent="() => {}">
		<view class="u-keyboard-grids">
			<view
			    class="u-keyboard-grids-item"
			    :class="[btnBgGray(index) ? 'u-bg-gray' : '', index <= 2 ? 'u-border-top' : '', index < 9 ? 'u-border-bottom' : '', (index + 1) % 3 != 0 ? 'u-border-right' : '']"
			    :style="[itemStyle(index)]"
			    v-for="(item, index) in numList"
			    :key="index"
			    :hover-class="hoverClass(index)"
			    :hover-stay-time="100"
			    @tap="keyboardClick(item)">
				<view class="u-keyboard-grids-btn">{{ item }}</view>
			</view>
			<view class="u-keyboard-grids-item u-bg-gray" hover-class="u-hover-class" :hover-stay-time="100" @touchstart.stop="backspaceClick"
			    @touchend="clearTimer">
				<view class="u-keyboard-back u-keyboard-grids-btn">
					<u-icon name="backspace" :size="38" :bold="true"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 鍵盤的類型，number-數字鍵盤，card-身份證鍵盤
			mode: {
				type: String,
				default: 'number'
			},
			// 是否顯示鍵盤的"."符號
			dotEnabled: {
				type: Boolean,
				default: true
			},
			// 是否打亂鍵盤按鍵的順序
			random: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				backspace: 'backspace', // 退格鍵內容
				dot: '.', // 點
				timer: null, // 長按多次刪除的事件監聽
				cardX: 'X' // 身份證的X符號
			};
		},
		computed: {
			// 鍵盤需要顯示的內容
			numList() {
				let tmp = [];
				if (!this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
					}
				} else if (this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
					}
				} else if (this.mode == 'card') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
					}
				}
			},
			// 按鍵的樣式，在非亂序&&數字鍵盤&&不顯示點按鈕時，index為9時，按鍵佔位兩個空間
			itemStyle() {
				return index => {
					let style = {};
					if (this.mode == 'number' && !this.dotEnabled && index == 9) style.flex = '0 0 66.6666666666%';
					return style;
				};
			},
			// 是否讓按鍵顯示灰色，只在非亂序&&數字鍵盤&&且允許點按鍵的時候
			btnBgGray() {
				return index => {
					if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && this.dotEnabled))) return true;
					else return false;
				};
			},
			hoverClass() {
				return index => {
					if (!this.random && index == 9 && (this.mode == 'number' && this.dotEnabled || this.mode == 'card')) return 'u-hover-class';
					else return 'u-keyboard-hover';
				}
			}
		},
		methods: {
			// 點擊退格鍵
			backspaceClick() {
				this.$emit('backspace');
				clearInterval(this.timer); //再次清空定時器，防止重複註冊定時器
				this.timer = null;
				this.timer = setInterval(() => {
					this.$emit('backspace');
				}, 250);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 獲取鍵盤顯示的內容
			keyboardClick(val) {
				// 允許鍵盤顯示點模式和觸發非點按鍵時，將內容轉為數字類型
				if (this.dotEnabled && val != this.dot && val != this.cardX) val = Number(val);
				this.$emit('change', val);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-keyboard {
		position: relative;
		z-index: 1003;
	}

	.u-keyboard-grids {
		@include vue-flex;
		flex-wrap: wrap;
	}

	.u-keyboard-grids-item {
		flex: 0 0 33.3333333333%;
		text-align: center;
		font-size: 50rpx;
		color: #333;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		height: 110rpx;
		font-weight: 500;
	}

	.u-bg-gray {
		background-color: $u-border-color;
	}

	.u-keyboard-back {
		font-size: 36rpx;
	}

	.u-keyboard-hover {
		background-color: #e7e6eb;
	}
</style>
