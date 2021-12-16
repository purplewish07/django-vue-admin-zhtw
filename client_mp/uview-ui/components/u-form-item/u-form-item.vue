<template>
	<view class="u-form-item" :class="{'u-border-bottom': elBorderBottom, 'u-form-item__border-bottom--error': validateState === 'error' && showError('border-bottom')}">
		<view class="u-form-item__body" :style="{
			flexDirection: elLabelPosition == 'left' ? 'row' : 'column'
		}">
			<!-- 微信小程序中，將一個參數設置空字符串，結果會變成字符串"true" -->
			<view class="u-form-item--left" :style="{
				width: uLabelWidth,
				flex: `0 0 ${uLabelWidth}`,
				marginBottom: elLabelPosition == 'left' ? 0 : '10rpx',
			}">
				<!-- 為了塊對齊 -->
				<view class="u-form-item--left__content" v-if="required || leftIcon || label">
					<!-- nvue不支持偽元素before -->
					<text v-if="required" class="u-form-item--left__content--required">*</text>
					<view class="u-form-item--left__content__icon" v-if="leftIcon">
						<u-icon :name="leftIcon" :custom-style="leftIconStyle"></u-icon>
					</view>
					<view class="u-form-item--left__content__label" :style="[elLabelStyle, {
						'justify-content': elLabelAlign == 'left' ? 'flex-start' : elLabelAlign == 'center' ? 'center' : 'flex-end'
					}]">
						{{label}}
					</view>
				</view>
			</view>
			<view class="u-form-item--right u-flex">
				<view class="u-form-item--right__content">
					<view class="u-form-item--right__content__slot ">
						<slot />
					</view>
					<view class="u-form-item--right__content__icon u-flex" v-if="$slots.right || rightIcon">
						<u-icon :custom-style="rightIconStyle" v-if="rightIcon" :name="rightIcon"></u-icon>
						<slot name="right" />
					</view>
				</view>
			</view>
		</view>
		<view class="u-form-item__message" v-if="validateState === 'error' && showError('message')" :style="{
			paddingLeft: elLabelPosition == 'left' ? $u.addUnit(elLabelWidth) : '0',
		}">{{validateMessage}}</view>
	</view>
</template>

<script>
	import Emitter from '../../libs/util/emitter.js';
	import schema from '../../libs/util/async-validator';
	// 去除警告信息
	schema.warning = function() {};

	/**
	 * form-item 表單item
	 * @description 此組件一般用於表單場景，可以配置Input輸入框，Select彈出框，進行表單驗證等。
	 * @tutorial http://uviewui.com/components/form.html
	 * @property {String} label 左側提示文字
	 * @property {Object} prop 表單域model對象的屬性名，在使用 validate、resetFields 方法的情況下，該屬性是必填的
	 * @property {Boolean} border-bottom 是否顯示表單域的下劃線邊框
	 * @property {String} label-position 表單域提示文字的位置，left-左側，top-上方
	 * @property {String Number} label-width 提示文字的寬度，單位rpx（默認90）
	 * @property {Object} label-style lable的樣式，對像形式
	 * @property {String} label-align lable的對齊方式
	 * @property {String} right-icon 右側自定義字體圖標(限uView內置圖標)或圖片地址
	 * @property {String} left-icon 左側自定義字體圖標(限uView內置圖標)或圖片地址
	 * @property {Object} left-icon-style 左側圖標的樣式，對像形式
	 * @property {Object} right-icon-style 右側圖標的樣式，對像形式
	 * @property {Boolean} required 是否顯示左邊的"*"號，這裡僅起展示作用，如需校驗必填，請通過rules配置必填規則(默認false)
	 * @example <u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
	 */

	export default {
		name: 'u-form-item',
		mixins: [Emitter],
		inject: {
			uForm: {
				default () {
					return null
				}
			}
		},
		props: {
			// input的label提示語
			label: {
				type: String,
				default: ''
			},
			// 綁定的值
			prop: {
				type: String,
				default: ''
			},
			// 是否顯示表單域的下劃線邊框
			borderBottom: {
				type: [String, Boolean],
				default: ''
			},
			// label的位置，left-左邊，top-上邊
			labelPosition: {
				type: String,
				default: ''
			},
			// label的寬度，單位rpx
			labelWidth: {
				type: [String, Number],
				default: ''
			},
			// lable的樣式，對像形式
			labelStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// lable字體的對齊方式
			labelAlign: {
				type: String,
				default: ''
			},
			// 右側圖標
			rightIcon: {
				type: String,
				default: ''
			},
			// 左側圖標
			leftIcon: {
				type: String,
				default: ''
			},
			// 左側圖標的樣式
			leftIconStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 左側圖標的樣式
			rightIconStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否顯示左邊的必填星號，只作顯示用，具體校驗必填的邏輯，請在rules中配置
			required: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				initialValue: '', // 存儲的默認值
				// isRequired: false, // 是否必填，由於人性化考慮，必填"*"號通過props的required配置，不再通過rules的規則自動生成
				validateState: '', // 是否校驗成功
				validateMessage: '', // 校驗失敗的提示語
				// 有錯誤時的提示方式，message-提示信息，border-如果input設置了邊框，變成呈紅色，
				errorType: ['message'],
				fieldValue: '', // 獲取當前子組件input的輸入的值
				// 父組件的參數，在computed計算中，無法得知this.parent發生變化，故將父組件的參數值，放到data中
				parentData: {
					borderBottom: true,
					labelWidth: 90,
					labelPosition: 'left',
					labelStyle: {},
					labelAlign: 'left',
				}
			};
		},
		watch: {
			validateState(val) {
				this.broadcastInputError();
			},
			// 監聽u-form組件的errorType的變化
			"uForm.errorType"(val) {
				this.errorType = val;
				this.broadcastInputError();
			},
		},
		computed: {
			// 計算後的label寬度，由於需要多個判斷，故放到computed中
			uLabelWidth() {
				// 如果用戶設置label為空字符串(微信小程序空字符串最終會變成字符串的'true')，意味著要將label的位置寬度設置為auto
				return this.elLabelPosition == 'left' ? (this.label === 'true' || this.label === '' ? 'auto' : this.$u.addUnit(this
					.elLabelWidth)) : '100%';
			},
			showError() {
				return type => {
					// 如果errorType數組中含有none，或者toast提示類型
					if (this.errorType.indexOf('none') >= 0) return false;
					else if (this.errorType.indexOf(type) >= 0) return true;
					else return false;
				}
			},
			// label的寬度
			elLabelWidth() {
				// label默認寬度為90，優先使用本組件的值，如果沒有(如果設置為0，也算是配置了值，依然起效)，則用u-form的值
				return (this.labelWidth != 0 || this.labelWidth != '') ? this.labelWidth : (this.parentData.labelWidth ? this.parentData
					.labelWidth :
					90);
			},
			// label的樣式
			elLabelStyle() {
				return Object.keys(this.labelStyle).length ? this.labelStyle : (this.parentData.labelStyle ? this.parentData.labelStyle :
					{});
			},
			// label的位置，左側或者上方
			elLabelPosition() {
				return this.labelPosition ? this.labelPosition : (this.parentData.labelPosition ? this.parentData.labelPosition :
					'left');
			},
			// label的對齊方式
			elLabelAlign() {
				return this.labelAlign ? this.labelAlign : (this.parentData.labelAlign ? this.parentData.labelAlign : 'left');
			},
			// label的下劃線
			elBorderBottom() {
				// 子組件的borderBottom默認為空字符串，如果不等於空字符串，意味著子組件設置了值，優先使用子組件的值
				return this.borderBottom !== '' ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom :
					true;
			}
		},
		methods: {
			broadcastInputError() {
				// 子組件發出事件，第三個參數為true或者false，true代表有錯誤
				this.broadcast('u-input', 'on-form-item-error', this.validateState === 'error' && this.showError('border'));
			},
			// 判斷是否需要required校驗
			setRules() {
				let that = this;
				// 由於人性化考慮，必填"*"號通過props的required配置，不再通過rules的規則自動生成
				// 從父組件u-form拿到當前u-form-item需要驗證 的規則
				// let rules = this.getRules();
				// if (rules.length) {
				// 	this.isRequired = rules.some(rule => {
				// 		// 如果有必填項，就返回，沒有的話，就是undefined
				// 		return rule.required;
				// 	});
				// }

				// blur事件
				this.$on('on-form-blur', that.onFieldBlur);
				// change事件
				this.$on('on-form-change', that.onFieldChange);
			},

			// 從u-form的rules屬性中，取出當前u-form-item的校驗規則
			getRules() {
				// 父組件的所有規則
				let rules = this.parent.rules;
				rules = rules ? rules[this.prop] : [];
				// 保證返回的是一個數組形式
				return [].concat(rules || []);
			},

			// blur事件時進行表單校驗
			onFieldBlur() {
				this.validation('blur');
			},

			// change事件進行表單校驗
			onFieldChange() {
				this.validation('change');
			},

			// 過濾出符合要求的rule規則
			getFilteredRule(triggerType = '') {
				let rules = this.getRules();
				// 整體驗證表單時，triggerType為空字符串，此時返回所有規則進行驗證
				if (!triggerType) return rules;
				// 歷遍判斷規則是否有對應的事件，比如blur，change觸發等的事件
				// 使用indexOf判斷，是因為某些時候設置的驗證規則的trigger屬性可能為多個，比如['blur','change']
				// 某些場景可能的判斷規則，可能不存在trigger屬性，故先判斷是否存在此屬性
				return rules.filter(res => res.trigger && res.trigger.indexOf(triggerType) !== -1);
			},

			// 校驗數據
			validation(trigger, callback = () => {}) {
				// 檢驗之間，先獲取需要校驗的值
				this.fieldValue = this.parent.model[this.prop];
				// blur和change是否有當前方式的校驗規則
				let rules = this.getFilteredRule(trigger);
				// 判斷是否有驗證規則，如果沒有規則，也調用回調方法，否則父組件u-form會因為
				// 對count變量的統計錯誤而無法進入上一層的回調
				if (!rules || rules.length === 0) {
					return callback('');
				}
				// 設置當前的裝填，標識為校驗中
				this.validateState = 'validating';
				// 調用async-validator的方法
				let validator = new schema({
					[this.prop]: rules
				});
				validator.validate({
					[this.prop]: this.fieldValue
				}, {
					firstFields: true
				}, (errors, fields) => {
					// 記錄狀態和報錯信息
					this.validateState = !errors ? 'success' : 'error';
					this.validateMessage = errors ? errors[0].message : '';
					// 調用回調方法
					callback(this.validateMessage);
				});
			},

			// 清空當前的u-form-item
			resetField() {
				this.parent.model[this.prop] = this.initialValue;
				// 設置為`success`狀態，只是為了清空錯誤標記
				this.validateState = 'success';
			}
		},

		// 組件創建完成時，將當前實例保存到u-form中
		mounted() {
			// 支付寶、頭條小程序不支持provide/inject，所以使用這個方法獲取整個父組件，在created定義，避免循環應用
			this.parent = this.$u.$parent.call(this, 'u-form');
			if (this.parent) {
				// 歷遍parentData中的屬性，將parent中的同名屬性賦值給parentData
				Object.keys(this.parentData).map(key => {
					this.parentData[key] = this.parent[key];
				});
				// 如果沒有傳入prop，或者uForm為空(如果u-form-input單獨使用，就不會有uForm注入)，就不進行校驗
				if (this.prop) {
					// 將本實例添加到父組件中
					this.parent.fields.push(this);
					this.errorType = this.parent.errorType;
					// 設置初始值
					this.initialValue = this.fieldValue;
					// 添加表單校驗，這裡必須要寫在$nextTick中，因為u-form的rules是通過ref手動傳入的
					// 不在$nextTick中的話，可能會造成執行此處代碼時，父組件還沒通過ref把規則給u-form，導致規則為空
					this.$nextTick(() => {
						this.setRules();
					})
				}
			}
		},

		// 組件銷毀前，將實例從u-form的緩存中移除
		beforeDestroy() {
			// 如果當前沒有prop的話表示當前不要進行刪除（因為沒有注入）
			if (this.parent && this.prop) {
				this.parent.fields.map((item, index) => {
					if (item === this) this.parent.fields.splice(index, 1);
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-form-item {
		@include vue-flex;
		// align-items: flex-start;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: $u-main-color;
		box-sizing: border-box;
		line-height: $u-form-item-height;
		flex-direction: column;

		&__border-bottom--error:after {
			border-color: $u-type-error;
		}

		&__body {
			@include vue-flex;
		}

		&--left {
			@include vue-flex;
			align-items: center;

			&__content {
				position: relative;
				@include vue-flex;
				align-items: center;
				padding-right: 10rpx;
				flex: 1;

				&__icon {
					margin-right: 8rpx;
				}

				&--required {
					position: absolute;
					left: -16rpx;
					vertical-align: middle;
					color: $u-type-error;
					padding-top: 6rpx;
				}

				&__label {
					@include vue-flex;
					align-items: center;
					flex: 1;
				}
			}
		}

		&--right {
			flex: 1;

			&__content {
				@include vue-flex;
				align-items: center;
				flex: 1;

				&__slot {
					flex: 1;
					/* #ifndef MP */
					@include vue-flex;
					align-items: center;
					/* #endif */
				}

				&__icon {
					margin-left: 10rpx;
					color: $u-light-color;
					font-size: 30rpx;
				}
			}
		}

		&__message {
			font-size: 24rpx;
			line-height: 24rpx;
			color: $u-type-error;
			margin-top: 12rpx;
		}
	}
</style>
