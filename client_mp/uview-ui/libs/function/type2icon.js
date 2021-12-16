/**
 * 根據主題type值,獲取對應的圖標
 * @param String type 主題名稱,primary|info|error|warning|success
 * @param String fill 是否使用fill填充實體的圖標  
 */
function type2icon(type = 'success', fill = false) {
	// 如果非預置值,默認為success
	if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
	let iconName = '';
	// 目前(2019-12-12),info和primary使用同一個圖標
	switch (type) {
		case 'primary':
			iconName = 'info-circle';
			break;
		case 'info':
			iconName = 'info-circle';
			break;
		case 'error':
			iconName = 'close-circle';
			break;
		case 'warning':
			iconName = 'error-circle';
			break;
		case 'success':
			iconName = 'checkmark-circle';
			break;
		default:
			iconName = 'checkmark-circle';
	}
	// 是否是實體類型,加上-fill,在icon組件庫中,實體的類名是後面加-fill的
	if (fill) iconName += '-fill';
	return iconName;
}

export default type2icon
