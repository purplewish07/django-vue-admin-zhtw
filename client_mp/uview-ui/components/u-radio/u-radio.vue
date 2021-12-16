<template>
	<view class="u-radio" :style="[radioStyle]">
		<view class="u-radio__icon-wrap" @tap="toggle" :class="[iconClass]" :style="[iconStyle]">
			<u-icon
				class="u-radio__icon-wrap__icon"
			    name="checkbox-mark"
			    :size="elIconSize" 
				:color="iconColor"/>
		</view>
		<view class="u-radio__label" @tap="onClickLabel" :style="{
			fontSize: $u.addUnit(labelSize)
		}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * radio 單選框
	 * @description 單選框用於有一個選擇，用戶只能選擇其中一個的場景。搭配u-radio-group使用
	 * @tutorial https://www.uviewui.com/components/radio.html
	 * @property {String Number} icon-size 圖標大小，單位rpx（默認24）
	 * @property {String Number} label-size label字體大小，單位rpx（默認28）
	 * @property {String Number} name radio組件的標示符
	 * @property {String} shape 形狀，見上方說明（默認circle）
	 * @property {Boolean} disabled 是否禁用（默認false）
	 * @property {Boolean} label-disabled 點擊文本是否可以操作radio（默認true）
	 * @property {String} active-color 選中時的顏色，如設置parent的active-color將失效
	 * @event {Function} change 某個radio狀態發生變化時觸發(選中狀態)
	 * @example <u-radio :label-disabled="false">門掩黃昏，無計留春住</u-radio>
	 */
	export default {
		name: "u-radio",
		props: {
			// radio的名稱
			name: {
				type: [String, Number],
				default: ''
			},
			// 形狀，square為方形，circle為原型
			shape: {
				type: String,
				default: ''
			},
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: ''
			},
			// 是否禁止點擊提示語選中復選框
			labelDisabled: {
				type: [String, Boolean],
				default: ''
			},
			// 選中狀態下的顏色，如設置此值，將會覆蓋parent的activeColor值
			activeColor: {
				type: String,
				default: ''
			},
			// 圖標的大小，單位rpx
			iconSize: {
				type: [String, Number],
				default: ''
			},
			// label的字體大小，rpx單位
			labelSize: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				// 父組件的默認值，因為頭條小程序不支持在computed中使用this.parent.shape的形式
				// 故只能使用如此方法
				parentData: {
					iconSize: null,
					labelDisabled: null,
					disabled: null,
					shape: null,
					activeColor: null,
					size: null,
					width: null,
					height: null,
					value: null,
					wrap: null
				}
			};
		},
		created() {
			this.parent = false;
			// 支付寶小程序不支持provide/inject，所以使用這個方法獲取整個父組件，在created定義，避免循環引用
			this.updateParentData();
			this.parent.children.push(this);
		},
		computed: {
			// 是否禁用，如果父組件u-raios-group禁用的話，將會忽略子組件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
			},
			// 是否禁用label點擊
			elLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
			},
			// 組件尺寸，對應size的值，默認值為34rpx
			elSize() {
				return this.size ? this.size : (this.parentData.size ? this.parentData.size : 34);
			},
			// 組件的勾選圖標的尺寸，默認20
			elIconSize() {
				return this.iconSize ? this.iconSize : (this.parentData.iconSize ? this.parentData.iconSize : 20);
			},
			// 組件選中激活時的顏色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parentData.activeColor ? this.parentData.activeColor : 'primary');
			},
			// 組件的形狀
			elShape() {
				return this.shape ? this.shape : (this.parentData.shape ? this.parentData.shape : 'circle');
			},
			// 設置radio的狀態，要求radio的name等於parent的value時才為選中狀態
			iconStyle() {
				let style = {};
				if (this.elActiveColor && this.parentData.value == this.name && !this.elDisabled) {
					style.borderColor = this.elActiveColor;
					style.backgroundColor = this.elActiveColor;
				}
				style.width = this.$u.addUnit(this.elSize);
				style.height = this.$u.addUnit(this.elSize);
				return style;
			},
			iconColor() {
				return this.name ==  this.parentData.value ? '#ffffff' : 'transparent';
			},
			iconClass() {
				let classes = [];
				classes.push('u-radio__icon-wrap--' + this.elShape);
				if (this.name == this.parentData.value) classes.push('u-radio__icon-wrap--checked');
				if (this.elDisabled) classes.push('u-radio__icon-wrap--disabled');
				if (this.name == this.parentData.value && this.elDisabled) classes.push(
					'u-radio__icon-wrap--disabled--checked');
				// 支付寶小程序無法動態綁定一個數組類名，否則解析出來的結果會帶有","，而導致失效
				return classes.join(' ');
			},
			radioStyle() {
				let style = {};
				if (this.parentData.width) {
					style.width = this.$u.addUnit(this.parentData.width);
					// #ifdef MP
					// 各家小程序因為它們特殊的編譯結構，使用float佈局
					style.float = 'left';
					// #endif
					// #ifndef MP
					// H5和APP使用flex佈局
					style.flex = `0 0 ${this.$u.addUnit(this.parentData.width)}`;
					// #endif
				}
				if (this.parentData.wrap) {
					style.width = '100%';
					// #ifndef MP
					// H5和APP使用flex佈局，將寬度設置100%，即可自動換行
					style.flex = '0 0 100%';
					// #endif
				}
				return style;
			}
		},
		methods: {
			updateParentData() {
				this.getParentData('u-radio-group');
			},
			onClickLabel() {
				if (!this.elLabelDisabled && !this.elDisabled) {
					this.setRadioCheckedStatus();
				}
			},
			toggle() {
				if (!this.elDisabled) {
					this.setRadioCheckedStatus();
				}
			},
			emitEvent() {
				// u-radio的name不等於父組件的v-model的值時(意味著未選中)，才發出事件，避免多次點擊觸發事件
				if(this.parentData.value != this.name) this.$emit('change', this.name);
			},
			// 改變組件選中狀態
			// 這裡的改變的依據是，更改本組件的parentData.value值為本組件的name值，同時通過父組件遍歷所有u-radio實例
			// 將本組件外的其他u-radio的parentData.value都設置為空(由computed計算後，都被取消選中狀態)，因而只剩下一個為選中狀態
			setRadioCheckedStatus() {
				this.emitEvent();
				if(this.parent) {
					this.parent.setValue(this.name);
					this.parentData.value = this.name;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-radio {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		align-items: center;
		overflow: hidden;
		user-select: none;
		line-height: 1.8;
		
		&__icon-wrap {
			color: $u-content-color;
			@include vue-flex;
			flex: none;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			width: 42rpx;
			height: 42rpx;
			color: transparent;
			text-align: center;
			transition-property: color, border-color, background-color;
			font-size: 20px;
			border: 1px solid #c8c9cc;
			transition-duration: 0.2s;
			
			/* #ifdef MP-TOUTIAO */
			// 頭條小程序兼容性問題，需要設置行高為0，否則圖標偏下
			&__icon {
				line-height: 0;
			}
			/* #endif */
			
			&--circle {
				border-radius: 100%;
			}
			
			&--square {
				border-radius: 3px;
			}
			
			&--checked {
				color: #fff;
				background-color: #2979ff;
				border-color: #2979ff;
			}
			
			&--disabled {
				background-color: #ebedf0;
				border-color: #c8c9cc;
			}
			
			&--disabled--checked {
				color: #c8c9cc !important;
			}
		}
		
		&__label {
			word-wrap: break-word;
			margin-left: 10rpx;
			margin-right: 24rpx;
			color: $u-content-color;
			font-size: 30rpx;
			
			&--disabled {
				color: #c8c9cc;
			}
		}
	}
</style>
