<template>
	<view class="u-rate" :id="elId" @touchmove.stop.prevent="touchMove">
		<view class="u-star-wrap" v-for="(item, index) in count" :key="index" :class="[elClass]">
			<u-icon
				:name="activeIndex > index ? elActiveIcon : inactiveIcon"
				@click="click(index + 1, $event)"
				:color="activeIndex > index ? elActiveColor : inactiveColor"
				:custom-style="{
					fontSize: size + 'rpx',
					padding: `0 ${gutter / 2 + 'rpx'}`
				}"
				:custom-prefix="customPrefix"
				:show-decimal-icon="showDecimalIcon(index)"
				:percent="decimal"
				:inactive-color="inactiveColor"
			></u-icon>
		</view>
	</view>
</template>

<script>/**
 * rate 評分
 * @description 該組件一般用於滿意度調查，星型評分的場景
 * @tutorial https://www.uviewui.com/components/rate.html
 * @property {String Number} count 最多可選的星星數量（默認5）
 * @property {String Number} current 默認選中的星星數量（默認0）
 * @property {Boolean} disabled 是否禁止用戶操作（默認false）
 * @property {String Number} size 星星的大小，單位rpx（默認32）
 * @property {String} inactive-color 未選中星星的顏色（默認#b2b2b2）
 * @property {String} active-color 選中的星星顏色（默認#FA3534）
 * @property {String} active-icon 選中時的圖標名，只能為uView的內置圖標（默認star-fill）
 * @property {String} inactive-icon 未選中時的圖標名，只能為uView的內置圖標（默認star）
 * @property {String} gutter 星星之間的距離（默認10）
 * @property {String Number} min-count 最少選中星星的個數（默認0）
 * @property {Boolean} allow-half 是否允許半星選擇（默認false）
 * @event {Function} change 選中的星星發生變化時觸發
 * @example <u-rate :count="count" :current="2"></u-rate>
 */

export default {
	name: 'u-rate',
	props: {
		// 用於v-model雙向綁定選中的星星數量
		// 1.4.5版新增
		value: {
			type: [Number, String],
			default: -1
		},
		// 要顯示的星星數量
		count: {
			type: [Number, String],
			default: 5
		},
		// 當前需要默認選中的星星(選中的個數)
		// 1.4.5後通過value雙向綁定，不再建議使用此參數
		current: {
			type: [Number, String],
			default: 0
		},
		// 是否不可選中
		disabled: {
			type: Boolean,
			default: false
		},
		// 星星的大小，單位rpx
		size: {
			type: [Number, String],
			default: 32
		},
		// 未選中時的顏色
		inactiveColor: {
			type: String,
			default: '#b2b2b2'
		},
		// 選中的顏色
		activeColor: {
			type: String,
			default: '#FA3534'
		},
		// 星星之間的間距，單位rpx
		gutter: {
			type: [Number, String],
			default: 10
		},
		// 最少能選擇的星星個數
		minCount: {
			type: [Number, String],
			default: 0
		},
		// 是否允許半星(功能尚未實現)
		allowHalf: {
			type: Boolean,
			default: false
		},
		// 選中時的圖標(星星)
		activeIcon: {
			type: String,
			default: 'star-fill'
		},
		// 未選中時的圖標(星星)
		inactiveIcon: {
			type: String,
			default: 'star'
		},
		// 自定義擴展前綴，方便用戶擴展自己的圖標庫
		customPrefix: {
			type: String,
			default: 'uicon'
		},
		colors: {
			type: Array,
			default() {
				return []
			}
		},
		icons: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			// 生成一個唯一id，否則一個頁面多個評分組件，會造成衝突
			elId: this.$u.guid(),
			elClass: this.$u.guid(),
			starBoxLeft: 0, // 評分盒子左邊到屏幕左邊的距離，用於滑動選擇時計算距離
			// 當前激活的星星的index，如果存在value，優先使用value，因為它可以雙向綁定(1.4.5新增)
			activeIndex: this.value != -1 ? this.value : this.current,
			starWidth: 0, // 每個星星的寬度
			starWidthArr: [] //每個星星最右邊到組件盒子最左邊的距離
		}
	},
	watch: {
		current(val) {
			this.activeIndex = val
		},
		value(val) {
			this.activeIndex = val
		}
	},
	computed: {
		decimal() {
			if (this.disabled) {
				return this.activeIndex * 100 % 100
			} else if (this.allowHalf) {
				return 50
			}
		},
		elActiveIcon() {
			const len = this.icons.length
			// 此處規則類似於下方的elActiveColor參數，都是根據一定的規則，顯示不同的圖標
			// 結果可能如此：icons參數傳遞了3個圖標，當選中兩個時，用第一個圖標，4個時，用第二個圖標
			// 第三個時，用第三個圖標作為激活的圖標
			if (len && len <= this.count) {
				const step = Math.round(this.activeIndex / Math.round(this.count / len))
				if (step < 1) return this.icons[0]
				if (step > len) return this.icons[len - 1]
				return this.icons[step - 1]
			}
			return this.activeIcon
		},
		elActiveColor() {
			const len = this.colors.length
			// 如果有設置colors參數(此參數用於將圖標分段，比如一共5顆星，colors傳3個顏色值，那麼根據一定的規則，2顆星可能為第一個顏色
			// 4顆星為第二個顏色值，5顆星為第三個顏色值)
			if (len && len <= this.count) {
				const step = Math.round(this.activeIndex / Math.round(this.count / len))
				if (step < 1) return this.colors[0]
				if (step > len) return this.colors[len - 1]
				return this.colors[step - 1]
			}
			return this.activeColor
		}
	},
	methods: {
		// 獲取評分組件盒子的佈局信息
		getElRectById() {
			// uView封裝的獲取節點的方法，詳見文檔
			this.$u.getRect('#' + this.elId).then(res => {
				this.starBoxLeft = res.left
			})
		},
		// 獲取單個星星的尺寸
		getElRectByClass() {
			// uView封裝的獲取節點的方法，詳見文檔
			this.$u.getRect('.' + this.elClass).then(res => {
				this.starWidth = res.width
				// 把每個星星右邊到組件盒子左邊的距離放入數組中
				for (let i = 0; i < this.count; i++) {
					this.starWidthArr[i] = (i + 1) * this.starWidth
				}
			})
		},
		// 手指滑動
		touchMove(e) {
			if (this.disabled) {
				return
			}
			if (!e.changedTouches[0]) {
				return
			}
			const movePageX = e.changedTouches[0].pageX
			// 滑動點相對於評分盒子左邊的距離
			const distance = movePageX - this.starBoxLeft

			// 如果滑動到了評分盒子的左邊界，就設置為0星
			if (distance <= 0) {
				this.activeIndex = 0
			}
			// 滑動的距離，相當於多少顆星星
			let index = Math.ceil(distance / this.starWidth)
			this.activeIndex = index > this.count ? this.count : index
			// 對最少顆星星的限制
			if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
			this.emitEvent()
		},
		// 通過點擊，直接選中
		click(index, e) {
			if (this.disabled) {
				return
			}
			// 半星選擇，尚未實現
			if (this.allowHalf) {
			}
			// 對第一個星星特殊處理，只有一個的時候，點擊可以取消，否則無法作0星評價
			if (index == 1) {
				if (this.activeIndex == 1) {
					this.activeIndex = 0
				} else {
					this.activeIndex = 1
				}
			} else {
				this.activeIndex = index
			}
			// 對最少顆星星的限制
			if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
			this.emitEvent()
		},
		// 發出事件
		emitEvent() {
			// 發出change事件
			this.$emit('change', this.activeIndex)
			// 同時修改雙向綁定的value的值
			if (this.value != -1) {
				this.$emit('input', this.activeIndex)
			}
		},
		showDecimalIcon(index) {
			return this.disabled && parseInt(this.activeIndex) === index
		}
	},
	mounted() {
		this.getElRectById()
		this.getElRectByClass()
	}
}
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-rate {
	display: -webkit-inline-flex;
	display: inline-flex;
	align-items: center;
	margin: 0;
	padding: 0;
}

.u-icon {
	box-sizing: border-box;
}
</style>
