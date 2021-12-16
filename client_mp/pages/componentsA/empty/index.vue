<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-empty :mode="mode">
					<u-button v-if="slot" slot="bottom" size="medium">
						slot按鈕
					</u-button>
				</u-empty>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">模式選擇</view>
				<u-table>
					<u-tr class="u-tr">
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('car')">購物車為空</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('page')">頁面不存在</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('search')">沒有搜索結果</u-button>
						</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('address')">沒有收貨地址</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('wifi')">沒有WiFi</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('order')">訂單為空</u-button>
						</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('coupon')">沒有優惠券</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('favor')">沒有收藏</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('permission')">無權限</u-button>
						</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('history')">無歷史記錄</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('news')">無新聞列表</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('message')">消息列表為空</u-button>
						</u-td>
					</u-tr>
					<u-tr class="u-tr">
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('list')">列表為空</u-button>
						</u-td>
						<u-td class="u-td">
							<u-button :hair-line="false" size="mini" @click="modeChange('data')">數據為空</u-button>
						</u-td>
						<u-td class="u-td">
							待擴展
						</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">傳入slot</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="slotChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: 'data',
				slot: false
			}
		},
		methods: {
			modeChange(mode = 'data') {
				this.mode = mode;
			},
			slotChange(index) {
				this.slot = !index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo-area {
		height: 160px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.u-demo-area .u-empty {
		padding-top: 0;
	}
</style>
