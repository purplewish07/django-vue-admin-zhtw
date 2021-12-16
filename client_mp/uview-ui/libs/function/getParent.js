// 獲取父組件的參數，因為支付寶小程序不支持provide/inject的寫法
// this.$parent在非H5中，可以準確獲取到父組件，但是在H5中，需要多次this.$parent.$parent.xxx
export default function getParent(name, keys) {
	let parent = this.$parent;
	// 通過while歷遍，這裡主要是為了H5需要多層解析的問題
	while (parent) {
		// 父組件
		if (parent.$options.name !== name) {
			// 如果組件的name不相等，繼續上一級尋找
			parent = parent.$parent;
		} else {
			let data = {};
			// 判斷keys是否數組，如果傳過來的是一個數組，那麼直接使用數組元素值當做鍵值去父組件尋找
			if(Array.isArray(keys)) {
				keys.map(val => {
					data[val] = parent[val] ? parent[val] : '';
				})
			} else {
				// 歷遍傳過來的對象參數
				for(let i in keys) {
					// 如果子組件有此值則用，無此值則用父組件的值
					// 判斷是否空數組，如果是，則用父組件的值，否則用子組件的值
					if(Array.isArray(keys[i])) {
						if(keys[i].length) {
							data[i] = keys[i];
						} else {
							data[i] = parent[i];
						}
					} else if(keys[i].constructor === Object) {
						// 判斷是否對象，如果是對象，且有屬性，那麼使用子組件的值，否則使用父組件的值
						if(Object.keys(keys[i]).length) {
							data[i] = keys[i];
						} else {
							data[i] = parent[i];
						}
					} else {
						// 只要子組件有傳值，即使是false值，也是「傳值」了，也需要覆蓋父組件的同名參數
						data[i] = (keys[i] || keys[i] === false) ? keys[i] : parent[i];
					}
				}
			}
			return data;
		}
	}

	return {};
}