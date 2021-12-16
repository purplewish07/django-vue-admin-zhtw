// 引入全局mixin
import mixin from './libs/mixin/mixin.js'
// 引入關於是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局掛載引入http相關請求攔截插件
import http from './libs/request'

function wranning(str) {
	// 開發環境進行信息輸出,主要是一些報錯信息
	// 這個環境的來由是在程序編寫時候,點擊hx編輯器運行調試代碼的時候,詳見:
	// 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
	if (process.env.NODE_ENV === 'development') {
		console.warn(str)
	}
}

// 嘗試判斷在根目錄的/store中是否有$u.mixin.js，此文件uView默認為需要掛在到全局的vuex的state變量
// HX2.6.11版本,放到try中,控制台依然會警告,暫時不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }

// post類型對像參數轉為get類型url參數
import queryParams from './libs/function/queryParams.js'
// 路由封裝
import route from './libs/function/route.js'
// 時間格式化
import timeFormat from './libs/function/timeFormat.js'
// 時間戳格式化,返回多久之前
import timeFrom from './libs/function/timeFrom.js'
// 顏色漸變相關,colorGradient-顏色漸變,hexToRgb-十六進制顏色轉rgb顏色,rgbToHex-rgb轉十六進制
import colorGradient from './libs/function/colorGradient.js'
// 生成全局唯一guid字符串
import guid from './libs/function/guid.js'
// 主題相關顏色,info|success|warning|primary|default|error,此顏色已在uview.scss中定義,但是為js中也能使用,故也定義一份
import color from './libs/function/color.js'
// 根據type獲取圖標名稱
import type2icon from './libs/function/type2icon.js'
// 打亂數組的順序
import randomArray from './libs/function/randomArray.js'
// 對像和數組的深度克隆
import deepClone from './libs/function/deepClone.js'
// 對像深度拷貝
import deepMerge from './libs/function/deepMerge.js'
// 添加單位
import addUnit from './libs/function/addUnit.js'

// 規則檢驗
import test from './libs/function/test.js'
// 隨機數
import random from './libs/function/random.js'
// 去除空格
import trim from './libs/function/trim.js'
// toast提示，對uni.showToast的封裝
import toast from './libs/function/toast.js'
// 獲取父組件參數
import getParent from './libs/function/getParent.js'
// 獲取整個父組件
import $parent from './libs/function/$parent.js'
// 獲取sys()和os()工具方法
// 獲取設備信息，掛載到$u的sys()(system的縮寫)屬性中，
// 同時把安卓和ios平台的名稱"ios"和"android"掛到$u.os()中，方便取用
import {sys, os} from './libs/function/sys.js'
// 防抖方法
import debounce from './libs/function/debounce.js'
// 節流方法
import throttle from './libs/function/throttle.js'


// 配置信息
import config from './libs/config/config.js'
// 各個需要fixed的地方的z-index配置文件
import zIndex from './libs/config/zIndex.js'

const $u = {
	queryParams: queryParams,
	route: route,
	timeFormat: timeFormat,
	date: timeFormat, // 另名date
	timeFrom,
	colorGradient: colorGradient.colorGradient,
	colorToRgba: colorGradient.colorToRgba,
	guid,
	color,
	sys,
	os,
	type2icon,
	randomArray,
	wranning,
	get: http.get,
	post: http.post,
	put: http.put,
	'delete': http.delete,
	hexToRgb: colorGradient.hexToRgb,
	rgbToHex: colorGradient.rgbToHex,
	test,
	random,
	deepClone,
	deepMerge,
	getParent,
	$parent,
	addUnit,
	trim,
	type: ['primary', 'success', 'error', 'warning', 'info'],
	http,
	toast,
	config, // uView配置信息相關，比如版本號
	zIndex,
	debounce,
	throttle,
}

// $u掛載到uni對像上
uni.$u = $u

const install = Vue => {
	Vue.mixin(mixin) 
	if (Vue.prototype.openShare) {
		Vue.mixin(mpShare);
	}
	// Vue.mixin(vuexStore);
	// 時間格式化，同時兩個名稱，date和timeFormat
	Vue.filter('timeFormat', (timestamp, format) => {
		return timeFormat(timestamp, format)
	})
	Vue.filter('date', (timestamp, format) => {
		return timeFormat(timestamp, format)
	})
	// 將多久以前的方法，注入到全局過濾器
	Vue.filter('timeFrom', (timestamp, format) => {
		return timeFrom(timestamp, format)
	})
	Vue.prototype.$u = $u
}

export default {
	install
}