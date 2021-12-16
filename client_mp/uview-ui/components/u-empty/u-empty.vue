<template>
	<view class="u-empty" v-if="show" :style="{
		marginTop: marginTop + 'rpx'
	}">
		<u-icon
			:name="src ? src : 'empty-' + mode"
			:custom-style="iconStyle"
			:label="text ? text : icons[mode]"
			label-pos="bottom"
			:label-color="color"
			:label-size="fontSize"
			:size="iconSize"
			:color="iconColor"
			margin-top="14"
		></u-icon>
		<view class="u-slot-wrap">
			<slot name="bottom"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * empty 內容為空
	 * @description 該組件用於需要加載內容，但是加載的第一頁數據就為空，提示一個"沒有內容"的場景， 我們精心挑選了十幾個場景的圖標，方便您使用。
	 * @tutorial https://www.uviewui.com/components/empty.html
	 * @property {String} color 文字顏色（默認#c0c4cc）
	 * @property {String} text 文字提示（默認「無內容」）
	 * @property {String} src 自定義圖標路徑，如定義，mode參數會失效
	 * @property {String Number} font-size 提示文字的大小，單位rpx（默認28）
	 * @property {String} mode 內置的圖標，見官網說明（默認data）
	 * @property {String Number} img-width 圖標的寬度，單位rpx（默認240）
	 * @property {String} img-height 圖標的高度，單位rpx（默認auto）
	 * @property {String Number} margin-top 組件距離上一個元素之間的距離（默認0）
	 * @property {Boolean} show 是否顯示組件（默認true）
	 * @event {Function} click 點擊組件時觸發
	 * @event {Function} close 點擊關閉按鈕時觸發
	 * @example <u-empty text="所謂伊人，在水一方" mode="list"></u-empty>
	 */
	export default {
		name: "u-empty",
		props: {
			// 圖標路徑
			src: {
				type: String,
				default: ''
			},
			// 提示文字
			text: {
				type: String,
				default: ''
			},
			// 文字顏色
			color: {
				type: String,
				default: '#c0c4cc'
			},
			// 圖標的顏色
			iconColor: {
				type: String,
				default: '#c0c4cc'
			},
			// 圖標的大小
			iconSize: {
				type: [String, Number],
				default: 120
			},
			// 文字大小，單位rpx
			fontSize: {
				type: [String, Number],
				default: 26
			},
			// 選擇預置的圖標類型
			mode: {
				type: String,
				default: 'data'
			},
			//  圖標寬度，單位rpx
			imgWidth: {
				type: [String, Number],
				default: 120
			},
			// 圖標高度，單位rpx
			imgHeight: {
				type: [String, Number],
				default: 'auto'
			},
			// 是否顯示組件
			show: {
				type: Boolean,
				default: true
			},
			// 組件距離上一個元素之間的距離
			marginTop: {
				type: [String, Number],
				default: 0
			},
			iconStyle: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				icons: {
					car: '購物車為空',
					page: '頁面不存在',
					search: '沒有搜索結果',
					address: '沒有收貨地址',
					wifi: '沒有WiFi',
					order: '訂單為空',
					coupon: '沒有優惠券',
					favor: '暫無收藏',
					permission: '無權限',
					history: '無歷史記錄',
					news: '無新聞列表',
					message: '消息列表為空',
					list: '列表為空',
					data: '數據為空'
				},
				// icons: [{
				// 	icon: 'car',
				// 	text: '購物車為空'
				// },{
				// 	icon: 'page',
				// 	text: '頁面不存在'
				// },{
				// 	icon: 'search',
				// 	text: '沒有搜索結果'
				// },{
				// 	icon: 'address',
				// 	text: '沒有收貨地址'
				// },{
				// 	icon: 'wifi',
				// 	text: '沒有WiFi'
				// },{
				// 	icon: 'order',
				// 	text: '訂單為空'
				// },{
				// 	icon: 'coupon',
				// 	text: '沒有優惠券'
				// },{
				// 	icon: 'favor',
				// 	text: '暫無收藏'
				// },{
				// 	icon: 'permission',
				// 	text: '無權限'
				// },{
				// 	icon: 'history',
				// 	text: '無歷史記錄'
				// },{
				// 	icon: 'news',
				// 	text: '無新聞列表'
				// },{
				// 	icon: 'message',
				// 	text: '消息列表為空'
				// },{
				// 	icon: 'list',
				// 	text: '列表為空'
				// },{
				// 	icon: 'data',
				// 	text: '數據為空'
				// }],

			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-empty {
		@include vue-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.u-image {
		margin-bottom: 20rpx;
	}

	.u-slot-wrap {
		@include vue-flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}
</style>
