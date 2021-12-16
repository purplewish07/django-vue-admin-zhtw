<template>
	<u-popup mode="bottom" :border-radius="borderRadius" :popup="false" v-model="value" :maskCloseAble="maskCloseAble"
	    length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="popupClose" :z-index="uZIndex">
		<view class="u-tips u-border-bottom" v-if="tips.text" :style="[tipsStyle]">
			{{tips.text}}
		</view>
		<block v-for="(item, index) in list" :key="index">
			<view 
				@touchmove.stop.prevent 
				@tap="itemClick(index)" 
				:style="[itemStyle(index)]" 
				class="u-action-sheet-item u-line-1" 
				:class="[index < list.length - 1 ? 'u-border-bottom' : '']"
				:hover-stay-time="150"
			>
				<text>{{item.text}}</text>
				<text class="u-action-sheet-item__subtext u-line-1" v-if="item.subText">{{item.subText}}</text>
			</view>
		</block>
		<view class="u-gab" v-if="cancelBtn">
		</view>
		<view @touchmove.stop.prevent class="u-actionsheet-cancel u-action-sheet-item" hover-class="u-hover-class"
		    :hover-stay-time="150" v-if="cancelBtn" @tap="close">{{cancelText}}</view>
	</u-popup>
</template>

<script>
	/**
	 * actionSheet 操作菜單
	 * @description 本組件用於從底部彈出一個操作菜單，供用戶選擇並返回結果。本組件功能類似於uni的uni.showActionSheetAPI，配置更加靈活，所有平台都表現一致。
	 * @tutorial https://www.uviewui.com/components/actionSheet.html
	 * @property {Array<Object>} list 按鈕的文字數組，見官方文檔示例
	 * @property {Object} tips 頂部的提示文字，見官方文檔示例
	 * @property {String} cancel-text 取消按鈕的提示文字
	 * @property {Boolean} cancel-btn 是否顯示底部的取消按鈕（默認true）
	 * @property {Number String} border-radius 彈出部分頂部左右的圓角值，單位rpx（默認0）
	 * @property {Boolean} mask-close-able 點擊遮罩是否可以關閉（默認true）
	 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配（默認false）
	 * @property {Number String} z-index z-index值（默認1075）
	 * @property {String} cancel-text 取消按鈕的提示文字
	 * @event {Function} click 點擊ActionSheet列表項時觸發
	 * @event {Function} close 點擊取消按鈕時觸發
	 * @example <u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
	 */
	export default {
		name: "u-action-sheet",
		props: {
			// 點擊遮罩是否可以關閉actionsheet
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 按鈕的文字數組，可以自定義顏色和字體大小，字體單位為rpx
			list: {
				type: Array,
				default () {
					// 如下
					// return [{
					// 	text: '確定',
					// 	color: '',
					// 	fontSize: ''
					// }]
					return [];
				}
			},
			// 頂部的提示文字
			tips: {
				type: Object,
				default () {
					return {
						text: '',
						color: '',
						fontSize: '26'
					}
				}
			},
			// 底部的取消按鈕
			cancelBtn: {
				type: Boolean,
				default: true
			},
			// 是否開啟底部安全區適配，開啟的話，會在iPhoneX機型底部添加一定的內邊距
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 通過雙向綁定控制組件的彈出與收起
			value: {
				type: Boolean,
				default: false
			},
			// 彈出的頂部圓角值
			borderRadius: {
				type: [String, Number],
				default: 0
			},
			// 彈出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			},
			// 取消按鈕的文字提示
			cancelText: {
				type: String,
				default: '取消'
			}
		},
		computed: {
			// 頂部提示的樣式
			tipsStyle() {
				let style = {};
				if (this.tips.color) style.color = this.tips.color;
				if (this.tips.fontSize) style.fontSize = this.tips.fontSize + 'rpx';
				return style;
			},
			// 操作項目的樣式
			itemStyle() {
				return (index) => {
					let style = {};
					if (this.list[index].color) style.color = this.list[index].color;
					if (this.list[index].fontSize) style.fontSize = this.list[index].fontSize + 'rpx';
					// 選項被禁用的樣式
					if (this.list[index].disabled) style.color = '#c0c4cc';
					return style;
				}
			},
			uZIndex() {
				// 如果用戶有傳遞z-index值，優先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			// 點擊取消按鈕
			close() {
				// 發送input事件，並不會作用於父組件，而是要設置組件內部通過props傳遞的value參數
				// 這是一個vue發送事件的特殊用法
				this.popupClose();
				this.$emit('close');
			},
			// 彈窗關閉
			popupClose() {
				this.$emit('input', false);
			},
			// 點擊某一個item
			itemClick(index) {
				// disabled的項禁止點擊
				if(this.list[index].disabled) return;
				this.$emit('click', index);
				this.$emit('input', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-tips {
		font-size: 26rpx;
		text-align: center;
		padding: 34rpx 0;
		line-height: 1;
		color: $u-tips-color;
	}

	.u-action-sheet-item {
		@include vue-flex;;
		line-height: 1;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		padding: 34rpx 0;
		flex-direction: column;
	}
	
	.u-action-sheet-item__subtext {
		font-size: 24rpx;
		color: $u-tips-color;
		margin-top: 20rpx;
	}

	.u-gab {
		height: 12rpx;
		background-color: rgb(234, 234, 236);
	}

	.u-actionsheet-cancel {
		color: $u-main-color;
	}
</style>
