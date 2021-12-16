<template>
	<view class="u-subsection" :style="[subsectionStyle]">
		<view class="u-item u-line-1" :style="[itemStyle(index)]" @tap="click(index)" :class="[noBorderRight(index), 'u-item-' + index]"
		 v-for="(item, index) in listInfo" :key="index">
			<view :style="[textStyle(index)]" class="u-item-text u-line-1">{{ item.name }}</view>
		</view>
		<view class="u-item-bg" :style="[itemBarStyle]"></view>
	</view>
</template>

<script>
	/**
	 * subsection 分段器
	 * @description 該分段器一般用於用戶從幾個選項中選擇某一個的場景
	 * @tutorial https://www.uviewui.com/components/subsection.html
	 * @property {Array} list 選項的數組，形式見上方"基本使用"
	 * @property {String Number} current 初始化時默認選中的選項索引值（默認0）
	 * @property {String} active-color 激活時的顏色，mode為subsection時固定為白色（默認#303133）
	 * @property {String} inactive-color 未激活時字體的顏色，mode為subsection時無效（默認#606266）
	 * @property {String} mode 模式選擇，見官網"模式選擇"說明（默認button）
	 * @property {String Number} font-size 字體大小，單位rpx（默認28）
	 * @property {String Number} height 組件高度，單位rpx（默認70）
	 * @property {Boolean} animation 是否開啟動畫效果，見上方說明（默認true）
	 * @property {Boolean} bold 激活選項的字體是否加粗（默認true）
	 * @property {String} bg-color 組件背景顏色，mode為button時有效（默認#eeeeef）
	 * @property {String} button-color 按鈕背景顏色，mode為button時有效（默認#ffffff）
	 * @event {Function} change 分段器選項發生改變時觸發
	 * @example <u-subsection active-color="#ff9900"></u-subsection>
	 */
	export default {
		name: "u-subsection",
		props: {
			// tab的數據
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 當前活動的tab的index
			current: {
				type: [Number, String],
				default: 0
			},
			// 激活的顏色
			activeColor: {
				type: String,
				default: '#303133'
			},
			// 未激活的顏色
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 模式選擇，mode=button為按鈕形式，mode=subsection時為分段模式
			mode: {
				type: String,
				default: 'button'
			},
			// 字體大小，單位rpx
			fontSize: {
				type: [Number, String],
				default: 28
			},
			// 是否開啟動畫效果
			animation: {
				type: Boolean,
				default: true
			},
			// 組件的高度，單位rpx
			height: {
				type: [Number, String],
				default: 70
			},
			// 激活tab的字體是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// mode=button時，組件背景顏色
			bgColor: {
				type: String,
				default: '#eeeeef'
			},
			// mode = button時，滑塊背景顏色
			buttonColor: {
				type: String,
				default: '#ffffff'
			},
			// 在切換分段器的時候，是否讓設備震一下
			vibrateShort: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				listInfo: [],
				itemBgStyle: {
					width: 0,
					left: 0,
					backgroundColor: '#ffffff',
					height: '100%',
					transition: ''
				},
				currentIndex: this.current,
				buttonPadding: 3, // mode = button 時，組件的內邊距
				borderRadius: 5, // 圓角值
				firstTimeVibrateShort: true // 組件初始化時，會觸發current變化，此時不應震動
			};
		},
		watch: {
			current: {
				immediate: true,
				handler(nVal) {
					this.currentIndex = nVal;
					this.changeSectionStatus(nVal);
				}
			}
		},
		created() {
			// 將list的數據，傳入listInfo數組，因為不能修改props傳遞的list值
			// 可以接受直接數組形式，或者數組元素為對象的形式，如：['簡介', '評論'],或者[{name: '簡介'}, {name: '評論'}]
			this.listInfo = this.list.map((val, index) => {
				if (typeof val != 'object') {
					let obj = {
						width: 0,
						name: val
					};
					return obj;
				} else {
					val.width = 0;
					return val;
				}
			});
		},
		computed: {
			// 設置mode=subsection時，滑塊特有的樣式
			noBorderRight() {
				return index => {
					if (this.mode != 'subsection') return;
					let classs = '';
					// 不顯示右邊的邊框
					if (index < this.list.length - 1) classs += ' u-none-border-right';
					// 顯示整個組件的左右邊圓角
					if (index == 0) classs += ' u-item-first';
					if (index == this.list.length - 1) classs += ' u-item-last';
					return classs;
				};
			},
			// 文字的樣式
			textStyle() {
				return index => {
					let style = {};
					// 設置字體顏色
					if (this.mode == 'subsection') {
						if (index == this.currentIndex) {
							style.color = '#ffffff';
						} else {
							style.color = this.activeColor;
						}
					} else {
						if (index == this.currentIndex) {
							style.color = this.activeColor;
						} else {
							style.color = this.inactiveColor;
						}
					}
					// 字體加粗
					if (index == this.currentIndex && this.bold) style.fontWeight = 'bold';
					// 文字大小
					style.fontSize = this.fontSize + 'rpx';
					return style;
				};
			},
			// 每個分段器item的樣式
			itemStyle() {
				return index => {
					let style = {};
					if (this.mode == 'subsection') {
						// 設置border的樣式
						style.borderColor = this.activeColor;
						style.borderWidth = '1px';
						style.borderStyle = 'solid';
					}
					return style;
				};
			},
			// mode=button時，外層view的樣式
			subsectionStyle() {
				let style = {};
				style.height = uni.upx2px(this.height) + 'px';
				if (this.mode == 'button') {
					style.backgroundColor = this.bgColor;
					style.padding = `${this.buttonPadding}px`;
					style.borderRadius = `${this.borderRadius}px`;
				}
				return style;
			},
			// 滑塊的樣式
			itemBarStyle() {
				let style = {};
				style.backgroundColor = this.activeColor;
				style.zIndex = 1;
				if (this.mode == 'button') {
					style.backgroundColor = this.buttonColor;
					style.borderRadius = `${this.borderRadius}px`;
					style.bottom = `${this.buttonPadding}px`;
					style.height = uni.upx2px(this.height) - this.buttonPadding * 2 + 'px';
					style.zIndex = 0;
				}
				return Object.assign(this.itemBgStyle, style);
			}
		},
		mounted() {
			setTimeout(() => {
				this.getTabsInfo();
			}, 10);
		},
		methods: {
			// 改變滑塊的樣式
			changeSectionStatus(nVal) {
				if (this.mode == 'subsection') {
					// 根據滑塊在最左邊和最右邊時，顯示左邊和右邊的圓角
					if (nVal == this.list.length - 1) {
						this.itemBgStyle.borderRadius = `0 ${this.buttonPadding}px ${this.buttonPadding}px 0`;
					}
					if (nVal == 0) {
						this.itemBgStyle.borderRadius = `${this.buttonPadding}px 0 0 ${this.buttonPadding}px`;
					}
					if (nVal > 0 && nVal < this.list.length - 1) {
						this.itemBgStyle.borderRadius = '0';
					}
				}
				// 更新滑塊的位置
				setTimeout(() => {
					this.itemBgLeft();
				}, 10);
				if (this.vibrateShort && !this.firstTimeVibrateShort) {
					// 使手機產生短促震動，微信小程序有效，APP(HX 2.6.8)和H5無效
					// #ifndef H5
					uni.vibrateShort();
					// #endif
				}
				// 第一次過後，設置firstTimeVibrateShort為false，讓其下一次可以震動(如果允許震動的話)
				this.firstTimeVibrateShort = false;
			},
			click(index) {
				// 不允許點擊當前激活選項
				if (index == this.currentIndex) return;
				this.currentIndex = index;
				this.changeSectionStatus(index);
				this.$emit('change', Number(index));
			},
			// 獲取各個tab的節點信息
			getTabsInfo() {
				let view = uni.createSelectorQuery().in(this);
				for (let i = 0; i < this.list.length; i++) {
					view.select('.u-item-' + i).boundingClientRect();
				}
				view.exec(res => {
					if (!res.length) {
						setTimeout(() => {
							this.getTabsInfo();
							return;
						}, 10);
					}
					// 將分段器每個item的寬度，放入listInfo數組
					res.map((val, index) => {
						this.listInfo[index].width = val.width;
					});
					// 初始化滑塊的寬度
					if (this.mode == 'subsection') {
						this.itemBgStyle.width = this.listInfo[0].width + 'px';
					} else if (this.mode == 'button') {
						this.itemBgStyle.width = this.listInfo[0].width + 'px';
					}
					// 初始化滑塊的位置
					this.itemBgLeft();
				});
			},
			itemBgLeft() {
				// 根據是否開啟動畫效果，
				if (this.animation) {
					this.itemBgStyle.transition = 'all 0.35s';
				} else {
					this.itemBgStyle.transition = 'all 0s';
				}
				let left = 0;
				// 計算當前活躍item到組件左邊的距離
				this.listInfo.map((val, index) => {
					if (index < this.currentIndex) left += val.width;
				});
				// 根據mode不同模式，計算滑塊需要移動的距離
				if (this.mode == 'subsection') {
					this.itemBgStyle.left = left + 'px';
				} else if (this.mode == 'button') {
					this.itemBgStyle.left = left + this.buttonPadding + 'px';
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-subsection {
		@include vue-flex;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.u-item {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		height: 100%;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		color: $u-main-color;
		padding: 0 6rpx;
	}

	.u-item-bg {
		background-color: $u-type-primary;
		position: absolute;
		z-index: -1;
	}

	.u-none-border-right {
		border-right: none !important;
	}

	.u-item-first {
		border-top-left-radius: 8rpx;
		border-bottom-left-radius: 8rpx;
	}

	.u-item-last {
		border-top-right-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}

	.u-item-text {
		transition: all 0.35s;
		color: $u-main-color;
		@include vue-flex;
		align-items: center;
		position: relative;
		z-index: 3;
	}
</style>
