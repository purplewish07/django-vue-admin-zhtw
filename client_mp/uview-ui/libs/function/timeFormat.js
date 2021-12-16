// padStart 的 polyfill，因為某些機型或情況，還無法支持es7的padStart，比如電腦版的微信小程序
// 所以這裡做一個兼容polyfill的兼容處理
if (!String.prototype.padStart) {
	// 為了方便表示這裡 fillString 用了ES6 的默認參數，不影響理解
	String.prototype.padStart = function(maxLength, fillString = ' ') {
		if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
			'fillString must be String')
		let str = this
		// 返回 String(str) 這裡是為了使返回的值是字符串字面量，在控制台中更符合直覺
		if (str.length >= maxLength) return String(str)

		let fillLength = maxLength - str.length,
			times = Math.ceil(fillLength / fillString.length)
		while (times >>= 1) {
			fillString += fillString
			if (times === 1) {
				fillString += fillString
			}
		}
		return fillString.slice(0, fillLength) + str;
	}
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh時MM分等,可自定義組合
function timeFormat(dateTime = null, fmt = 'yyyy-mm-dd') {
	// 如果為null,則格式化當前時間
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime長度為10或者13，則為秒和毫秒的時間戳，如果超過13位，則為其他的時間格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(Number(dateTime));
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 時
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以繼續添加，必須轉化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

export default timeFormat
