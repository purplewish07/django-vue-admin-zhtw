<template>
	<view class="u-checkbox-group u-clearfix">
		<slot></slot>
	</view>
</template>

<script>
	import Emitter from '../../libs/util/emitter.js';
	/**
	 * checkboxGroup 開關選擇器父組件Group
	 * @description 復選框組件一般用於需要多個選擇的場景，該組件功能完整，使用方便
	 * @tutorial https://www.uviewui.com/components/checkbox.html
	 * @property {String Number} max 最多能選中多少個checkbox（默認999）
	 * @property {String Number} size 組件整體的大小，單位rpx（默認40）
	 * @property {Boolean} disabled 是否禁用所有checkbox（默認false）
	 * @property {String Number} icon-size 圖標大小，單位rpx（默認20）
	 * @property {Boolean} label-disabled 是否禁止點擊文本操作checkbox(默認false)
	 * @property {String} width 寬度，需帶單位
	 * @property {String} width 寬度，需帶單位
	 * @property {String} shape 外觀形狀，shape-方形，circle-圓形(默認circle)
	 * @property {Boolean} wrap 是否每個checkbox都換行（默認false）
	 * @property {String} active-color 選中時的顏色，應用到所有子Checkbox組件（默認#2979ff）
	 * @event {Function} change 任一個checkbox狀態發生變化時觸發，回調為一個對像
	 * @example <u-checkbox-group></u-checkbox-group>
	 */
	export default {
		name: 'u-checkbox-group',
		mixins: [Emitter],
		props: {
			// 最多能選中多少個checkbox
			max: {
				type: [Number, String],
				default: 999
			},
			// 所有選中項的 name
			// value: {
			// 	default: Array,
			// 	default() {
			// 		return []
			// 	}
			// },
			// 是否禁用所有復選框
			disabled: {
				type: Boolean,
				default: false
			},
			// 在表單內提交時的標識符
			name: {
				type: [Boolean, String],
				default: ''
			},
			// 是否禁止點擊提示語選中復選框
			labelDisabled: {
				type: Boolean,
				default: false
			},
			// 形狀，square為方形，circle為原型
			shape: {
				type: String,
				default: 'square'
			},
			// 選中狀態下的顏色
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 組件的整體大小
			size: {
				type: [String, Number],
				default: 34
			},
			// 每個checkbox占u-checkbox-group的寬度
			width: {
				type: String,
				default: 'auto'
			},
			// 是否每個checkbox都換行
			wrap: { 
				type: Boolean,
				default: false
			},
			// 圖標的大小，單位rpx
			iconSize: {
				type: [String, Number],
				default: 20
			},
		},
		data() {
			return {
			}
		},
		created() {
			// 如果將children定義在data中，在微信小程序會造成循環引用而報錯
			this.children = [];
		},
		methods: {
			emitEvent() {
				let values = [];
				this.children.map(val => {
					if(val.value) values.push(val.name);
				})
				this.$emit('change', values);
				// 發出事件，用於在表單組件中嵌入checkbox的情況，進行驗證
				// 由於頭條小程序執行遲鈍，故需要用幾十毫秒的延時
				setTimeout(() => {
					// 將當前的值發送到 u-form-item 進行校驗
					this.dispatch('u-form-item', 'on-form-change', values);
				}, 60)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-checkbox-group {
		/* #ifndef MP || APP-NVUE */
		display: inline-flex;
		flex-wrap: wrap;
		/* #endif */
	}
</style>
