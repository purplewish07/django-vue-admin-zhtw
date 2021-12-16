// 打亂數組
function randomArray(array = []) {
	// 原理是sort排序,Math.random()產生0<= x < 1之間的數,會導致x-0.05大於或者小於0
	return array.sort(() => Math.random() - 0.5);
}

export default randomArray
