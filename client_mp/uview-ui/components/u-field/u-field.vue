<template>
	<view class="u-field" :class="{'u-border-top': borderTop, 'u-border-bottom': borderBottom }">
		<view class="u-field-inner" :class="[type == 'textarea' ? 'u-textarea-inner' : '', 'u-label-postion-' + labelPosition]">
			<view class="u-label" :class="[required ? 'u-required' : '']" :style="{
				justifyContent: justifyContent, 
				flex: labelPosition == 'left' ? `0 0 ${labelWidth}rpx` : '1'
			}">
				<view class="u-icon-wrap" v-if="icon">
					<u-icon size="32" :custom-style="iconStyle" :name="icon" :color="iconColor" class="u-icon"></u-icon>
				</view>
				<slot name="icon"></slot>
				<text class="u-label-text" :class="[this.$slots.icon || icon ? 'u-label-left-gap' : '']">{{ label }}</text>
			</view>
			<view class="fild-body">
				<view class="u-flex-1 u-flex" :style="[inputWrapStyle]">
					<textarea v-if="type == 'textarea'" class="u-flex-1 u-textarea-class" :style="[fieldStyle]" :value="value"
					 :placeholder="placeholder" :placeholderStyle="placeholderStyle" :disabled="disabled" :maxlength="inputMaxlength"
					 :focus="focus" :autoHeight="autoHeight" :fixed="fixed" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm"
					 @tap="fieldClick" />
					<input
						v-else
						:style="[fieldStyle]"
						:type="type"
						class="u-flex-1 u-field__input-wrap"
						:value="value"
						:password="password || this.type === 'password'"
						:placeholder="placeholder"
						:placeholderStyle="placeholderStyle"
						:disabled="disabled"
						:maxlength="inputMaxlength"
						:focus="focus"
						:confirmType="confirmType"
						@focus="onFocus"
						@blur="onBlur"
						@input="onInput"
						@confirm="onConfirm"
						@tap="fieldClick"
					/>
				</view>
				<u-icon :size="clearSize" v-if="clearable && value != '' && focused" name="close-circle-fill" color="#c0c4cc" class="u-clear-icon" @click="onClear"/>
				<view class="u-button-wrap"><slot name="right" /></view>
				<u-icon v-if="rightIcon" @click="rightIconClick" :name="rightIcon" color="#c0c4cc" :style="[rightIconStyle]" size="26" class="u-arror-right" />
			</view>
		</view>
		<view v-if="errorMessage !== false && errorMessage != ''" class="u-error-message" :style="{
			paddingLeft: labelWidth + 'rpx'
		}">{{ errorMessage }}</view>
	</view>
</template>

<script>
/**
 * field 輸入框
 * @description 借助此組件，可以實現表單的輸入， 有"text"和"textarea"類型的，此外，借助uView的picker和actionSheet組件可以快速實現上拉菜單，時間，地區選擇等， 為表單解決方案的利器。
 * @tutorial https://www.uviewui.com/components/field.html
 * @property {String} type 輸入框的類型（默認text）
 * @property {String} icon label左邊的圖標，限uView的圖標名稱
 * @property {Object} icon-style 左邊圖標的樣式，對像形式
 * @property {Boolean} right-icon 輸入框右邊的圖標名稱，限uView的圖標名稱（默認false）
 * @property {Boolean} required 是否必填，左邊您顯示紅色"*"號（默認false）
 * @property {String} label 輸入框左邊的文字提示
 * @property {Boolean} password 是否密碼輸入方式(用點替換文字)，type為text時有效（默認false）
 * @property {Boolean} clearable 是否顯示右側清空內容的圖標控件(輸入框有內容，且獲得焦點時才顯示)，點擊可清空輸入框內容（默認true）
 * @property {Number String} label-width label的寬度，單位rpx（默認130）
 * @property {String} label-align label的文字對齊方式（默認left）
 * @property {Object} field-style 自定義輸入框的樣式，對像形式
 * @property {Number | String} clear-size 清除圖標的大小，單位rpx（默認30）
 * @property {String} input-align 輸入框內容對齊方式（默認left）
 * @property {Boolean} border-bottom 是否顯示field的下邊框（默認true）
 * @property {Boolean} border-top 是否顯示field的上邊框（默認false）
 * @property {String} icon-color 左邊通過icon配置的圖標的顏色（默認#606266）
 * @property {Boolean} auto-height 是否自動增高輸入區域，type為textarea時有效（默認true）
 * @property {String Boolean} error-message 顯示的錯誤提示內容，如果為空字符串或者false，則不顯示錯誤信息
 * @property {String} placeholder 輸入框的提示文字
 * @property {String} placeholder-style placeholder的樣式(內聯樣式，字符串)，如"color: #ddd"
 * @property {Boolean} focus 是否自動獲得焦點（默認false）
 * @property {Boolean} fixed 如果type為textarea，且在一個"position:fixed"的區域，需要指明為true（默認false）
 * @property {Boolean} disabled 是否不可輸入（默認false）
 * @property {Number String} maxlength 最大輸入長度，設置為 -1 的時候不限制最大長度（默認140）
 * @property {String} confirm-type 設置鍵盤右下角按鈕的文字，僅在type="text"時生效（默認done）
 * @event {Function} input 輸入框內容發生變化時觸發
 * @event {Function} focus 輸入框獲得焦點時觸發
 * @event {Function} blur 輸入框失去焦點時觸發
 * @event {Function} confirm 點擊完成按鈕時觸發
 * @event {Function} right-icon-click 通過right-icon生成的圖標被點擊時觸發
 * @event {Function} click 輸入框被點擊或者通過right-icon生成的圖標被點擊時觸發，這樣設計是考慮到傳遞右邊的圖標，一般都為需要彈出"picker"等操作時的場景，點擊倒三角圖標，理應發出此事件，見上方說明
 * @example <u-field v-model="mobile" label="手機號" required :error-message="errorMessage"></u-field>
 */
export default {
	name:"u-field",
	props: {
		icon: String,
		rightIcon: String,
		// arrowDirection: {
		// 	type: String,
		// 	default: 'right'
		// },
		required: Boolean,
		label: String,
		password: Boolean,
		clearable: {
			type: Boolean,
			default: true
		},
		// 左邊標題的寬度單位rpx
		labelWidth: {
			type: [Number, String],
			default: 130
		},
		// 對齊方式，left|center|right
		labelAlign: {
			type: String,
			default: 'left'
		},
		inputAlign: {
			type: String,
			default: 'left'
		},
		iconColor: {
			type: String,
			default: '#606266'
		},
		autoHeight: {
			type: Boolean,
			default: true
		},
		errorMessage: {
			type: [String, Boolean],
			default: ''
		},
		placeholder: String,
		placeholderStyle: String,
		focus: Boolean,
		fixed: Boolean,
		value: [Number, String],
		type: {
			type: String,
			default: 'text'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		maxlength: {
			type: [Number, String],
			default: 140
		},
		confirmType: {
			type: String,
			default: 'done'
		},
		// lable的位置，可選為 left-左邊，top-上邊
		labelPosition: {
			type: String,
			default: 'left'
		},
		// 輸入框的自定義樣式
		fieldStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		// 清除按鈕的大小
		clearSize: {
			type: [Number, String],
			default: 30
		},
		// lable左邊的圖標樣式，對像形式
		iconStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		// 是否顯示上邊框
		borderTop: {
			type: Boolean,
			default: false
		},
		// 是否顯示下邊框
		borderBottom: {
			type: Boolean,
			default: true
		},
		// 是否自動去除兩端的空格
		trim: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			focused: false,
			itemIndex: 0,
		};
	},
	computed: {
		inputWrapStyle() {
			let style = {};
			style.textAlign = this.inputAlign;
			// 判斷lable的位置，如果是left的話，讓input左邊兩邊有間隙
			if(this.labelPosition == 'left') {
				style.margin = `0 8rpx`;
			} else {
				// 如果lable是top的，input的左邊就沒必要有間隙了
				style.marginRight = `8rpx`;
			}
			return style;
		},
		rightIconStyle() {
			let style = {};
			if (this.arrowDirection == 'top') style.transform = 'roate(-90deg)';
			if (this.arrowDirection == 'bottom') style.transform = 'roate(90deg)';
			else style.transform = 'roate(0deg)';
			return style;
		},
		labelStyle() {
			let style = {};
			if(this.labelAlign == 'left') style.justifyContent = 'flext-start';
			if(this.labelAlign == 'center') style.justifyContent = 'center';
			if(this.labelAlign == 'right') style.justifyContent = 'flext-end';
			return style;
		},
		// uni不支持在computed中寫style.justifyContent = 'center'的形式，故用此方法
		justifyContent() {
			if(this.labelAlign == 'left') return 'flex-start';
			if(this.labelAlign == 'center') return 'center';
			if(this.labelAlign == 'right') return 'flex-end';
		},
		// 因為uniapp的input組件的maxlength組件必須要數值，這裡轉為數值，給用戶可以傳入字符串數值
		inputMaxlength() {
			return Number(this.maxlength)
		},
		// label的位置
		fieldInnerStyle() {
			let style = {};
			if(this.labelPosition == 'left') {
				style.flexDirection = 'row';
			} else {
				style.flexDirection = 'column';
			}
			
			return style;
		}
	},
	methods: {
		onInput(event) {
			let value = event.detail.value;
			// 判斷是否去除空格
			if(this.trim) value = this.$u.trim(value);
			this.$emit('input', value);
		},
		onFocus(event) {
			this.focused = true;
			this.$emit('focus', event);
		},
		onBlur(event) {
			// 最開始使用的是監聽圖標@touchstart事件，自從hx2.8.4後，此方法在微信小程序出錯
			// 這裡改為監聽點擊事件，手點擊清除圖標時，同時也發生了@blur事件，導致圖標消失而無法點擊，這裡做一個延時
			setTimeout(() => {
				this.focused = false;
			}, 100)
			this.$emit('blur', event);
		},
		onConfirm(e) {
			this.$emit('confirm', e.detail.value);
		},
		onClear(event) {
			this.$emit('input', '');
		},
		rightIconClick() {
			this.$emit('right-icon-click');
			this.$emit('click');
		},
		fieldClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
	
.u-field {
	font-size: 28rpx;
	padding: 20rpx 28rpx;
	text-align: left;
	position: relative;
	color: $u-main-color;
}

.u-field-inner {
	@include vue-flex;
	align-items: center;
}

.u-textarea-inner {
	align-items: flex-start;
}

.u-textarea-class {
	min-height: 96rpx;
	width: auto;
	font-size: 28rpx;
}

.fild-body {
	@include vue-flex;
	flex: 1;
	align-items: center;
}

.u-arror-right {
	margin-left: 8rpx;
}

.u-label-text {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
}

.u-label-left-gap {
	margin-left: 6rpx;
}

.u-label-postion-top {
	flex-direction: column;
	align-items: flex-start;
}

.u-label {
	width: 130rpx;
	flex: 1 1 130rpx;
	text-align: left;
	position: relative;
	@include vue-flex;
	align-items: center;
}

.u-required::before {
	content: '*';
	position: absolute;
	left: -16rpx;
	font-size: 14px;
	color: $u-type-error;
	height: 9px;
	line-height: 1;
}

.u-field__input-wrap {
	position: relative;
	overflow: hidden;
	font-size: 28rpx;
	height: 48rpx;
	flex: 1;
	width: auto;
}

.u-clear-icon {
	@include vue-flex;
	align-items: center;
}

.u-error-message {
	color: $u-type-error;
	font-size: 26rpx;
	text-align: left;
}

.placeholder-style {
	color: rgb(150, 151, 153);
}

.u-input-class {
	font-size: 28rpx;
}

.u-button-wrap {
	margin-left: 8rpx;
}
</style>
