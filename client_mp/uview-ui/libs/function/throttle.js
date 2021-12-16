let timer, flag;
/**
 * 節流原理：在一定時間內，只能觸發一次
 * 
 * @param {Function} func 要執行的回調函數 
 * @param {Number} wait 延時的時間
 * @param {Boolean} immediate 是否立即執行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即執行，則在wait毫秒內開始時執行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即執行，則在wait毫秒內的結束處執行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}
		
	}
};
export default throttle
