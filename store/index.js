import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLogin: false, //登录状态
		userInfo: { //用户账号信息
			user_id: 0,
			account: "",
			password: "",
			phone: "",
			username: "",
			authority: 0
		}, 
		token: ''
	},
	mutations: {
		updateLoginStatus(state, isLogin) {
			state.isLogin = isLogin;
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		updateToken(state, token) {
			state.token = token;
		}
	},
	actions: {},
	modules: {}
})