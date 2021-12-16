module.exports = {
	onLoad() {
		// 設置默認的轉發參數
		this.$u.mpShare = {
			title: '', // 默認為小程序名稱
			path: '', // 默認為當前頁面路徑
			imageUrl: '' // 默認為當前頁面的截圖
		}
	},
	onShareAppMessage() {
		return this.$u.mpShare
	},
	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return this.$u.mpShare
	}
	// #endif
}
