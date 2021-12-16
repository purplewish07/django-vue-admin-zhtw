<script>
	export default {
		// 此處globalData為了演示其作用，不是uView框架的一部分
		globalData: {
			username: '白居易'
		},
		onLaunch() {
			// 1.1.0版本之前關於http攔截器代碼，已平滑移動到/common/http.interceptor.js中
			// 注意，需要在/main.js中實例化Vue之後引入如下(詳見文檔說明)：
			// import httpInterceptor from '@/common/http.interceptor.js'
			// Vue.use(httpInterceptor, app)
			// process.env.VUE_APP_PLATFORM 為通過js判斷平台名稱的方法，結果分別如下：
			/**
			 * h5，app-plus(nvue下也為app-plus)，mp-weixin，mp-alipay......
			 */
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
</style>