import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 嘗試獲取本地是否存在lifeData變量，第一次啟動APP時是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存儲，且下次APP啟動需要取出的，在state中的變量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存變量到本地存儲中
const saveLifeData = function(key, value){
	// 判斷變量名是否在需要存儲的數組中
	if(saveStateKeys.indexOf(key) != -1) {
		// 獲取本地存儲的lifeData對象，將變量添加到對像中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打開APP，不存在lifeData變量，故放一個{}空對像
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 執行這一步後，所有需要存儲的變量，都掛載在本地的lifeData對像中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面從本地獲取的lifeData對像下有對應的屬性，就賦值給state中對應的變量
		// 加上vuex_前綴，是防止變量名衝突，也讓人一目瞭然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		// 如果vuex_version無需保存到本地永久存儲，無需lifeData.vuex_version方式
		vuex_version: '1.0.1',
		vuex_demo: '絳紫',
		// 自定義tabbar數據
		vuex_tabbar: [{
				iconPath: "/static/uview/example/component.png",
				selectedIconPath: "/static/uview/example/component_select.png",
				text: '組件',
				pagePath: '/pages/example/components'
			},
			{
				iconPath: "/static/uview/example/js.png",
				selectedIconPath: "/static/uview/example/js_select.png",
				text: '工具',
				midButton: true,
				pagePath: '/pages/example/js'
			},
			{
				iconPath: "/static/uview/example/template.png",
				selectedIconPath: "/static/uview/example/template_select.png",
				text: '模板',
				pagePath: '/pages/example/template'
			}
		]
	},
	mutations: {
		$uStore(state, payload) {
			// 判斷是否多層級調用，state中為對像存在的情況，諸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 單層級變量，在state就是一個普通變量的情況
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存變量到本地，見頂部函數定義
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
