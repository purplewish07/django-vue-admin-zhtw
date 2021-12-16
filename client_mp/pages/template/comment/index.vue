<template>
	<view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}條回復
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view class="reply">回復</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			commentList: []
		};
	},
	onLoad() {
		this.getComment();
	},
	methods: {
		// 跳轉到全部回復
		toAllReply() {
			uni.navigateTo({
				url: '/pages/template/comment/reply'
			});
		},
		// 點贊
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		// 評論列表
		getComment() {
			this.commentList = [
				{
					id: 1,
					name: '葉輕眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗會沒有後續反應，美國肯定會為今天的事情付出代價的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基於uniapp的一個UI框架，代碼優美簡潔，宇宙超級無敵彩虹旋轉好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什麼，明天吃什麼，晚上吃什麼，我只是一隻小貓咪為什麼要煩惱這麼多'
						}
					]
				},
				{
					id: 2,
					name: '葉輕眉1',
					date: '01-25 13:58',
					contentText: '我不信伊朗會沒有後續反應，美國肯定會為今天的事情付出代價的',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
				},
				{
					id: 3,
					name: '葉輕眉2',
					date: '03-25 13:58',
					contentText: '我不信伊朗會沒有後續反應，美國肯定會為今天的事情付出代價的',
					allReply: 0,
					likeNum: 21,
					isLike: false,
					allReply: 2,
					url: '../../../static/logo.png',
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基於uniapp的一個UI框架，代碼優美簡潔，宇宙超級無敵彩虹旋轉好用，用它！'
						},
						{
							name: '豆包',
							contentStr: '想吃冰糖葫蘆粘豆包，但沒錢5555.........'
						}
					]
				},
				{
					id: 4,
					name: '葉輕眉3',
					date: '06-20 13:58',
					contentText: '我不信伊朗會沒有後續反應，美國肯定會為今天的事情付出代價的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 0,
					likeNum: 150,
					isLike: false
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
