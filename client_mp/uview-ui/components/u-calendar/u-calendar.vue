<template>
	<u-popup closeable :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
	 :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex" :border-radius="borderRadius" :closeable="closeable">
		<view class="u-calendar">
			<view class="u-calendar__header">
				<view class="u-calendar__header__text" v-if="!$slots['tooltip']">
					{{toolTip}}
				</view>
				<slot v-else name="tooltip" />
			</view>
			<view class="u-calendar__action u-flex u-row-center">
				<view class="u-calendar__action__icon">
					<u-icon v-if="changeYear" name="arrow-left-double" :color="yearArrowColor" @click="changeYearHandler(0)"></u-icon>
				</view>
				<view class="u-calendar__action__icon">
					<u-icon v-if="changeMonth" name="arrow-left" :color="monthArrowColor" @click="changeMonthHandler(0)"></u-icon>
				</view>
				<view class="u-calendar__action__text">{{ showTitle }}</view>
				<view class="u-calendar__action__icon">
					<u-icon v-if="changeMonth" name="arrow-right" :color="monthArrowColor" @click="changeMonthHandler(1)"></u-icon>
				</view>
				<view class="u-calendar__action__icon">
					<u-icon v-if="changeYear" name="arrow-right-double" :color="yearArrowColor" @click="changeYearHandler(1)"></u-icon>
				</view>
			</view>
			<view class="u-calendar__week-day">
				<view class="u-calendar__week-day__text" v-for="(item, index) in weekDayZh" :key="index">{{item}}</view>
			</view>
			<view class="u-calendar__content">
				<!-- 前置空白部分 -->
				<block v-for="(item, index) in weekdayArr" :key="index">
					<view class="u-calendar__content__item"></view>
				</block>
				<view class="u-calendar__content__item" :class="{
					'u-hover-class':openDisAbled(year,month,index+1),
					'u-calendar__content--start-date': (mode == 'range' && startDate==`${year}-${month}-${index+1}`) || mode== 'date',
					'u-calendar__content--end-date':(mode== 'range' && endDate==`${year}-${month}-${index+1}`) || mode == 'date'
				}" :style="{backgroundColor: getColor(index,1)}" v-for="(item, index) in daysArr" :key="index"
				 @tap="dateClick(index)">
					<view class="u-calendar__content__item__inner" :style="{color: getColor(index,2)}">
						<view>{{ index + 1 }}</view>
					</view>
					<view class="u-calendar__content__item__tips" :style="{color:activeColor}" v-if="mode== 'range' && startDate==`${year}-${month}-${index+1}` && startDate!=endDate">{{startText}}</view>
					<view class="u-calendar__content__item__tips" :style="{color:activeColor}" v-if="mode== 'range' && endDate==`${year}-${month}-${index+1}`">{{endText}}</view>
				</view>
				<view class="u-calendar__content__bg-month">{{month}}</view>
			</view>
			<view class="u-calendar__bottom">
				<view class="u-calendar__bottom__choose">
					<text>{{mode == 'date' ? activeDate : startDate}}</text>
					<text v-if="endDate">至{{endDate}}</text>
				</view>
				<view class="u-calendar__bottom__btn">
					<u-button :type="btnType" shape="circle" size="default" @click="btnFix(false)">確定</u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	/**
	 * calendar 日曆
	 * @description 此組件用於單個選擇日期，範圍選擇日期等，日曆被包裹在底部彈起的容器中。
	 * @tutorial http://uviewui.com/components/calendar.html
	 * @property {String} mode 選擇日期的模式，date-為單個日期，range-為選擇日期範圍
	 * @property {Boolean} v-model 布爾值變量，用於控制日曆的彈出與收起
	 * @property {Boolean} safe-area-inset-bottom 是否開啟底部安全區適配(默認false)
	 * @property {Boolean} change-year 是否顯示頂部的切換年份方向的按鈕(默認true)
	 * @property {Boolean} change-month 是否顯示頂部的切換月份方向的按鈕(默認true)
	 * @property {String Number} max-year 可切換的最大年份(默認2050)
	 * @property {String Number} min-year 最小可選日期(默認1950)
	 * @property {String Number} min-date 可切換的最小年份(默認1950-01-01)
	 * @property {String Number} max-date 最大可選日期(默認當前日期)
	 * @property {String Number} 彈窗頂部左右兩邊的圓角值，單位rpx(默認20)
	 * @property {Boolean} mask-close-able 是否允許通過點擊遮罩關閉日曆(默認true)
	 * @property {String} month-arrow-color 月份切換按鈕箭頭顏色(默認#606266)
	 * @property {String} year-arrow-color 年份切換按鈕箭頭顏色(默認#909399)
	 * @property {String} color 日期字體的默認顏色(默認#303133)
	 * @property {String} active-bg-color 起始/結束日期按鈕的背景色(默認#2979ff)
	 * @property {String Number} z-index 彈出時的z-index值(默認10075)
	 * @property {String} active-color 起始/結束日期按鈕的字體顏色(默認#ffffff)
	 * @property {String} range-bg-color 起始/結束日期之間的區域的背景顏色(默認rgba(41,121,255,0.13))
	 * @property {String} range-color 選擇範圍內字體顏色(默認#2979ff)
	 * @property {String} start-text 起始日期底部的提示文字(默認 '開始')
	 * @property {String} end-text 結束日期底部的提示文字(默認 '結束')
	 * @property {String} btn-type 底部確定按鈕的主題(默認 'primary')
	 * @property {String} toolTip 頂部提示文字，如設置名為tooltip的slot，此參數將失效(默認 '選擇日期')
	 * @property {Boolean} closeable 是否顯示右上角的關閉圖標(默認true)
	 * @example <u-calendar v-model="show" :mode="mode"></u-calendar>
	 */
	
	export default {
		name: 'u-calendar',
		props: {
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
			// 是否允許切換年份
			changeYear: {
				type: Boolean,
				default: true
			},
			// 是否允許切換月份
			changeMonth: {
				type: Boolean,
				default: true
			},
			// date-單個日期選擇，range-開始日期+結束日期選擇
			mode: {
				type: String,
				default: 'date'
			},
			// 可切換的最大年份
			maxYear: {
				type: [Number, String],
				default: 2050
			},
			// 可切換的最小年份
			minYear: {
				type: [Number, String],
				default: 1950
			},
			// 最小可選日期(不在範圍內日期禁用不可選)
			minDate: {
				type: [Number, String],
				default: '1950-01-01'
			},
			/**
			 * 最大可選日期
			 * 默認最大值為今天，之後的日期不可選
			 * 2030-12-31
			 * */
			maxDate: {
				type: [Number, String],
				default: ''
			},
			// 彈窗頂部左右兩邊的圓角值
			borderRadius: {
				type: [String, Number],
				default: 20
			},
			// 月份切換按鈕箭頭顏色
			monthArrowColor: {
				type: String,
				default: '#606266'
			},
			// 年份切換按鈕箭頭顏色
			yearArrowColor: {
				type: String,
				default: '#909399'
			},
			// 默認日期字體顏色
			color: {
				type: String,
				default: '#303133'
			},
			// 選中|起始結束日期背景色
			activeBgColor: {
				type: String,
				default: '#2979ff'
			},
			// 選中|起始結束日期字體顏色
			activeColor: {
				type: String,
				default: '#ffffff'
			},
			// 範圍內日期背景色
			rangeBgColor: {
				type: String,
				default: 'rgba(41,121,255,0.13)'
			}, 
			// 範圍內日期字體顏色
			rangeColor: {
				type: String,
				default: '#2979ff'
			},
			// mode=range時生效，起始日期自定義文案
			startText: {
				type: String,
				default: '開始'
			},
			// mode=range時生效，結束日期自定義文案
			endText: {
				type: String,
				default: '結束'
			},
			//按鈕樣式類型
			btnType: {
				type: String,
				default: 'primary'
			},
			// 當前選中日期帶選中效果
			isActiveCurrent: {
				type: Boolean,
				default: true
			},
			// 切換年月是否觸發事件 mode=date時生效
			isChange: {
				type: Boolean,
				default: false
			},
			// 是否顯示右上角的關閉圖標
			closeable: {
				type: Boolean,
				default: true
			},
			// 頂部的提示文字
			toolTip: {
				type: String,
				default: '選擇日期'
			}
		},
		data() {
			return {
				// 星期幾,值為1-7
				weekday: 1, 
				weekdayArr:[],
				// 當前月有多少天
				days: 0, 
				daysArr:[],
				showTitle: '',
				year: 2020,
				month: 0,
				day: 0,
				startYear: 0,
				startMonth: 0,
				startDay: 0,
				endYear: 0,
				endMonth: 0,
				endDay: 0,
				today: '',
				activeDate: '',
				startDate: '',
				endDate: '',
				isStart: true,
				min: null,
				max: null,
				weekDayZh: ['日', '一', '二', '三', '四', '五', '六']
			};
		},
		computed: {
			dataChange() {
				return `${this.mode}-${this.minDate}-${this.maxDate}`;
			},
			uZIndex() {
				// 如果用戶有傳遞z-index值，優先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		watch: {
			dataChange(val) {
				this.init()
			}
		},
		created() {
			this.init()
		},
		methods: {
			getColor(index, type) {
				let color = type == 1 ? '' : this.color;
				let day = index + 1
				let date = `${this.year}-${this.month}-${day}`
				let timestamp = new Date(date.replace(/\-/g, '/')).getTime();
				let start = this.startDate.replace(/\-/g, '/')
				let end = this.endDate.replace(/\-/g, '/')
				if ((this.isActiveCurrent && this.activeDate == date) || this.startDate == date || this.endDate == date) {
					color = type == 1 ? this.activeBgColor : this.activeColor;
				} else if (this.endDate && timestamp > new Date(start).getTime() && timestamp < new Date(end).getTime()) {
					color = type == 1 ? this.rangeBgColor : this.rangeColor;
				}
				return color;
			},
			init() {
				let now = new Date();
				this.year = now.getFullYear();
				this.month = now.getMonth() + 1;
				this.day = now.getDate();
				this.today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
				this.activeDate = this.today;
				this.min = this.initDate(this.minDate);
				this.max = this.initDate(this.maxDate || this.today);
				this.startDate = "";
				this.startYear = 0;
				this.startMonth = 0;
				this.startDay = 0;
				this.endYear = 0;
				this.endMonth = 0;
				this.endDay = 0;
				this.endDate = "";
				this.isStart = true;
				this.changeData();
			},
			//日期處理
			initDate(date) {
				let fdate = date.split('-');
				return {
					year: Number(fdate[0] || 1920),
					month: Number(fdate[1] || 1),
					day: Number(fdate[2] || 1)
				}
			},
			openDisAbled: function(year, month, day) {
				let bool = true;
				let date = `${year}/${month}/${day}`;
				// let today = this.today.replace(/\-/g, '/');
				let min = `${this.min.year}/${this.min.month}/${this.min.day}`;
				let max = `${this.max.year}/${this.max.month}/${this.max.day}`;
				let timestamp = new Date(date).getTime();
				if (timestamp >= new Date(min).getTime() && timestamp <= new Date(max).getTime()) {
					bool = false;
				}
				return bool;
			},
			generateArray: function(start, end) {
				return Array.from(new Array(end + 1).keys()).slice(start);
			},
			formatNum: function(num) {
				return num < 10 ? '0' + num : num + '';
			},
			//一個月有多少天
			getMonthDay(year, month) {
				let days = new Date(year, month, 0).getDate();
				return days;
			},
			getWeekday(year, month) {
				let date = new Date(`${year}/${month}/01 00:00:00`);
				return date.getDay();
			},
			checkRange(year) {
				let overstep = false;
				if (year < this.minYear || year > this.maxYear) {
					uni.showToast({
						title: "日期超出範圍啦~",
						icon: 'none'
					})
					overstep = true;
				}
				return overstep;
			},
			changeMonthHandler(isAdd) {
				if (isAdd) {
					let month = this.month + 1;
					let year = month > 12 ? this.year + 1 : this.year;
					if (!this.checkRange(year)) {
						this.month = month > 12 ? 1 : month;
						this.year = year;
						this.changeData();
					}

				} else {
					let month = this.month - 1;
					let year = month < 1 ? this.year - 1 : this.year;
					if (!this.checkRange(year)) {
						this.month = month < 1 ? 12 : month;
						this.year = year;
						this.changeData();
					}
				}
			},
			changeYearHandler(isAdd) {
				let year = isAdd ? this.year + 1 : this.year - 1;
				if (!this.checkRange(year)) {
					this.year = year;
					this.changeData();
				}
			},
			changeData() {
				this.days = this.getMonthDay(this.year, this.month);
				this.daysArr=this.generateArray(1,this.days)
				this.weekday = this.getWeekday(this.year, this.month);
				this.weekdayArr=this.generateArray(1,this.weekday)
				this.showTitle = `${this.year}年${this.month}月`;
				if (this.isChange && this.mode == 'date') {
					this.btnFix(true);
				}
			},
			dateClick: function(day) {
				day += 1;
				if (!this.openDisAbled(this.year, this.month, day)) {
					this.day = day;
					let date = `${this.year}-${this.month}-${day}`;
					if (this.mode == 'date') {
						this.activeDate = date;
					} else {
						let compare = new Date(date.replace(/\-/g, '/')).getTime() < new Date(this.startDate.replace(/\-/g, '/')).getTime()
						if (this.isStart || compare) {
							this.startDate = date;
							this.startYear = this.year;
							this.startMonth = this.month;
							this.startDay = this.day;
							this.endYear = 0;
							this.endMonth = 0;
							this.endDay = 0;
							this.endDate = "";
							this.activeDate = "";
							this.isStart = false;
						} else {
							this.endDate = date;
							this.endYear = this.year;
							this.endMonth = this.month;
							this.endDay = this.day;
							this.isStart = true;
						}
					}
				}
			},
			close() {
				// 修改通過v-model綁定的父組件變量的值為false，從而隱藏日曆彈窗
				this.$emit('input', false);
			},
			getWeekText(date) {
				date = new Date(`${date.replace(/\-/g, '/')} 00:00:00`);
				let week = date.getDay();
				return '星期' + ['日', '一', '二', '三', '四', '五', '六'][week];
			},
			btnFix(show) {
				if (!show) {
					this.close();
				}
				if (this.mode == 'date') {
					let arr = this.activeDate.split('-')
					let year = this.isChange ? this.year : Number(arr[0]);
					let month = this.isChange ? this.month : Number(arr[1]);
					let day = this.isChange ? this.day : Number(arr[2]);
					//當前月有多少天
					let days = this.getMonthDay(year, month);
					let result = `${year}-${this.formatNum(month)}-${this.formatNum(day)}`;
					let weekText = this.getWeekText(result);
					let isToday = false;
					if (`${year}-${month}-${day}` == this.today) {
						//今天
						isToday = true;
					}
					this.$emit('change', {
						year: year,
						month: month,
						day: day,
						days: days,
						result: result,
						week: weekText,
						isToday: isToday,
						// switch: show //是否是切換年月操作
					});
				} else {
					if (!this.startDate || !this.endDate) return;
					let startMonth = this.formatNum(this.startMonth);
					let startDay = this.formatNum(this.startDay);
					let startDate = `${this.startYear}-${startMonth}-${startDay}`;
					let startWeek = this.getWeekText(startDate)

					let endMonth = this.formatNum(this.endMonth);
					let endDay = this.formatNum(this.endDay);
					let endDate = `${this.endYear}-${endMonth}-${endDay}`;
					let endWeek = this.getWeekText(endDate);
					this.$emit('change', {
						startYear: this.startYear,
						startMonth: this.startMonth,
						startDay: this.startDay,
						startDate: startDate,
						startWeek: startWeek,
						endYear: this.endYear,
						endMonth: this.endMonth,
						endDay: this.endDay,
						endDate: endDate,
						endWeek: endWeek
					});
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";
	
	.u-calendar {
		color: $u-content-color;
		
		&__header {
			width: 100%;
			box-sizing: border-box;
			font-size: 30rpx;
			background-color: #fff;
			color: $u-main-color;
			
			&__text {
				margin-top: 30rpx;
				padding: 0 60rpx;
				@include vue-flex;
				justify-content: center;
				align-items: center;
			}
		}
		
		&__action {
			padding: 40rpx 0 40rpx 0;
			
			&__icon {
				margin: 0 16rpx;
			}
			
			&__text {
				padding: 0 16rpx;
				color: $u-main-color;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bold;
			}
		}
	
		&__week-day {
			@include vue-flex;
			align-items: center;
			justify-content: center;
			padding: 6px 0;
			overflow: hidden;
			
			&__text {
				flex: 1;
				text-align: center;
			}
		}
	
		&__content {
			width: 100%;
			@include vue-flex;
			flex-wrap: wrap;
			padding: 6px 0;
			box-sizing: border-box;
			background-color: #fff;
			position: relative;
			
			&--end-date {
				border-top-right-radius: 8rpx;
				border-bottom-right-radius: 8rpx;
			}
			
			&--start-date {
				border-top-left-radius: 8rpx;
				border-bottom-left-radius: 8rpx;
			}
			
			&__item {
				width: 14.2857%;
				@include vue-flex;
				align-items: center;
				justify-content: center;
				padding: 6px 0;
				overflow: hidden;
				position: relative;
				z-index: 2;
				
				&__inner {
					height: 84rpx;
					@include vue-flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 32rpx;
					position: relative;
					border-radius: 50%;
					
					&__desc {
						width: 100%;
						font-size: 24rpx;
						line-height: 24rpx;
						transform: scale(0.75);
						transform-origin: center center;
						position: absolute;
						left: 0;
						text-align: center;
						bottom: 2rpx;
					}
				}
				
				&__tips {
					width: 100%;
					font-size: 24rpx;
					line-height: 24rpx;
					position: absolute;
					left: 0;
					transform: scale(0.8);
					transform-origin: center center;
					text-align: center;
					bottom: 8rpx;
					z-index: 2;
				}
			}
			
			&__bg-month {
				position: absolute;
				font-size: 130px;
				line-height: 130px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: #e4e7ed;
				z-index: 1;
			}
		}
	
		&__bottom {
			width: 100%;
			@include vue-flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: #fff;
			padding: 0 40rpx 30rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: $u-tips-color;
			
			&__choose {
				height: 50rpx;
			}
			
			&__btn {
				width: 100%;
			}
		}
	}
</style>