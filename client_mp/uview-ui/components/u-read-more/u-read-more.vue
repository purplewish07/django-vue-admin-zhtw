<template>
	<view class="">
		<view class="u-content" :class="[elId]" :style="{ 
			height: isLongContent && !showMore ? showHeight + 'rpx' : 'auto',
			textIndent: textIndent
		}">
			<slot></slot>
		</view>
		<view @tap="toggleReadMore" v-if="isLongContent" class="u-content__showmore-wrap"
		    :class="{ 'u-content__show-more': showMore }"
		    :style="[innerShadowStyle]">
			<text class="u-content__showmore-wrap__readmore-btn" :style="{
				fontSize: fontSize + 'rpx',
				color: color
			}">
				{{ showMore ? openText : closeText }}
			</text>
			<view class="u-content__showmore-wrap__readmore-btn__icon u-flex">
				<u-icon :color="color" :size="fontSize" :name="showMore ? 'arrow-up' : 'arrow-down'"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * readMore 閱讀更多
	 * @description 該組件一般用於內容較長，預先收起一部分，點擊展開全部內容的場景。
	 * @tutorial https://www.uviewui.com/components/readMore.html
	 * @property {String Number} show-height 內容超出此高度才會顯示展開全文按鈕，單位rpx（默認400）
	 * @property {Boolean} toggle 展開後是否顯示收起按鈕（默認false）
	 * @property {String} close-text 關閉時的提示文字（默認「展開閱讀全文」）
	 * @property {String Number} font-size 提示文字的大小，單位rpx（默認28）
	 * @property {String} text-indent 段落首行縮進的字符個數（默認2em）
	 * @property {String} open-text 展開時的提示文字（默認「收起」）
	 * @property {String} color 提示文字的顏色（默認#2979ff）
	 * @example <u-read-more><rich-text :nodes="content"></rich-text></u-read-more>
	 */
	export default {
		name: "u-read-more",
		props: {
			// 默認的顯示佔位高度，單位為rpx
			showHeight: {
				type: [Number, String],
				default: 400
			},
			// 展開後是否顯示"收起"按鈕
			toggle: {
				type: Boolean,
				default: false
			},
			// 關閉時的提示文字
			closeText: {
				type: String,
				default: '展開閱讀全文'
			},
			// 展開時的提示文字
			openText: {
				type: String,
				default: '收起'
			},
			// 提示的文字顏色
			color: {
				type: String,
				default: '#2979ff'
			},
			// 提示文字的大小
			fontSize: {
				type: [String, Number],
				default: 28
			},
			// 是否顯示陰影
			shadowStyle: {
				type: Object,
				default () {
					return {
						backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
						paddingTop: "300rpx",
						marginTop: "-300rpx"
					}
				}
			},
			// 段落首行縮進的字符個數
			textIndent: {
				type: String,
				default: '2em'
			},
			// open和close事件時，將此參數返回在回調參數中
			index: {
				type: [Number, String],
				default: ''
			}
		},
		watch: {
			paramsChange(val) {
				this.init();
			}
		},
		computed: {
			paramsChange() {
				return `${this.toggle}-${this.showHeight}`;
			},
			// 展開後無需陰影，收起時才需要陰影樣式
			innerShadowStyle() {
				if (this.showMore) return {};
				else return this.shadowStyle
			}
		},
		data() {
			return {
				isLongContent: false, // 是否需要隱藏一部分內容
				showMore: false, // 當前隱藏與顯示的狀態，true-顯示，false-收起
				elId: this.$u.guid(), // 生成唯一class
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.init();
			})
		},
		methods: {
			init() {
				this.$uGetRect('.' + this.elId).then(res => {
					// 判斷高度，如果真實內容高度大於佔位高度，則顯示收起與展開的控制按鈕
					if (res.height > uni.upx2px(this.showHeight)) {
						this.isLongContent = true;
						this.showMore = false;
					}
				})
			},
			// 展開或者收起
			toggleReadMore() {
				this.showMore = !this.showMore;
				// 如果toggle為false，隱藏"收起"部分的內容
				if (this.toggle == false) this.isLongContent = false;
				// 發出打開或者收齊的事件
				this.$emit(this.showMore ? 'open' : 'close', this.index);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-content {
		font-size: 30rpx;
		color: $u-content-color;
		line-height: 1.8;
		text-align: left;
		overflow: hidden;

		&__show-more {
			padding-top: 0;
			background: none;
			margin-top: 20rpx;
		}

		&__showmore-wrap {
			position: relative;
			width: 100%;
			padding-bottom: 26rpx;
			@include vue-flex;
			align-items: center;
			justify-content: center;

			&__readmore-btn {
				@include vue-flex;
				align-items: center;
				justify-content: center;
				line-height: 1;

				&__icon {
					margin-left: 14rpx;
				}
			}
		}
	}
</style>
