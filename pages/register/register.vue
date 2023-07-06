<!-- 账号注册页 -->
<template>
	<view class="uni-content">
		<view :min-width="690">
			<view class="login-logo">
				<image :src="logo"></image>
			</view>
			<!-- 顶部文字 -->
			<text class="title title-box">账号密码注册</text>
		</view>
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="account" required>
				<uni-easyinput :inputBorder="false" :focus="focusAccount" @blur="focusAccount = false" class="input-box"
					placeholder="请输入账号" v-model="formData.account" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="username">
				<uni-easyinput :inputBorder="false" :focus="focusUsername" @blur="focusUsername = false"
					class="input-box" placeholder="请输入用户名(不填写默认为账号)" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword" @blur="focusPassword = false"
					class="input-box" maxlength="20"
					:placeholder="'请输入' + (config.passwordStrength == 'weak'?'6':'8') + '-16位密码'" type="password"
					v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password2" v-model="formData.password2" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword2" @blur="focusPassword2 =false"
					class="input-box" placeholder="再次输入密码" maxlength="20" type="password" v-model="formData.password2"
					trim="both" />
			</uni-forms-item>
			<uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements>
			<button class="uni-btn" type="primary" @click="submit">注册</button>
			<match-media :min-width="690">
				<view class="link-box">
					<text class="link" @click="toLogin">已有账号？点此登录</text>
				</view>
			</match-media>
		</uni-forms>
	</view>
</template>

<script>
	import uniForm from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue'

	import rules from './validator.js';
	import mixin from '@/common/login-page.mixin.js';
	import config from '@/common/config.js'
	import http from '@/utils/http/'
	import {
		store,
		mutations
	} from '@/common/store.js'

	export default {
		mixins: [mixin],
		data() {
			return {
				formData: {
					account: "",
					username: "",
					password: "",
					password2: "",
				},
				rules,
				focusAccount: false,
				focusUsername: false,
				focusPassword: false,
				focusPassword2: false,
				logo: "/static/logo.png"
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
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
			/**
			 * 触发表单提交
			 */
			submit() {
				this.$refs.form.validate().then((res) => {
					if (this.needAgreements && !this.agree) {
						return this.$refs.agreements.popup(() => {
							this.submitForm(res)
						})
					}
					this.submitForm(res)
				}).catch((errors) => {
					let key = errors[0].key
					key = key.replace(key[0], key[0].toUpperCase())
					this['focus' + key] = true
				})
			},
			submitForm(params) {
				http.post('/user/register', {
					account: params.account,
					username: !params.username.length ? params.account : params.username,
					password: params.password
				}).then(res => {
					if (res.data.code === 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 3000
						});
					} else {
						this.password = ""
					}
				}).catch(res => {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/login-page.scss";

	@media screen and (max-width: 690px) {
		.uni-content {
			margin-top: 15px;
			height: 100%;
			background-color: #fff;
		}
	}

	@media screen and (min-width: 690px) {
		.uni-content {
			padding: 30px 40px 60px;
			max-height: 530px;
		}

		.link-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			margin-top: 10px;
		}

		.link {
			font-size: 12px;
		}
	}

	.uni-content ::v-deep .uni-forms-item__label {
		position: absolute;
		left: -15px;
	}

	button {
		margin-top: 15px;
	}
</style>