<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-section :title="title" :right="right" :bold="bold" :color="color" :show-line="showLine"></u-section>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">更換主標題</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="titleChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">豎條狀態</view>
				<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="showLineChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否顯示右邊部分</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="rightChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主標題粗體</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="boldChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">主標題顏色</view>
				<u-subsection vibrateShort :list="['默認', '自定義']" @change="colorChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '紅豆生南國',
				bold: true,
				right: true,
				color: this.$u.color['mainColor'],
				showLine: true
			}
		},
		methods: {
			titleChange(index) {
				if(index == 0) this.title = '春來發幾枝';
				else  this.title = '紅豆生南國';
			},
			rightChange(index) {
				this.right = index == 0 ? true : false;
			},
			boldChange(index) {
				this.bold = index == 0 ? true : false;
			},
			colorChange(index) {
				this.color = index == 0 ? this.$u.color['mainColor'] : this.$u.color['primary'];
			},
			showLineChange(index) {
				this.showLine = !index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
