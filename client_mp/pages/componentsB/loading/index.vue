<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-loading :mode="mode" :show="show" :color="color" :size="size"></u-loading>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">模式</view>
				<u-subsection vibrateShort :list="['圓圈', '花朵']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顏色(只對圓圈模式有效)</view>
				<u-subsection vibrateShort :list="['default', 'primary', 'error', 'warning', 'success']" @change="colorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">尺寸(單位rpx)</view>
				<u-subsection vibrateShort current="1" :list="['28', '34', '40']" @change="sizeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否顯示</view>
				<u-subsection vibrateShort current="1" :list="['否', '是']" @change="showChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: 'circle',
				color: '#c7c7c7',
				size: '34', 
				show: true
			}
		},
		methods: {
			modeChange(index) {
				this.mode = index == 0 ? 'circle' : 'flower';
			},
			colorChange(index) {
				if(index == 0) {
					this.color = '#c7c7c7';
				} else {
					let color = index == 1 ? 'primary' : index == 2 ? 'error' : index == 3 ? 'warning' : 'success';
					this.color = this.$u.color[color];
				}
			},
			sizeChange(index) {
				this.size = index == 0 ? '28' : index == 1 ? '34' : '40';
			},
			showChange(index) {
				// 兩個!!可以把0變成false，1變成true
				this.show = !!index;
			},
			// 選中某個復選框時，由checkbox時觸發
			checkboxChange(e) {
				//console.log(e);
			},
			// 選中任一checkbox時，由checkbox-group觸發
			checkboxGroupChange(e) {
				this.result = e;
				// console.log(this.result);
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {}
</style>
