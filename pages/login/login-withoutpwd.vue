<!-- 免密登录页 -->
<template>
	<view class="uni-content">
		<view class="login-logo">
			<image :src="logo"></image>
		</view>
		<!-- 顶部文字 -->
		<text class="title">请选择登录方式</text>
		<template>
			<text class="tip">未注册的账号验证通过后将自动注册</text>
			<view class="phone-box">
				<view @click="chooseArea" class="area">+86</view>
				<uni-easyinput :focus="focusPhone" @blur="focusPhone = false" class="input-box" type="number"
					:inputBorder="false" v-model="phone" maxlength="11" placeholder="请输入手机号" />
			</view>
			<uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements>
			<button class="uni-btn" type="primary" @click="toSmsPage">获取验证码</button>
		</template>
		<!-- 固定定位的快捷登录按钮 -->
		<uni-id-pages-fab-login ref="uniFabLogin"></uni-id-pages-fab-login>
	</view>
</template>

<script>
	let currentWebview; //当前窗口对象
	import config from '@/common/config.js'
	import mixin from '@/common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				type: "", //快捷登录方式
				phone: "", //手机号码
				focusPhone: false,
				logo: "/static/logo.png"
			}
		},
		computed: {
			async loginTypes() { //读取配置的登录优先级
				return config.loginTypes
			},
			isPhone() { //手机号码校验正则
				return /^1\d{10}$/.test(this.phone);
			}
		},
		async onLoad(e) {
			//获取通过url传递的参数type设置当前登录方式，如果没传递直接默认以配置的登录
			let type = e.type || config.loginTypes[0]
			this.type = type

			// console.log("this.type: -----------",this.type);
			if (type != 'univerify') {
				this.focusPhone = true
			}
			this.$nextTick(() => {
				//关闭重复显示的登录快捷方式
				if (['weixin', 'apple'].includes(type)) {
					this.$refs.uniFabLogin.servicesList = this.$refs.uniFabLogin.servicesList.filter(item =>
						item.id != type)
				}
			})
			uni.$on('uni-id-pages-setLoginType', type => {
				this.type = type
			})
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.toSmsPage()
				}
			};
			// #endif
		},
		onUnload() {
			uni.$off('uni-id-pages-setLoginType')
		},
		onReady() {
			// 是否优先启动一键登录。即：页面一加载就启动一键登录
			//#ifdef APP-PLUS
			if (this.type == "univerify") {
				const pages = getCurrentPages();
				currentWebview = pages[pages.length - 1].$getAppWebview();
				currentWebview.setStyle({
					"top": "2000px" // 隐藏当前页面窗体
				})
				this.type == this.loginTypes[1]
				// console.log('开始一键登录');
				this.$refs.uniFabLogin.login_before('univerify')
			}
			//#endif
		},
		methods: {
			showCurrentWebview(){
				// 恢复当前页面窗体的显示 一键登录，默认不显示当前窗口
				currentWebview.setStyle({
					"top": 0
				})
			},
			
			toSmsPage() {
				if (!this.isPhone) {
					this.focusPhone = true
					return uni.showToast({
						title: "手机号码格式不正确",
						icon: 'none',
						duration: 3000
					});
				}
				if (this.needAgreements && !this.agree) {
					return this.$refs.agreements.popup(this.toSmsPage)
				}
				// 发送验证码
				uni.navigateTo({
					url: '/pages/login/login-smscode?phoneNumber=' + this.phone
				});
			},
			//去密码登录页
			toPwdLogin() {
				uni.navigateTo({
					url: '../login/password'
				})
			},
			chooseArea() {
				uni.showToast({
					title: '暂不支持其他国家',
					icon: 'none',
					duration: 3000
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/login-page.scss";

	@media screen and (min-width: 690px) {
		.uni-content {
			height: 350px;
		}
	}

	.uni-content,
	.quickLogin {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
	}

	.phone-box {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
	}

	.area {
		position: absolute;
		left: 10px;
		z-index: 9;
		top: 12px;
		font-size: 14px;
	}

	.area::after {
		content: "";
		border: 3px solid transparent;
		border-top-color: #000;
		top: 12px;
		left: 3px;
		position: relative;
	}

	/* #ifdef MP */
	// 解决小程序端开启虚拟节点virtualHost引起的 class = input-box丢失的问题 [详情参考](https://uniapp.dcloud.net.cn/matter.html#%E5%90%84%E5%AE%B6%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%E4%B8%8D%E5%90%8C-%E5%8F%AF%E8%83%BD%E5%AD%98%E5%9C%A8%E7%9A%84%E5%B9%B3%E5%8F%B0%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98)
	.phone-box ::v-deep .uni-easyinput__content,
	/* #endif */
	.input-box {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		padding-left: 45px;
		margin-bottom: 10px;
		border-radius: 0;
	}

	.tip {
		margin-top: -15px;
		margin-bottom: 20px;
	}
</style>
