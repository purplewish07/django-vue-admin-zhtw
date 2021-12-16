<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="input-wrap">
					<input class="input" disabled type="text" :value="input" placeholder="來自鍵盤的輸入內容" />
					<u-button :custom-style="{height: '32px'}" :hairLine="false" class="clear-btn" @tap="input = ''">清空</u-button>
				</view>
				<u-keyboard :mask="mask" ref="uKeyboard" safe-area-inset-bottom @confirm="confirm" 
				:random="random" :dotEnable="false" :mode="mode"
				:confirmBtn="true" :cancelBtn="true" :tooltip="tooltip" v-model="show" 
				@change="change" @backspace="backspace"></u-keyboard>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置 
			</view>
			<view class="u-config-item">
				<view class="u-item-title">鍵盤開關</view>
				<u-subsection vibrateShort :current="show == true ? 0 : 1" :list="['開', '關']" @change="statusChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">鍵盤類型</view>
				<u-subsection vibrateShort :list="['數字鍵盤', '身份證鍵盤', '車牌號鍵盤']" @change="modeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">打亂順序</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="randomChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">上方工具條</view>
				<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="tooltipChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">是否顯示遮罩</view>
				<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="maskChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				input: '', 
				mode: 'number',
				random: false,
				tooltip: true,
				mask: true,
				
			}
		},
		methods: {
			statusChange(index) {
				this.show = index == 0 ? true : false;
			},
			modeChange(index) {
				if(index == 0) this.mode = 'number';
				if(index == 1) this.mode = 'card';
				if(index == 2) this.mode = 'car';
				this.show = true;
			},
			randomChange(index) {
				this.random = index == 0 ? true : false;
				this.show = true;
			},
			tooltipChange(index) {
				this.tooltip = index == 0 ? true : false;
				this.show = true;
			},
			maskChange(index) {
				this.show = true;
				this.mask = !index;
			},
			// 點擊退格鍵
			backspace() {
				if(this.input.length) this.input = this.input.substr(0, this.input.length - 1);
			},
			// 鍵盤按鍵發生變化
			change(detail) {
				this.input += detail;
			},
			confirm(e) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		border: 1px solid $u-light-color;
		border-radius: 4px;
		margin-bottom: 20px;
		height: 32px;
		font-size: 26rpx;
		flex: 1;
		box-sizing: border-box;
	}
	
	.input-wrap {
		display: flex;
	}
	
	.clear-btn {
		margin-left: 10px;
		font-size: 28rpx;
	}
</style>
