import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import http from '@/utils/http/'
import storage from '@/utils/storage.js'
Vue.config.productionTip = false

//设置baseUrl
// http.config.baseUrl = "http://localhost:8080/v1"
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
				}
			})
		}
		return response
	} else { //莫得问题return这个请求的数据
		if(response.data.code != 1){
			uni.showToast({
				title: response.data.msg,
				icon: 'none',
				duration: 3000
			});
		}
		// 判断是否需要保存token、userInfo信息
		let urlArr = [
			'/baseUrl/user/login',
			'/baseUrl/user/loginWithPhone',
			'/baseUrl/user/register'
		]
		if(urlArr.includes(response.config.url) && response.data.code === 1){
			storage.storeToken(response.data.token)
			storage.storeUserInfo(response.data.user)
		}
		return response
	}

	// return response;
}

App.mpType = 'app'
const app = new Vue({
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