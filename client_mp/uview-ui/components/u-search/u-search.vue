<template>
	<view class="u-search" @tap="clickHandler" :style="{
		margin: margin,
	}">
		<view
			class="u-content"
			:style="{
				backgroundColor: bgColor,
				borderRadius: shape == 'round' ? '100rpx' : '10rpx',
				border: borderStyle,
				height: height + 'rpx'
			}"
		>
			<view class="u-icon-wrap">
				<u-icon class="u-clear-icon" :size="30" :name="searchIcon" :color="searchIconColor ? searchIconColor : color"></u-icon>
			</view>
			<input
				confirm-type="search"
				@blur="blur"
				:value="value"
				@confirm="search"
				@input="inputChange"
				:disabled="disabled"
				@focus="getFocus"
				:focus="focus"
				:maxlength="maxlength"
				placeholder-class="u-placeholder-class"
				:placeholder="placeholder"
				:placeholder-style="`color: ${placeholderColor}`"
				class="u-input"
				type="text"
				:style="[{
					textAlign: inputAlign,
					color: color,
					backgroundColor: bgColor,
				}, inputStyle]"
			/>
			<view class="u-close-wrap" v-if="keyword && clearabled && focused" @tap="clear">
				<u-icon class="u-clear-icon" name="close-circle-fill" size="34" color="#c0c4cc"></u-icon>
			</view>
		</view>
		<view :style="[actionStyle]" class="u-action" 
			:class="[showActionBtn || show ? 'u-action-active' : '']" 
			@tap.stop.prevent="custom"
		>{{ actionText }}</view>
	</view>
</template>

<script>
/**
 * search 搜索框
 * @description 搜索組件，集成了常見搜索框所需功能，用戶可以一鍵引入，開箱即用。
 * @tutorial https://www.uviewui.com/components/search.html
 * @property {String} shape 搜索框形狀，round-圓形，square-方形（默認round）
 * @property {String} bg-color 搜索框背景顏色（默認#f2f2f2）
 * @property {String} border-color 邊框顏色，配置了顏色，才會有邊框
 * @property {String} placeholder 佔位文字內容（默認「請輸入關鍵字」）
 * @property {Boolean} clearabled 是否啟用清除控件（默認true）
 * @property {Boolean} focus 是否自動獲得焦點（默認false）
 * @property {Boolean} show-action 是否顯示右側控件（默認true）
 * @property {String} action-text 右側控件文字（默認「搜索」）
 * @property {Object} action-style 右側控件的樣式，對像形式
 * @property {String} input-align 輸入框內容水平對齊方式（默認left）
 * @property {Object} input-style 自定義輸入框樣式，對像形式
 * @property {Boolean} disabled 是否啟用輸入框（默認false）
 * @property {String} search-icon-color 搜索圖標的顏色，默認同輸入框字體顏色
 * @property {String} color 輸入框字體顏色（默認#606266）
 * @property {String} placeholder-color placeholder的顏色（默認#909399）
 * @property {String} search-icon 輸入框左邊的圖標，可以為uView圖標名稱或圖片路徑
 * @property {String} margin 組件與其他上下左右元素之間的距離，帶單位的字符串形式，如"30rpx"
 * @property {Boolean} animation 是否開啟動畫，見上方說明（默認false）
 * @property {String} value 輸入框初始值
 * @property {String | Number} maxlength 輸入框最大能輸入的長度，-1為不限制長度
 * @property {Boolean} input-style input輸入框的樣式，可以定義文字顏色，大小等，對像形式
 * @property {String | Number} height 輸入框高度，單位rpx（默認64）
 * @event {Function} change 輸入框內容發生變化時觸發
 * @event {Function} search 用戶確定搜索時觸發，用戶按回車鍵，或者手機鍵盤右下角的"搜索"鍵時觸發
 * @event {Function} custom 用戶點擊右側控件時觸發
 * @event {Function} clear 用戶點擊清除按鈕時觸發
 * @example <u-search placeholder="日照香爐生紫煙" v-model="keyword"></u-search>
 */
export default {
	name: "u-search",
	props: {
		// 搜索框形狀，round-圓形，square-方形
		shape: {
			type: String,
			default: 'round'
		},
		// 搜索框背景色，默認值#f2f2f2
		bgColor: {
			type: String,
			default: '#f2f2f2'
		},
		// 佔位提示文字
		placeholder: {
			type: String,
			default: '請輸入關鍵字'
		},
		// 是否啟用清除控件
		clearabled: {
			type: Boolean,
			default: true
		},
		// 是否自動聚焦
		focus: {
			type: Boolean,
			default: false
		},
		// 是否在搜索框右側顯示取消按鈕
		showAction: {
			type: Boolean,
			default: true
		},
		// 右邊控件的樣式
		actionStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 取消按鈕文字
		actionText: {
			type: String,
			default: '搜索'
		},
		// 輸入框內容對齊方式，可選值為 left|center|right
		inputAlign: {
			type: String,
			default: 'left'
		},
		// 是否啟用輸入框
		disabled: {
			type: Boolean,
			default: false
		},
		// 開啟showAction時，是否在input獲取焦點時才顯示
		animation: {
			type: Boolean,
			default: false
		},
		// 邊框顏色，只要配置了顏色，才會有邊框
		borderColor: {
			type: String,
			default: 'none'
		},
		// 輸入框的初始化內容
		value: {
			type: String,
			default: ''
		},
		// 搜索框高度，單位rpx
		height: {
			type: [Number, String],
			default: 64
		},
		// input輸入框的樣式，可以定義文字顏色，大小等，對像形式
		inputStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		// 輸入框最大能輸入的長度，-1為不限制長度(來自uniapp文檔)
		maxlength: {
			type: [Number, String],
			default: '-1'
		},
		// 搜索圖標的顏色，默認同輸入框字體顏色
		searchIconColor: {
			type: String,
			default: ''
		},
		// 輸入框字體顏色
		color: {
			type: String,
			default: '#606266'
		},
		// placeholder的顏色
		placeholderColor: {
			type: String,
			default: '#909399'
		},
		// 組件與其他上下左右元素之間的距離，帶單位的字符串形式，如"30rpx"、"30rpx 20rpx"等寫法
		margin: {
			type: String,
			default: '0'
		},
		// 左邊輸入框的圖標，可以為uView圖標名稱或圖片路徑
		searchIcon: {
			type: String,
			default: 'search'
		}
	},
	data() {
		return {
			keyword: '',
			showClear: false, // 是否顯示右邊的清除圖標
			show: false,
			// 標記input當前狀態是否處於聚焦中，如果是，才會顯示右側的清除控件
			focused: this.focus
			// 綁定輸入框的值
			// inputValue: this.value
		};
	},
	watch: {
		keyword(nVal) {
			// 雙向綁定值，讓v-model綁定的值雙向變化
			this.$emit('input', nVal);
			// 觸發change事件，事件效果和v-model雙向綁定的效果一樣，讓用戶多一個選擇
			this.$emit('change', nVal);
		},
		value: {
			immediate: true,
			handler(nVal) {
				this.keyword = nVal;
			}
		}
	},
	computed: {
		showActionBtn() {
			if (!this.animation && this.showAction) return true;
			else return false;
		},
		// 樣式，根據用戶傳入的顏色值生成，如果不傳入，默認為none
		borderStyle() {
			if (this.borderColor) return `1px solid ${this.borderColor}`;
			else return 'none';
		},
	},
	methods: {
		// 目前HX2.6.9 v-model雙向綁定無效，故監聽input事件獲取輸入框內容的變化
		inputChange(e) {
			this.keyword = e.detail.value;
		},
		// 清空輸入
		// 也可以作為用戶通過this.$refs形式調用清空輸入框內容
		clear() {
			this.keyword = '';
			// 延後發出事件，避免在父組件監聽clear事件時，value為更新前的值(不為空)
			this.$nextTick(() => {
				this.$emit('clear');
			})
		},
		// 確定搜索
		search(e) {
			this.$emit('search', e.detail.value);
			try{
				// 收起鍵盤
				uni.hideKeyboard();
			}catch(e){}
		},
		// 點擊右邊自定義按鈕的事件
		custom() {
			this.$emit('custom', this.keyword);
			try{
				// 收起鍵盤
				uni.hideKeyboard();
			}catch(e){}
		},
		// 獲取焦點
		getFocus() {
			this.focused = true;
			// 開啟右側搜索按鈕展開的動畫效果
			if (this.animation && this.showAction) this.show = true;
			this.$emit('focus', this.keyword);
		},
		// 失去焦點
		blur() {
			// 最開始使用的是監聽圖標@touchstart事件，自從hx2.8.4後，此方法在微信小程序出錯
			// 這裡改為監聽點擊事件，手點擊清除圖標時，同時也發生了@blur事件，導致圖標消失而無法點擊，這裡做一個延時
			setTimeout(() => {
				this.focused = false;
			}, 100)
			this.show = false;
			this.$emit('blur', this.keyword);
		},
		// 點擊搜索框，只有disabled=true時才發出事件，因為禁止了輸入，意味著是想跳轉真正的搜索頁
		clickHandler() {
			if(this.disabled) this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-search {
	@include vue-flex;
	align-items: center;
	flex: 1;
}

.u-content {
	@include vue-flex;
	align-items: center;
	padding: 0 18rpx;
	flex: 1;
}

.u-clear-icon {
	@include vue-flex;
	align-items: center;
}

.u-input {
	flex: 1;
	font-size: 28rpx;
	line-height: 1;
	margin: 0 10rpx;
	color: $u-tips-color;
}

.u-close-wrap {
	width: 40rpx;
	height: 100%;
	@include vue-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}

.u-placeholder-class {
	color: $u-tips-color;
}

.u-action {
	font-size: 28rpx;
	color: $u-main-color;
	width: 0;
	overflow: hidden;
	transition: all 0.3s;
	white-space: nowrap;
	text-align: center;
}

.u-action-active {
	width: 80rpx;
	margin-left: 10rpx;
}
</style>
