import { mapState } from 'vuex'
import store from "@/store"

// 嘗試將用戶在根目錄中的store/index.js的vuex的state變量，全部加載到全局變量中
let $uStoreKey = [];
try{
	$uStoreKey = store.state ? Object.keys(store.state) : [];
}catch(e){
	
}

module.exports = {
	beforeCreate() {
		// 將vuex方法掛在到$u中
		// 使用方法為：如果要修改vuex的state中的user.name變量為"史詩" => this.$u.vuex('user.name', '史詩')
		// 如果要修改vuex的state的version變量為1.0.1 => this.$u.vuex('version', '1.0.1')
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,value
			})
		}
	},
	computed: {
		// 將vuex的state中的所有變量，解構到全局混入的mixin中
		...mapState($uStoreKey)
	}
}