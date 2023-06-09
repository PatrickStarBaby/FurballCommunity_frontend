import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import http from '@/utils/http/'
import storage from '@/utils/storage.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
Vue.use(router)
Vue.prototype.$store = store
Vue.config.productionTip = false

import keyWords from "@/components/bian-keywords/index.vue"
Vue.component('key-words', keyWords)

//设置baseUrl
http.config.baseUrl = "/baseUrl"
//设置请求前拦截器
http.interceptor.request = (config) => {
	//添加通用参数
	config.header = {
		'Authorization': 'Bearer ' + storage.getToken(),
		'UserId': storage.getUserInfo().user_id ? storage.getUserInfo().user_id : ''
	}
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	// 如果状态码不为200，那就是有问题.
	if (response.statusCode !== 200) {
		// 401：登录信息超时
		if (response.statusCode === 401) {
			uni.showModal({
				title: response.data.msg,
				icon: 'none',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				},
				complete: () => {
					// 清除登录信息
					storage.clearStorage()
					store.commit("updateLoginStatus", false)
					store.commit('updateUserInfo', {})
					store.commit('updateToken', "")
				}
			})
		}
		return response
	} else { //莫得问题return这个请求的数据
		if (response.data.code != 1) {
			uni.showToast({
				title: response.data.msg,
				icon: 'none',
				duration: 3000
			});
		}
		// console.log(response.config.url.replace(/\/\d+$/, ""))
		// 判断是否需要保存token、userInfo信息
		let urlArr = [
			'/baseUrl/user/login',
			'/baseUrl/user/loginWithPhone',
			'/baseUrl/user/register',
			'/baseUrl/user/updateUserInfo'
		]
		if (urlArr.includes(response.config.url.replace(/\/\d+$/, "")) && response.data.code === 1) {
			storage.storeToken(response.data.token)
			storage.storeUserInfo(response.data.user)
			store.commit("updateLoginStatus", true)
			store.commit('updateUserInfo', response.data.user)
			store.commit('updateToken', response.data.token)
		}
		return response
	}

	// return response;
}

App.mpType = 'app'
const app = new Vue({
	router,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif