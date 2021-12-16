import deepMerge from "../function/deepMerge";
import validate from "../function/test";
class Request {
	// 設置全局默認配置
	setConfig(customConfig) {
		// 深度合併對象，否則會造成對像深層屬性丟失
		this.config = deepMerge(this.config, customConfig);
	}

	// 主要請求部分
	request(options = {}) {
		// 檢查請求攔截
		if (this.interceptor.request && typeof this.interceptor.request === 'function') {
			let tmpConfig = {};
			let interceptorRequest = this.interceptor.request(options);
			if (interceptorRequest === false) {
				// 返回一個處於pending狀態中的Promise，來取消原promise，避免進入then()回調
				return new Promise(()=>{});
			}
			this.options = interceptorRequest;
		}
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = options.url || '';
		options.params = options.params || {};
		options.header = Object.assign(this.config.header, options.header);
		options.method = options.method || this.config.method;

		return new Promise((resolve, reject) => {
			options.complete = (response) => {
				// 請求返回後，隱藏loading(如果請求返回快的話，可能會沒有loading)
				uni.hideLoading();
				// 清除定時器，如果請求回來了，就無需loading
				clearTimeout(this.config.timer);
				this.config.timer = null;
				// 判斷用戶對攔截返回數據的要求，如果originalData為true，返回所有的數據(response)到攔截器，否則只返回response.data
				if(this.config.originalData) {
					// 判斷是否存在攔截器
					if (this.interceptor.response && typeof this.interceptor.response === 'function') {
						let resInterceptors = this.interceptor.response(response);
						// 如果攔截器不返回false，就將攔截器返回的內容給this.$u.post的then回調
						if (resInterceptors !== false) {
							resolve(resInterceptors);
						} else {
							// 如果攔截器返回false，意味著攔截器定義者認為返回有問題，直接接入catch回調
							reject(response);
						}
					} else {
						// 如果要求返回原始數據，就算沒有攔截器，也返回最原始的數據
						resolve(response);
					}
				} else {
					if (response.statusCode == 200) {
						if (this.interceptor.response && typeof this.interceptor.response === 'function') {
							let resInterceptors = this.interceptor.response(response.data);
							if (resInterceptors !== false) {
								resolve(resInterceptors);
							} else {
								reject(response.data);
							}
						} else {
							// 如果不是返回原始數據(originalData=false)，且沒有攔截器的情況下，返回純數據給then回調
							resolve(response.data);
						}
					} else {
						// 不返回原始數據的情況下，服務器狀態碼不為200，modal彈框提示
						// if(response.errMsg) {
						// 	uni.showModal({
						// 		title: response.errMsg
						// 	});
						// }
						reject(response)
					}
				}
			}

			// 判斷用戶傳遞的URL是否/開頭,如果不是,加上/，這裡使用了uView的test.js驗證庫的url()方法
			options.url = validate.url(options.url) ? options.url : (this.config.baseUrl + (options.url.indexOf('/') == 0 ?
				options.url : '/' + options.url));
			
			// 是否顯示loading
			// 加一個是否已有timer定時器的判斷，否則有兩個同時請求的時候，後者會清除前者的定時器id
			// 而沒有清除前者的定時器，導致前者超時，一直顯示loading
			if(this.config.showLoading && !this.config.timer) {
				this.config.timer = setTimeout(() => {
					uni.showLoading({
						title: this.config.loadingText,
						mask: this.config.loadingMask
					})
					this.config.timer = null;
				}, this.config.loadingTime);
			}
			uni.request(options);
		})
		// .catch(res => {
		// 	// 如果返回reject()，不讓其進入this.$u.post().then().catch()後面的catct()
		// 	// 因為很多人都會忘了寫後面的catch()，導致報錯捕獲不到catch
		// 	return new Promise(()=>{});
		// })
	}

	constructor() {
		this.config = {
			baseUrl: '', // 請求的根域名
			// 默認的請求頭
			header: {},
			method: 'POST',
			// 設置為json，返回後uni.request會對數據進行一次JSON.parse
			dataType: 'json',
			// 此參數無需處理，因為5+和支付寶小程序不支持，默認為text即可
			responseType: 'text',
			showLoading: true, // 是否顯示請求中的loading
			loadingText: '請求中...',
			loadingTime: 800, // 在此時間內，請求還沒回來的話，就顯示加載中動畫，單位ms
			timer: null, // 定時器
			originalData: false, // 是否在攔截器中返回服務端的原始數據，見文檔說明
			loadingMask: true, // 展示loading的時候，是否給一個透明的蒙層，防止觸摸穿透
		}
	
		// 攔截器
		this.interceptor = {
			// 請求前的攔截
			request: null,
			// 請求後的攔截
			response: null
		}

		// get請求
		this.get = (url, data = {}, header = {}) => {
			return this.request({
				method: 'GET',
				url,
				header,
				data
			})
		}

		// post請求
		this.post = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'POST',
				header,
				data
			})
		}
		
		// put請求，不支持支付寶小程序(HX2.6.15)
		this.put = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'PUT',
				header,
				data
			})
		}
		
		// delete請求，不支持支付寶和頭條小程序(HX2.6.15)
		this.delete = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'DELETE',
				header,
				data
			})
		}
	}
}
export default new Request
