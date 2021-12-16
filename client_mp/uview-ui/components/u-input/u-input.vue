<template>
	<view
		class="u-input"
		:class="{
			'u-input--border': border,
			'u-input--error': validateState
		}"
		:style="{
			padding: `0 ${border ? 20 : 0}rpx`,
			borderColor: borderColor,
			textAlign: inputAlign
		}"
		@tap.stop="inputClick"
	>
		<textarea
			v-if="type == 'textarea'"
			class="u-input__input u-input__textarea"
			:style="[getStyle]"
			:value="defaultValue"
			:placeholder="placeholder"
			:placeholderStyle="placeholderStyle"
			:disabled="disabled"
			:maxlength="inputMaxlength"
			:fixed="fixed"
			:focus="focus"
			:autoHeight="autoHeight"
			:selection-end="uSelectionEnd"
			:selection-start="uSelectionStart"
			:cursor-spacing="getCursorSpacing"
			:show-confirm-bar="showConfirmbar"
			@input="handleInput"
			@blur="handleBlur"
			@focus="onFocus"
			@confirm="onConfirm"
		/>
		<input
			v-else
			class="u-input__input"
			:type="type == 'password' ? 'text' : type"
			:style="[getStyle]"
			:value="defaultValue"
			:password="type == 'password' && !showPassword"
			:placeholder="placeholder"
			:placeholderStyle="placeholderStyle"
			:disabled="disabled || type === 'select'"
			:maxlength="inputMaxlength"
			:focus="focus"
			:confirmType="confirmType"
			:cursor-spacing="getCursorSpacing"
			:selection-end="uSelectionEnd"
			:selection-start="uSelectionStart"
			:show-confirm-bar="showConfirmbar"
			@focus="onFocus"
			@blur="handleBlur"
			@input="handleInput"
			@confirm="onConfirm"
		/>
		<view class="u-input__right-icon u-flex">
			<view class="u-input__right-icon__clear u-input__right-icon__item" @tap="onClear" v-if="clearable && value != '' && focused">
				<u-icon size="32" name="close-circle-fill" color="#c0c4cc"/>
			</view>
			<view class="u-input__right-icon__clear u-input__right-icon__item" v-if="passwordIcon && type == 'password'">
				<u-icon size="32" :name="!showPassword ? 'eye' : 'eye-fill'" color="#c0c4cc" @click="showPassword = !showPassword"/>
			</view>
			<view class="u-input__right-icon--select u-input__right-icon__item" v-if="type == 'select'" :class="{
				'u-input__right-icon--select--reverse': selectOpen
			}">
				<u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import Emitter from '../../libs/util/emitter.js';

/**
 * input 輸入框
 * @description 此組件為一個輸入框，默認沒有邊框和樣式，是專門為配合表單組件u-form而設計的，利用它可以快速實現表單驗證，輸入內容，下拉選擇等功能。
 * @tutorial http://uviewui.com/components/input.html
 * @property {String} type 模式選擇，見官網說明
 * @property {Boolean} clearable 是否顯示右側的清除圖標(默認true)
 * @property {} v-model 用於雙向綁定輸入框的值
 * @property {String} input-align 輸入框文字的對齊方式(默認left)
 * @property {String} placeholder placeholder顯示值(默認 '請輸入內容')
 * @property {Boolean} disabled 是否禁用輸入框(默認false)
 * @property {String Number} maxlength 輸入框的最大可輸入長度(默認140)
 * @property {String Number} selection-start 光標起始位置，自動聚焦時有效，需與selection-end搭配使用（默認-1）
 * @property {String Number} maxlength 光標結束位置，自動聚焦時有效，需與selection-start搭配使用（默認-1）
 * @property {String Number} cursor-spacing 指定光標與鍵盤的距離，單位px(默認0)
 * @property {String} placeholderStyle placeholder的樣式，字符串形式，如"color: red;"(默認 "color: #c0c4cc;")
 * @property {String} confirm-type 設置鍵盤右下角按鈕的文字，僅在type為text時生效(默認done)
 * @property {Object} custom-style 自定義輸入框的樣式，對像形式
 * @property {Boolean} focus 是否自動獲得焦點(默認false)
 * @property {Boolean} fixed 如果type為textarea，且在一個"position:fixed"的區域，需要指明為true(默認false)
 * @property {Boolean} password-icon type為password時，是否顯示右側的密碼查看圖標(默認true)
 * @property {Boolean} border 是否顯示邊框(默認false)
 * @property {String} border-color 輸入框的邊框顏色(默認#dcdfe6)
 * @property {Boolean} auto-height 是否自動增高輸入區域，type為textarea時有效(默認true)
 * @property {String Number} height 高度，單位rpx(text類型時為70，textarea時為100)
 * @example <u-input v-model="value" :type="type" :border="border" />
 */
export default {
	name: 'u-input',
	mixins: [Emitter],
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		// 輸入框的類型，textarea，text，number
		type: {
			type: String,
			default: 'text'
		},
		inputAlign: {
			type: String,
			default: 'left'
		},
		placeholder: {
			type: String,
			default: '請輸入內容'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		maxlength: {
			type: [Number, String],
			default: 140
		},
		placeholderStyle: {
			type: String,
			default: 'color: #c0c4cc;'
		},
		confirmType: {
			type: String,
			default: 'done'
		},
		// 輸入框的自定義樣式
		customStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 如果 textarea 是在一個 position:fixed 的區域，需要顯示指定屬性 fixed 為 true
		fixed: {
			type: Boolean,
			default: false
		},
		// 是否自動獲得焦點
		focus: {
			type: Boolean,
			default: false
		},
		// 密碼類型時，是否顯示右側的密碼圖標
		passwordIcon: {
			type: Boolean,
			default: true
		},
		// input|textarea是否顯示邊框
		border: {
			type: Boolean,
			default: false
		},
		// 輸入框的邊框顏色
		borderColor: {
			type: String,
			default: '#dcdfe6'
		},
		autoHeight: {
			type: Boolean,
			default: true
		},
		// type=select時，旋轉右側的圖標，標識當前處於打開還是關閉select的狀態
		// open-打開，close-關閉
		selectOpen: {
			type: Boolean,
			default: false
		},
		// 高度，單位rpx
		height: {
			type: [Number, String],
			default: ''
		},
		// 是否可清空
		clearable: {
			type: Boolean,
			default: true
		},
		// 指定光標與鍵盤的距離，單位 px
		cursorSpacing: {
			type: [Number, String],
			default: 0
		},
		// 光標起始位置，自動聚焦時有效，需與selection-end搭配使用
		selectionStart: {
			type: [Number, String],
			default: -1
		},
		// 光標結束位置，自動聚焦時有效，需與selection-start搭配使用
		selectionEnd: {
			type: [Number, String],
			default: -1
		},
		// 是否自動去除兩端的空格
		trim: {
			type: Boolean,
			default: true
		},
		// 是否顯示鍵盤上方帶有」完成「按鈕那一欄
		showConfirmbar:{
			type:Boolean,
			default:true
		}
	},
	data() {
		return {
			defaultValue: this.value,
			inputHeight: 70, // input的高度
			textareaHeight: 100, // textarea的高度
			validateState: false, // 當前input的驗證狀態，用於錯誤時，邊框是否改為紅色
			focused: false, // 當前是否處於獲得焦點的狀態
			showPassword: false, // 是否預覽密碼
			lastValue: '', // 用於頭條小程序，判斷@input中，前後的值是否發生了變化，因為頭條中文下，按下鍵沒有輸入內容，也會觸發@input時間
		};
	},
	watch: {
		value(nVal, oVal) {
			this.defaultValue = nVal;
			// 當值發生變化，且為select類型時(此時input被設置為disabled，不會觸發@input事件)，模擬觸發@input事件
			if(nVal != oVal && this.type == 'select') this.handleInput({
				detail: {
					value: nVal
				}
			})
		},
	},
	computed: {
		// 因為uniapp的input組件的maxlength組件必須要數值，這裡轉為數值，給用戶可以傳入字符串數值
		inputMaxlength() {
			return Number(this.maxlength);
		},
		getStyle() {
			let style = {};
			// 如果沒有自定義高度，就根據type為input還是textare來分配一個默認的高度
			style.minHeight = this.height ? this.height + 'rpx' : this.type == 'textarea' ?
				this.textareaHeight + 'rpx' : this.inputHeight + 'rpx';
			style = Object.assign(style, this.customStyle);
			return style;
		},
		//
		getCursorSpacing() {
			return Number(this.cursorSpacing);
		},
		// 光標起始位置
		uSelectionStart() {
			return String(this.selectionStart);
		},
		// 光標結束位置
		uSelectionEnd() {
			return String(this.selectionEnd);
		}
	},
	created() {
		// 監聽u-form-item發出的錯誤事件，將輸入框邊框變紅色
		this.$on('on-form-item-error', this.onFormItemError);
	},
	methods: {
		/**
		 * change 事件
		 * @param event
		 */
		handleInput(event) {
			let value = event.detail.value;
			// 判斷是否去除空格
			if(this.trim) value = this.$u.trim(value);
			// vue 原生的方法 return 出去
			this.$emit('input', value);
			// 當前model 賦值
			this.defaultValue = value;
			// 過一個生命週期再發送事件給u-form-item，否則this.$emit('input')更新了父組件的值，但是微信小程序上
			// 尚未更新到u-form-item，導致獲取的值為空，從而校驗混論
			// 這裡不能延時時間太短，或者使用this.$nextTick，否則在頭條上，會造成混亂
			setTimeout(() => {
				// 頭條小程序由於自身bug，導致中文下，每按下一個鍵(尚未完成輸入)，都會觸發一次@input，導致錯誤，這裡進行判斷處理
				// #ifdef MP-TOUTIAO
				if(this.$u.trim(value) == this.lastValue) return ;
				this.lastValue = value;
				// #endif
				// 將當前的值發送到 u-form-item 進行校驗
				this.dispatch('u-form-item', 'on-form-change', value);
			}, 40)
		},
		/**
		 * blur 事件
		 * @param event
		 */
		handleBlur(event) {
			// 最開始使用的是監聽圖標@touchstart事件，自從hx2.8.4後，此方法在微信小程序出錯
			// 這裡改為監聽點擊事件，手點擊清除圖標時，同時也發生了@blur事件，導致圖標消失而無法點擊，這裡做一個延時
			setTimeout(() => {
				this.focused = false;
			}, 100)
			// vue 原生的方法 return 出去
			this.$emit('blur', event.detail.value);
			setTimeout(() => {
				// 頭條小程序由於自身bug，導致中文下，每按下一個鍵(尚未完成輸入)，都會觸發一次@input，導致錯誤，這裡進行判斷處理
				// #ifdef MP-TOUTIAO
				if(this.$u.trim(value) == this.lastValue) return ;
				this.lastValue = value;
				// #endif
				// 將當前的值發送到 u-form-item 進行校驗
				this.dispatch('u-form-item', 'on-form-blur', event.detail.value);
			}, 40)
		},
		onFormItemError(status) {
			this.validateState = status;
		},
		onFocus(event) {
			this.focused = true;
			this.$emit('focus');
		},
		onConfirm(e) {
			this.$emit('confirm', e.detail.value);
		},
		onClear(event) {
			this.$emit('input', '');
		},
		inputClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-input {
	position: relative;
	flex: 1;
	@include vue-flex;

	&__input {
		//height: $u-form-item-height;
		font-size: 28rpx;
		color: $u-main-color;
		flex: 1;
	}

	&__textarea {
		width: auto;
		font-size: 28rpx;
		color: $u-main-color;
		padding: 10rpx 0;
		line-height: normal;
		flex: 1;
	}

	&--border {
		border-radius: 6rpx;
		border-radius: 4px;
		border: 1px solid $u-form-item-border-color;
	}

	&--error {
		border-color: $u-type-error!important;
	}

	&__right-icon {

		&__item {
			margin-left: 10rpx;
		}

		&--select {
			transition: transform .4s;

			&--reverse {
				transform: rotate(-180deg);
			}
		}
	}
}
</style>
