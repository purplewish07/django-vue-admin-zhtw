<template>
	<view class="u-select">
		<!-- <view class="u-select__action" :class="{
			'u-select--border': border
		}" @tap.stop="selectHandler">
			<view class="u-select__action__icon" :class="{
				'u-select__action__icon--reverse': value == true
			}">
				<u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>
			</view>
		</view> -->
		<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
			<view class="u-select">
				<view class="u-select__header" @touchmove.stop.prevent="">
					<view
						class="u-select__header__cancel u-select__header__btn"
						:style="{ color: cancelColor }"
						hover-class="u-hover-class"
						:hover-stay-time="150"
						@tap="getResult('cancel')"
					>
						{{cancelText}}
					</view>
					<view class="u-select__header__title">
						{{title}}
					</view>
					<view
						class="u-select__header__confirm u-select__header__btn"
						:style="{ color: moving ? cancelColor : confirmColor }"
						hover-class="u-hover-class"
						:hover-stay-time="150"
						@touchmove.stop=""
						@tap.stop="getResult('confirm')"
					>
						{{confirmText}}
					</view>
				</view>
				<view class="u-select__body">
					<picker-view @change="columnChange" class="u-select__body__picker-view" :value="defaultSelector" @pickstart="pickstart" @pickend="pickend">
						<picker-view-column v-for="(item, index) in columnData" :key="index">
							<view class="u-select__body__picker-view__item" v-for="(item1, index1) in item" :key="index1">
								<view class="u-line-1">{{ item1[labelName] }}</view>
							</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/**
	 * select 列選擇器
	 * @description 此選擇器用於單列，多列，多列聯動的選擇場景。(從1.3.0版本起，不建議使用Picker組件的單列和多列模式，Select組件是專門為列選擇而構造的組件，更簡單易用。)
	 * @tutorial http://uviewui.com/components/select.html
	 * @property {String} mode 模式選擇，"single-column"-單列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列聯動模式
	 * @property {Array} list 列數據，數組形式，見官網說明
	 * @property {Boolean} v-model 布爾值變量，用於控制選擇器的彈出與收起
	 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配(默認false)
	 * @property {String} cancel-color 取消按鈕的顏色（默認#606266）
	 * @property {String} confirm-color 確認按鈕的顏色(默認#2979ff)
	 * @property {String} confirm-text 確認按鈕的文字
	 * @property {String} cancel-text 取消按鈕的文字
	 * @property {String} default-value 提供的默認選中的下標，見官網說明
	 * @property {Boolean} mask-close-able 是否允許通過點擊遮罩關閉Picker(默認true)
	 * @property {String Number} z-index 彈出時的z-index值(默認10075)
	 * @property {String} value-name 自定義list數據的value屬性名 1.3.6
	 * @property {String} label-name 自定義list數據的label屬性名 1.3.6
	 * @property {String} child-name 自定義list數據的children屬性名，只對多列聯動模式有效 1.3.7
	 * @event {Function} confirm 點擊確定按鈕，返回當前選擇的值
	 * @example <u-select v-model="show" :list="list"></u-select>
	 */

export default {
	props: {
		// 列數據
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 是否顯示邊框
		border: {
			type: Boolean,
			default: true
		},
		// 通過雙向綁定控制組件的彈出與收起
		value: {
			type: Boolean,
			default: false
		},
		// "取消"按鈕的顏色
		cancelColor: {
			type: String,
			default: '#606266'
		},
		// "確定"按鈕的顏色
		confirmColor: {
			type: String,
			default: '#2979ff'
		},
		// 彈出的z-index值
		zIndex: {
			type: [String, Number],
			default: 0
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: false
		},
		// 是否允許通過點擊遮罩關閉Picker
		maskCloseAble: {
			type: Boolean,
			default: true
		},
		// 提供的默認選中的下標
		defaultValue: {
			type: Array,
			default() {
				return [0];
			}
		},
		// 模式選擇，single-column-單列，mutil-column-多列，mutil-column-auto-多列聯動
		mode: {
			type: String,
			default: 'single-column'
		},
		// 自定義value屬性名
		valueName: {
			type: String,
			default: 'value'
		},
		// 自定義label屬性名
		labelName: {
			type: String,
			default: 'label'
		},
		// 自定義多列聯動模式的children屬性名
		childName: {
			type: String,
			default: 'children'
		},
		// 頂部標題
		title: {
			type: String,
			default: ''
		},
		// 取消按鈕的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 確認按鈕的文字
		confirmText: {
			type: String,
			default: '確認'
		}
	},
	data() {
		return {
			// 用於列改變時，保存當前的索引，下一次變化時比較得出是哪一列發生了變化
			defaultSelector: [0],
			// picker-view的數據
			columnData: [],
			// 每次隊列發生變化時，保存選擇的結果
			selectValue: [],
			// 上一次列變化時的index
			lastSelectIndex: [],
			// 列數
			columnNum: 0,
			// 列是否還在滑動中，微信小程序如果在滑動中就點確定，結果可能不準確
			moving: false
		};
	},
	watch: {
		// 在select彈起的時候，重新初始化所有數據
		value: {
			immediate: true,
			handler(val) {
				if(val) setTimeout(() => this.init(), 10);
			}
		},
	},
	computed: {
		uZIndex() {
			// 如果用戶有傳遞z-index值，優先使用
			return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
		},
	},
	methods: {
		// 標識滑動開始，只有微信小程序才有這樣的事件
		pickstart() {
			// #ifdef MP-WEIXIN
			this.moving = true;
			// #endif
		},
		// 標識滑動結束
		pickend() {
			// #ifdef MP-WEIXIN
			this.moving = false;
			// #endif
		},
		init() {
			this.setColumnNum();
			this.setDefaultSelector();
			this.setColumnData();
			this.setSelectValue();
		},
		// 獲取默認選中列下標
		setDefaultSelector() {
			// 如果沒有傳入默認選中的值，生成長度為columnNum，用0填充的數組
			this.defaultSelector = this.defaultValue.length == this.columnNum ? this.defaultValue : Array(this.columnNum).fill(0);
			this.lastSelectIndex = this.$u.deepClone(this.defaultSelector);
		},
		// 計算列數
		setColumnNum() {
			// 單列的列數為1
			if(this.mode == 'single-column') this.columnNum = 1;
			// 多列時，this.list數組長度就是列數
			else if(this.mode == 'mutil-column') this.columnNum = this.list.length;
			// 多列聯動時，通過歷遍this.list的第一個元素，得出有多少列
			else if(this.mode == 'mutil-column-auto') {
				let num = 1;
				let column = this.list;
				// 只要有元素並且第一個元素有children屬性，繼續歷遍
				while(column[0][this.childName]) {
					column = column[0] ? column[0][this.childName] : {};
					num ++;
				}
				this.columnNum = num;
			}
		},
		// 獲取需要展示在picker中的列數據
		setColumnData() {
			let data = [];
			this.selectValue = [];
			if(this.mode == 'mutil-column-auto') {
				// 獲得所有數據中的第一個元素
				let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0];
				// 通過循環所有的列數，再根據設定列的數組，得出當前需要渲染的整個列數組
				for (let i = 0; i < this.columnNum; i++) {
					// 第一列默認為整個list數組
					if (i == 0) {
						data[i] = this.list;
						column = column[this.childName];
					} else {
						// 大於第一列時，判斷是否有默認選中的，如果沒有就用該列的第一項
						data[i] = column;
						column = column[this.defaultSelector[i]][this.childName];
					}
				}
			} else if(this.mode == 'single-column') {
				data[0] = this.list;
			} else {
				data = this.list;
			}
			this.columnData = data;
		},
		// 獲取默認選中的值，如果沒有設置defaultValue，就默認選中每列的第一個
		setSelectValue() {
			let tmp = null;
			for(let i = 0; i < this.columnNum; i++) {
				tmp = this.columnData[i][this.defaultSelector[i]];
				let data = {
					value: tmp ? tmp[this.valueName] : null,
					label: tmp ? tmp[this.labelName] : null
				};
				// 判斷是否存在額外的參數，如果存在，就返回
				if(tmp && tmp.extra) data.extra = tmp.extra;
				this.selectValue.push(data)
			}
		},
		// 列選項
		columnChange(e) {
			let index = null;
			let columnIndex = e.detail.value;
			// 由於後面是需要push進數組的，所以需要先清空數組
			this.selectValue = [];
			if(this.mode == 'mutil-column-auto') {
				// 對比前後兩個數組，尋找變更的是哪一列，如果某一個元素不同，即可判定該列發生了變化
				this.lastSelectIndex.map((val, idx) => {
					if (val != columnIndex[idx]) index = idx;
				});
				this.defaultSelector = columnIndex;
				for (let i = index + 1; i < this.columnNum; i++) {
					// 當前變化列的下一列的數據，需要獲取上一列的數據，同時需要指定是上一列的第幾個的children，再往後的
					// 默認是隊列的第一個為默認選項
					this.columnData[i] = this.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][this.childName];
					// 改變的列之後的所有列，默認選中第一個
					this.defaultSelector[i] = 0;
				}
				// 在歷遍的過程中，可能由於上一步修改this.columnData，導致產生連鎖反應，程序觸發columnChange，會有多次調用
				// 只有在最後一次數據穩定後的結果是正確的，此前的歷遍中，可能會產生undefined，故需要判斷
				columnIndex.map((item, index) => {
					let data = this.columnData[index][columnIndex[index]];
					let tmp = {
						value: data ? data[this.valueName] : null,
						label: data ? data[this.labelName] : null,
					};
					// 判斷是否有需要額外攜帶的參數
					if(data && data.extra !== undefined) tmp.extra = data.extra;
					this.selectValue.push(tmp);

				})
				// 保存這一次的結果，用於下次列發生變化時作比較
				this.lastSelectIndex = columnIndex;
			} else if(this.mode == 'single-column') {
				let data = this.columnData[0][columnIndex[0]];
				// 初始默認選中值
				let tmp = {
					value: data ? data[this.valueName] : null,
					label: data ? data[this.labelName] : null,
				};
				// 判斷是否有需要額外攜帶的參數
				if(data && data.extra !== undefined) tmp.extra = data.extra;
				this.selectValue.push(tmp);
			} else if(this.mode == 'mutil-column') {
				// 初始默認選中值
				columnIndex.map((item, index) => {
					let data = this.columnData[index][columnIndex[index]];
					// 初始默認選中值
					let tmp = {
						value: data ? data[this.valueName] : null,
						label: data ? data[this.labelName] : null,
					};
					// 判斷是否有需要額外攜帶的參數
					if(data && data.extra !== undefined) tmp.extra = data.extra;
					this.selectValue.push(tmp);
				})
			}
		},
		close() {
			this.$emit('input', false);
		},
		// 點擊確定或者取消
		getResult(event = null) {
			// #ifdef MP-WEIXIN
			if (this.moving) return;
			// #endif
			if (event) this.$emit(event, this.selectValue);
			this.close();
		},
		selectHandler() {
			this.$emit('click');
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-select {

	&__action {
		position: relative;
		line-height: $u-form-item-height;
		height: $u-form-item-height;

		&__icon {
			position: absolute;
			right: 20rpx;
			top: 50%;
			transition: transform .4s;
			transform: translateY(-50%);
			z-index: 1;

			&--reverse {
				transform: rotate(-180deg) translateY(50%);
			}
		}
	}

	&__hader {
		&__title {
			color: $u-content-color;
		}
	}

	&--border {
		border-radius: 6rpx;
		border-radius: 4px;
		border: 1px solid $u-form-item-border-color;
	}

	&__header {
		@include vue-flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		padding: 0 40rpx;
	}

	&__body {
		width: 100%;
		height: 500rpx;
		overflow: hidden;
		background-color: #fff;

		&__picker-view {
			height: 100%;
			box-sizing: border-box;

			&__item {
				@include vue-flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				color: $u-main-color;
				padding: 0 8rpx;
			}
		}
	}
}
</style>
