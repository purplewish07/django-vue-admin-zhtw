module.exports = {
	data() {
		return {}
	},
	onLoad() {
		// getRect掛載到$u上，因為這方法需要使用in(this)，所以無法把它獨立成一個單獨的文件導出
		this.$u.getRect = this.$uGetRect
	},
	methods: {
		// 查詢節點信息
		// 目前此方法在支付寶小程序中無法獲取組件跟接點的尺寸，為支付寶的bug(2020-07-21)
		// 解決辦法為在組件根部再套一個沒有任何作用的view元素
		$uGetRect(selector, all) {
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		},
		getParentData(parentName = '') {
			// 避免在created中去定義parent變量
			if(!this.parent) this.parent = false;
			// 這裡的本質原理是，通過獲取父組件實例(也即u-radio-group的this)
			// 將父組件this中對應的參數，賦值給本組件(u-radio的this)的parentData對像中對應的屬性
			// 之所以需要這麼做，是因為所有端中，頭條小程序不支持通過this.parent.xxx去監聽父組件參數的變化
			this.parent = this.$u.$parent.call(this, parentName);
			if(this.parent) {
				// 歷遍parentData中的屬性，將parent中的同名屬性賦值給parentData
				Object.keys(this.parentData).map(key => {
					this.parentData[key] = this.parent[key];
				});
			}
		},
		// 阻止事件冒泡
		preventEvent(e) {
			e && e.stopPropagation && e.stopPropagation()
		}
	},
	onReachBottom() {
		uni.$emit('uOnReachBottom')
	}
}
