/**
 * 求兩個顏色之間的漸變值
 * @param {string} startColor 開始的顏色
 * @param {string} endColor 結束的顏色
 * @param {number} step 顏色等分的份額
 * */
function colorGradient(startColor = 'rgb(0, 0, 0)', endColor = 'rgb(255, 255, 255)', step = 10) {
	let startRGB = hexToRgb(startColor, false); //轉換為rgb數組模式
	let startR = startRGB[0];
	let startG = startRGB[1];
	let startB = startRGB[2];

	let endRGB = hexToRgb(endColor, false);
	let endR = endRGB[0];
	let endG = endRGB[1];
	let endB = endRGB[2];

	let sR = (endR - startR) / step; //總差值
	let sG = (endG - startG) / step;
	let sB = (endB - startB) / step;
	let colorArr = [];
	for (let i = 0; i < step; i++) {
		//計算每一步的hex值 
		let hex = rgbToHex('rgb(' + Math.round((sR * i + startR)) + ',' + Math.round((sG * i + startG)) + ',' + Math.round((sB *
			i + startB)) + ')');
		colorArr.push(hex);
	}
	return colorArr;
}

// 將hex表示方式轉換為rgb表示方式(這裡返回rgb數組模式)
function hexToRgb(sColor, str = true) {
	let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	sColor = sColor.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			let sColorNew = "#";
			for (let i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//處理六位的顏色值
		let sColorChange = [];
		for (let i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		if(!str) {
			return sColorChange;
		} else {
			return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
		}
	} else if (/^(rgb|RGB)/.test(sColor)) {
		let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
		return arr.map(val => Number(val));
	} else {
		return sColor;
	}
};

// 將rgb表示方式轉換為hex表示方式
function rgbToHex(rgb) {
	let _this = rgb;
	let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (/^(rgb|RGB)/.test(_this)) {
		let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		let strHex = "#";
		for (let i = 0; i < aColor.length; i++) {
			let hex = Number(aColor[i]).toString(16);
			hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保證每個rgb的值為2位
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = _this;
		}
		return strHex;
	} else if (reg.test(_this)) {
		let aNum = _this.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return _this;
		} else if (aNum.length === 3) {
			let numHex = "#";
			for (let i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return _this;
	}
}


/**
* JS顏色十六進制轉換為rgb或rgba,返回的格式為 rgba（255，255，255，0.5）字符串
* sHex為傳入的十六進制的色值
* alpha為rgba的透明度
*/
function colorToRgba(color, alpha = 0.3) {
	color = rgbToHex(color)
	// 十六進制顏色值的正則表達式
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
	/* 16進制顏色轉為RGB格式 */
	let sColor = color.toLowerCase()
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = '#'
			for (let i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
			}
			sColor = sColorNew
		}
		// 處理六位的顏色值
		var sColorChange = []
		for (let i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
		}
		// return sColorChange.join(',')
		return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
	} 
	else {
		return sColor
	}
}

export default {
	colorGradient,
	hexToRgb,
	rgbToHex,
	colorToRgba
}