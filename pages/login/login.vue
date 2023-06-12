<!-- 账号密码登录页 -->
<template>
	<view class="uni-content">
		<view class="login-logo">
			<image :src="logo"></image>
		</view>
		<!-- 顶部文字 -->
		<text class="title title-box">账号密码登录</text>
		<uni-forms>
			<uni-forms-item name="account">
				<uni-easyinput :focus="focusAccount" @blur="focusAccount = false" class="input-box"
					:inputBorder="false" v-model="account" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
					type="password" :inputBorder="false" v-model="password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<!-- 带选择框的隐私政策协议组件 -->
		<uni-id-pages-agreements scope="login" ref="agreements"></uni-id-pages-agreements>
		<button class="uni-btn" type="primary" @click="pwdLogin">登录</button>
		<!-- 忘记密码 -->
		<view class="link-box">
			<view v-if="!config.isAdmin">
				<text class="forget">忘记了？</text>
				<text class="link" @click="toRetrievePwd">找回密码</text>
			</view>
			<!-- <text class="link" @click="toRegister">{{config.isAdmin ? '注册管理员账号': '注册账号'}}</text> -->
			<text class="link" @click="toRegister" v-if="!config.isAdmin">注册账号</text>
		</view>
		<!-- 悬浮登录方式组件 -->
		<uni-id-pages-fab-login ref="uniFabLogin"></uni-id-pages-fab-login>
	</view>
</template>

<script>
	import uniForm from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'
	
	import mixin from '@/common/login-page.mixin.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				"password": "",
				"account": "",
				"focusAccount": false,
				"focusPassword": false,
				"logo": "/static/logo.png"
			}
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.pwdLogin()
				}
			};
			// #endif
		},
		methods: {
			// 页面跳转，找回密码
			toRetrievePwd() {

			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.account.length) {
					this.focusAccount = true
					return uni.showToast({
						title: '请输入账号',
						icon: 'none',
						duration: 3000
					});
				}
				if (!this.password.length) {
					this.focusPassword = true
					return uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 3000
					});
				}

				if (this.needAgreements && !this.agree) {
					return this.$refs.agreements.popup(this.pwdLogin)
				}
				
				uni.request({
					url: '/baseUrl/user/login',
					method: 'POST',
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					data: {
						account: this.account,
						password: this.password
					},
					success: (res) => {
						if (res.data.code === 1) {
							uni.showToast({
								title: "登录成功",
								icon: 'success',
								duration: 3000
							});
						} else {
							this.password = ""
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 3000
							});
						}
					},
					fail: (e) => {
						uni.showToast({
							title: e.message,
							icon: 'none'
						});
					}
				});
				
			},
			/* 前往注册 */
			toRegister() {
				uni.navigateTo({
					url: '/pages/register/register',
					fail(e) {
						console.error(e);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/login-page.scss";

	@media screen and (min-width: 690px) {
		.uni-content {
			height: 600px;
		}
	}

	.forget {
		font-size: 12px;
		color: #8a8f8b;
	}

	.link-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.link {
		font-size: 12px;
	}
</style>