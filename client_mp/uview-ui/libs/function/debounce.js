let timeout = null;

/**
 * 防抖原理：一定時間內，只有最後一次操作，再過wait毫秒後才執行函數
 * 
 * @param {Function} func 要執行的回調函數 
 * @param {Number} wait 延時的時間
 * @param {Boolean} immediate 是否立即執行 
 * @return null
 */
function debounce(func, wait = 500, immediate = false) {
	// 清除定時器
	if (timeout !== null) clearTimeout(timeout);
	// 立即執行，此類情況一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 設置定時器，當最後一次操作後，timeout不會再被清除，所以在延時wait毫秒後執行func回調方法
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, wait);
	}
}

export default debounce
