<template>
	<view class="u-tabs" :style="{
		background: bgColor
	}">
		<!-- $u.getRect()對組件根節點無效，因為寫了.in(this)，故這裡獲取內層接點尺寸 -->
		<view :id="id">
			<scroll-view scroll-x class="u-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
				<view class="u-scroll-box" :class="{'u-tabs-scorll-flex': !isScroll}">
					<view class="u-tab-item u-line-1" :id="'u-tab-item-' + index" v-for="(item, index) in list" :key="index" @tap="clickTab(index)"
					 :style="[tabItemStyle(index)]">
						<u-badge :count="item[count] || item['count'] || 0" :offset="offset" size="mini"></u-badge>
						{{ item[name] || item['name']}}
					</view>
					<view v-if="showBar" class="u-tab-bar" :style="[tabBarStyle]"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	/**
	 * tabs 標籤
	 * @description 該組件，是一個tabs標籤組件，在標籤多的時候，可以配置為左右滑動，標籤少的時候，可以禁止滑動。 該組件的一個特點是配置為滾動模式時，激活的tab會自動移動到組件的中間位置。
	 * @tutorial https://www.uviewui.com/components/tabs.html
	 * @property {Boolean} is-scroll tabs是否可以左右拖動（默認true）
	 * @property {Array} list 標籤數組，元素為對象，如[{name: '推薦'}]
	 * @property {String Number} current 指定哪個tab為激活狀態（默認0）
	 * @property {String Number} height 導航欄的高度，單位rpx（默認80）
	 * @property {String Number} font-size tab文字大小，單位rpx（默認30）
	 * @property {String Number} duration 滑塊移動一次所需的時間，單位秒（默認0.5）
	 * @property {String} active-color 滑塊和激活tab文字的顏色（默認#2979ff）
	 * @property {String} inactive-color tabs文字顏色（默認#303133）
	 * @property {String Number} bar-width 滑塊寬度，單位rpx（默認40）
	 * @property {Object} active-item-style 活動tabs item的樣式，對像形式
	 * @property {Object} bar-style 底部滑塊的樣式，對像形式
	 * @property {Boolean} show-bar 是否顯示底部的滑塊（默認true）
	 * @property {String Number} bar-height 滑塊高度，單位rpx（默認6）
	 * @property {String Number} item-width 標籤的寬度（默認auto）
	 * @property {String Number} gutter 單個tab標籤的左右內邊距之和，單位rpx（默認40）
	 * @property {String} bg-color tabs導航欄的背景顏色（默認#ffffff）
	 * @property {String} name 組件內部讀取的list參數中的屬性名（tab名稱），見官網說明（默認name）
	 * @property {String} count 組件內部讀取的list參數中的屬性名（badge徽標數），同name屬性的使用，見官網說明（默認count）
	 * @property {Array} offset 設置badge徽標數的位置偏移，格式為 [x, y]，也即設置的為top和right的值，單位rpx（默認[5, 20]）
	 * @property {Boolean} bold 激活選項的字體是否加粗（默認true）
	 * @event {Function} change 點擊標籤時觸發
	 * @example <u-tabs ref="tabs" :list="list" :is-scroll="false"></u-tabs>
	 */
	export default {
		name: "u-tabs",
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
			// 導航欄的高度和行高
			height: {
				type: [String, Number],
				default: 80
			},
			// 字體大小
			fontSize: {
				type: [String, Number],
				default: 30
			},
			// 過渡動畫時長, 單位ms
			duration: {
				type: [String, Number],
				default: 0.5
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
				type: [String, Number],
				default: 40
			},
			// 移動bar的高度
			barHeight: {
				type: [String, Number],
				default: 6
			},
			// 單個tab的左或有內邊距（左右相同）
			gutter: {
				type: [String, Number],
				default: 30
			},
			// 導航欄的背景顏色
			bgColor: {
				type: String,
				default: '#ffffff'
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
			},
			// 標籤的寬度
			itemWidth: {
				type: [Number, String],
				default: 'auto'
			}
		},
		data() {
			return {
				scrollLeft: 0, // 滾動scroll-view的左邊滾動距離
				tabQueryInfo: [], // 存放對tab菜單查詢後的節點信息
				componentWidth: 0, // 屏幕寬度，單位為px
				scrollBarLeft: 0, // 移動bar需要通過translateX()移動的距離
				parentLeft: 0, // 父元素(tabs組件)到屏幕左邊的距離
				id: this.$u.guid(), // id值
				currentIndex: this.current,
				barFirstTimeMove: true, // 滑塊第一次移動時(頁面剛生成時)，無需動畫，否則給人怪異的感覺
			};
		},
		watch: {
			// 監聽tab的變化，重新計算tab菜單的佈局信息，因為實際使用中菜單可能是通過
			// 後台獲取的（如新聞app頂部的菜單），獲取返回需要一定時間，所以list變化時，重新獲取佈局信息
			list(n, o) {
				// list變動時，重制內部索引，否則可能導致超出數組邊界的情況
				if(n.length !== o.length) this.currentIndex = 0;
				// 用$nextTick等待視圖更新完畢後再計算tab的局部信息，否則可能因為tab還沒生成就獲取，就會有問題
				this.$nextTick(() => {
					this.init();
				});
			},
			current: {
				immediate: true,
				handler(nVal, oVal) {
					// 視圖更新後再執行移動操作
					this.$nextTick(() => {
						this.currentIndex = nVal;
						this.scrollByIndex();
					});
				}
			},
		},
		computed: {
			// 移動bar的樣式
			tabBarStyle() {
				let style = {
					width: this.barWidth + 'rpx',
					transform: `translate(${this.scrollBarLeft}px, -100%)`,
					// 滑塊在頁面渲染後第一次滑動時，無需動畫效果
					'transition-duration': `${this.barFirstTimeMove ? 0 : this.duration }s`,
					'background-color': this.activeColor,
					height: this.barHeight + 'rpx',
					// 設置一個很大的值，它會自動取能用的最大值，不用高度的一半，是因為高度可能是單數，會有小數出現
					'border-radius': `${this.barHeight / 2}px`
				};
				Object.assign(style, this.barStyle);
				return style;
			},
			// tab的樣式
			tabItemStyle() {
				return (index) => {
					let style = {
						height: this.height + 'rpx',
						'line-height': this.height + 'rpx',
						'font-size': this.fontSize + 'rpx',
						'transition-duration': `${this.duration}s`,
						padding: this.isScroll ? `0 ${this.gutter}rpx` : '',
						flex: this.isScroll ? 'auto' : '1',
						width: this.$u.addUnit(this.itemWidth)
					};
					// 字體加粗
					if (index == this.currentIndex && this.bold) style.fontWeight = 'bold';
					if (index == this.currentIndex) {
						style.color = this.activeColor;
						// 給選中的tab item添加外部自定義的樣式
						style = Object.assign(style, this.activeItemStyle);
					} else {
						style.color = this.inactiveColor;
					}
					return style;
				}
			}
		},
		methods: {
			// 設置一個init方法，方便多處調用
			async init() {
				// 獲取tabs組件的尺寸信息
				let tabRect = await this.$uGetRect('#' + this.id);
				// tabs組件距離屏幕左邊的寬度
				this.parentLeft = tabRect.left;
				// tabs組件的寬度
				this.componentWidth = tabRect.width;
				this.getTabRect();
			},
			// 點擊某一個tab菜單
			clickTab(index) {
				// 點擊當前活動tab，不觸發事件
				if(index == this.currentIndex) return ;
				// 發送事件給父組件
				this.$emit('change', index);
			},
			// 查詢tab的佈局信息
			getTabRect() {
				// 創建節點查詢
				let query = uni.createSelectorQuery().in(this);
				// 歷遍所有tab，這裡是執行了查詢，最終使用exec()會一次性返回查詢的數組結果
				for (let i = 0; i < this.list.length; i++) {
					// 只要size和rect兩個參數
					query.select(`#u-tab-item-${i}`).fields({
						size: true,
						rect: true
					});
				}
				// 執行查詢，一次性獲取多個結果
				query.exec(
					function(res) {
						this.tabQueryInfo = res;
						// 初始化滾動條和移動bar的位置
						this.scrollByIndex();
					}.bind(this)
				);
			},
			// 滾動scroll-view，讓活動的tab處於屏幕的中間位置
			scrollByIndex() {
				// 當前活動tab的佈局信息，有tab菜單的width和left(為元素左邊界到父元素左邊界的距離)等信息
				let tabInfo = this.tabQueryInfo[this.currentIndex];
				if (!tabInfo) return;
				// 活動tab的寬度
				let tabWidth = tabInfo.width;
				// 活動item的左邊到tabs組件左邊的距離，用item的left減去tabs的left
				let offsetLeft = tabInfo.left - this.parentLeft;
				// 將活動的tabs-item移動到屏幕正中間，實際上是對scroll-view的移動
				let scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2;
				this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
				// 當前活動item的中點點到左邊的距離減去滑塊寬度的一半，即可得到滑塊所需的移動距離
				let left = tabInfo.left + tabInfo.width / 2 - this.parentLeft;
				// 計算當前活躍item到組件左邊的距離
				this.scrollBarLeft = left - uni.upx2px(this.barWidth) / 2;
				// 第一次移動滑塊的時候，barFirstTimeMove為true，放到延時中將其設置false
				// 延時是因為scrollBarLeft作用於computed計算時，需要一個過程需，否則導致出錯
				if(this.barFirstTimeMove == true) {
					setTimeout(() => {
						this.barFirstTimeMove = false;
					}, 100)
				}
			}
		},
		mounted() {
			this.init();
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	view,
	scroll-view {
		box-sizing: border-box;
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

	.u-scroll-box {
		position: relative;
		/* #ifdef MP-TOUTIAO */
		white-space: nowrap;
		/* #endif */
	}

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

	.u-tab-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		text-align: center;
		transition-property: background-color, color;
	}

	.u-tab-bar {
		position: absolute;
		bottom: 0;
	}

	.u-tabs-scorll-flex {
		@include vue-flex;
		justify-content: space-between;
	}
</style>
