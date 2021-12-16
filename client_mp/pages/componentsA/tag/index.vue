<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-tag :text="text" :type="type" :shape="shape" :closeable="closeable" :mode="mode" @close="close" @click="click" :show="show" :size="size" />
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">參數配置</view>
			<view class="u-config-item">
				<view class="u-item-title">模式選擇</view>
				<u-subsection vibrateShort :list="['light', 'dark', 'plain']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顯示內容</view>
				<u-subsection vibrateShort :list="['蒹葭蒼蒼', '白露為霜', '在水一方']" @change="textChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題選擇</view>
				<u-subsection vibrateShort current="2" :list="['primary', 'success', 'error', 'warning', 'info']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">形狀</view>
				<u-subsection vibrateShort :list="['square', 'circle', 'circleLeft', 'circleRight']" @change="shapeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">尺寸</view>
				<u-subsection vibrateShort :list="['default', 'mini']" @change="sizeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">關閉圖標</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="closeableChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			text: '蒹葭蒼蒼',
			mode: 'light',
			type: 'error',
			size: 'default',
			shape: 'square',
			closeable: true,
			show: true
		};
	},
	methods: {
		modeChange(index) {
			this.mode = index == 0 ? 'light' : index == 1 ? 'dark' : 'plain';
		},
		textChange(index) {
			this.text = index == 0 ? '蒹葭蒼蒼' : index == 1 ? '白露為霜' : '在水一方';
		},
		typeChange(index) {
			this.type = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning' : 'info';
		},
		shapeChange(index) {
			this.shape = index == 0 ? 'square' : index == 1 ? 'circle' : index == 2 ? 'circleLeft' : 'circleRight';
		},
		sizeChange(index) {
			this.size = index == 0 ? 'default' : 'mini';
		},
		closeableChange(index) {
			this.closeable = index == 0 ? true : false;
		},
		click(index) {
			this.$refs.uToast.show({
				title: `第${index + 1}個標籤被點擊`,
				type: 'success'
			});
		},
		close(index) {
			this.$refs.uToast.show({
				title: `關閉圖標被點擊`,
				type: 'success'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.u-demo {
}
</style>
