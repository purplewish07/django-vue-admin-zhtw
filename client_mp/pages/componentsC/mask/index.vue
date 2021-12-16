<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<view class="u-no-demo-here">
					請點擊彈出遮罩查看效果
				</view>
				<u-mask :show="show" @click="show = false" :zoom="zoom" :duration="duration">
					<view class="warp" v-if="content">
						<view class="rect" @tap.stop></view>
					</view>
				</u-mask>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :current="current" :list="['顯示', '隱藏']" @change="showChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">縮放效果</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="zoomChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">內容填充</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="contentChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">動畫時長(ms)</view>
				<u-subsection vibrateShort current="1" :list="['100', '300', '800']" @change="durationChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				zoom: true,
				duration: 300,
				content: false,
			}
		},
		computed: {
			current() {
				return this.show ? 0 : 1;
			}
		},
		methods: {
			showChange(index) {
				this.show = index == 0 ? true : false;
			},
			zoomChange(index) {
				this.zoom = index == 0 ? true : false;
				this.show = true;
			},
			durationChange(index) {
				this.duration = index == 0 ? 100 : index == 1 ? 300 : 800;
				this.show = true;
			},
			contentChange(index) {
				this.content = index == 0 ? true : false;
				this.show = true;
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
</style>
