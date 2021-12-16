<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled" 
				:show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">初始值</view>
				<u-subsection vibrateShort :list="['空', '天山雪蓮']" @change="valueChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">搜索框形狀</view>
				<u-subsection vibrateShort :list="['圓形', '方形']" @change="shapeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">清除控件</view>
				<u-subsection vibrateShort :list="['啟用', '關閉']" @change="clearabledChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">右側控件</view>
				<u-subsection vibrateShort :list="['啟用', '關閉']" @change="showActionChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">水平對齊方式</view>
				<u-subsection vibrateShort :list="['左', '中', '右']" @change="inputAlignChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				inputAlign: 'left'
			}
		},
		watch: {
			// 這裡的演示為證明通過v-model綁定值，它是雙向綁定的，意味著您無需監聽change事件
			// 也能知道value值當前的內容
			value(val) {
				// console.log(val);
			}
		},
		methods: {
			valueChange(index) {
				this.value = index == 0 ? '' : '天山雪蓮';
			},
			shapeChange(index) {
				this.shape = index == 0 ? 'round' : 'square';
			},
			clearabledChange(index) {
				this.clearabled = index == 0 ? true : false;
			},
			showActionChange(index) {
				this.showAction = index == 0 ? true : false;
			},
			inputAlignChange(index) {
				this.inputAlign = index == 0 ? 'left' : index == 1 ? 'center' : 'right';
			},
			change(value) {
				// 搜索框內容變化時，會觸發此事件，value值為輸入框的內容
				//console.log(value);
			},
			custom(value) {
				//console.log(value);
				this.$u.toast('輸入值為：' + value)
			},
			search(value) {
				this.$refs.uToast.show({
					title: '搜索內容為：' + value,
					type: 'success'
				})
			},
			clear() {
				// console.log(this.value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
