<template>
	<view :style="[customStyle]" class="u-icon" @tap="click" :class="['u-icon--' + labelPos]">
		<image class="u-icon__img" v-if="isImg" :src="name" :mode="imgMode" :style="[imgStyle]"></image>
		<text v-else class="u-icon__icon" :class="customClass" :style="[iconStyle]" :hover-class="hoverClass"
			  @touchstart="touchstart">
			<text v-if="showDecimalIcon" :style="[decimalIconStyle]" :class="decimalIconClass" :hover-class="hoverClass"
				  class="u-icon__decimal">
			</text>
		</text>
		<!-- 這裡進行空字符串判斷，如果僅僅是v-if="label"，可能會出現傳遞0的時候，結果也無法顯示 -->
		<text v-if="label !== ''" class="u-icon__label" :style="{
			color: labelColor,
			fontSize: $u.addUnit(labelSize),
			marginLeft: labelPos == 'right' ? $u.addUnit(marginLeft) : 0,
			marginTop: labelPos == 'bottom' ? $u.addUnit(marginTop) : 0,
			marginRight: labelPos == 'left' ? $u.addUnit(marginRight) : 0,
			marginBottom: labelPos == 'top' ? $u.addUnit(marginBottom) : 0,
		}">{{ label }}
		</text>
	</view>
</template>

<script>
/**
 * icon 圖標
 * @description 基於字體的圖標集，包含了大多數常見場景的圖標。
 * @tutorial https://www.uviewui.com/components/icon.html
 * @property {String} name 圖標名稱，見示例圖標集
 * @property {String} color 圖標顏色（默認inherit）
 * @property {String | Number} size 圖標字體大小，單位rpx（默認32）
 * @property {String | Number} label-size label字體大小，單位rpx（默認28）
 * @property {String} label 圖標右側的label文字（默認28）
 * @property {String} label-pos label文字相對於圖標的位置，只能right或bottom（默認right）
 * @property {String} label-color label字體顏色（默認#606266）
 * @property {Object} custom-style icon的樣式，對像形式
 * @property {String} custom-prefix 自定義字體圖標庫時，需要寫上此值
 * @property {String | Number} margin-left label在右側時與圖標的距離，單位rpx（默認6）
 * @property {String | Number} margin-top label在下方時與圖標的距離，單位rpx（默認6）
 * @property {String | Number} margin-bottom label在上方時與圖標的距離，單位rpx（默認6）
 * @property {String | Number} margin-right label在左側時與圖標的距離，單位rpx（默認6）
 * @property {String} label-pos label相對於圖標的位置，只能right或bottom（默認right）
 * @property {String} index 一個用於區分多個圖標的值，點擊圖標時通過click事件傳出
 * @property {String} hover-class 圖標按下去的樣式類，用法同uni的view組件的hover-class參數，詳情見官網
 * @property {String} width 顯示圖片小圖標時的寬度
 * @property {String} height 顯示圖片小圖標時的高度
 * @property {String} top 圖標在垂直方向上的定位
 * @property {String} top 圖標在垂直方向上的定位
 * @property {String} top 圖標在垂直方向上的定位
 * @property {Boolean} show-decimal-icon 是否為DecimalIcon
 * @property {String} inactive-color 背景顏色，可接受主題色，僅Decimal時有效
 * @property {String | Number} percent 顯示的百分比，僅Decimal時有效
 * @event {Function} click 點擊圖標時觸發
 * @example <u-icon name="photo" color="#2979ff" size="28"></u-icon>
 */
export default {
	name: 'u-icon',
	props: {
		// 圖標類名
		name: {
			type: String,
			default: ''
		},
		// 圖標顏色，可接受主題色
		color: {
			type: String,
			default: ''
		},
		// 字體大小，單位rpx
		size: {
			type: [Number, String],
			default: 'inherit'
		},
		// 是否顯示粗體
		bold: {
			type: Boolean,
			default: false
		},
		// 點擊圖標的時候傳遞事件出去的index（用於區分點擊了哪一個）
		index: {
			type: [Number, String],
			default: ''
		},
		// 觸摸圖標時的類名
		hoverClass: {
			type: String,
			default: ''
		},
		// 自定義擴展前綴，方便用戶擴展自己的圖標庫
		customPrefix: {
			type: String,
			default: 'uicon'
		},
		// 圖標右邊或者下面的文字
		label: {
			type: [String, Number],
			default: ''
		},
		// label的位置，只能右邊或者下邊
		labelPos: {
			type: String,
			default: 'right'
		},
		// label的大小
		labelSize: {
			type: [String, Number],
			default: '28'
		},
		// label的顏色
		labelColor: {
			type: String,
			default: '#606266'
		},
		// label與圖標的距離(橫向排列)
		marginLeft: {
			type: [String, Number],
			default: '6'
		},
		// label與圖標的距離(豎向排列)
		marginTop: {
			type: [String, Number],
			default: '6'
		},
		// label與圖標的距離(豎向排列)
		marginRight: {
			type: [String, Number],
			default: '6'
		},
		// label與圖標的距離(豎向排列)
		marginBottom: {
			type: [String, Number],
			default: '6'
		},
		// 圖片的mode
		imgMode: {
			type: String,
			default: 'widthFix'
		},
		// 自定義樣式
		customStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		// 用於顯示圖片小圖標時，圖片的寬度
		width: {
			type: [String, Number],
			default: ''
		},
		// 用於顯示圖片小圖標時，圖片的高度
		height: {
			type: [String, Number],
			default: ''
		},
		// 用於解決某些情況下，讓圖標垂直居中的用途
		top: {
			type: [String, Number],
			default: 0
		},
		// 是否為DecimalIcon
		showDecimalIcon: {
			type: Boolean,
			default: false
		},
		// 背景顏色，可接受主題色，僅Decimal時有效
		inactiveColor: {
			type: String,
			default: '#ececec'
		},
		// 顯示的百分比，僅Decimal時有效
		percent: {
			type: [Number, String],
			default: '50'
		}
	},
	computed: {
		customClass() {
			let classes = []
			classes.push(this.customPrefix + '-' + this.name)
			// uView的自定義圖標類名為u-iconfont
			if (this.customPrefix == 'uicon') {
				classes.push('u-iconfont')
			} else {
				classes.push(this.customPrefix)
			}
			// 主題色，通過類配置
			if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
				classes.push('u-icon__icon--' + this.inactiveColor)
			} else if (this.color && this.$u.config.type.includes(this.color)) classes.push('u-icon__icon--' + this.color)
			// 阿里，頭條，百度小程序通過數組綁定類名時，無法直接使用[a, b, c]的形式，否則無法識別
			// 故需將其拆成一個字符串的形式，通過空格隔開各個類名
			//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
			classes = classes.join(' ')
			//#endif
			return classes
		},
		iconStyle() {
			let style = {}
			style = {
				fontSize: this.size == 'inherit' ? 'inherit' : this.$u.addUnit(this.size),
				fontWeight: this.bold ? 'bold' : 'normal',
				// 某些特殊情況需要設置一個到頂部的距離，才能更好的垂直居中
				top: this.$u.addUnit(this.top)
			}
			// 非主題色值時，才當作顏色值
			if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
				style.color = this.inactiveColor
			} else if (this.color && !this.$u.config.type.includes(this.color)) style.color = this.color

			return style
		},
		// 判斷傳入的name屬性，是否圖片路徑，只要帶有"/"均認為是圖片形式
		isImg() {
			return this.name.indexOf('/') !== -1
		},
		imgStyle() {
			let style = {}
			// 如果設置width和height屬性，則優先使用，否則使用size屬性
			style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size)
			style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size)
			return style
		},
		decimalIconStyle() {
			let style = {}
			style = {
				fontSize: this.size == 'inherit' ? 'inherit' : this.$u.addUnit(this.size),
				fontWeight: this.bold ? 'bold' : 'normal',
				// 某些特殊情況需要設置一個到頂部的距離，才能更好的垂直居中
				top: this.$u.addUnit(this.top),
				width: this.percent + '%'
			}
			// 非主題色值時，才當作顏色值
			if (this.color && !this.$u.config.type.includes(this.color)) style.color = this.color
			return style
		},
		decimalIconClass() {
			let classes = []
			classes.push(this.customPrefix + '-' + this.name)
			// uView的自定義圖標類名為u-iconfont
			if (this.customPrefix == 'uicon') {
				classes.push('u-iconfont')
			} else {
				classes.push(this.customPrefix)
			}
			// 主題色，通過類配置
			if (this.color && this.$u.config.type.includes(this.color)) classes.push('u-icon__icon--' + this.color)
			else classes.push('u-icon__icon--primary')
			// 阿里，頭條，百度小程序通過數組綁定類名時，無法直接使用[a, b, c]的形式，否則無法識別
			// 故需將其拆成一個字符串的形式，通過空格隔開各個類名
			//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
			classes = classes.join(' ')
			//#endif
			return classes
		}
	},
	methods: {
		click() {
			this.$emit('click', this.index)
		},
		touchstart() {
			this.$emit('touchstart', this.index)
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
@import '../../iconfont.css';

.u-icon {
	display: inline-flex;
	align-items: center;

	&--left {
		flex-direction: row-reverse;
		align-items: center;
	}

	&--right {
		flex-direction: row;
		align-items: center;
	}

	&--top {
		flex-direction: column-reverse;
		justify-content: center;
	}

	&--bottom {
		flex-direction: column;
		justify-content: center;
	}

	&__icon {
		position: relative;

		&--primary {
			color: $u-type-primary;
		}

		&--success {
			color: $u-type-success;
		}

		&--error {
			color: $u-type-error;
		}

		&--warning {
			color: $u-type-warning;
		}

		&--info {
			color: $u-type-info;
		}
	}

	&__decimal {
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		overflow: hidden;
	}

	&__img {
		height: auto;
		will-change: transform;
	}

	&__label {
		line-height: 1;
	}
}
</style>
