// 使用 npm
// import Router from 'uni-router-interceptor'

import Router from '@/utils/router-sdk/index.js'
import store from '@/store/index.js'
import storage from '@/utils/storage.js'

const router = new Router({
	homePage: '/pages/index/index'
})

router.beforeEach((to, from, next) => {
	console.log('路由beforeEach拦截', to, from)
	store.commit('updateUserInfo', storage.getUserInfo())
	store.commit('updateToken', storage.getToken())
	// 更新登录状态
	if(storage.getToken()){
		store.commit("updateLoginStatus", true)
	}else{
		store.commit("updateLoginStatus", false)
	}
	// 路由拦截
	if (to.path === '/login') {
		next()
	} else {
		//如果没有token且访问路径为userinfo，则跳转到登录页
		if (!storage.getToken() && to.path === '/userinfo') {
			next(`/login?redirect=${to.path}`)
		} else {
			next()
		}
	}
	// next()
})

router.afterEach((to, from) => {
	console.log('路由afterEach拦截')
})

router.error(() => {
	console.log('路由错误')
})

export default router