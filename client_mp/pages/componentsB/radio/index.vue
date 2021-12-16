<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="">
					<u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="value" @change="radioGroupChange" :activeColor="activeColor">
						<u-radio @change="radioChange" v-for="(item, index) in list" :disabled="item.disabled"
							:key="index" :name="item.name"
						>{{item.name}}</u-radio>
					</u-radio-group>
				</view>
				<view class="u-demo-result-line">
					{{value ? `選中了"${result}"` : '請選擇'}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">形狀</view>
				<u-subsection vibrateShort current="1" :list="['方形', '圓形']" @change="shapeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">整體大小(單位rpx)</view>
				<u-subsection vibrateShort current="1" :list="['30', '40', '50']" @change="sizeChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">激活顏色</view>
				<u-subsection vibrateShort :list="['primary', 'error', 'warning', 'success', 'info']" @change="activeColorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">每個占一行</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="wrapChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">每個寬度50%</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="widthChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">默認選中第一個</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="defaultChooseChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">禁用第一個</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '荔枝',
						checked: true,
						disabled: false
					},
					{
						name: '香蕉',
						checked: false,
						disabled: false
					},
					{
						name: '橙子',
						checked: false,
						disabled: false
					},
					{
						name: '草莓',
						checked: false,
						disabled: false
					}
				],
				disabled: false,
				result: '荔枝',
				shape: 'circle', 
				value: '荔枝',
				activeColor: '#2979ff',
				size: 34,
				wrap: false,
				width: 'auto'
			}
		},
		methods: {
			shapeChange(index) {
				this.shape = index == 0 ? 'square' : 'circle';
			},
			sizeChange(index) {
				this.size = index == 0 ? 30 : index == 1 ? 40 : 50;
			},
			defaultChooseChange(index) {
				// 特別處理對第一個選的選中的情況，涉及到提示語，選中狀態等
				// 實際開發中不會存在這些情況，只是演示用
				if(index == 0) {
					this.result = this.value = this.list[0].name;
				} else {
					if(this.value == this.list[0].name) {
						this.result = this.value = '';
					}
				}
			},
			activeColorChange(index) {
				// 如果用戶尚未勾選任何radio，切換顏色時，默認選中第一個讓用戶看到效果，因為勾選了才有效果
				if(!this.result) this.result = this.value = this.list[0].name;
				let theme = index == 0 ? 'primary' : index == 1 ? 'error' : index == 2 ? 'warning' : index == 3 ? 'success' : 'info';
				this.activeColor = this.$u.color[theme];
			},
			disabledChange(index) {
				if(index == 0) {
					this.list[0].disabled = true;
				} else {
					this.list[0].disabled = false;
				}
			},
			// 選中某個單選框時，由radio時觸發
			radioChange(e) {
				//console.log(e);
			},
			// 選中任一radio時，由radio-group觸發
			radioGroupChange(e) {
				this.result = e;
				//console.log(e);
			},
			widthChange(index) {
				this.width = index == 0 ? '50%' : '';
			},
			wrapChange(index) {
				this.wrap = !index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-demo {}
</style>
