<template>
	<view class="u-dropdown-item" v-if="active" @touchmove.stop.prevent="() => {}" @tap.stop.prevent="() => {}">
		<block v-if="!$slots.default && !$slots.$default">
			<scroll-view scroll-y="true" :style="{
				height: $u.addUnit(height)
			}">
				<view class="u-dropdown-item__options">
					<u-cell-group>
						<u-cell-item @click="cellClick(item.value)" :arrow="false" :title="item.label" v-for="(item, index) in options"
						 :key="index" :title-style="{
							color: value == item.value ? activeColor : inactiveColor
						}">
							<u-icon v-if="value == item.value" name="checkbox-mark" :color="activeColor" size="32"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
			</scroll-view>
		</block>
		<slot v-else />
	</view>
</template>

<script>
	/**
	 * dropdown-item 下拉菜單
	 * @description 該組件一般用於向下展開菜單，同時可切換多個選項卡的場景
	 * @tutorial http://uviewui.com/components/dropdown.html
	 * @property {String | Number} v-model 雙向綁定選項卡選擇值
	 * @property {String} title 菜單項標題
	 * @property {Array[Object]} options 選項數據，如果傳入了默認slot，此參數無效
	 * @property {Boolean} disabled 是否禁用此選項卡（默認false）
	 * @property {String | Number} duration 選項卡展開和收起的過渡時間，單位ms（默認300）
	 * @property {String | Number} height 彈窗下拉內容的高度(內容超出將會滾動)（默認auto）
	 * @example <u-dropdown-item title="標題"></u-dropdown-item>
	 */
	export default {
		name: 'u-dropdown-item',
		props: {
			// 當前選中項的value值
			value: {
				type: [Number, String, Array],
				default: ''
			},
			// 菜單項標題
			title: {
				type: [String, Number],
				default: ''
			},
			// 選項數據，如果傳入了默認slot，此參數無效
			options: {
				type: Array,
				default () {
					return []
				}
			},
			// 是否禁用此菜單項
			disabled: {
				type: Boolean,
				default: false
			},
			// 下拉彈窗的高度
			height: {
				type: [Number, String],
				default: 'auto'
			},
		},
		data() {
			return {
				active: false, // 當前項是否處於展開狀態
				activeColor: '#2979ff', // 激活時左邊文字和右邊對勾圖標的顏色
				inactiveColor: '#606266', // 未激活時左邊文字和右邊對勾圖標的顏色
			}
		},
		computed: {
			// 監聽props是否發生了變化，有些值需要傳遞給父組件u-dropdown，無法雙向綁定
			propsChange() {
				return `${this.title}-${this.disabled}`;
			}
		},
		watch: {
			propsChange(n) {
				// 當值變化時，通知父組件重新初始化，讓父組件執行每個子組件的init()方法
				// 將所有子組件數據重新整理一遍
				if (this.parent) this.parent.init();
			}
		},
		created() {
			// 父組件的實例
			this.parent = false;
		},
		methods: {
			init() {
				// 獲取父組件u-dropdown
				let parent = this.$u.$parent.call(this, 'u-dropdown');
				if (parent) {
					this.parent = parent;
					// 將子組件的激活顏色配置為父組件設置的激活和未激活時的顏色
					this.activeColor = parent.activeColor;
					this.inactiveColor = parent.inactiveColor;
					// 將本組件的this，放入到父組件的children數組中，讓父組件可以操作本(子)組件的方法和屬性
					// push進去前，顯判斷是否已經存在了本實例，因為在子組件內部數據變化時，會通過父組件重新初始化子組件
					let exist = parent.children.find(val => {
						return this === val;
					})
					if (!exist) parent.children.push(this);
					if (parent.children.length == 1) this.active = true;
					// 父組件無法監聽children的變化，故將子組件的title，傳入父組件的menuList數組中
					parent.menuList.push({
						title: this.title,
						disabled: this.disabled
					});
				}
			},
			// cell被點擊
			cellClick(value) {
				// 修改通過v-model綁定的值
				this.$emit('input', value);
				// 通知父組件(u-dropdown)收起菜單
				this.parent.close();
				// 發出事件，拋出當前勾選項的value
				this.$emit('change', value);
			}
		},
		mounted() {
			this.init();
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
</style>
