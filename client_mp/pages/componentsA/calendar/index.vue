<template>
	<view class="u-demo">
		<view class="u-demo-wrap" style="background-color: #FFFFFF;">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode"
					:start-text="startText" :end-text="endText" :range-color="rangeColor"
					:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
				>
				</u-calendar>
				<view class="u-demo-result-line">
					{{result}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :current="showBtnStatus" :list="['顯示', '隱藏']" @change="showChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">模式</view>
				<u-subsection vibrateShort current="1" :list="['單個日期', '日期範圍']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義樣式</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				mode: 'range',
				result: "請選擇日期",
				startText: '開始',
				endText: '結束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
			}
		},
		computed: {
			showBtnStatus() {
				return this.show ? 0 : 1;
			}
		},
		methods: {
			showChange(index) {
				this.show = !index;
			},
			modeChange(index) {
				this.mode = index == 0 ? 'date' : 'range';
				this.show = true;
			},
			styleChange(index) {
				if(index == 0) {
					this.startText = '住店';
					this.endText = '離店';
					this.activeBgColor = '#19be6b';
					this.rangeColor = '#19be6b';
					this.rangeBgColor = 'rgba(25,190,107, 0.13)';
					this.btnType = 'success';
				} else {
					this.startText = '開始';
					this.endText = '結束';
					this.activeBgColor = '#2979ff';
					this.rangeColor = '#2979ff';
					this.rangeBgColor = 'rgba(41,121,255,0.13)';
					this.btnType = 'primary';
				}
				this.show = true;
			},
			customChange(index) {
				if(index == 0) {
					this.icon1 = 'map';
					this.icon2 = 'photo';
					this.arrow = true;
				} else {
					this.icon1 = '';
					this.icon2 = '';
					this.arrow = false;
				}
			},
			textareaChange(index) {
				this.type = index == 0 ? 'textarea' : 'text';
			},
			change(e) {
				if (this.mode == 'range') {
					this.result = e.startDate + " - " + e.endDate;
				} else {
					this.result = e.result;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		
	}
</style>
