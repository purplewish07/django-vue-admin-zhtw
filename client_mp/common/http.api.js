// 如果沒有通過攔截器配置域名的話，可以在這裡寫上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/ebapi/public_api/index';

// 此處第二個參數vm，就是我們在頁面使用的this，你可以通過vm獲取vuex等操作，更多內容詳見uView對攔截器的介紹部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此處沒有使用傳入的params參數
	let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});
	// 此處使用了傳入的params參數，一切自定義即可
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	
	let gettest = (params = {}) => vm.$u.get('/system/test/', params);
	// 將各個定義的接口名稱，統一放進對像掛載到vm.$u.api(因為vm就是this，也即this.$u.api)下
	vm.$u.api = {getSearch, getInfo, gettest};
}

export default {
	install
}