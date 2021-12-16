import validation from './test.js';

// 添加單位，如果有rpx，%，px等單位結尾或者值為auto，直接返回，否則加上rpx單位結尾
export default function addUnit(value = 'auto', unit = 'rpx') {
    value = String(value);
	// 用uView內置驗證規則中的number判斷是否為數值
    return validation.number(value) ? `${value}${unit}` : value;
}