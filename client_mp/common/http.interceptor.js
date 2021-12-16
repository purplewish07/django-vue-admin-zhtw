// 這裡的vm，就是我們在vue文件裡面的this，所以我們能在這裡獲取vuex的變量，比如存放在裡面的token
// 同時，我們也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的話，也是可以使用的
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		// baseUrl: 'https://api.youzixy.com',
		baseUrl: 'http://127.0.0.1:8000',
		// 如果將此值設置為true，攔截回調中將會返回服務端返回的所有數據response，而不是response.data
		// 設置為true後，就需要在this.$u.http.interceptor.response進行多一次的判斷，請打印查看具體值
		// originalData: true, 
		// 設置自定義頭部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
		showLoading: true,
		loadingText: '請求中..',
		originalData: true,
		loadingTime: 800,
		loadingMask: true
	});
	// 請求攔截，配置Token等參數
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.Authorization = 'Bearer ' + vm.token;
		
		// 方式一，存放在vuex的token，假設使用了uView封裝的vuex方式，見：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果沒有使用uView封裝的vuex方法，那麼需要使用$store.state獲取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通過getApp().globalData獲取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存儲中，攔截是每次請求都執行的，所以哪怕您重新登錄修改了Storage，下一次的請求將會是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		
		return config; 
	}
	// 響應攔截，判斷狀態碼是否通過
	Vue.prototype.$u.http.interceptor.response = (response) => {
		// 如果把originalData設置為了true，這裡得到將會是服務器返回的所有的原始數據
		// 判斷可能變成了res.statueCode，或者res.data.code之類的，請打印查看結果
		const res = response.data
		if( res.code >= 200 && res.code < 300 ) {
			// 如果把originalData設置為了true，這裡return回什麼，this.$u.post的then回調中就會得到什麼
			return res;  
		} 
		else if(res.code === 401){
				vm.$u.toast('驗證失敗，請重新登錄');
				setTimeout(() => {
					// 此為uView的方法，詳見路由相關文檔
					vm.$u.route('/pages/login/login')
				}, 1500)
				return false;
			}
		else{ 
			vm.$u.toast(res.msg);
			return false;
			}
	}
}

export default {
	install
}