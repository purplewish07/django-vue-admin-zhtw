<template>
	<view class="u-demo">
		<view class="u-demo-wrap" style="background-color: #ffffff;">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-collapse v-if="key" :item-style="itemStyle" event-type="close" :arrow="arrow" :accordion="accordion" @change="change">
					<u-collapse-item :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in itemList" :key="index">
						{{item.body}}
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				參數配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">手風琴模式</view>
				<u-subsection vibrateShort :list="['是', '否']" @change="accordionChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">右側箭頭</view>
				<u-subsection vibrateShort :list="['顯示', '隱藏']" @change="arrowChange"></u-subsection>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">自定義樣式</view>
				<u-subsection vibrateShort current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "賞識在於角度的轉換",
					body: "只要我們正確擇取一個合適的參照物乃至稍降一格去看待他人，值得賞識的東西便會撲面而來：閃光的道德、妙異的智慧、優美的人情…… 賞識不是單向的施捨，是智慧與智慧的主動碰撞",
					show: false,
				}, {
					head: "生活中不是缺少美，而是缺少發現美的眼睛",
					body: "學會欣賞，實際是一種積極生活的態度，是生活的調味品，會在欣賞中發現生活的美",
					show: false,
				}, {
					head: "周圍一些不起眼的人、事、物，或許都隱藏著不同凡響的智慧",
					body: "但是據說雕刻大衛像所用的這塊大理石，曾被多位雕刻家批評得一無是處，有些人認為這塊大理石采鑿得不好，有些人嫌它的紋路不夠美，用它絕對雕不出好的藝術品，總之它被批評為一塊不受人賞識的普通石頭",
					show: false,
				}, {
					head: "點燃心中的火焰，找回了自信和人生的價值",
					body: "他隨手翻了幾頁，竟被一篇題名為《童年》的小說所吸引，作者是一個初出茅廬的無名小輩，但屠格涅夫卻十分欣賞，鍾愛有加",
					show: false,
				}, {
					head: "因為賞識，那塊被人不恥的石頭變成了雕塑",
					body: "這個材料反應的就是賞識的問題，賞識是一種理解和信任，包含了肯定與欣賞，也是一種激勵和引導，可以使人悔過自新，揚長避短，更健康地成長和進步",
					show: false,
				}],
				accordion: true,
				arrow: true,
				hoverClass: 'hover2',
				itemStyle: {},
				key: true
			}
		},
		methods: {
			accordionChange(index) {
				this.accordion = index == 0 ? true : false;
			},
			arrowChange(index) {
				this.arrow = index == 0 ? true : false;
				this.changeStatus();
			},
			styleChange(index) {
				if(index == 0) {
					this.itemStyle = {
						border: '1px solid rgb(230, 230, 230)',
						marginTop: '20px',
						padding: '0 8rpx'
					}
				} else {
					this.itemStyle = {}
				}
				this.changeStatus();
			},
			change(index) {
				let str = '';
				if(Array.isArray(index)) {
					let arr = index.map(val => {
						return Number(val) + 1;
					})
					index = arr.join(',');
				} else {
					index = Number(index) + 1;
				}
				this.$refs.uToast.show({
					title: `點擊了第${index}個`,
					type: 'warning'
				})
			},
			itemChange(e) {
				console.log(e);
			},
			changeStatus() {
				this.key = false;
				this.$nextTick(function(){
					this.key = true;
				})
			}
		}
	}
</script>

<style>
	.hover1 {
		background-color: red;
	}
</style>

<style lang="scss" scoped>
	.wrap {
		// padding: 24rpx;
	}

	.item {
		//padding: 0 24rpx;
	}

	.head {
		font-size: 30rpx;
		color: $u-main-color;
		line-height: 1;
		padding: 24rpx 24rpx;
	}

	.body {
		font-size: 28rpx;
		color: $u-tips-color;
		line-height: 1.4;
		padding: 24rpx;
	}
</style>
