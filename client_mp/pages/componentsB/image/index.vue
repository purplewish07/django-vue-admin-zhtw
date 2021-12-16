<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area u-flex u-row-center">
				<u-image :shape="shape" ref="uImage" :width="width" :height="height" :src="src" mode="aspectFill">
					<u-loading size="44" mode="flower" slot="loading" v-if="loadingSlot"></u-loading>
					<view v-if="errorSlot" slot="error" style="font-size: 24rpx;">加載失敗</view>
				</u-image>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">參數配置</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection :current="statusCurrent" vibrateShort :list="['加載成功', '加載中', '加載失敗']" @change="statusChange"></u-subsection>
			</view>
			<!-- 微信小程序中，無法動態切換slot，所以隱藏此部分的演示 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="u-config-item">
				<view class="u-item-title">加載中狀態</view>
				<u-subsection vibrateShort :list="['默認', '自定義']" @change="loadingChange"></u-subsection>
			</view>
			<!-- #endif -->
			<view class="u-config-item">
				<view class="u-item-title">加載失敗狀態</view>
				<u-subsection vibrateShort :list="['默認', '自定義']" @change="errorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">形狀</view>
				<u-subsection vibrateShort :list="['方形', '圓形']" @change="shapeChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
			width: '200',
			height: '200',
			loadingSlot: false,
			statusCurrent: 0,
			errorSlot: false,
			shape: 'square'
		};
	},
	computed: {
		// statusCurrent() {
		// }
	},
	methods: {
		statusChange(index) {
			// 此處通過ref操作組件內部狀態，僅是為了演示使用，實際中無需這些操作，由內部的圖片加載事件自動完成
			if (index == 0) {
				this.src = 'http://img5.imgtn.bdimg.com/it/u=2438062088,2808868405&fm=26&gp=0.jpg';
				this.$refs.uImage.loading = false;
				this.$refs.uImage.isError = false;
			} else if (index == 1) {
				this.$refs.uImage.loading = true;
			} else {
				this.$refs.uImage.loading = false;
				this.$refs.uImage.isError = true;
			}
		},
		loadingChange(index) {
			this.statusCurrent = 1;
			this.statusChange(1);
			if (index == 0) {
				this.loadingSlot = false;
			} else {
				this.loadingSlot = true;
			}
		},
		errorChange(index) {
			this.statusCurrent = 2;
			this.statusChange(2);
			if (index == 0) {
				this.errorSlot = false;
			} else {
				this.errorSlot = true;
			}
		},
		shapeChange(index) {
			this.shape = index == 0 ? 'square' : 'circle';
		}
	}
};
</script>

<style scoped lang="scss">
.u-demo-area {
}
</style>
