<script>
	import store from '@/store/index.js'
	import storage from '@/utils/storage.js'
	export default {
		// 刷新页面登录状态
		onLaunch: function() {
			store.commit('updateUserInfo', storage.getUserInfo())
			store.commit('updateToken', storage.getToken())
			// 更新登录状态
			if(storage.getToken()){
				store.commit("updateLoginStatus", true)
			}else{
				store.commit("updateLoginStatus", false)
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/static/css/base.css";
</style>
