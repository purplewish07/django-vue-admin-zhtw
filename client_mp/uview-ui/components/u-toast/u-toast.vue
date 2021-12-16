<template>
	<view class="u-toast" :class="[isShow ? 'u-show' : '', 'u-type-' + tmpConfig.type, 'u-position-' + tmpConfig.position]" :style="{
		zIndex: uZIndex
	}">
		<view class="u-icon-wrap">
			<u-icon v-if="tmpConfig.icon" class="u-icon" :name="iconName" :size="30" :color="tmpConfig.type"></u-icon>
		</view>
		<text class="u-text">{{tmpConfig.title}}</text>
	</view>
</template>

<script>
	/**
	 * toast 消息提示
	 * @description 此組件表現形式類似uni的uni.showToastAPI，但也有不同的地方。
	 * @tutorial https://www.uviewui.com/components/toast.html
	 * @property {String} z-index toast展示時的z-index值
	 * @event {Function} show 顯示toast，如需一進入頁面就顯示toast，請在onReady生命週期調用
	 * @example <u-toast ref="uToast" />
	 */
	export default {
		name: "u-toast",
		props: {
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {
				isShow: false,
				timer: null, // 定時器
				config: {
					params: {}, // URL跳轉的參數，對像
					title: '', // 顯示文本
					type: '', // 主題類型，primary，success，error，warning，black
					duration: 2000, // 顯示的時間，毫秒
					isTab: false, // 是否跳轉tab頁面
					url: '', // toast消失後是否跳轉頁面，有則跳轉，優先級高於back參數
					icon: true, // 顯示的圖標
					position: 'center', // toast出現的位置
					callback: null, // 執行完後的回調函數
					back: false, // 結束toast是否自動返回上一頁
				},
				tmpConfig: {}, // 將用戶配置和內置配置合併後的臨時配置變量
			};
		},
		computed: {
			iconName() {
				// 只有不為none，並且type為error|warning|succes|info時候，才顯示圖標
				if (['error', 'warning', 'success', 'info'].indexOf(this.tmpConfig.type) >= 0 && this.tmpConfig.icon) {
					let icon = this.$u.type2icon(this.tmpConfig.type);
					return icon;
				}
			},
			uZIndex() {
				// 顯示toast時候，如果用戶有傳遞z-index值，有限使用
				return this.isShow ? (this.zIndex ? this.zIndex : this.$u.zIndex.toast) : '999999';
			}
		},
		methods: {
			// 顯示toast組件，由父組件通過this.$refs.xxx.show(options)形式調用
			show(options) {
				// 不降結果合併到this.config變量，避免多次條用u-toast，前後的配置造成混論
				this.tmpConfig = this.$u.deepMerge(this.config, options);
				if (this.timer) {
					// 清除定時器
					clearTimeout(this.timer);
					this.timer = null;
				}
				this.isShow = true;
				this.timer = setTimeout(() => {
					// 倒計時結束，清除定時器，隱藏toast組件
					this.isShow = false;
					clearTimeout(this.timer);
					this.timer = null;
					// 判斷是否存在callback方法，如果存在就執行
					typeof(this.tmpConfig.callback) === 'function' && this.tmpConfig.callback();
					this.timeEnd();
				}, this.tmpConfig.duration);
			},
			// 隱藏toast組件，由父組件通過this.$refs.xxx.hide()形式調用
			hide() {
				this.isShow = false;
				if (this.timer) {
					// 清除定時器
					clearTimeout(this.timer);
					this.timer = null;
				}
			},
			// 倒計時結束之後，進行的一些操作
			timeEnd() {
				// 如果帶有url值，根據isTab為true或者false進行跳轉
				if (this.tmpConfig.url) {
					// 如果url沒有"/"開頭，添加上，因為uni的路由跳轉需要"/"開頭
					if (this.tmpConfig.url[0] != '/') this.tmpConfig.url = '/' + this.tmpConfig.url;
					// 判斷是否有傳遞顯式的參數
					if (Object.keys(this.tmpConfig.params).length) {
						// 判斷用戶傳遞的url中，是否帶有參數
						// 使用正則匹配，主要依據是判斷是否有"/","?","="等，如「/page/index/index?name=mary"
						// 如果有params參數，轉換後無需帶上"?"
						let query = '';
						if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
							// object對像轉為get類型的參數
							query = this.$u.queryParams(this.tmpConfig.params, false);
							this.tmpConfig.url = this.tmpConfig.url + "&" + query;
						} else {
							query = this.$u.queryParams(this.tmpConfig.params);
							this.tmpConfig.url += query;
						}
					}
					// 如果是跳轉tab頁面，就使用uni.switchTab
					if (this.tmpConfig.isTab) {
						uni.switchTab({
							url: this.tmpConfig.url
						});
					} else {
						uni.navigateTo({
							url: this.tmpConfig.url
						});
					}
				} else if(this.tmpConfig.back) {
					// 回退到上一頁
					this.$u.route({
						type: 'back'
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-toast {
		position: fixed;
		z-index: -1;
		transition: opacity 0.3s;
		text-align: center;
		color: #fff;
		border-radius: 8rpx;
		background: #585858;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		opacity: 0;
		pointer-events: none;
		padding: 18rpx 40rpx;
	}

	.u-toast.u-show {
		opacity: 1;
	}

	.u-icon {
		margin-right: 10rpx;
		@include vue-flex;
		align-items: center;
		line-height: normal;
	}

	.u-position-center {
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		/* #ifndef APP-NVUE */
		max-width: 70%;
		/* #endif */
	}

	.u-position-top {
		left: 50%;
		top: 20%;
		transform: translate(-50%,-50%);
	}

	.u-position-bottom {
		left: 50%;
		bottom: 20%;
		transform: translate(-50%,-50%);
	}

	.u-type-primary {
		color: $u-type-primary;
		background-color: $u-type-primary-light;
		border: 1px solid rgb(215, 234, 254);
	}

	.u-type-success {
		color: $u-type-success;
		background-color: $u-type-success-light;
		border: 1px solid #BEF5C8;
	}

	.u-type-error {
		color: $u-type-error;
		background-color: $u-type-error-light;
		border: 1px solid #fde2e2;
	}

	.u-type-warning {
		color: $u-type-warning;
		background-color: $u-type-warning-light;
		border: 1px solid #faecd8;
	}

	.u-type-info {
		color: $u-type-info;
		background-color: $u-type-info-light;
		border: 1px solid #ebeef5;
	}

	.u-type-default {
		color: #fff;
		background-color: #585858;
	}
</style>
