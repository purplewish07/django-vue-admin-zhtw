/**
 * 路由跳轉方法，該方法相對於直接使用uni.xxx的好處是使用更加簡單快捷
 * 並且帶有路由攔截功能
 */

class Router {
	constructor() {
		// 原始屬性定義
		this.config = {
			type: 'navigateTo',
			url: '',
			delta: 1, // navigateBack頁面後退時,回退的層數
			params: {}, // 傳遞的參數
			animationType: 'pop-in', // 窗口動畫,只在APP有效
			animationDuration: 300, // 窗口動畫持續時間,單位毫秒,只在APP有效
			intercept: false, // 是否需要攔截
		}
		// 因為route方法是需要對外賦值給另外的對象使用，同時route內部有使用this，會導致route失去上下文
		// 這裡在構造函數中進行this綁定
		this.route = this.route.bind(this)
	}

	// 判斷url前面是否有"/"，如果沒有則加上，否則無法跳轉
	addRootPath(url) {
		return url[0] === '/' ? url : `/${url}`
	}

	// 整合路由參數
	mixinParam(url, params) {
		url = url && this.addRootPath(url)
		
		// 使用正則匹配，主要依據是判斷是否有"/","?","="等，如「/page/index/index?name=mary"
		// 如果有url中有get參數，轉換後無需帶上"?"
		let query = ''
		if (/.*\/.*\?.*=.*/.test(url)) {
			// object對像轉為get類型的參數
			query = uni.$u.queryParams(params, false);
			// 因為已有get參數,所以後面拼接的參數需要帶上"&"隔開
			return url += "&" + query
		} else {
			// 直接拼接參數，因為此處url中沒有後面的query參數，也就沒有"?/&"之類的符號
			query = uni.$u.queryParams(params);
			return url += query
		}
	}

	// 對外的方法名稱
	async route(options = {}, params = {}) {
		// 合併用戶的配置和內部的默認配置
		let mergeConfig = {}

		if (typeof options === 'string') {
			// 如果options為字符串，則為route(url, params)的形式
			mergeConfig.url = this.mixinParam(options, params)
			mergeConfig.type = 'navigateTo'
		} else {
			mergeConfig = uni.$u.deepClone(options, this.config)
			// 否則正常使用mergeConfig中的url和params進行拼接
			mergeConfig.url = this.mixinParam(options.url, options.params)
		}
		
		if(params.intercept) {
			this.config.intercept = params.intercept
		}
		// params參數也帶給攔截器
		mergeConfig.params = params
		// 合併內外部參數
		mergeConfig = uni.$u.deepMerge(this.config, mergeConfig)
		// 判斷用戶是否定義了攔截器
		if (typeof uni.$u.routeIntercept === 'function') {
			// 定一個promise，根據用戶執行resolve(true)或者resolve(false)來決定是否進行路由跳轉
			const isNext = await new Promise((resolve, reject) => {
				uni.$u.routeIntercept(mergeConfig, resolve)
			})
			// 如果isNext為true，則執行路由跳轉
			isNext && this.openPage(mergeConfig)
		} else {
			this.openPage(mergeConfig)
		}
	}

	// 執行路由跳轉
	openPage(config) {
		// 解構參數
		const {
			url,
			type,
			delta,
			animationType,
			animationDuration
		} = config
		if (config.type == 'navigateTo' || config.type == 'to') {
			uni.navigateTo({
				url,
				animationType,
				animationDuration
			});
		}
		if (config.type == 'redirectTo' || config.type == 'redirect') {
			uni.redirectTo({
				url
			});
		}
		if (config.type == 'switchTab' || config.type == 'tab') {
			uni.switchTab({
				url
			});
		}
		if (config.type == 'reLaunch' || config.type == 'launch') {
			uni.reLaunch({
				url
			});
		}
		if (config.type == 'navigateBack' || config.type == 'back') {
			uni.navigateBack({
				delta
			});
		}
	}
}

export default (new Router()).route