<!-- 短信验证码登录页 -->
<template>
	<view class="uni-content">
		<view class="login-logo">
			<image :src="logo"></image>
		</view>
		<!-- 顶部文字 -->
		<text class="title">请输入验证码</text>
		<text class="tip">先输入图形验证码，再获取短信验证码</text>
		<uni-forms>
			<uni-id-pages-sms-form focusCaptchaInput v-model="code" type="login-by-sms" ref="smsCode" :phone="phone">
			</uni-id-pages-sms-form>
			<button class="uni-btn send-btn" type="primary" @click="submit">登录</button>
		</uni-forms>
		<!-- <uni-popup-captcha @confirm="submit" v-model="captcha" scene="login-by-sms" ref="popup"></uni-popup-captcha> -->
	</view>
</template>
<script>
	import mixin from '@/common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				"code": "",
				"phone": "",
				"captcha": "",
				"logo": "/static/logo.png"
			}
		},
		computed: {

		},
		onLoad({
			phoneNumber
		}) {
			this.phone = phoneNumber;
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.submit()
				}
			};
			// #endif
		},
		methods: {
			submit() { //完成并提交
				if (this.code.length != 6) {
					this.$refs.smsCode.focusSmsCodeInput = true
					return uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 3000
					});
				}
				uni.request({
					url: '/baseUrl/user/loginWithPhone',
					method: 'POST',
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					data: {
						"phone": this.phone,
						"code": this.code,
					},
					success: (res) => {
						if (res.data.code === 1) {
							uni.showToast({
								title: "登录成功",
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					},
					fail: (e) => {
						uni.showToast({
							title: e.message,
							icon: 'none'
						});
					},
					complete: (e) => {
						this.captcha = ''
					}
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "@/common/login-page.scss";

	.tip {
		margin-top: -15px;
		margin-bottom: 15px;
	}

	.captcha-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
	}

	.captcha-img-box,
	.captcha-img,
	.loding {
		height: 44px !important;
		width: 100px;
	}

	.captcha-img-box {
		position: relative;
		background-color: #FEFAE7;
	}

	.captcha-img-box,
	.captcha {
		height: 44px;
		line-height: 44px;
	}
	.captcha{
	    background-color: #F8F8F8;
	    font-size: 14px;
	    flex: 1;
	    padding: 0 9px;
	    margin-left: 9px;
	    box-sizing: border-box;
	}

	.popup-captcha {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 20rpx;
		background-color: #FFF;
		border-radius: 2px;
		flex-direction: column;
		position: relative;
	}

	.popup-captcha .title {
		font-weight: normal;
		padding: 0;
		padding-bottom: 15px;
		color: #666;
	}

	.popup-captcha .close {
		position: absolute;
		bottom: -40px;
		margin-left: -13px;
		left: 50%;
	}

	.popup-captcha .uni-btn {
		margin: 0;
	}
</style>