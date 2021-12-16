<template>
	<view v-if="show" class="u-badge" :class="[
			isDot ? 'u-badge-dot' : '', 
			size == 'mini' ? 'u-badge-mini' : '',
			type ? 'u-badge--bg--' + type : ''
		]" :style="[{
			top: offset[0] + 'rpx',
			right: offset[1] + 'rpx',
			fontSize: fontSize + 'rpx',
			position: absolute ? 'absolute' : 'static',
			color: color,
			backgroundColor: bgColor
		}, boxStyle]"
	>
		{{showText}}
	</view>
</template>

<script>
	/**
	 * badge 角標
	 * @description 本組件一般用於展示頭像的地方，如個人中心，或者評論列表頁的用戶頭像展示等場所。
	 * @tutorial https://www.uviewui.com/components/badge.html
	 * @property {String Number} count 展示的數字，大於 overflowCount 時顯示為 ${overflowCount}+，為0且show-zero為false時隱藏
	 * @property {Boolean} is-dot 不展示數字，只有一個小點（默認false）
	 * @property {Boolean} absolute 組件是否絕對定位，為true時，offset參數才有效（默認true）
	 * @property {String Number} overflow-count 展示封頂的數字值（默認99）
	 * @property {String} type 使用預設的背景顏色（默認error）
	 * @property {Boolean} show-zero 當數值為 0 時，是否展示 Badge（默認false）
	 * @property {String} size Badge的尺寸，設為mini會得到小一號的Badge（默認default）
	 * @property {Array} offset 設置badge的位置偏移，格式為 [x, y]，也即設置的為top和right的值，單位rpx。absolute為true時有效（默認[20, 20]）
	 * @property {String} color 字體顏色（默認#ffffff）
	 * @property {String} bgColor 背景顏色，優先級比type高，如設置，type參數會失效
	 * @property {Boolean} is-center 組件中心點是否和父組件右上角重合，優先級比offset高，如設置，offset參數會失效（默認false）
	 * @example <u-badge type="error" count="7"></u-badge>
	 */
	export default {
		name: 'u-badge',
		props: {
			// primary,warning,success,error,info
			type: {
				type: String,
				default: 'error'
			},
			// default, mini
			size: {
				type: String,
				default: 'default'
			},
			//是否是圓點
			isDot: {
				type: Boolean,
				default: false
			},
			// 顯示的數值內容
			count: {
				type: [Number, String],
			},
			// 展示封頂的數字值
			overflowCount: {
				type: Number,
				default: 99
			},
			// 當數值為 0 時，是否展示 Badge
			showZero: {
				type: Boolean,
				default: false
			},
			// 位置偏移
			offset: {
				type: Array,
				default: () => {
					return [20, 20]
				}
			},
			// 是否開啟絕對定位，開啟了offset才會起作用
			absolute: {
				type: Boolean,
				default: true
			},
			// 字體大小
			fontSize: {
				type: [String, Number],
				default: '24'
			},
			// 字體演示
			color: {
				type: String,
				default: '#ffffff'
			},
			// badge的背景顏色
			bgColor: {
				type: String,
				default: ''
			},
			// 是否讓badge組件的中心點和父組件右上角重合，配置的話，offset將會失效
			isCenter: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			// 是否將badge中心與父組件右上角重合
			boxStyle() {
				let style = {};
				if(this.isCenter) {
					style.top = 0;
					style.right = 0;
					// Y軸-50%，意味著badge向上移動了badge自身高度一半，X軸50%，意味著向右移動了自身寬度一半
					style.transform = "translateY(-50%) translateX(50%)";
				} else {
					style.top = this.offset[0] + 'rpx';
					style.right = this.offset[1] + 'rpx';
					style.transform = "translateY(0) translateX(0)";
				}
				// 如果尺寸為mini，後接上scal()
				if(this.size == 'mini') {
					style.transform = style.transform + " scale(0.8)";
				}
				return style;
			},
			// isDot類型時，不顯示文字
			showText() {
				if(this.isDot) return '';
				else {
					if(this.count > this.overflowCount) return `${this.overflowCount}+`;
					else return this.count;
				}
			},
			// 是否顯示組件
			show() {
				// 如果count的值為0，並且showZero設置為false，不顯示組件
				if(this.count == 0 && this.showZero == false) return false;
				else return true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-badge {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		line-height: 24rpx;
		padding: 4rpx 8rpx;
		border-radius: 100rpx;
		z-index: 9;
		
		&--bg--primary {
			background-color: $u-type-primary;
		}
		
		&--bg--error {
			background-color: $u-type-error;
		}
		
		&--bg--success {
			background-color: $u-type-success;
		}
		
		&--bg--info {
			background-color: $u-type-info;
		}
		
		&--bg--warning {
			background-color: $u-type-warning;
		}
	}
	
	.u-badge-dot {
		height: 16rpx;
		width: 16rpx;
		border-radius: 100rpx;
		line-height: 1;
	}
	
	.u-badge-mini {
		transform: scale(0.8);
		transform-origin: center center;
	}
	
	// .u-primary {
	// 	background: $u-type-primary;
	// 	color: #fff;
	// }
	
	// .u-error {
	// 	background: $u-type-error;
	// 	color: #fff;
	// }
	
	// .u-warning {
	// 	background: $u-type-warning;
	// 	color: #fff;
	// }
	
	// .u-success {
	// 	background: $u-type-success;
	// 	color: #fff;
	// }
	
	// .u-black {
	// 	background: #585858;
	// 	color: #fff;
	// }
	
	.u-info {
		background-color: $u-type-info;
		color: #fff;
	}
</style>