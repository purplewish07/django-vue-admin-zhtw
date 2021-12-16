<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-count-down class="count-down-demo"  :timestamp="timestamp" :separator="separator" :showBorder="showBorder"
				:separator-color="separatorColor" :showDays="showDays" :fontSize="fontSize" @change="change" ref="uCountDown"
				:border-color="borderColor" :color="color" @end="end" bg-color="rgb(250, 250, 250)"></u-count-down>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">調整時間</view>
				<u-subsection vibrateShort :list="['60', '86400', '983272']" @change="timestampChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">分隔符</view>
				<u-subsection vibrateShort :list="['英文冒號', '中文名稱']" @change="separatorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義樣式</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顯示天</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="showDaysChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">字體大小</view>
				<u-subsection vibrateShort current="1" :list="['26', '30', '34']" @change="fontSizeChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timestamp: 60,
			separator: 'colon',
			showBorder: false,
			borderColor: '#303133',
			color: '#303133',
			showDays: false,
			fontSize: 30,
			separatorColor: '#303133',
		};
	},
	methods: {
		timestampChange(index) {
			this.timestamp = index == 0 ? 60 : index == 1 ? 86400 : 983272;
		},
		separatorChange(index) {
			this.separator = index == 0 ? 'colon' : 'zh';
		},
		styleChange(index) {
			if(index == 0) {
				this.showBorder = true;
				this.borderColor = this.$u.color['primary'];
				this.color = this.$u.color['primary'];
				this.separatorColor = this.$u.color['primary'];
			} else {
				this.showBorder = false;
				this.borderColor = '#303133';
				this.color = '#303133';
				this.separatorColor = '#303133';
			}
		},
		showDaysChange(index) {
			this.showDays = index == 0 ? true : false;
		},
		fontSizeChange(index) {
			this.fontSize = index == 0 ? 26 : index == 1 ? 30 : 34;
		},
		end() {
			this.$refs.uToast.show({
				title: '倒計時結束',
				type: 'warning'
			})
		},
		change(timestamp) {
			// console.log(timestamp);
		},
		getSeconds() {
			// console.log(this.$refs.uCountDown.seconds);
		}
	}
};
</script>

<style scoped lang="scss">
.count-down-demo {
	justify-content: center;
}
</style>
