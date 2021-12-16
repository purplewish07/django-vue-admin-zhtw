<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					globalData方案的值為(曲折實現，全局動態響應)
				</view>
				<view class="u-demo-result-line">
					{{globalData}}
				</view>
			</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					Vue.prototype方案的值為(非動態響應，微信小程序無效)
				</view>
				<view class="u-demo-result-line">
					{{vuePrototype}}
				</view>
			</view>
			<view class="u-demo-area">
				<view class="u-no-demo-here">
					vuex方案的值為(全局動態響應，推薦)
				</view>
				<view class="u-demo-result-line">
					{{vuex_demo}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">實現方式</view>
				<view class="btn-wrap">
					<u-button @click="modeChange(0)">globalData</u-button>
				</view>
				<view class="btn-wrap">
					<u-button @click="modeChange(1)">Vue.prototype</u-button>
				</view>
				<view class="btn-wrap">
					<u-button @click="modeChange(2)">vuex</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalData: ''
			}
		},
		onShow() {
			// 對globalData的使用，應在onShow生命週期，而不是onLoad生命週期
			this.globalData = getApp().globalData.username;
		},
		methods: {
			modeChange(index) {
				let url = '';
				if(index == 0) url = '/pages/library/globalVariable/globalData'; 
				if(index == 1) url = '/pages/library/globalVariable/prototype';
				if(index == 2) url = '/pages/library/globalVariable/vuex';
				this.$u.route(url);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo-area {
		margin-top: 50rpx;
	}
	
	.btn-wrap {
		margin-top: 40rpx;
		padding: 0 10%;
	}
</style>
