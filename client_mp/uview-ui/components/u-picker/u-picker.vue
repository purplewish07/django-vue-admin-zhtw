<template>
	<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
		<view class="u-datetime-picker">
			<view class="u-picker-header" @touchmove.stop.prevent="">
				<view class="u-btn-picker u-btn-picker--tips" 
					:style="{ color: cancelColor }" 
					hover-class="u-opacity" 
					:hover-stay-time="150" 
					@tap="getResult('cancel')"
				>{{cancelText}}</view>
				<view class="u-picker__title">{{ title }}</view>
				<view
					class="u-btn-picker u-btn-picker--primary"
					:style="{ color: moving ? cancelColor : confirmColor }"
					hover-class="u-opacity"
					:hover-stay-time="150"
					@touchmove.stop=""
					@tap.stop="getResult('confirm')"
				>
					{{confirmText}}
				</view>
			</view>
			<view class="u-picker-body">
				<picker-view v-if="mode == 'region'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset && params.province">
						<view class="u-column-item" v-for="(item, index) in provinces" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.city">
						<view class="u-column-item" v-for="(item, index) in citys" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.area">
						<view class="u-column-item" v-for="(item, index) in areas" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'time'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset && params.year">
						<view class="u-column-item" v-for="(item, index) in years" :key="index">
							{{ item }}
							<text class="u-text" v-if="showTimeTag">年</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.month">
						<view class="u-column-item" v-for="(item, index) in months" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">月</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.day">
						<view class="u-column-item" v-for="(item, index) in days" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">日</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.hour">
						<view class="u-column-item" v-for="(item, index) in hours" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">時</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.minute">
						<view class="u-column-item" v-for="(item, index) in minutes" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">分</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.second">
						<view class="u-column-item" v-for="(item, index) in seconds" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">秒</text>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'selector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset">
						<view class="u-column-item" v-for="(item, index) in range" :key="index">
							<view class="u-line-1">{{ getItemValue(item, 'selector') }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'multiSelector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset" v-for="(item, index) in range" :key="index">
						<view class="u-column-item" v-for="(item1, index1) in item" :key="index1">
							<view class="u-line-1">{{ getItemValue(item1, 'multiSelector') }}</view>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import provinces from '../../libs/util/province.js';
import citys from '../../libs/util/city.js';
import areas from '../../libs/util/area.js';

/**
 * picker picker彈出選擇器
 * @description 此選擇器有兩種彈出模式：一是時間模式，可以配置年，日，月，時，分，秒參數 二是地區模式，可以配置省，市，區參數
 * @tutorial https://www.uviewui.com/components/picker.html
 * @property {Object} params 需要顯示的參數，見官網說明
 * @property {String} mode 模式選擇，region-地區類型，time-時間類型（默認time）
 * @property {String Number} start-year 可選的開始年份，mode=time時有效（默認1950）
 * @property {String Number} end-year 可選的結束年份，mode=time時有效（默認2050）
 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配（默認false）
 * @property {Boolean} show-time-tag 時間模式時，是否顯示後面的年月日中文提示
 * @property {String} cancel-color 取消按鈕的顏色（默認#606266）
 * @property {String} confirm-color 確認按鈕的顏色（默認#2979ff）
 * @property {String} default-time 默認選中的時間，mode=time時有效
 * @property {String} confirm-text 確認按鈕的文字
 * @property {String} cancel-text 取消按鈕的文字
 * @property {String} default-region 默認選中的地區，中文形式，mode=region時有效
 * @property {String} default-code 默認選中的地區，編號形式，mode=region時有效
 * @property {Boolean} mask-close-able 是否允許通過點擊遮罩關閉Picker（默認true）
 * @property {String Number} z-index 彈出時的z-index值（默認1075）
 * @property {Array} default-selector 數組形式，其中每一項表示選擇了range對應項中的第幾個
 * @property {Array} range 自定義選擇的數據，mode=selector或mode=multiSelector時有效
 * @property {String} range-key 當range參數的元素為對像時，指定Object中的哪個key的值作為選擇器顯示內容
 * @event {Function} confirm 點擊確定按鈕，返回當前選擇的值
 * @event {Function} cancel 點擊取消按鈕，返回當前選擇的值
 * @example <u-picker v-model="show" mode="time"></u-picker>
 */
export default {
	name: 'u-picker',
	props: {
		// picker中需要顯示的參數
		params: {
			type: Object,
			default() {
				return {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: true,
					city: true,
					area: true,
					timestamp: true,
				};
			}
		},
		// 當mode=selector或者mode=multiSelector時，提供的數組
		range: {
			type: Array,
			default() {
				return [];
			}
		},
		// 當mode=selector或者mode=multiSelector時，提供的默認選中的下標
		defaultSelector: {
			type: Array,
			default() {
				return [0];
			}
		},
		// 當 range 是一個 Array＜Object＞ 時，通過 range-key 來指定 Object 中 key 的值作為選擇器顯示內容
		rangeKey: {
			type: String,
			default: ''
		},
		// 模式選擇，region-地區類型，time-時間類型，selector-單列模式，multiSelector-多列模式
		mode: {
			type: String,
			default: 'time'
		},
		// 年份開始時間
		startYear: {
			type: [String, Number],
			default: 1950
		},
		// 年份結束時間
		endYear: {
			type: [String, Number],
			default: 2050
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
		// 默認顯示的時間，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
		defaultTime: {
			type: String,
			default: ''
		},
		// 默認顯示的地區，可傳類似["河北省", "秦皇島市", "北戴河區"]
		defaultRegion: {
			type: Array,
			default() {
				return [];
			}
		},
		// 時間模式時，是否顯示後面的年月日中文提示
		showTimeTag: {
			type: Boolean,
			default: true
		},
		// 默認顯示地區的編碼，defaultRegion和areaCode同時存在，areaCode優先，可傳類似["13", "1303", "130304"]
		areaCode: {
			type: Array,
			default() {
				return [];
			}
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
		// 通過雙向綁定控制組件的彈出與收起
		value: {
			type: Boolean,
			default: false
		},
		// 彈出的z-index值
		zIndex: {
			type: [String, Number],
			default: 0
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
			years: [],
			months: [],
			days: [],
			hours: [],
			minutes: [],
			seconds: [],
			year: 0,
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			reset: false,
			startDate: '',
			endDate: '',
			valueArr: [],
			provinces: provinces,
			citys: citys[0],
			areas: areas[0][0],
			province: 0,
			city: 0,
			area: 0,
			moving: false // 列是否還在滑動中，微信小程序如果在滑動中就點確定，結果可能不準確
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		propsChange() {
			// 引用這幾個變量，是為了監聽其變化
			return `${this.mode}-${this.defaultTime}-${this.startYear}-${this.endYear}-${this.defaultRegion}-${this.areaCode}`;
		},
		regionChange() {
			// 引用這幾個變量，是為了監聽其變化
			return `${this.province}-${this.city}`;
		},
		yearAndMonth() {
			return `${this.year}-${this.month}`;
		},
		uZIndex() {
			// 如果用戶有傳遞z-index值，優先使用
			return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
		}
	},
	watch: {
		propsChange() {
			this.reset = true;
			setTimeout(() => this.init(), 10);
		},
		// 如果地區發生變化，為了讓picker聯動起來，必須重置this.citys和this.areas
		regionChange(val) {
			this.citys = citys[this.province];
			this.areas = areas[this.province][this.city];
		},
		// watch監聽月份的變化，實時變更日的天數，因為不同月份，天數不一樣
		// 一個月可能有30，31天，甚至閏年2月的29天，平年2月28天
		yearAndMonth(val) {
			if (this.params.year) this.setDays();
		},
		// 微信和QQ小程序由於一些奇怪的原因(故同時對所有平台均初始化一遍)，需要重新初始化才能顯示正確的值
		value(n) {
			if (n) {
				this.reset = true;
				setTimeout(() => this.init(), 10);
			}
		}
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
		// 對單列和多列形式的判斷是否有傳入變量的情況
		getItemValue(item, mode) {
			// 目前(2020-05-25)uni-app對微信小程序編譯有錯誤，導致v-if為false中的內容也執行，錯誤導致
			// 單列模式或者多列模式中的getItemValue同時被執行，故在這裡再加一層判斷
			if (this.mode == mode) {
				return typeof item == 'object' ? item[this.rangeKey] : item;
			}
		},
		// 小於10前面補0，用於月份，日期，時分秒等
		formatNumber(num) {
			return +num < 10 ? '0' + num : String(num);
		},
		// 生成遞進的數組
		generateArray: function(start, end) {
			// 轉為數值格式，否則用戶給end-year等傳遞字符串值時，下面的end+1會導致字符串拼接，而不是相加
			start = Number(start);
			end = Number(end);
			end = end > start ? end : start;
			// 生成數組，獲取其中的索引，並剪出來
			return [...Array(end + 1).keys()].slice(start);
		},
		getIndex: function(arr, val) {
			let index = arr.indexOf(val);
			// 如果index為-1(即找不到index值)，~(-1)=-(-1)-1=0，導致條件不成立
			return ~index ? index : 0;
		},
		//日期時間處理
		initTimeValue() {
			// 格式化時間，在IE瀏覽器(uni不存在此情況)，無法識別日期間的"-"間隔符號
			let fdate = this.defaultTime.replace(/\-/g, '/');
			fdate = fdate && fdate.indexOf('/') == -1 ? `2020/01/01 ${fdate}` : fdate;
			let time = null;
			if (fdate) time = new Date(fdate);
			else time = new Date();
			// 獲取年日月時分秒
			this.year = time.getFullYear();
			this.month = Number(time.getMonth()) + 1;
			this.day = time.getDate();
			this.hour = time.getHours();
			this.minute = time.getMinutes();
			this.second = time.getSeconds();
		},
		init() {
			this.valueArr = [];
			this.reset = false;
			if (this.mode == 'time') {
				this.initTimeValue();
				if (this.params.year) {
					this.valueArr.push(0);
					this.setYears();
				}
				if (this.params.month) {
					this.valueArr.push(0);
					this.setMonths();
				}
				if (this.params.day) {
					this.valueArr.push(0);
					this.setDays();
				}
				if (this.params.hour) {
					this.valueArr.push(0);
					this.setHours();
				}
				if (this.params.minute) {
					this.valueArr.push(0);
					this.setMinutes();
				}
				if (this.params.second) {
					this.valueArr.push(0);
					this.setSeconds();
				}
			} else if (this.mode == 'region') {
				if (this.params.province) {
					this.valueArr.push(0);
					this.setProvinces();
				}
				if (this.params.city) {
					this.valueArr.push(0);
					this.setCitys();
				}
				if (this.params.area) {
					this.valueArr.push(0);
					this.setAreas();
				}
			} else if (this.mode == 'selector') {
				this.valueArr = this.defaultSelector;
			} else if (this.mode == 'multiSelector') {
				this.valueArr = this.defaultSelector;
				this.multiSelectorValue = this.defaultSelector;
			}
			this.$forceUpdate();
		},
		// 設置picker的某一列值
		setYears() {
			// 獲取年份集合
			this.years = this.generateArray(this.startYear, this.endYear);
			// 設置this.valueArr某一項的值，是為了讓picker預選中某一個值
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
		},
		setMonths() {
			this.months = this.generateArray(1, 12);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
		},
		setDays() {
			let totalDays = new Date(this.year, this.month, 0).getDate();
			this.days = this.generateArray(1, totalDays);
			let index = 0;
			// 這裡不能使用類似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
			// 因為this.month和this.year變化時，會觸發watch中的this.setDays()，導致this.valueArr.length計算有誤
			if (this.params.year && this.params.month) index = 2;
			else if (this.params.month) index = 1;
			else if (this.params.year) index = 1;
			else index = 0;
			// 當月份變化時，會導致日期的天數也會變化，如果原來選的天數大於變化後的天數，則重置為變化後的最大值
			// 比如原來選中3月31日，調整為2月後，日期變為最大29，這時如果day值繼續為31顯然不合理，於是將其置為29(picker-column從1開始)
			if(this.day > this.days.length) this.day = this.days.length;
			this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
		},
		setHours() {
			this.hours = this.generateArray(0, 23);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
		},
		setMinutes() {
			this.minutes = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
		},
		setSeconds() {
			this.seconds = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
		},
		setProvinces() {
			// 判斷是否需要province參數
			if (!this.params.province) return;
			let tmp = '';
			let useCode = false;
			// 如果同時配置了defaultRegion和areaCode，優先使用areaCode參數
			if (this.areaCode.length) {
				tmp = this.areaCode[0];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[0];
			else tmp = 0;
			// 歷遍省份數組匹配
			provinces.map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.province = tmp;
			this.provinces = provinces;
			// 設置默認省份的值
			this.valueArr.splice(0, 1, this.province);
		},
		setCitys() {
			if (!this.params.city) return;
			let tmp = '';
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[1];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[1];
			else tmp = 0;
			citys[this.province].map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.city = tmp;
			this.citys = citys[this.province];
			this.valueArr.splice(1, 1, this.city);
		},
		setAreas() {
			if (!this.params.area) return;
			let tmp = '';
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[2];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[2];
			else tmp = 0;
			areas[this.province][this.city].map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.area = tmp;
			this.areas = areas[this.province][this.city];
			this.valueArr.splice(2, 1, this.area);
		},
		close() {
			this.$emit('input', false);
		},
		// 用戶更改picker的列選項
		change(e) {
			this.valueArr = e.detail.value;
			let i = 0;
			if (this.mode == 'time') {
				// 這裡使用i++，是因為this.valueArr數組的長度是不確定長度的，它根據this.params的值來配置長度
				// 進入if規則，i會加1，保證了能獲取準確的值
				if (this.params.year) this.year = this.years[this.valueArr[i++]];
				if (this.params.month) this.month = this.months[this.valueArr[i++]];
				if (this.params.day) this.day = this.days[this.valueArr[i++]];
				if (this.params.hour) this.hour = this.hours[this.valueArr[i++]];
				if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]];
				if (this.params.second) this.second = this.seconds[this.valueArr[i++]];
			} else if (this.mode == 'region') {
				if (this.params.province) this.province = this.valueArr[i++];
				if (this.params.city) this.city = this.valueArr[i++];
				if (this.params.area) this.area = this.valueArr[i++];
			} else if (this.mode == 'multiSelector') {
				let index = null;
				// 對比前後兩個數組，尋找變更的是哪一列，如果某一個元素不同，即可判定該列發生了變化
				this.defaultSelector.map((val, idx) => {
					if (val != e.detail.value[idx]) index = idx;
				});
				// 為了讓用戶對多列變化時，對動態設置其他列的變更
				if (index != null) {
					this.$emit('columnchange', {
						column: index,
						index: e.detail.value[index]
					});
				}
			}
		},
		// 用戶點擊確定按鈕
		getResult(event = null) {
			// #ifdef MP-WEIXIN
			if (this.moving) return;
			// #endif
			let result = {};
			// 只返回用戶在this.params中配置了為true的字段
			if (this.mode == 'time') {
				if (this.params.year) result.year = this.formatNumber(this.year || 0);
				if (this.params.month) result.month = this.formatNumber(this.month || 0);
				if (this.params.day) result.day = this.formatNumber(this.day || 0);
				if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
				if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
				if (this.params.second) result.second = this.formatNumber(this.second || 0);
				if (this.params.timestamp) result.timestamp = this.getTimestamp();
			} else if (this.mode == 'region') {
				if (this.params.province) result.province = provinces[this.province];
				if (this.params.city) result.city = citys[this.province][this.city];
				if (this.params.area) result.area = areas[this.province][this.city][this.area];
			} else if (this.mode == 'selector') {
				result = this.valueArr;
			} else if (this.mode == 'multiSelector') {
				result = this.valueArr;
			}
			if (event) this.$emit(event, result);
			this.close();
		},
		// 獲取時間戳
		getTimestamp() {
			// yyyy-mm-dd為安卓寫法，不支持iOS，需要使用"/"分隔，才能二者兼容
			let time = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second;
			return new Date(time).getTime() / 1000;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-datetime-picker {
	position: relative;
	z-index: 999;
}

.u-picker-view {
	height: 100%;
	box-sizing: border-box;
}

.u-picker-header {
	width: 100%;
	height: 90rpx;
	padding: 0 40rpx;
	@include vue-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 30rpx;
	background: #fff;
	position: relative;
}

.u-picker-header::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.u-picker__title {
	color: $u-content-color;
}

.u-picker-body {
	width: 100%;
	height: 500rpx;
	overflow: hidden;
	background-color: #fff;
}

.u-column-item {
	@include vue-flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: $u-main-color;
	padding: 0 8rpx;
}

.u-text {
	font-size: 24rpx;
	padding-left: 8rpx;
}

.u-btn-picker {
	padding: 16rpx;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
}

.u-opacity {
	opacity: 0.5;
}

.u-btn-picker--primary {
	color: $u-type-primary;
}

.u-btn-picker--tips {
	color: $u-tips-color;
}
</style>
