<template>
	<view v-if="show" class="u-tabbar" @touchmove.stop.prevent="() => {}">
		<view class="u-tabbar__content safe-area-inset-bottom" :style="{
			height: $u.addUnit(height),
			backgroundColor: bgColor,
		}" :class="{
			'u-border-top': borderTop
		}">
			<view class="u-tabbar__content__item" v-for="(item, index) in list" :key="index" :class="{
				'u-tabbar__content__circle': midButton &&item.midButton
			}" @tap.stop="clickHandler(index)" :style="{
				backgroundColor: bgColor
			}">
				<view :class="[
					midButton && item.midButton ? 'u-tabbar__content__circle__button' : 'u-tabbar__content__item__button'
				]">
					<u-icon
						:size="midButton && item.midButton ? midButtonSize : iconSize"
						:name="elIconPath(index)"
						img-mode="scaleToFill"
						:color="elColor(index)"
						:custom-prefix="item.customIcon ? 'custom-icon' : 'uicon'"
					></u-icon>
					<u-badge :count="item.count" :is-dot="item.isDot"
						v-if="item.count"
						:offset="[-2, getOffsetRight(item.count, item.isDot)]"
					></u-badge>
				</view>
				<view class="u-tabbar__content__item__text" :style="{
					color: elColor(index)
				}">
					<text class="u-line-1">{{item.text}}</text>
				</view>
			</view>
			<view v-if="midButton" class="u-tabbar__content__circle__border" :class="{
				'u-border': borderTop,
			}" :style="{
				backgroundColor: bgColor,
				left: midButtonLeft
			}">
			</view>
		</view>
		<!-- 這裡加上一個48rpx的高度,是為了增高有凸起按鈕時的防塌陷高度(也即按鈕凸出來部分的高度) -->
		<view class="u-fixed-placeholder safe-area-inset-bottom" :style="{
				height: `calc(${$u.addUnit(height)} + ${midButton ? 48 : 0}rpx)`,
			}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			// 顯示與否
			show: {
				type: Boolean,
				default: true
			},
			// 通過v-model綁定current值
			value: {
				type: [String, Number],
				default: 0
			},
			// 整個tabbar的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// tabbar的高度，默認50px，單位任意，如果為數值，則為rpx單位
			height: {
				type: [String, Number],
				default: '50px'
			},
			// 非凸起圖標的大小，單位任意，數值默認rpx
			iconSize: {
				type: [String, Number],
				default: 40
			},
			// 凸起的圖標的大小，單位任意，數值默認rpx
			midButtonSize: {
				type: [String, Number],
				default: 90
			},
			// 激活時的演示，包括字體圖標，提示文字等的演示
			activeColor: {
				type: String,
				default: '#303133'
			},
			// 未激活時的顏色
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 是否顯示中部的凸起按鈕
			midButton: {
				type: Boolean,
				default: false
			},
			// 配置參數
			list: {
				type: Array,
				default () {
					return []
				}
			},
			// 切換前的回調
			beforeSwitch: {
				type: Function,
				default: null
			},
			// 是否顯示頂部的橫線
			borderTop: {
				type: Boolean,
				default: true
			},
			// 是否隱藏原生tabbar
			hideTabBar: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				// 由於安卓太菜了，通過css居中凸起按鈕的外層元素有誤差，故通過js計算將其居中
				midButtonLeft: '50%',
				pageUrl: '', // 當前頁面URL
			}
		},
		created() {
			// 是否隱藏原生tabbar
			if(this.hideTabBar) uni.hideTabBar();
			// 獲取引入了u-tabbar頁面的路由地址，該地址沒有路徑前面的"/"
			let pages = getCurrentPages();
			// 頁面棧中的最後一個即為項為當前頁面，route屬性為頁面路徑
			this.pageUrl = pages[pages.length - 1].route;
		},
		computed: {
			elIconPath() {
				return (index) => {
					// 歷遍u-tabbar的每一項item時，判斷是否傳入了pagePath參數，如果傳入了
					// 和data中的pageUrl參數對比，如果相等，即可判斷當前的item對應當前的tabbar頁面，設置高亮圖標
					// 採用這個方法，可以無需使用v-model綁定的value值
					let pagePath = this.list[index].pagePath;
					// 如果定義了pagePath屬性，意味著使用系統自帶tabbar方案，否則使用一個頁面用幾個組件模擬tabbar頁面的方案
					// 這兩個方案對處理tabbar item的激活與否方式不一樣
					if(pagePath) {
						if(pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) {
							return this.list[index].selectedIconPath;
						} else {
							return this.list[index].iconPath;
						}
					} else {
						// 普通方案中，索引等於v-model值時，即為激活項
						return index == this.value ? this.list[index].selectedIconPath : this.list[index].iconPath
					}
				}
			},
			elColor() {
				return (index) => {
					// 判斷方法同理於elIconPath
					let pagePath = this.list[index].pagePath;
					if(pagePath) {
						if(pagePath == this.pageUrl || pagePath == '/' + this.pageUrl) return this.activeColor;
						else return this.inactiveColor;
					} else {
						return index == this.value ? this.activeColor : this.inactiveColor;
					}
				}
			}
		},
		mounted() {
			this.midButton && this.getMidButtonLeft();
		},
		methods: {
			async clickHandler(index) {
				if(this.beforeSwitch && typeof(this.beforeSwitch) === 'function') {
					// 執行回調，同時傳入索引當作參數
					// 在微信，支付寶等環境(H5正常)，會導致父組件定義的customBack()函數體中的this變成子組件的this
					// 通過bind()方法，綁定父組件的this，讓this.customBack()的this為父組件的上下文
					let beforeSwitch = this.beforeSwitch.bind(this.$u.$parent.call(this))(index);
					// 判斷是否返回了promise
					if (!!beforeSwitch && typeof beforeSwitch.then === 'function') {
						await beforeSwitch.then(res => {
							// promise返回成功，
							this.switchTab(index);
						}).catch(err => {

						})
					} else if(beforeSwitch === true) {
						// 如果返回true
						this.switchTab(index);
					}
				} else {
					this.switchTab(index);
				}
			},
			// 切換tab
			switchTab(index) {
				// 發出事件和修改v-model綁定的值
				this.$emit('change', index);
				// 如果有配置pagePath屬性，使用uni.switchTab進行跳轉
				if(this.list[index].pagePath) {
					uni.switchTab({
						url: this.list[index].pagePath
					})
				} else {
					// 如果配置了papgePath屬性，將不會雙向綁定v-model傳入的value值
					// 因為這個模式下，不再需要v-model綁定的value值了，而是通過getCurrentPages()適配
					this.$emit('input', index);
				}
			},
			// 計算角標的right值
			getOffsetRight(count, isDot) {
				// 點類型，count大於9(兩位數)，分別設置不同的right值，避免位置太擠
				if(isDot) {
					return -20;
				} else if(count > 9) {
					return -40;
				} else {
					return -30;
				}
			},
			// 獲取凸起按鈕外層元素的left值，讓其水平居中
			getMidButtonLeft() {
				let windowWidth = this.$u.sys().windowWidth;
				// 由於安卓中css計算left: 50%的結果不準確，故用js計算
				this.midButtonLeft = (windowWidth / 2) + 'px';
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	.u-fixed-placeholder {
		/* #ifndef APP-NVUE */
		box-sizing: content-box;
		/* #endif */
	}

	.u-tabbar {

		&__content {
			@include vue-flex;
			align-items: center;
			position: relative;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 998;
			/* #ifndef APP-NVUE */
			box-sizing: content-box;
			/* #endif */

			&__circle__border {
				border-radius: 100%;
				width: 110rpx;
				height: 110rpx;
				top: -48rpx;
				position: absolute;
				z-index: 4;
				background-color: #ffffff;
				// 由於安卓的無能，導致只有3個tabbar item時，此css計算方式有誤差
				// 故使用js計算的形式來定位，此處不註釋，是因為js計算有延後，避免出現位置閃動
				left: 50%;
				transform: translateX(-50%);

				&:after {
					border-radius: 100px;
				}
			}

			&__item {
				flex: 1;
				justify-content: center;
				height: 100%;
				padding: 12rpx 0;
				@include vue-flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				&__button {
					position: absolute;
					top: 14rpx;
					left: 50%;
					transform: translateX(-50%);
				}

				&__text {
					color: $u-content-color;
					font-size: 26rpx;
					line-height: 28rpx;
					position: absolute;
					bottom: 14rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}

			&__circle {
				position: relative;
				@include vue-flex;
				flex-direction: column;
				justify-content: space-between;
				z-index: 10;
				/* #ifndef APP-NVUE */
				height: calc(100% - 1px);
				/* #endif */

				&__button {
					width: 90rpx;
					height: 90rpx;
					border-radius: 100%;
					@include vue-flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					background-color: #ffffff;
					top: -40rpx;
					left: 50%;
					z-index: 6;
					transform: translateX(-50%);
				}
			}
		}
	}
</style>
