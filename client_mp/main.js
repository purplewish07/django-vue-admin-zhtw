import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 此處為演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '棗紅';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 此處為演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的對vuex的簡寫法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入uView對小程序分享的mixin封裝
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

// i18n部分的配置
// 引入語言包，注意路徑
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
	// 默認語言
	locale: 'zh',
	// 引入語言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
});

// 由於微信小程序的運行機制問題，需聲明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;

const app = new Vue({
	i18n,
	store,
	...App
});

// http攔截器，將此部分放在new Vue()和app.$mount()之間，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽離，免於寫url或者一些固定的參數
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);

app.$mount();
