<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast :type="type" ref="uToast"></u-toast>
				<text class="no-mode-here">見彈出toast</text>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主題</view>
				<u-subsection vibrateShort :current="4" :list="['primary', 'success', 'error', 'warning', 'default']" @change="typeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">結束後自動跳轉</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="urlChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">位置</view>
				<u-subsection vibrateShort current="1" :list="['頂部', '中部', '底部']" @change="positionChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顯示圖標</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="iconChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'success',
				title: '桃花潭水深千尺',
				icon: true,
				position: 'center',
				url: '',
			}
		},
		methods: {
			typeChange(index) {
				this.type = index == 0 ? 'primary' : index == 1 ? 'success' : index == 2 ? 'error' : index == 3 ? 'warning'  : 'default';
				this.show();
			},
			positionChange(index) {
				this.position = index == 0 ? 'top' : index == 1 ? 'center' : 'bottom';
				this.show();
			},
			iconChange(index) {
				this.icon = index == 0 ? true : false;
				this.show();
			},
			urlChange(index) {
				this.url = index == 0 ? '/pages/components/button/index' : '';
				this.show();
			},
			show() {
				this.$refs.uToast.show({
					title: this.title,
					position: this.position,
					type: this.type,
					icon: this.icon,
					url: this.url,
				});
			},
			hide() {
				this.$refs.uToast.hide();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no-mode-here {
		color: $u-tips-color;
		font-size: 28rpx;
	}
</style>
