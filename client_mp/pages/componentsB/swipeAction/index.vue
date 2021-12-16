<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-swipe-action
					bg-color="rgb(250, 250, 250)"
					@open="open"
					:disabled="disabled"
					:index="index"
					v-for="(item, index) in list"
					:key="item.id"
					:show="item.show"
					@click="click"
					:btn-width="btnWidth"
					@close="close"
					:options="options"
					@content-click="contentClick"
				>
					<view class="item u-border-bottom">
						<image mode="aspectFill" :src="item.images" />
						<!-- 此層wrap在此為必寫的，否則可能會出現標題定位錯誤 -->
						<view class="title-wrap">
							<text class="title u-line-2">{{ item.title }}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">參數配置</view>
			<view class="u-config-item">
				<view class="u-item-title">狀態(操作第一個)</view>
				<u-subsection vibrateShort :current="1" :list="['打開', '關閉']" @change="showChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">禁止滑動</view>
				<u-subsection vibrateShort :current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list1: [
				{
					id: 1,
					title: '長安回望繡成堆，山頂千門次第開，一騎紅塵妃子笑，無人知是荔枝來',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false
				},
				{
					id: 2,
					title: '新豐綠樹起黃埃，數騎漁陽探使回，霓裳一曲千峰上，舞破中原始下來',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false
				},
				{
					id: 3,
					title: '登臨送目，正故國晚秋，天氣初肅。千里澄江似練，翠峰如簇',
					images: 'https://cdn.uviewui.com/uview/common/logo.png',
					show: false,
				}
			],
			list: [],
			disabled: false,
			btnWidth: 180,
			show: false,
			options: [
				{
					text: '收藏',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '刪除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	onLoad() {
		setTimeout(() => {
			this.list = this.list1;
		}, 0)
	},
	methods: {
		disabledChange(index) {
			this.disabled = index == 0 ? true : false;
		},
		showChange(index) {
			if (index == 0) {
				this.list.map((val, ids) => {
					if (ids != 0) val.show = false;
					else val.show = true;
				});
			} else {
				this.list[0].show = false;
			}
		},
		click(index, index1) {
			if(index1 == 1) {
				this.list.splice(index, 1);
				this.$u.toast(`刪除了第${index}個cell`);
			} else {
				this.list[index].show = false;
				this.$u.toast(`收藏成功`);
			}
		},
		open(index) {
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		},
		close(index) {
			this.list[index].show = false;
		},
		contentClick(index) {
			// console.log(index);
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	padding: 20rpx;
}

image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
	border-radius: 12rpx;
}

.title {
	text-align: left;
	font-size: 28rpx;
	color: $u-content-color;
	margin-top: 20rpx;
}
</style>
