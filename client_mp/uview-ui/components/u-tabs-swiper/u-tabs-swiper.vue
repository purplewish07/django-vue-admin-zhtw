<template>
	<view class="u-tabs" :style="{
			zIndex: zIndex,
			background: bgColor
		}">
		<scroll-view scroll-x class="u-scroll-view" :scroll-left="scrollLeft" scroll-with-animation :style="{ zIndex: zIndex + 1 }">
			<view class="u-tabs-scroll-box" :class="{'u-tabs-scorll-flex': !isScroll}">
				<view class="u-tabs-item" :style="[tabItemStyle(index)]"
				 v-for="(item, index) in getTabs" :key="index" :class="[preId + index]" @tap="emit(index)">
					<u-badge :count="item[count] || item['count'] || 0" :offset="offset" size="mini"></u-badge>
					{{ item[name] || item['name']}}
				</view>
				<view v-if="showBar" class="u-scroll-bar" :style="[tabBarStyle]"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import colorGradient from '../../libs/function/colorGradient';
	let color = colorGradient;
	const { windowWidth } = uni.getSystemInfoSync();
	const preId = 'UEl_';

	/**
	 * tabsSwiper 全屏選項卡
	 * @description 該組件內部實現主要依托於uniapp的scroll-view和swiper組件，主要特色是切換過程中，tabsSwiper文字的顏色可以漸變，底部滑塊可以 跟隨式滑動，活動tab滾動居中等。應用場景可以用於需要左右切換頁面，比如商城的訂單中心(待收貨-待付款-待評價-已退貨)等應用場景。
	 * @tutorial https://www.uviewui.com/components/tabsSwiper.html
	 * @property {Boolean} is-scroll tabs是否可以左右拖動（默認true）
	 * @property {Array} list 標籤數組，元素為對象，如[{name: '推薦'}]
	 * @property {String Number} current 指定哪個tab為激活狀態（默認0）
	 * @property {String Number} height 導航欄的高度，單位rpx（默認80）
	 * @property {String Number} font-size tab文字大小，單位rpx（默認30）
	 * @property {String Number} swiper-width tabs組件外部swiper的寬度，默認為屏幕寬度，單位rpx（默認750）
	 * @property {String} active-color 滑塊和激活tab文字的顏色（默認#2979ff）
	 * @property {String} inactive-color tabs文字顏色（默認#303133）
	 * @property {String Number} bar-width 滑塊寬度，單位rpx（默認40）
	 * @property {String Number} bar-height 滑塊高度，單位rpx（默認6）
	 * @property {Object} bar-style 底部滑塊的樣式，對像形式
	 * @property {Object} active-item-style 活動tabs item的樣式，對像形式
	 * @property {Boolean} show-bar 是否顯示底部的滑塊（默認true）
	 * @property {String Number} gutter 單個tab標籤的左右內邊距之和，單位rpx（默認40）
	 * @property {String} bg-color tabs導航欄的背景顏色（默認#ffffff）
	 * @property {String} name 組件內部讀取的list參數中的屬性名，見官網說明（默認name）
	 * @property {String} count 組件內部讀取的list參數中的屬性名（badge徽標數），同name屬性的使用，見官網說明（默認count）
	 * @property {Array} offset 設置badge徽標數的位置偏移，格式為 [x, y]，也即設置的為top和right的值，單位rpx（默認[5, 20]）
	 * @property {Boolean} bold 激活選項的字體是否加粗（默認true）
	 * @event {Function} change 點擊標籤時觸發
	 * @example <u-tabs-swiper ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
	 */
	export default {
		name: "u-tabs-swiper",
		props: {
			// 導航菜單是否需要滾動，如只有2或者3個的時候，就不需要滾動了，此時使用flex平分tab的寬度
			isScroll: {
				type: Boolean,
				default: true
			},
			//需循環的標籤列表
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 當前活動tab的索引
			current: {
				type: [Number, String],
				default: 0
			},
			// 導航欄的高度和行高，單位rpx
			height: {
				type: [Number, String],
				default: 80
			},
			// 字體大小，單位rpx
			fontSize: {
				type: [Number, String],
				default: 30
			},
			// 過渡動畫時長, 單位s
			// duration: {
			// 	type: [Number, String],
			// 	default: 0.5
			// },
			swiperWidth: {
				//line3生效, 外部swiper的寬度, 單位rpx
				type: [String, Number],
				default: 750
			},
			// 選中項的主題顏色
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 未選中項的顏色
			inactiveColor: {
				type: String,
				default: '#303133'
			},
			// 菜單底部移動的bar的寬度，單位rpx
			barWidth: {
				type: [Number, String],
				default: 40
			},
			// 移動bar的高度
			barHeight: {
				type: [Number, String],
				default: 6
			},
			// 單個tab的左或右內邊距（各佔一半），單位rpx
			gutter: {
				type: [Number, String],
				default: 40
			},
			// 如果是絕對定位，添加z-index值
			zIndex: {
				type: [Number, String],
				default: 1
			},
			// 導航欄的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			//滾動至中心目標類型
			autoCenterMode: {
				type: String,
				default: 'window'
			},
			// 讀取傳入的數組對象的屬性(tab名稱)
			name: {
				type: String,
				default: 'name'
			},
			// 讀取傳入的數組對象的屬性(徽標數)
			count: {
				type: String,
				default: 'count'
			},
			// 徽標數位置偏移
			offset: {
				type: Array,
				default: () => {
					return [5, 20]
				}
			},
			// 活動tab字體是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// 當前活動tab item的樣式
			activeItemStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			// 是否顯示底部的滑塊
			showBar: {
				type: Boolean,
				default: true
			},
			// 底部滑塊的自定義樣式
			barStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				scrollLeft: 0, // 滾動scroll-view的左邊滾動距離
				tabQueryInfo: [], // 存放對tab菜單查詢後的節點信息
				windowWidth: 0, // 屏幕寬度，單位為px
				//scrollBarLeft: 0, // 移動bar需要通過translateX()移動的距離
				animationFinishCurrent: this.current,
				componentsWidth: 0,
				line3AddDx: 0,
				line3Dx: 0,
				preId,
				sW: 0,
				tabsInfo: [],
				colorGradientArr: [],
				colorStep: 100 // 兩個顏色之間的漸變等分
			};
		},
		computed: {
			// 獲取當前活躍的current值
			getCurrent() {
				const current = Number(this.current);
				// 判斷是否超出邊界
				if (current > this.getTabs.length - 1) {
					return this.getTabs.length - 1;
				}
				if (current < 0) return 0;
				return current;
			},
			getTabs() {
				return this.list;
			},
			// 滑塊需要移動的距離
			scrollBarLeft() {
				return Number(this.line3Dx) + Number(this.line3AddDx);
			},
			// 滑塊的寬度轉為px單位
			barWidthPx() {
				return uni.upx2px(this.barWidth);
			},
			// tab的樣式
			tabItemStyle() {
				return (index) => {
					let style = {
						height: this.height + 'rpx',
						lineHeight: this.height + 'rpx',
						padding: `0 ${this.gutter / 2}rpx`,
						color: this.tabsInfo.length > 0 ? (this.tabsInfo[index] ? this.tabsInfo[index].color : this.activeColor) : this.inactiveColor,
						fontSize: this.fontSize + 'rpx',
						zIndex: this.zIndex + 2,
						fontWeight: (index == this.getCurrent && this.bold) ? 'bold' : 'normal'
					};
					if(index == this.getCurrent) {
						// 給選中的tab item添加外部自定義的樣式
						style = Object.assign(style, this.activeItemStyle);
					}
					return style;
				}
			},
			// 底部滑塊的樣式
			tabBarStyle() {
				let style = {
					width: this.barWidthPx + 'px',
					height: this.barHeight + 'rpx',
					borderRadius: '100px',
					backgroundColor: this.activeColor,
					left: this.scrollBarLeft + 'px'
				};
				return Object.assign(style, this.barStyle);
			}
		},
		watch: {
			current(n, o) {
				this.change(n);
				this.setFinishCurrent(n);
			},
			list() {
				this.$nextTick(() => {
					this.init();
				})
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				this.countPx();
				await this.getTabsInfo();
				this.countLine3Dx();
				this.getQuery(() => {
					this.setScrollViewToCenter();
				});
				// 顏色漸變過程數組
				this.colorGradientArr = color.colorGradient(this.inactiveColor, this.activeColor, this.colorStep);
			},
			// 獲取各個tab的節點信息
			getTabsInfo() {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery().in(this);
					for (let i = 0; i < this.list.length; i++) {
						view.select('.' + preId + i).boundingClientRect();
					}
					view.exec(res => {
						const arr = [];
						for (let i = 0; i < res.length; i++) {
							// 給每個tab添加其文字顏色屬性
							res[i].color = this.inactiveColor;
							// 當前tab直接賦予activeColor
							if (i == this.getCurrent) res[i].color = this.activeColor;
							arr.push(res[i]);
						}
						this.tabsInfo = arr;
						resolve();
					});
				})
			},
			// 當swiper滑動結束，計算滑塊最終要停留的位置
			countLine3Dx() {
				const tab = this.tabsInfo[this.animationFinishCurrent];
				// 讓滑塊中心點和當前tab中心重合
				if (tab) this.line3Dx = tab.left + tab.width / 2 - this.barWidthPx / 2 - this.tabsInfo[0].left;
			},
			countPx() {
				// swiper寬度由rpx轉為px單位，因為dx等，都是px單位
				this.sW = uni.upx2px(Number(this.swiperWidth));
			},
			emit(index) {
				this.$emit('change', index);
			},
			change() {
				this.setScrollViewToCenter();
			},
			getQuery(cb) {
				try {
					let view = uni.createSelectorQuery().in(this).select('.u-tabs');
					view.fields({
							size: true
						},
						data => {
							if (data) {
								this.componentsWidth = data.width;
								if (cb && typeof cb === 'function') cb(data);
							} else {
								this.getQuery(cb);
							}
						}
					).exec();
				} catch (e) {
					this.componentsWidth = windowWidth;
				}
			},
			// 把活動tab移動到屏幕中心點
			setScrollViewToCenter() {
				let tab;
				tab = this.tabsInfo[this.animationFinishCurrent];
				if (tab) {
					let tabCenter = tab.left + tab.width / 2;
					let fatherWidth;
					// 活動tab移動到中心時，以屏幕還是tab組件為寬度為基準
					if (this.autoCenterMode === 'window') {
						fatherWidth = windowWidth;
					} else {
						fatherWidth = this.componentsWidth;
					}
					this.scrollLeft = tabCenter - fatherWidth / 2;
				}
			},
			setDx(dx) {
				let nextTabIndex = dx > 0 ? this.animationFinishCurrent + 1 : this.animationFinishCurrent - 1;
				// 判斷索引是否超出邊界
				nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex;
				nextTabIndex = nextTabIndex >= this.list.length ? this.list.length - 1 : nextTabIndex;
				const tab = this.tabsInfo[nextTabIndex];
				// 當前tab中心點x軸坐標
				let nowTab = this.tabsInfo[this.animationFinishCurrent];
				let nowTabX = nowTab.left + nowTab.width / 2;
				// 下一個tab
				let nextTab = this.tabsInfo[nextTabIndex];
				let nextTabX = nextTab.left + nextTab.width / 2;
				// 兩個tab之間的距離，因為下一個tab可能在當前tab的左邊或者右邊，取絕對值即可
				let distanceX = Math.abs(nextTabX - nowTabX);
				this.line3AddDx = (dx / this.sW) * distanceX;
				this.setTabColor(this.animationFinishCurrent, nextTabIndex, dx);
			},
			// 設置tab的顏色
			setTabColor(nowTabIndex, nextTabIndex, dx) {
				let colorIndex = Math.abs(Math.ceil((dx / this.sW) * 100));
				let colorLength = this.colorGradientArr.length;
				// 處理超出索引邊界的情況
				colorIndex = colorIndex >= colorLength ? colorLength - 1 : colorIndex <= 0 ? 0 : colorIndex;
				// 設置下一個tab的顏色
				this.tabsInfo[nextTabIndex].color = this.colorGradientArr[colorIndex];
				// 設置當前tab的顏色
				this.tabsInfo[nowTabIndex].color = this.colorGradientArr[colorLength - 1 - colorIndex];
			},
			// swiper結束滑動
			setFinishCurrent(current) {
				// 如果滑動的索引不一致，修改tab顏色變化，因為可能會有直接點擊tab的情況
				this.tabsInfo.map((val, index) => {
					if (current == index) val.color = this.activeColor;
					else val.color = this.inactiveColor;
					return val;
				});
				this.line3AddDx = 0;
				this.animationFinishCurrent = current;
				this.countLine3Dx();
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	view,
	scroll-view {
		box-sizing: border-box;
	}

	.u-tabs {
		width: 100%;
		transition-property: background-color, color;
	}

	/* #ifndef APP-NVUE */
	::-webkit-scrollbar,
	::-webkit-scrollbar,
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	/* #endif */

	/* #ifdef H5 */
	// 通過樣式穿透，隱藏H5下，scroll-view下的滾動條
	scroll-view ::v-deep ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* #endif */

	.u-scroll-view {
		width: 100%;
		white-space: nowrap;
		position: relative;
	}

	.u-tabs-scroll-box {
		position: relative;
	}

	.u-tabs-scorll-flex {
		@include vue-flex;
		justify-content: space-between;
	}

	.u-tabs-scorll-flex .u-tabs-item {
		flex: 1;
	}

	.u-tabs-item {
		position: relative;
		display: inline-block;
		text-align: center;
		transition-property: background-color, color, font-weight;
	}

	.content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.boxStyle {
		pointer-events: none;
		position: absolute;
		transition-property: all;
	}

	.boxStyle2 {
		pointer-events: none;
		position: absolute;
		bottom: 0;
		transition-property: all;
		transform: translateY(-100%);
	}

	.itemBackgroundBox {
		pointer-events: none;
		position: absolute;
		top: 0;
		transition-property: left, background-color;
		@include vue-flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.itemBackground {
		height: 100%;
		width: 100%;
		transition-property: all;
	}

	.u-scroll-bar {
		position: absolute;
		bottom: 4rpx;
	}
</style>
