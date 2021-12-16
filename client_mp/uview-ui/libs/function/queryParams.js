/**
 * 對像轉url參數
 * @param {*} data,對像
 * @param {*} isPrefix,是否自動加上"?"
 */
function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
	let prefix = isPrefix ? '?' : ''
	let _result = []
	if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
	for (let key in data) {
		let value = data[key]
		// 去掉為空的參數
		if (['', undefined, null].indexOf(value) >= 0) {
			continue;
		}
		// 如果值為數組，另行處理
		if (value.constructor === Array) {
			// e.g. {ids: [1, 2, 3]}
			switch (arrayFormat) {
				case 'indices':
					// 結果: ids[0]=1&ids[1]=2&ids[2]=3
					for (let i = 0; i < value.length; i++) {
						_result.push(key + '[' + i + ']=' + value[i])
					}
					break;
				case 'brackets':
					// 結果: ids[]=1&ids[]=2&ids[]=3
					value.forEach(_value => {
						_result.push(key + '[]=' + _value)
					})
					break;
				case 'repeat':
					// 結果: ids=1&ids=2&ids=3
					value.forEach(_value => {
						_result.push(key + '=' + _value)
					})
					break;
				case 'comma':
					// 結果: ids=1,2,3
					let commaStr = "";
					value.forEach(_value => {
						commaStr += (commaStr ? "," : "") + _value;
					})
					_result.push(key + '=' + commaStr)
					break;
				default:
					value.forEach(_value => {
						_result.push(key + '[]=' + _value)
					})
			}
		} else {
			_result.push(key + '=' + value)
		}
	}
	return _result.length ? prefix + _result.join('&') : ''
}

export default queryParams;
