<template>
	<view class="wrap">
		<u-swiper @change="change" :height="250" :list="swiper_list" :title="title" :effect3d="effect3d"
		:indicator-pos="indicatorPos" :mode="mode" :interval="3000" @click="click"></u-swiper>
		<view>{{test}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper_list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜風，畫樓西畔桂堂東'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身無綵鳳雙飛翼，心有靈犀一點通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '誰念西風獨自涼，蕭蕭黃葉閉疏窗，沉思往事立殘陽'
					}
				],
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false,
				test:''
			}
		},
		onLoad() {
			this.gettest();
		},
		methods: {
			gettest(){
				this.$u.api.gettest().then(res=>{
					this.test = res.data
				})
			},
			change(){
				
			},
			click() {
				
			}
		}
	}
</script>

<style>

</style>
