<template>
	<view class="u-alert-tips" v-if="show" :class="[
		!show ? 'u-close-alert-tips': '',
		type ? 'u-alert-tips--bg--' + type + '-light' : '',
		type ? 'u-alert-tips--border--' + type + '-disabled' : '',
	]" :style="{
		backgroundColor: bgColor,
		borderColor: borderColor
	}">
		<view class="u-icon-wrap">
			<u-icon v-if="showIcon" :name="uIcon" :size="description ? 40 : 32" class="u-icon" :color="uIconType" :custom-style="iconStyle"></u-icon>
		</view>
		<view class="u-alert-content" @tap.stop="click">
			<view class="u-alert-title" :style="[uTitleStyle]">
				{{title}}
			</view>
			<view v-if="description" class="u-alert-desc" :style="[descStyle]">
				{{description}}
			</view>
		</view>
		<view class="u-icon-wrap">
			<u-icon @click="close" v-if="closeAble && !closeText" hoverClass="u-type-error-hover-color" name="close" color="#c0c4cc"
			 :size="22" class="u-close-icon" :style="{
				top: description ? '18rpx' : '24rpx'
			}"></u-icon>
		</view>
		<text v-if="closeAble && closeText" class="u-close-text" :style="{
			top: description ? '18rpx' : '24rpx'
		}">{{closeText}}</text>
	</view>
</template>

<script>
	/**
	 * alertTips 警告提示
	 * @description 警告提示，展現需要關注的信息
	 * @tutorial https://uviewui.com/components/alertTips.html
	 * @property {String} title 顯示的標題文字
	 * @property {String} description 輔助性文字，顏色比title淺一點，字號也小一點，可選
	 * @property {String} type 關閉按鈕(默認為叉號icon圖標)
	 * @property {String} icon 圖標名稱
	 * @property {Object} icon-style 圖標的樣式，對像形式
	 * @property {Object} title-style 標題的樣式，對像形式
	 * @property {Object} desc-style 描述的樣式，對像形式
	 * @property {String} close-able 用文字替代關閉圖標，close-able為true時有效
	 * @property {Boolean} show-icon 是否顯示左邊的輔助圖標
	 * @property {Boolean} show 顯示或隱藏組件
	 * @event {Function} click 點擊組件時觸發
	 * @event {Function} close 點擊關閉按鈕時觸發
	 */
	export default {
		name: 'u-alert-tips',
		props: {
			// 顯示文字
			title: {
				type: String,
				default: ''
			},
			// 主題，success/warning/info/error
			type: {
				type: String,
				default: 'warning'
			},
			// 輔助性文字
			description: {
				type: String,
				default: ''
			},
			// 是否可關閉
			closeAble: {
				type: Boolean,
				default: false
			},
			// 關閉按鈕自定義文本
			closeText: {
				type: String,
				default: ''
			},
			// 是否顯示圖標
			showIcon: {
				type: Boolean,
				default: false
			},
			// 文字顏色，如果定義了color值，icon會失效
			color: {
				type: String,
				default: ''
			},
			// 背景顏色
			bgColor: {
				type: String,
				default: ''
			},
			// 邊框顏色
			borderColor: {
				type: String,
				default: ''
			},
			// 是否顯示
			show: {
				type: Boolean,
				default: true
			},
			// 左邊顯示的icon
			icon: {
				type: String,
				default: ''
			},
			// icon的樣式
			iconStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			// 標題的樣式
			titleStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			// 描述文字的樣式
			descStyle: {
				type: Object,
				default() {
					return {}
				}
			},
		},
		data() {
			return {
			}
		},
		computed: {
			uTitleStyle() {
				let style = {};
				// 如果有描述文字的話，標題進行加粗
				style.fontWeight = this.description ? 500 : 'normal';
				// 將用戶傳入樣式對像和style合併，傳入的優先級比style高，同屬性會被覆蓋
				return this.$u.deepMerge(style, this.titleStyle);
			},
			uIcon() {
				// 如果有設置icon名稱就使用，否則根據type主題，推定一個默認的圖標
				return this.icon ? this.icon : this.$u.type2icon(this.type);
			},
			uIconType() {
				// 如果有設置圖標的樣式，優先使用，沒有的話，則用type的樣式
				return Object.keys(this.iconStyle).length ? '' : this.type;
			}
		},
		methods: {
			// 點擊內容
			click() {
				this.$emit('click');
			},
			// 點擊關閉按鈕
			close() {
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-alert-tips {
		@include vue-flex;
		align-items: center;
		padding: 16rpx 30rpx;
		border-radius: 8rpx;
		position: relative;
		transition: all 0.3s linear;
		border: 1px solid #fff;
		
		&--bg--primary-light {
			background-color: $u-type-primary-light;
		}
		
		&--bg--info-light {
			background-color: $u-type-info-light;
		}
		
		&--bg--success-light {
			background-color: $u-type-success-light;
		}
		
		&--bg--warning-light {
			background-color: $u-type-warning-light;
		}
		
		&--bg--error-light {
			background-color: $u-type-error-light;
		}
		
		&--border--primary-disabled {
			border-color: $u-type-primary-disabled;
		}
		
		&--border--success-disabled {
			border-color: $u-type-success-disabled;
		}
		
		&--border--error-disabled {
			border-color: $u-type-error-disabled;
		}
		
		&--border--warning-disabled {
			border-color: $u-type-warning-disabled;
		}
		
		&--border--info-disabled {
			border-color: $u-type-info-disabled;
		}
	}

	.u-close-alert-tips {
		opacity: 0;
		visibility: hidden;
	}

	.u-icon {
		margin-right: 16rpx;
	}

	.u-alert-title {
		font-size: 28rpx;
		color: $u-main-color;
	}

	.u-alert-desc {
		font-size: 26rpx;
		text-align: left;
		color: $u-content-color;
	}

	.u-close-icon {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.u-close-hover {
		color: red;
	}
	
	.u-close-text {
		font-size: 24rpx;
		color: $u-tips-color;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		line-height: 1;
	}
</style>
