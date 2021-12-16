<template>
	<view class="u-checkbox" :style="[checkboxStyle]">
		<view class="u-checkbox__icon-wrap" @tap="toggle" :class="[iconClass]" :style="[iconStyle]">
			<u-icon class="u-checkbox__icon-wrap__icon" name="checkbox-mark" :size="checkboxIconSize" :color="iconColor"/>
		</view>
		<view class="u-checkbox__label" @tap="onClickLabel" :style="{
			fontSize: $u.addUnit(labelSize)
		}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * checkbox 復選框
	 * @description 該組件需要搭配checkboxGroup組件使用，以便用戶進行操作時，獲得當前復選框組的選中情況。
	 * @tutorial https://www.uviewui.com/components/checkbox.html
	 * @property {String Number} icon-size 圖標大小，單位rpx（默認20）
	 * @property {String Number} label-size label字體大小，單位rpx（默認28）
	 * @property {String Number} name checkbox組件的標示符
	 * @property {String} shape 形狀，見官網說明（默認circle）
	 * @property {Boolean} disabled 是否禁用
	 * @property {Boolean} label-disabled 是否禁止點擊文本操作checkbox
	 * @property {String} active-color 選中時的顏色，如設置CheckboxGroup的active-color將失效
	 * @event {Function} change 某個checkbox狀態發生變化時觸發，回調為一個對像
	 * @example <u-checkbox v-model="checked" :disabled="false">天涯</u-checkbox>
	 */
	export default {
		name: "u-checkbox",
		props: {
			// checkbox的名稱
			name: {
				type: [String, Number],
				default: ''
			},
			// 形狀，square為方形，circle為原型
			shape: {
				type: String,
				default: ''
			},
			// 是否為選中狀態
			value: {
				type: Boolean,
				default: false
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
			// 選中狀態下的顏色，如設置此值，將會覆蓋checkboxGroup的activeColor值
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
			// 組件的整體大小
			size: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				parentDisabled: false,
				newParams: {},
			};
		},
		created() {
			// 支付寶小程序不支持provide/inject，所以使用這個方法獲取整個父組件，在created定義，避免循環應用
			this.parent = this.$u.$parent.call(this, 'u-checkbox-group');
			// 如果存在u-checkbox-group，將本組件的this塞進父組件的children中
			this.parent && this.parent.children.push(this);
		},
		computed: {
			// 是否禁用，如果父組件u-checkbox-group禁用的話，將會忽略子組件的配置
			isDisabled() {
				return this.disabled !== '' ? this.disabled : this.parent ? this.parent.disabled : false;
			},
			// 是否禁用label點擊
			isLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
			},
			// 組件尺寸，對應size的值，默認值為34rpx
			checkboxSize() {
				return this.size ? this.size : (this.parent ? this.parent.size : 34);
			},
			// 組件的勾選圖標的尺寸，默認20
			checkboxIconSize() {
				return this.iconSize ? this.iconSize : (this.parent ? this.parent.iconSize : 20);
			},
			// 組件選中激活時的顏色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parent ? this.parent.activeColor : 'primary');
			},
			// 組件的形狀
			elShape() {
				return this.shape ? this.shape : (this.parent ? this.parent.shape : 'square');
			},
			iconStyle() {
				let style = {};
				// 既要判斷是否手動禁用，還要判斷用戶v-model綁定的值，如果綁定為false，那麼也無法選中
				if (this.elActiveColor && this.value && !this.isDisabled) {
					style.borderColor = this.elActiveColor; 
					style.backgroundColor = this.elActiveColor;
				}
				style.width = this.$u.addUnit(this.checkboxSize);
				style.height = this.$u.addUnit(this.checkboxSize);
				return style;
			},
			// checkbox內部的勾選圖標，如果選中狀態，為白色，否則為透明色即可
			iconColor() {
				return this.value ? '#ffffff' : 'transparent';
			},
			iconClass() {
				let classes = [];
				classes.push('u-checkbox__icon-wrap--' + this.elShape);
				if (this.value == true) classes.push('u-checkbox__icon-wrap--checked');
				if (this.isDisabled) classes.push('u-checkbox__icon-wrap--disabled');
				if (this.value && this.isDisabled) classes.push('u-checkbox__icon-wrap--disabled--checked');
				// 支付寶小程序無法動態綁定一個數組類名，否則解析出來的結果會帶有","，而導致失效
				return classes.join(' ');
			},
			checkboxStyle() {
				let style = {};
				if(this.parent && this.parent.width) {
					style.width = this.parent.width;
					// #ifdef MP
					// 各家小程序因為它們特殊的編譯結構，使用float佈局
					style.float = 'left';
					// #endif
					// #ifndef MP
					// H5和APP使用flex佈局
					style.flex = `0 0 ${this.parent.width}`;
					// #endif
				}
				if(this.parent && this.parent.wrap) {
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
			onClickLabel() {
				if (!this.isLabelDisabled && !this.isDisabled) {
					this.setValue();
				}
			},
			toggle() {
				if (!this.isDisabled) {
					this.setValue();
				}
			},
			emitEvent() {
				this.$emit('change', {
					value: !this.value,
					name: this.name
				})
				// 執行父組件u-checkbox-group的事件方法
				// 等待下一個週期再執行，因為this.$emit('input')作用於父組件，再反饋到子組件內部，需要時間
				setTimeout(() => {
					if(this.parent && this.parent.emitEvent) this.parent.emitEvent();
				}, 80);
			},
			// 設置input的值，這裡通過input事件，設置通過v-model綁定的組件的值
			setValue() {
				// 判斷是否超過了可選的最大數量
				let checkedNum = 0;
				if(this.parent && this.parent.children) {
					// 只要父組件的某一個子元素的value為true，就加1(已有的選中數量)
					this.parent.children.map(val => {
						if (val.value) checkedNum++;
					})
				}
				// 如果原來為選中狀態，那麼可以取消
				if (this.value == true) {
					this.emitEvent();
					this.$emit('input', !this.value);
				} else {
					// 如果超出最多可選項，提示
					if(this.parent && checkedNum >= this.parent.max) {
						return this.$u.toast(`最多可選${this.parent.max}項`);
					}
					// 如果原來為未選中狀態，需要選中的數量少於父組件中設置的max值，才可以選中
					this.emitEvent();
					this.$emit('input', !this.value);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-checkbox {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		align-items: center;
		overflow: hidden;
		user-select: none;
		line-height: 1.8;
		
		&__icon-wrap {
			color: $u-content-color;
			flex: none;
			display: -webkit-flex;
			@include vue-flex;
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
				border-radius: 6rpx;
			}
			
			&--checked {
				color: #fff;
				background-color: $u-type-primary;
				border-color: $u-type-primary;
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
