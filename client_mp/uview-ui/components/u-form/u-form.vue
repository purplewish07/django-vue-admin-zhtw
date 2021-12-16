<template>
	<view class="u-form"><slot /></view>
</template>

<script>
	/**
	 * form 表單
	 * @description 此組件一般用於表單場景，可以配置Input輸入框，Select彈出框，進行表單驗證等。
	 * @tutorial http://uviewui.com/components/form.html
	 * @property {Object} model 表單數據對像
	 * @property {Boolean} border-bottom 是否顯示表單域的下劃線邊框
	 * @property {String} label-position 表單域提示文字的位置，left-左側，top-上方
	 * @property {String Number} label-width 提示文字的寬度，單位rpx（默認90）
	 * @property {Object} label-style lable的樣式，對像形式
	 * @property {String} label-align lable的對齊方式
	 * @property {Object} rules 通過ref設置，見官網說明
	 * @property {Array} error-type 錯誤的提示方式，數組形式，見上方說明(默認['message'])
	 * @example <u-form :model="form" ref="uForm"></u-form>
	 */

export default {
	name: 'u-form',
	props: {
		// 當前form的需要驗證字段的集合
		model: {
			type: Object,
			default() {
				return {};
			}
		},
		// 驗證規則
		// rules: {
		// 	type: [Object, Function, Array],
		// 	default() {
		// 		return {};
		// 	}
		// },
		// 有錯誤時的提示方式，message-提示信息，border-如果input設置了邊框，變成呈紅色，
		// border-bottom-下邊框呈現紅色，none-無提示
		errorType: {
			type: Array,
			default() {
				return ['message', 'toast']
			}
		},
		// 是否顯示表單域的下劃線邊框
		borderBottom: {
			type: Boolean,
			default: true
		},
		// label的位置，left-左邊，top-上邊
		labelPosition: {
			type: String,
			default: 'left'
		},
		// label的寬度，單位rpx
		labelWidth: {
			type: [String, Number],
			default: 90
		},
		// lable字體的對齊方式
		labelAlign: {
			type: String,
			default: 'left'
		},
		// lable的樣式，對像形式
		labelStyle: {
			type: Object,
			default() {
				return {}
			}
		},
	},
	provide() {
		return {
			uForm: this
		};
	},
	data() {
		return {
			rules: {}
		};
	},
	created() {
		// 存儲當前form下的所有u-form-item的實例
		// 不能定義在data中，否則微信小程序會造成循環引用而報錯
		this.fields = [];
	},
	methods: {
		setRules(rules) {
			this.rules = rules;
		},
		// 清空所有u-form-item組件的內容，本質上是調用了u-form-item組件中的resetField()方法
		resetFields() {
			this.fields.map(field => {
				field.resetField();
			});
		},
		// 校驗全部數據
		validate(callback) {
			return new Promise(resolve => {
				// 對所有的u-form-item進行校驗
				let valid = true; // 默認通過
				let count = 0; // 用於標記是否檢查完畢
				let errorArr = []; // 存放錯誤信息
				this.fields.map(field => {
					// 調用每一個u-form-item實例的validation的校驗方法
					field.validation('', error => {
						// 如果任意一個u-form-item校驗不通過，就意味著整個表單不通過
						if (error) {
							valid = false;
							errorArr.push(error);
						}
						// 當歷遍了所有的u-form-item時，調用promise的then方法
						if (++count === this.fields.length) {
							resolve(valid); // 進入promise的then方法
							// 判斷是否設置了toast的提示方式，只提示最前面的表單域的第一個錯誤信息
							if(this.errorType.indexOf('none') === -1 && this.errorType.indexOf('toast') >= 0 && errorArr.length) {
								this.$u.toast(errorArr[0]);
							}
							// 調用回調方法
							if (typeof callback == 'function') callback(valid);
						}
					});
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
</style>
