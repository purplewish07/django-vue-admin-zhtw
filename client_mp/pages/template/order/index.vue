<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">發貨時間 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合計:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">賣了換錢</view>
									<view class="evaluate btn">評價</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">發貨時間 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合計:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">賣了換錢</view>
									<view class="evaluate btn">評價</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您還沒有相關的訂單
										<view class="tips">可以去看看有那些想買的</view>
									</view>
									<view class="btn">隨便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">發貨時間 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合計:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">賣了換錢</view>
									<view class="evaluate btn">評價</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], [], [], []],
			dataList: [
				{
					id: 1,
					store: '夏日流星限定販賣',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
							title: '【冬日限定】現貨 原創jk制服女2020冬裝新款小清新寬鬆軟糯毛衣外套女開衫短款百搭日系甜美風',
							type: '灰色;M',
							deliveryTime: '付款後30天內發貨',
							price: '348.58',
							number: 2
						},
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
							title: '【葡萄籐】現貨 小清新學院風制服格裙百褶裙女短款百搭日系甜美風原創jk制服女2020新款',
							type: '45cm;S',
							deliveryTime: '付款後30天內發貨',
							price: '135.00',
							number: 1
						}
					]
				},
				{
					id: 2,
					store: '江南皮革廠',
					deal: '交易失敗',
					goodsList: [
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】現貨 原創jk制服女2020冬裝新款小清新寬鬆軟糯毛衣外套女開衫短款百搭日系甜美風',
							type: '粉色;M',
							deliveryTime: '付款後7天內發貨',
							price: '128.05',
							number: 1
						}
					]
				},
				{
					id: 3,
					store: '三星旗艦店',
					deal: '交易失敗',
					goodsList: [
						{
							goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
							title: '三星（SAMSUNG）京品家電 UA65RUF70AJXXZ 65英吋4K超高清 HDR 京東微聯 智能語音 教育資源液晶電視機',
							type: '4K，廣色域',
							deliveryTime: '保質5年',
							price: '1998',
							number: 3
						},
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
							title: '美的(Midea)639升 對開門冰箱 19分鐘急速淨味 一級能效冷藏雙開門殺菌智能家用雙變頻節能 BCD-639WKPZM(E)',
							type: '容量大，速凍',
							deliveryTime: '保質5年',
							price: '2354',
							number: 1
						}
					]
				},
				{
					id: 4,
					store: '三星旗艦店',
					deal: '交易失敗',
					goodsList: [
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法國進口紅酒 拉菲（LAFITE）傳奇波爾多干紅葡萄酒750ml*6整箱裝',
							type: '4K，廣色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							number: 3
						},
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '藍妹（BLUE GIRL）酷爽啤酒 清啤 原裝進口啤酒 罐裝 500ml*9聽 整箱裝',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							number: 1
						}
					]
				},
				{
					id: 5,
					store: '三星旗艦店',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企業微信 中控人臉指紋識別考勤機刷臉機 無線簽到異地多店打卡機WX108',
							type: '識別效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}
					]
				}
			],
			list: [
				{
					name: '待付款'
				},
				{
					name: '待發貨'
				},
				{
					name: '待收貨'
				},
				{
					name: '待評價',
					count: 12
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad() {
		this.getOrderList(0);
		this.getOrderList(1);
		this.getOrderList(3);
	},
	computed: {
		// 價格小數
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 價格整數
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			// 此tab為空數據
			if(this.current != 2) {
				this.loadStatus.splice(this.current,1,"loading")
				setTimeout(() => {
					this.getOrderList(this.current);
				}, 1200);
			}
		},
		// 頁面數據
		getOrderList(idx) {
			for(let i = 0; i < 5; i++) {
				let index = this.$u.random(0, this.dataList.length - 1);
				let data = JSON.parse(JSON.stringify(this.dataList[index]));
				data.id = this.$u.guid();
				this.orderList[idx].push(data);
			}
			this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 總價
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 總件數
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		// tab欄切換
		change(index) {
			this.swiperCurrent = index;
			this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
