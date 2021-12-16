<template>
	<view class="">
		<movable-area class="u-swipe-action" :style="{ backgroundColor: bgColor }">
			<movable-view
				class="u-swipe-view"
				@change="change"
				@touchend="touchend"
				@touchstart="touchstart"
				direction="horizontal"
				:disabled="disabled"
				:x="moveX"
				:style="{
					width: movableViewWidth ? movableViewWidth : '100%'
				}"
			>
				<view
					class="u-swipe-content"
					@tap.stop="contentClick"
				>
					<slot></slot>
				</view>
				<view class="u-swipe-del" v-if="showBtn" @tap.stop="btnClick(index)" :style="[btnStyle(item.style)]" v-for="(item, index) in options" :key="index">
					<view class="u-btn-text">{{ item.text }}</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
/**
 * swipeAction 左滑單元格
 * @description 該組件一般用於左滑喚出操作菜單的場景，用的最多的是左滑刪除操作。
 * @tutorial https://www.uviewui.com/components/swipeAction.html
 * @property {String} bg-color 整個組件背景顏色（默認#ffffff）
 * @property {Array} options 數組形式，可以配置背景顏色和文字
 * @property {String Number} index 標識符，點擊時候用於區分點擊了哪一個，用v-for循環時的index即可
 * @property {String Number} btn-width 按鈕寬度，單位rpx（默認180）
 * @property {Boolean} disabled 是否禁止某個swipeAction滑動（默認false）
 * @property {Boolean} show 打開或者關閉某個組件（默認false）
 * @event {Function} click 點擊組件時觸發
 * @event {Function} close 組件觸發關閉狀態時
 * @event {Function} content-click 點擊內容時觸發
 * @event {Function} open 組件觸發打開狀態時
 * @example <u-swipe-action btn-text="收藏">...</u-swipe-action>
 */
export default {
	name: 'u-swipe-action',
	props: {
		// index值，用於得知點擊刪除的是哪個按鈕
		index: {
			type: [Number, String],
			default: ''
		},
		// 滑動按鈕的寬度，單位為rpx
		btnWidth: {
			type: [String, Number],
			default: 180
		},
		// 是否禁止某個action滑動
		disabled: {
			type: Boolean,
			default: false
		},
		// 打開或者關閉組件
		show: {
			type: Boolean,
			default: false
		},
		// 組件背景顏色
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		// 是否使手機發生短促震動，目前只在iOS的微信小程序有效(2020-05-06)
		vibrateShort: {
			type: Boolean,
			default: false
		},
		// 按鈕操作參數
		options: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	watch: {
		show: {
			immediate: true,
			handler(nVal, oVal) {
				if (nVal) {
					this.open();
				} else {
					this.close();
				}
			}
		}
	},
	data() {
		return {
			moveX: 0, // movable-view元素在x軸上需要移動的目標移動距離，用於展開或收起滑動的按鈕
			scrollX: 0, // movable-view移動過程中產生的change事件中的x軸移動值
			status: false, // 滑動的狀態，表示當前是展開還是關閉按鈕的狀態
			movableAreaWidth: 0, // 滑動區域
			elId: this.$u.guid(), // id，用於通知另外組件關閉時的識別
			showBtn: false, // 剛開始渲染視圖時不顯示右邊的按鈕，避免視圖閃動
		};
	},
	computed: {
		movableViewWidth() {
			return this.movableAreaWidth + this.allBtnWidth + 'px';
		},
		innerBtnWidth() {
			return uni.upx2px(this.btnWidth);
		},
		allBtnWidth() {
			return uni.upx2px(this.btnWidth) * this.options.length;
		},
		btnStyle() {
			return style => {
				let css = {};
				style.width = this.btnWidth + 'rpx';
				return style;
			};
		}
	},
	mounted() {
		this.getActionRect();
	},
	methods: {
		// 點擊按鈕
		btnClick(index) {
			this.status = false;
			// this.index為點擊的幾個組件，index為點擊某個組件的第幾個按鈕(options數組的索引)
			this.$emit('click', this.index, index);
		},
		// movable-view元素移動事件
		change(e) {
			this.scrollX = e.detail.x;
		},
		// 關閉按鈕狀態
		close() {
			this.moveX = 0;
			this.status = false;
		},
		// 打開按鈕的狀態
		open() {
			if (this.disabled) return;
			this.moveX = -this.allBtnWidth;
			this.status = true;
		},
		// 用戶手指離開movable-view元素，停止觸摸
		touchend() {
			this.moveX = this.scrollX;
			// 停止觸摸時候，判斷當前是展開還是關閉狀態
			// 關閉狀態
			// 這一步很重要，需要先給this.moveX一個變化的隨機值，否則因為前後設置的為同一個值
			// props單向數據流的原因，導致movable-view元素不會發生變化，切記，詳見文檔：
			// https://uniapp.dcloud.io/use?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98
			this.$nextTick(function() {
				if (this.status == false) {
					// 關閉狀態左滑，產生的x軸位移為負值，也就是說滑動的距離大於按鈕的四分之一寬度，自動展開按鈕
					if (this.scrollX <= -this.allBtnWidth / 4) {
						this.moveX = -this.allBtnWidth; // 按鈕寬度的負值，即為展開狀態movable-view元素左滑的距離
						this.status = true; // 標誌當前為展開狀態
						this.emitOpenEvent();
						// 產生震動效果
						if (this.vibrateShort) uni.vibrateShort();
					} else {
						this.moveX = 0; // 如果距離沒有按鈕寬度的四分之一，自動收起
						this.status = false;
						this.emitCloseEvent();
					}
				} else {
					// 如果在打開的狀態下，右滑動的距離X軸偏移超過按鈕的四分之一(負值反過來的四分之三)，自動收起按鈕
					if (this.scrollX > (-this.allBtnWidth * 3) / 4) {
						this.moveX = 0;
						this.$nextTick(() => {
							this.moveX = 101;
						});
						this.status = false;
						this.emitCloseEvent();
					} else {
						this.moveX = -this.allBtnWidth;
						this.status = true;
						this.emitOpenEvent();
					}
				}
			});
		},
		emitOpenEvent() {
			this.$emit('open', this.index);
		},
		emitCloseEvent() {
			this.$emit('close', this.index);
		},
		// 開始觸摸
		touchstart() {},
		getActionRect() {
			this.$uGetRect('.u-swipe-action').then(res => {
				this.movableAreaWidth = res.width;
				// 等視圖更新完後，再顯示右邊的可滑動按鈕，防止這些按鈕會"閃一下"
				this.$nextTick(() => {
					this.showBtn = true;
				})
			});
		},
		// 點擊內容觸發事件
		contentClick() {
			// 點擊內容時，如果當前為打開狀態，收起組件
			if (this.status == true) {
				this.status = 'close';
				this.moveX = 0;
			}
			this.$emit('content-click', this.index);
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
	
.u-swipe-action {
	width: auto;
	height: initial;
	position: relative;
	overflow: hidden;
}

.u-swipe-view {
	@include vue-flex;
	height: initial;
	position: relative;
	/* 這一句很關鍵，覆蓋默認的絕對定位 */
}

.u-swipe-content {
	flex: 1;
}

.u-swipe-del {
	position: relative;
	font-size: 30rpx;
	color: #ffffff;
}

.u-btn-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
