<template>
	<view class="wrap">
		<u-time-line>
			<u-time-line-item nodeTop="2">
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">待取件</view>
						<view class="u-order-desc">[自提櫃]您的快件已放在樓下側門，直走前方53.6米，左拐約10步，再右拐直走，見一紅燈籠停下，叩門三下，喊「芝麻開門」即可。</view>
						<view class="u-order-time">2019-05-08 12:12</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item nodeTop="2">
				<template v-slot:node>
					<view class="u-node">
						<u-icon name="account-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title unacive">派送中</view>
						<view class="u-order-desc">【深圳市】快件已到達目的地，派件員為國產錦衣衛007號，電話：<text class="tel">13833882438</text>，請留意快遞信息</view>
						<view class="u-order-time">2019-05-08 06:03</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item nodeTop="2">
				<template v-slot:node>
					<view class="u-node">
						<u-icon name="car-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title unacive">運輸中</view>
						<view class="u-order-desc">【深圳市】快遞已到達 深圳固戍一部</view>
						<view class="u-order-time">2019-05-07 08:05</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">【深圳市】快件已從深圳運轉中心發出，正在發往深圳寶安一部</view>
						<view class="u-order-time">2019-12-06 22:30</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">【深圳市】快件已到達 深圳運轉中心</view>
						<view class="u-order-time">2019-12-04 16:42</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">【鄭州市】快件已從鄭州運轉中心出發，正在發往深圳運轉中心</view>
						<view class="u-order-time">2019-12-02 12:55</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">【鄭州市】快件已到達 鄭州運轉中心</view>
						<view class="u-order-time">2019-12-02 08:23</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item nodeTop="0">
				<template v-slot:node>
					<view class="u-node">
						<u-icon name="file-text-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">您購買的商品【尚方寶劍，先斬後奏】，經由北京軍區倉庫發貨，國內快遞承運人【中南海保鏢】。</view>
						<view class="u-order-time">2019-12-01 07:00</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx 24rpx 24rpx 40rpx;
	}
	
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-title.unacive {
		color: rgb(150, 150, 150);
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
	
	.tel {
		color: $u-type-primary;
	}
</style>
