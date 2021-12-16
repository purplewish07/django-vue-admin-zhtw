<template>
	<view class="u-dropdown">
		<view class="u-dropdown__menu" :style="{
			height: $u.addUnit(height)
		}" :class="{
			'u-border-bottom': borderBottom
		}">
			<view class="u-dropdown__menu__item" v-for="(item, index) in menuList" :key="index" @tap.stop="menuClick(index)">
				<view class="u-flex">
					<text class="u-dropdown__menu__item__text" :style="{
						color: item.disabled ? '#c0c4cc' : (index === current || highlightIndex == index) ? activeColor : inactiveColor,
						fontSize: $u.addUnit(titleSize)
					}">{{item.title}}</text>
					<view class="u-dropdown__menu__item__arrow" :class="{
						'u-dropdown__menu__item__arrow--rotate': index === current
					}">
						<u-icon :custom-style="{display: 'flex'}" :name="menuIcon" :size="$u.addUnit(menuIconSize)" :color="index === current || highlightIndex == index ? activeColor : '#c0c4cc'"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="u-dropdown__content" :style="[contentStyle, {
			transition: `opacity ${duration / 1000}s linear`,
			top: $u.addUnit(height),
			height: contentHeight + 'px'
		}]"
		 @tap="maskClick" @touchmove.stop.prevent>
			<view @tap.stop.prevent class="u-dropdown__content__popup" :style="[popupStyle]">
				<slot></slot>
			</view>
			<view class="u-dropdown__content__mask"></view>
		</view>
	</view>
</template>

<script>
	/**
	 * dropdown 下拉菜單
	 * @description 該組件一般用於向下展開菜單，同時可切換多個選項卡的場景
	 * @tutorial http://uviewui.com/components/dropdown.html
	 * @property {String} active-color 標題和選項卡選中的顏色（默認#2979ff）
	 * @property {String} inactive-color 標題和選項卡未選中的顏色（默認#606266）
	 * @property {Boolean} close-on-click-mask 點擊遮罩是否關閉菜單（默認true）
	 * @property {Boolean} close-on-click-self 點擊當前激活項標題是否關閉菜單（默認true）
	 * @property {String | Number} duration 選項卡展開和收起的過渡時間，單位ms（默認300）
	 * @property {String | Number} height 標題菜單的高度，單位任意（默認80）
	 * @property {String | Number} border-radius 菜單展開內容下方的圓角值，單位任意（默認0）
	 * @property {Boolean} border-bottom 標題菜單是否顯示下邊框（默認false）
	 * @property {String | Number} title-size 標題的字體大小，單位任意，數值默認為rpx單位（默認28）
	 * @event {Function} open 下拉菜單被打開時觸發
	 * @event {Function} close 下拉菜單被關閉時觸發
	 * @example <u-dropdown></u-dropdown>
	 */
	export default {
		name: 'u-dropdown',
		props: {
			// 菜單標題和選項的激活態顏色
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 菜單標題和選項的未激活態顏色
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 點擊遮罩是否關閉菜單
			closeOnClickMask: {
				type: Boolean,
				default: true
			},
			// 點擊當前激活項標題是否關閉菜單
			closeOnClickSelf: {
				type: Boolean,
				default: true
			},
			// 過渡時間
			duration: {
				type: [Number, String],
				default: 300
			},
			// 標題菜單的高度，單位任意，數值默認為rpx單位
			height: {
				type: [Number, String],
				default: 80
			},
			// 是否顯示下邊框
			borderBottom: {
				type: Boolean,
				default: false
			},
			// 標題的字體大小
			titleSize: {
				type: [Number, String],
				default: 28
			},
			// 下拉出來的內容部分的圓角值
			borderRadius: {
				type: [Number, String],
				default: 0
			},
			// 菜單右側的icon圖標
			menuIcon: {
				type: String,
				default: 'arrow-down'
			},
			// 菜單右側圖標的大小
			menuIconSize: {
				type: [Number, String],
				default: 26
			}
		},
		data() {
			return {
				showDropdown: true, // 是否打開下來菜單,
				menuList: [], // 顯示的菜單
				active: false, // 下拉菜單的狀態
				// 當前是第幾個菜單處於激活狀態，小程序中此處不能寫成false或者""，否則後續將current賦值為0，
				// 無能的TX沒有使用===而是使用==判斷，導致程序認為前後二者沒有變化，從而不會觸發視圖更新
				current: 99999,
				// 外層內容的樣式，初始時處於底層，且透明
				contentStyle: {
					zIndex: -1,
					opacity: 0
				},
				// 讓某個菜單保持高亮的狀態
				highlightIndex: 99999,
				contentHeight: 0
			}
		},
		computed: {
			// 下拉出來部分的樣式
			popupStyle() {
				let style = {};
				// 進行Y軸位移，展開狀態時，恢復原位。收齊狀態時，往上位移100%，進行隱藏
				style.transform = `translateY(${this.active ? 0 : '-100%'})`
				style['transition-duration'] = this.duration / 1000 + 's';
				style.borderRadius = `0 0 ${this.$u.addUnit(this.borderRadius)} ${this.$u.addUnit(this.borderRadius)}`;
				return style;
			}
		},
		created() {
			// 引用所有子組件(u-dropdown-item)的this，不能在data中聲明變量，否則在微信小程序會造成循環引用而報錯
			this.children = [];
		},
		mounted() {
			this.getContentHeight();
		},
		methods: {
			init() {
				// 當某個子組件內容變化時，觸發父組件的init，父組件再讓每一個子組件重新初始化一遍
				// 以保證數據的正確性
				this.menuList = [];
				this.children.map(child => {
					child.init();
				})
			},
			// 點擊菜單
			menuClick(index) {
				// 判斷是否被禁用
				if (this.menuList[index].disabled) return;
				// 如果點擊時的索引和當前激活項索引相同，意味著點擊了激活項，需要收起下拉菜單
				if (index === this.current && this.closeOnClickSelf) {
					this.close();
					// 等動畫結束後，再移除下拉菜單中的內容，否則直接移除，也就沒有下拉菜單收起的效果了
					setTimeout(() => {
						this.children[index].active = false;
					}, this.duration)
					return;
				}
				this.open(index);
			},
			// 打開下拉菜單
			open(index) {
				// 重置高亮索引，否則會造成多個菜單同時高亮
				// this.highlightIndex = 9999;
				// 展開時，設置下拉內容的樣式
				this.contentStyle = {
					zIndex: 11,
				}
				// 標記展開狀態以及當前展開項的索引
				this.active = true;
				this.current = index;
				// 歷遍所有的子元素，將索引匹配的項標記為激活狀態，因為子元素是通過v-if控制切換的
				// 之所以不是因display: none，是因為nvue沒有display這個屬性
				this.children.map((val, idx) => {
					val.active = index == idx ? true : false;
				})
				this.$emit('open', this.current);
			},
			// 設置下拉菜單處於收起狀態
			close() {
				this.$emit('close', this.current);
				// 設置為收起狀態，同時current歸位，設置為空字符串
				this.active = false;
				this.current = 99999;
				// 下拉內容的樣式進行調整，不透明度設置為0
				this.contentStyle = {
					zIndex: -1,
					opacity: 0
				}
			},
			// 點擊遮罩
			maskClick() {
				// 如果不允許點擊遮罩，直接返回
				if (!this.closeOnClickMask) return;
				this.close();
			},
			// 外部手動設置某個菜單高亮
			highlight(index = undefined) {
				this.highlightIndex = index !== undefined ? index : 99999;
			},
			// 獲取下拉菜單內容的高度
			getContentHeight() {
				// 這裡的原理為，因為dropdown組件是相對定位的，它的下拉出來的內容，必須給定一個高度
				// 才能讓遮罩佔滿菜單一下，直到屏幕底部的高度
				// this.$u.sys()為uView封裝的獲取設備信息的方法
				let windowHeight = this.$u.sys().windowHeight;
				this.$uGetRect('.u-dropdown__menu').then(res => {
					// 這裡獲取的是dropdown的尺寸，在H5上，uniapp獲取尺寸是有bug的(以前提出修復過，後來又出現了此bug，目前hx2.8.11版本)
					// H5端bug表現為元素尺寸的top值為導航欄底部到到元素的上邊沿的距離，但是元素的bottom值確是導航欄頂部到元素底部的距離
					// 二者是互相矛盾的，本質原因是H5端導航欄非原生，uni的開發者大意造成
					// 這裡取菜單欄的botton值合理的，不能用res.top，否則頁面會造成滾動
					this.contentHeight = windowHeight - res.bottom;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-dropdown {
		flex: 1;
		width: 100%;
		position: relative;

		&__menu {
			@include vue-flex;
			position: relative;
			z-index: 11;
			height: 80rpx;

			&__item {
				flex: 1;
				@include vue-flex;
				justify-content: center;
				align-items: center;

				&__text {
					font-size: 28rpx;
					color: $u-content-color;
				}

				&__arrow {
					margin-left: 6rpx;
					transition: transform .3s;
					align-items: center;
					@include vue-flex;

					&--rotate {
						transform: rotate(180deg);
					}
				}
			}
		}

		&__content {
			position: absolute;
			z-index: 8;
			width: 100%;
			left: 0px;
			bottom: 0;
			overflow: hidden;
			

			&__mask {
				position: absolute;
				z-index: 9;
				background: rgba(0, 0, 0, .3);
				width: 100%;
				left: 0;
				top: 0;
				bottom: 0;
			}

			&__popup {
				position: relative;
				z-index: 10;
				transition: all 0.3s;
				transform: translate3D(0, -100%, 0);
				overflow: hidden;
			}
		}

	}
</style>
