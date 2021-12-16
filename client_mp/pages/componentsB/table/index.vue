<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-table :align="align" :borderColor="borderColor">
					<u-tr class="u-tr">
						<u-th class="u-th">姓名</u-th>
						<u-th class="u-th">年齡</u-th>
						<u-th class="u-th">籍貫</u-th>
						<u-th class="u-th">性別</u-th>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">呂布</u-td>
						<u-td class="u-td">22</u-td>
						<u-td class="u-td">楚河</u-td>
						<u-td class="u-td">男</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">項羽</u-td>
						<u-td class="u-td">28</u-td>
						<u-td class="u-td">漢界</u-td>
						<u-td class="u-td">男</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">木蘭</u-td>
						<u-td class="u-td">24</u-td>
						<u-td class="u-td">南國</u-td>
						<u-td class="u-td">女</u-td>
					</u-tr>
				</u-table>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">邊框顏色</view>   
				<u-subsection vibrateShort :list="['gray', 'primary', 'warning']" @change="borderColorChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">對齊方式</view>
				<u-subsection vibrateShort current="1" :list="['左', '中', '右']" @change="alignChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: false,
				borderColor: '#e4e7ed',
				align: 'center',
				index: 0,
			}
		},
		methods: {
			modeChange(index) {
				// #ifdef MP-WEIXIN
				return this.$u.toast('微信小程序暫不支持單元格合併')
				// #endif
				this.mode = index == 0 ? true : false;
				this.key ++;
			},
			borderColorChange(index) {
				this.borderColor = index == 0 ? '#e4e7ed' : index == 1 ? '#2979ff' : '#ff9900';
			},
			alignChange(index) {
				this.align = index == 0 ? 'left' : index == 1 ? 'center' : 'right';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
	}
</style>
