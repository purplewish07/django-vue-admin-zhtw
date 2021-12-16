import timeFormat from '../../libs/function/timeFormat.js';

/**
 * 時間戳轉為多久之前
 * @param String timestamp 時間戳
 * @param String | Boolean format 如果為時間格式字符串，超出一定時間範圍，返回固定的時間格式；
 * 如果為布爾值false，無論什麼時間，都返回多久以前的格式
 */
function timeFrom(dateTime = null, format = 'yyyy-mm-dd') {
	// 如果為null,則格式化當前時間
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime長度為10或者13，則為秒和毫秒的時間戳，如果超過13位，則為其他的時間格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let timestamp = + new Date(Number(dateTime));

	let timer = (Number(new Date()) - timestamp) / 1000;
	// 如果小於5分鐘,則返回"剛剛",其他以此類推
	let tips = '';
	switch (true) {
		case timer < 300:
			tips = '剛剛';
			break;
		case timer >= 300 && timer < 3600:
			tips = parseInt(timer / 60) + '分鐘前';
			break;
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小時前';
			break;
		case timer >= 86400 && timer < 2592000:
			tips = parseInt(timer / 86400) + '天前';
			break;
		default:
			// 如果format為false，則無論什麼時間戳，都顯示xx之前
			if(format === false) {
				if(timer >= 2592000 && timer < 365 * 86400) {
					tips = parseInt(timer / (86400 * 30)) + '個月前';
				} else {
					tips = parseInt(timer / (86400 * 365)) + '年前';
				}
			} else {
				tips = timeFormat(timestamp, format);
			}
	}
	return tips;
}

export default timeFrom;
