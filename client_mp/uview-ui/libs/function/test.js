/**
 * 驗證電子郵箱格式
 */
function email(value) {
	return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 驗證手機格式
 */
function mobile(value) {
	return /^1[23456789]\d{9}$/.test(value)
}

/**
 * 驗證URL格式
 */
function url(value) {
	return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 驗證日期格式
 */
function date(value) {
	return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 驗證ISO類型的日期格式
 */
function dateISO(value) {
	return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 驗證十進制數字
 */
function number(value) {
	return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 驗證整數
 */
function digits(value) {
	return /^\d+$/.test(value)
}

/**
 * 驗證身份證號碼
 */
function idCard(value) {
	return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
		value)
}

/**
 * 是否車牌號
 */
function carNo(value) {
	// 新能源車牌
	const xreg = /^[京津滬渝冀豫雲遼黑湘皖魯新蘇浙贛鄂桂甘晉蒙陝吉閩貴粵青藏川寧瓊使領A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
	// 舊車牌
	const creg = /^[京津滬渝冀豫雲遼黑湘皖魯新蘇浙贛鄂桂甘晉蒙陝吉閩貴粵青藏川寧瓊使領A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9掛學警港澳]{1}$/;
	if (value.length === 7) {
		return creg.test(value);
	} else if (value.length === 8) {
		return xreg.test(value);
	} else {
		return false;
	}
}

/**
 * 金額,只允許2位小數
 */
function amount(value) {
	//金額，只允許保留兩位小數
	return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
	let reg = /^[\u4e00-\u9fa5]+$/gi;
	return reg.test(value);
}

/**
 * 只能輸入字母
 */
function letter(value) {
	return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者數字
 */
function enOrNum(value) {
	//英文或者數字
	let reg = /^[0-9a-zA-Z]*$/g;
	return reg.test(value);
}

/**
 * 驗證是否包含某個值
 */
function contains(value, param) {
	return value.indexOf(param) >= 0
}

/**
 * 驗證一個值範圍[min, max]
 */
function range(value, param) {
	return value >= param[0] && value <= param[1]
}

/**
 * 驗證一個長度範圍[min, max]
 */
function rangeLength(value, param) {
	return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定電話
 */
function landline(value) {
	let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
	return reg.test(value);
}

/**
 * 判斷是否為空
 */
function empty(value) {
	switch (typeof value) {
		case 'undefined':
			return true;
		case 'string':
			if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
			break;
		case 'boolean':
			if (!value) return true;
			break;
		case 'number':
			if (0 === value || isNaN(value)) return true;
			break;
		case 'object':
			if (null === value || value.length === 0) return true;
			for (var i in value) {
				return false;
			}
			return true;
	}
	return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
	if (typeof value == 'string') {
		try {
			var obj = JSON.parse(value);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}
	return false;
}


/**
 * 是否數組
 */
function array(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

/**
 * 是否對像
 */
function object(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信驗證碼
 */
function code(value, len = 6) {
	return new RegExp(`^\\d{${len}}$`).test(value);
}


export default {
	email,
	mobile,
	url,
	date,
	dateISO,
	number,
	digits,
	idCard,
	carNo,
	amount,
	chinese,
	letter,
	enOrNum,
	contains,
	range,
	rangeLength,
	empty,
	isEmpty: empty,
	jsonString,
	landline,
	object,
	array,
	code
}
