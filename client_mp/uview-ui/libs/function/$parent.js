// 獲取父組件的參數，因為支付寶小程序不支持provide/inject的寫法
// this.$parent在非H5中，可以準確獲取到父組件，但是在H5中，需要多次this.$parent.$parent.xxx
// 這裡默認值等於undefined有它的含義，因為最頂層元素(組件)的$parent就是undefined，意味著不傳name
// 值(默認為undefined)，就是查找最頂層的$parent
export default function $parent(name = undefined) {
	let parent = this.$parent;
	// 通過while歷遍，這裡主要是為了H5需要多層解析的問題
	while (parent) {
		// 父組件
		if (parent.$options && parent.$options.name !== name) {
			// 如果組件的name不相等，繼續上一級尋找
			parent = parent.$parent;
		} else {
			return parent;
		}
	}
	return false;
}