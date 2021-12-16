<template>
	<view class="u-radio-group u-clearfix">
		<slot></slot>
	</view>
</template>

<script>
	import Emitter from '../../libs/util/emitter.js';
	/**
	 * radioRroup 單選框父組件
	 * @description 單選框用於有一個選擇，用戶只能選擇其中一個的場景。搭配u-radio使用
	 * @tutorial https://www.uviewui.com/components/radio.html
	 * @property {Boolean} disabled 是否禁用所有radio（默認false）
	 * @property {String Number} size 組件整體的大小，單位rpx（默認40）
	 * @property {String} active-color 選中時的顏色，應用到所有子Radio組件（默認#2979ff）
	 * @property {String Number} icon-size 圖標大小，單位rpx（默認20）
	 * @property {String} shape 外觀形狀，shape-方形，circle-圓形(默認circle)
	 * @property {Boolean} label-disabled 是否禁止點擊文本操作checkbox(默認false)
	 * @property {String} width 寬度，需帶單位
	 * @property {Boolean} wrap 是否每個radio都換行（默認false）
	 * @event {Function} change 任一個radio狀態發生變化時觸發
	 * @example <u-radio-group v-model="value"></u-radio-group>
	 */
	export default {
		name: "u-radio-group",
		mixins: [Emitter],
		props: {
			// 是否禁用所有單選框
			disabled: {
				type: Boolean,
				default: false
			},
			// 匹配某一個radio組件，如果某個radio的name值等於此值，那麼這個radio就被會選中
			value: {
				type: [String, Number],
				default: ''
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
			// 是否禁止點擊提示語選中復選框
			labelDisabled: {
				type: Boolean,
				default: false
			},
			// 形狀，square為方形，circle為原型
			shape: {
				type: String,
				default: 'circle'
			},
			// 圖標的大小，單位rpx
			iconSize: {
				type: [String, Number],
				default: 20
			},
			// 每個checkbox占u-checkbox-group的寬度
			width: {
				type: [String, Number],
				default: 'auto'
			},
			// 是否每個checkbox都換行
			wrap: {
				type: Boolean,
				default: false
			}
		},
		created() {
			// 如果將children定義在data中，在微信小程序會造成循環引用而報錯
			this.children = [];
		},
		watch: {
			// 當父組件需要子組件需要共享的參數發生了變化，手動通知子組件
			parentData() {
				if(this.children.length) {
					this.children.map(child => {
						// 判斷子組件(u-radio)如果有updateParentData方法的話，就就執行(執行的結果是子組件重新從父組件拉取了最新的值)
						typeof(child.updateParentData) == 'function' && child.updateParentData();
					})
				}
			},
		},
		computed: {
			// 這裡computed的變量，都是子組件u-radio需要用到的，由於頭條小程序的兼容性差異，子組件無法實時監聽父組件參數的變化
			// 所以需要手動通知子組件，這裡返回一個parentData變量，供watch監聽，在其中去通知每一個子組件重新從父組件(u-radio-group)
			// 拉取父組件新的變化後的參數
			parentData() {
				return [this.value, this.disabled, this.activeColor, this.size, this.labelDisabled, this.shape, this.iconSize, this.width, this.wrap];
			}
		},
		methods: {
			// 該方法有子組件radio調用，當一個radio被選中的時候，給父組件設置value值(props傳遞的value)
			setValue(val) {
				// 通過子組件傳遞過來的val值(此被選中的子組件內部已將parentValue設置等於val的值)，將其他
				// u-radio設置未選中的狀態
				this.children.map(child => {
					if(child.parentData.value != val) child.parentData.value = '';
				})
				// 通過emit事件，設置父組件通過v-model雙向綁定的值
				this.$emit('input', val);
				this.$emit('change', val);
				// 等待下一個週期再執行，因為this.$emit('input')作用於父組件，再反饋到子組件內部，需要時間
				// 由於頭條小程序執行遲鈍，故需要用幾十毫秒的延時
				setTimeout(() => {
					// 將當前的值發送到 u-form-item 進行校驗
					this.dispatch('u-form-item', 'on-form-change', val);
				}, 60)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-radio-group {
		/* #ifndef MP || APP-NVUE */
		display: inline-flex;
		flex-wrap: wrap;
		/* #endif */
	}
</style>
