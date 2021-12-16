<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<view class="u-no-demo-here">如果使用text-align: center對齊，數字滾動期間可能會抖動，見文檔說明</view>
				<view class="count-to-demo">
					<u-count-to
						class="count-to"
						:useEasing="useEasing"
						ref="uCountTo"
						:autoplay="autoplay"
						:startVal="startVal"
						:endVal="endVal"
						:duration="duration"
						:decimals="decimals"
						:bold="bold"
						@end="end"
					></u-count-to>
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">參數配置</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :current="current" :list="['啟動', '暫停', '繼續', '重置']" @change="statusChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">目標值</view>
				<u-subsection vibrateShort :list="[608, 5604, 45617]" @change="endValChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">滾動時間</view>
				<u-subsection vibrateShort current="1" :list="[1000, 2000, 3000]" @change="durationChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顯示小數</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="decimalsChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">字體加粗</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="boldChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			startVal: 0,
			endVal: 608,
			separator: ',',
			decimals: 0,
			duration: 2000,
			autoplay: false,
			useEasing: true,
			current: 3,
			isStop: false, // 如果開沒啟動前，不允許點擊狀態選項的"繼續"按鈕，否則會導致顯示NaN
			bold: false
		};
	},
	methods: {
		endValChange(index) {
			this.endVal = index == 0 ? 608 : index == 1 ? 5604 : 45617;
			this.reset();
			this.start();
		},
		durationChange(index) {
			this.duration = index == 0 ? 1000 : index == 1 ? 2000 : 3000;
		},
		boldChange(index) {
			this.bold = !!!index;
		},
		decimalsChange(index) {
			this.decimals = index == 0 ? 2 : 0;
		},
		statusChange(index) {
			this.current = index;
			if (index == 0) {
				this.start();
			} else if (index == 1) {
				this.stop();
			} else if (index == 2) {
				this.resume();
			} else {
				this.reset();
			}
		},
		end() {
			this.current = 3;
			this.$refs.uToast.show({
				type: 'warning',
				title: '滾動結束'
			});
		},
		start() {
			this.current = 0;
			this.isStop = true;
			this.$refs.uCountTo.start();
		},
		stop() {
			this.$refs.uCountTo.stop();
		},
		resume() {
			if (!this.isStop) {
				this.$refs.uToast.show({
					type: 'error',
					title: '請開始並暫停後才能繼續'
				});
				this.$nextTick(() => {
					this.current = 3;
				});
				return;
			}
			this.$refs.uCountTo.resume();
		},
		reset() {
			this.$refs.uCountTo.reset();
		}
	}
};
</script>

<style lang="scss" scoped>
.count-to-demo {
	text-align: center;
}
</style>
