export default{
	storeToken(token) {
		uni.setStorage({
			key: 'myapp_token_ABC123XYZ_abc987xyz',
			data: token,
			success: function() {
				console.log('storeToken success!');
			},
			fail: (e) => {
				console.log(e)
			}
		});
	},
	getToken() {
		let token = ""
		uni.getStorage({
			key: 'myapp_token_ABC123XYZ_abc987xyz',
			success: function (res) {
				token = res.data
			},
			fail: (e) => {
				console.log(e)
			}
		});
		return token
	},
	storeUserInfo(userInfo) {
		uni.setStorage({
			key: 'user_info_ABC123XYZ_abc987xyz',
			data: JSON.stringify(userInfo),
			success: function() {
				console.log('storeUserInfo success!');
			},
			fail: (e) => {
				console.log(e)
			}
		});
	},
	getUserInfo() {
		let userInfo = {}
		uni.getStorage({
			key: 'user_info_ABC123XYZ_abc987xyz',
			success: function (res) {
				userInfo = JSON.parse(res.data)
			},
			fail: (e) => {
				console.log(e)
			}
		});
		return userInfo
	},
	clearStorage() {
		try {
			uni.clearStorageSync();
		} catch (e) {
			// error
			console.log(e)
		}
	}
} 
