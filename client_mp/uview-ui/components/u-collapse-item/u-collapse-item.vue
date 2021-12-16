<template>
	<view class="u-collapse-item" :style="[itemStyle]">
		<view :hover-stay-time="200" class="u-collapse-head" @tap.stop="headClick" :hover-class="hoverClass" :style="[headStyle]">
			<block v-if="!$slots['title-all']">
				<view v-if="!$slots['title']" class="u-collapse-title u-line-1" :style="[{ textAlign: align ? align : 'left' },
					isShow && activeStyle && !arrow ? activeStyle : '']">
					{{ title }}
				</view>
				<slot v-else name="title" />
				<view class="u-icon-wrap">
					<u-icon v-if="arrow" :color="arrowColor" :class="{ 'u-arrow-down-icon-active': isShow }"
					 class="u-arrow-down-icon" name="arrow-down"></u-icon>
				</view>
			</block>
			<slot v-else name="title-all" />
		</view>
		<view class="u-collapse-body" :style="[{
				height: isShow ? height + 'px' : '0'
			}]">
			<view class="u-collapse-content" :id="elId" :style="[bodyStyle]">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * collapseItem 手風琴Item
	 * @description 通過折疊面板收納內容區域（搭配u-collapse使用）
	 * @tutorial https://www.uviewui.com/components/collapse.html
	 * @property {String} title 面板標題
	 * @property {String Number} index 主要用於事件的回調，標識那個Item被點擊
	 * @property {Boolean} disabled 面板是否可以打開或收起（默認false）
	 * @property {Boolean} open 設置某個面板的初始狀態是否打開（默認false）
	 * @property {String Number} name 唯一標識符，如不設置，默認用當前collapse-item的索引值
	 * @property {String} align 標題的對齊方式（默認left）
	 * @property {Object} active-style 不顯示箭頭時，可以添加當前選擇的collapse-item活動樣式，對像形式
	 * @event {Function} change 某個item被打開或者收起時觸發
	 * @example <u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</u-collapse-item>
	 */
	export default {
		name: "u-collapse-item",
		props: {
			// 標題
			title: {
				type: String,
				default: ''
			},
			// 標題的對齊方式
			align: {
				type: String,
				default: 'left'
			},
			// 是否可以點擊收起
			disabled: {
				type: Boolean,
				default: false
			},
			// collapse顯示與否
			open: {
				type: Boolean,
				default: false
			},
			// 唯一標識符
			name: {
				type: [Number, String],
				default: ''
			},
			//活動樣式
			activeStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 標識當前為第幾個
			index: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				isShow: false,
				elId: this.$u.guid(),
				height: 0, // body內容的高度
				headStyle: {}, // 頭部樣式，對像形式
				bodyStyle: {}, // 主體部分樣式
				itemStyle: {}, // 每個item的整體樣式
				arrowColor: '', // 箭頭的顏色
				hoverClass: '', // 頭部按下時的效果樣式類
				arrow: true, // 是否顯示右側箭頭
				
			};
		},
		watch: {
			open(val) {
				this.isShow = val;
			}
		},
		created() {
			this.parent = false;
			// 獲取u-collapse的信息，放在u-collapse是為了方便，不用每個u-collapse-item寫一遍
			this.isShow = this.open;
		},
		methods: {
			// 異步獲取內容，或者動態修改了內容時，需要重新初始化
			init() {
				this.parent = this.$u.$parent.call(this, 'u-collapse');
				if(this.parent) {
					this.nameSync = this.name ? this.name : this.parent.childrens.length;
					this.parent.childrens.push(this);
					this.headStyle = this.parent.headStyle;
					this.bodyStyle = this.parent.bodyStyle;
					this.arrowColor = this.parent.arrowColor;
					this.hoverClass = this.parent.hoverClass;
					this.arrow = this.parent.arrow;
					this.itemStyle = this.parent.itemStyle;
				}
				this.$nextTick(() => {
					this.queryRect();
				});
			},
			// 點擊collapsehead頭部
			headClick() {
				if (this.disabled) return;
				if (this.parent && this.parent.accordion == true) {
					this.parent.childrens.map(val => {
						// 自身不設置為false，因為後面有this.isShow = !this.isShow;處理了
						if (this != val) {
							val.isShow = false;
						}
					});
				}

				this.isShow = !this.isShow;
				// 觸發本組件的事件
				this.$emit('change', {
					index: this.index,
					show: this.isShow
				})
				// 只有在打開時才發出事件
				if (this.isShow) this.parent && this.parent.onChange();
				this.$forceUpdate();
			},
			// 查詢內容高度
			queryRect() {
				// $uGetRect為uView自帶的節點查詢簡化方法，詳見文檔介紹：https://www.uviewui.com/js/getRect.html
				// 組件內部一般用this.$uGetRect，對外的為this.$u.getRect，二者功能一致，名稱不同
				this.$uGetRect('#' + this.elId).then(res => {
					this.height = res.height;
				})
			}
		},
		mounted() {
			this.init();
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-collapse-head {
		position: relative;
		@include vue-flex;
		justify-content: space-between;
		align-items: center;
		color: $u-main-color;
		font-size: 30rpx;
		line-height: 1;
		padding: 24rpx 0;
		text-align: left;
	}

	.u-collapse-title {
		flex: 1;
		overflow: hidden;
	}

	.u-arrow-down-icon {
		transition: all 0.3s;
		margin-right: 20rpx;
		margin-left: 14rpx;
	}

	.u-arrow-down-icon-active {
		transform: rotate(180deg);
		transform-origin: center center;
	}

	.u-collapse-body {
		overflow: hidden;
		transition: all 0.3s;
	}

	.u-collapse-content {
		overflow: hidden;
		font-size: 28rpx;
		color: $u-tips-color;
		text-align: left;
	}
</style>
