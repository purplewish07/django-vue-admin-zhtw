<template>
	<view class="">
		<view class="u-m-p-50">
			<view class="u-demo-area u-flex u-row-center">
				<u-dropdown :close-on-click-mask="mask" ref="uDropdown" :activeColor="activeColor" :borderBottom="borderBottom">
					<u-dropdown-item @change="change" v-model="value1" title="距離" :options="options1"></u-dropdown-item>
					<u-dropdown-item @change="change" v-model="value2" title="溫度" :options="options2"></u-dropdown-item>
					<u-dropdown-item title="屬性">
						<view class="slot-content">
							<view class="item-box">
								<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in list" :key="index">
									{{item.label}}
								</view>
							</view>
							<u-button type="primary" @click="closeDropdown">確定</u-button>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">下邊框</view>
				<u-subsection vibrateShort current="1" :list="['有', '無']" @change="borderChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">激活顏色</view>
				<u-subsection vibrateShort :list="['#2979ff', '#ff9900', '#19be6b']" @change="activeColorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">遮罩是否可點擊</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="maskChange"></u-subsection>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				value1: '',
				value2: '2',
				mask: true,
				options1: [{
						label: '默認排序',
						value: 1,
					},
					{
						label: '距離優先',
						value: 2,
					},
					{
						label: '價格優先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
					{
						label: '正常溫',
						value: 3,
					},
					{
						label: '加熱',
						value: 4,
					},
					{
						label: '極寒風暴',
						value: 5,
					}
				],
				list: [{
						label: '琪花瑤草',
						active: true,
					},
					{
						label: '清詞麗句',
						active: false,
					},
					{
						label: '宛轉蛾眉',
						active: false,
					},
					{
						label: '煦色韶光',
						active: false,
					},
					{
						label: '魚沉雁落',
						active: false,
					},
					{
						label: '章台楊柳',
						active: false,
					},
					{
						label: '霞光萬道',
						active: false,
					}
				],
				borderBottom: false,
				activeColor: '#2979ff'
			}
		},
		methods: {
			borderChange(index) {
				this.borderBottom = !index;
			},
			activeColorChange(index) {
				this.activeColor = ['#2979ff', '#ff9900', '#19be6b'][index];
			},
			change(index) {
				this.$u.toast(`點擊了第${index}項`);
			},
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			tagClick(index) {
				this.list[index].active = !this.list[index].active;
			},
			maskChange(index) {
				this.mask = !index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-config-wrap {
		padding: 40rpx;
	}
	
	.slot-content {
		background-color: #FFFFFF;
		padding: 24rpx;
		
		.item-box {
			margin-bottom: 50rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.item {
				border: 1px solid $u-type-primary;
				color: $u-type-primary;
				padding: 8rpx 40rpx;
				border-radius: 100rpx;
				margin-top: 30rpx;
			}
			
			.active {
				color: #FFFFFF;
				background-color: $u-type-primary;
			}
		}
	}
</style>
