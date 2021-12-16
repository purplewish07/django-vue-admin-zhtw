<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-switch v-model="checked" :loading="loading" 
					:size="size" @change="change" 
					:active-color="activeColor"
					:disabled="disabled"
					:activeValue="100"
					:inactiveValue="1"
				></u-switch>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態</view>
				<u-subsection vibrateShort :list="['關閉', '打開']" @change="modelChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">顏色</view>
				<u-subsection vibrateShort :list="['primary', 'error', 'warning', 'success']" @change="colorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">尺寸(單位rpx)</view>
				<u-subsection vibrateShort current="1" :list="['40', '60', '80']" @change="sizeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">加載中</view>
				<u-subsection vibrateShort :list="['否', '是']" @change="loadingChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">禁用</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">異步控制</view>
				<u-subsection vibrateShort :list="['關閉', '打開']" @change="asyncChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				activeColor: '#2979ff',
				size: 50,
				loading: false,
				disabled: false
			}
		},
		methods: {
			modelChange(index) {
				// 兩個!!可以把0變成false，1變成true
				this.checked = !!index;
			},
			colorChange(index) {
				let color = index == 0 ? 'primary' : index == 1 ? 'error' : index == 2 ? 'warning' : 'success';
				this.activeColor = this.$u.color[color];
			},
			sizeChange(index) {
				this.size = index == 0 ? '40' : index == 1 ? '60' : '80';
			},
			loadingChange(index) {
				this.loading = !!index;
			},
			disabledChange(index) {
				this.disabled = index == 0 ? true : false;
			},
			asyncChange(index) {
				if(this.checked && index == 1) {
					this.$u.toast('請先關閉選擇器');
					return;
				}
				if(!this.checked && index == 0) {
					this.$u.toast('請先打開選擇器');
					return;
				}
				let str = index == 0 ? '是否要關閉？' : '是否要打開？';
				this.loading = true;
				let oldStatus = this.checked;
				this.checked = true;
				uni.showModal({
					title: '提示',
					content: str,
					complete: (res) => {
						this.loading = false;
						if(res.confirm) {
							if(oldStatus) this.checked = false;
							else this.checked = true;
						} else {
							if(!oldStatus) this.checked = false;
							else this.checked = true;
						}
					}
				})
			},
			change(value) {
				// console.log(value);
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {}
</style>
