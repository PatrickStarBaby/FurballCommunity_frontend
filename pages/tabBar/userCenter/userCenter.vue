<template>
	<view class="pd-20">
		<view class="relative flex flex-direction-column flex-ac">
			<image class="w100 h100 bd-rd50" :src="$store.state.isLogin?imgShowUrl:'../../../static/logo.png'"
				mode="aspectFill"></image>
			<view class="flex flex-direction-column flex-ac">
				<text class="ft-20 bold">{{$store.state.isLogin?userInfo.username:"请登录"}}</text>
				<text class="ft-18">{{$store.state.isLogin?userInfo.account:"未登录"}}</text>
				<text class="ft-14 color-999" @click="toUserInfoDetail">编辑资料></text>
			</view>
		</view>
		<view class="relative pd-lr20 bg-fff mg-tp10 bd-rd10" style="padding-top: 20px;padding-bottom: 20px;">
			<view class="flex flex-jsb">
				<view class="flex flex-direction-column flex-ac">
					<view class="">
						<image class="w40 h40" src="../../../static/icon/wallet.png" mode="aspectFill"></image>
					</view>
					<text class="ft-14 mg-tp5">我的钱包</text>
				</view>
				<view @click="toOrder" class="flex flex-direction-column flex-ac">
					<view class="">
						<image class="w40 h40" src="../../../static/icon/order.png" mode="aspectFill"></image>
					</view>
					<text class="ft-14 mg-tp5">我的订单</text>
				</view>
				<view v-if="$store.state.userInfo.authority == 0 || !$store.state.isLogin" @click="toAuthentication" class="flex flex-direction-column flex-ac">
					<view class="">
						<image class="w40 h40" src="../../../static/icon/authentication.png" mode="aspectFill"></image>
					</view>
					<text class="ft-14 mg-tp5">我要认证</text>
				</view>
				<view v-if="$store.state.userInfo.authority == 1" @click="toReceiveOrder" class="flex flex-direction-column flex-ac">
					<view class="">
						<image class="w40 h40" src="../../../static/icon/myorder.png" mode="aspectFill"></image>
					</view>
					<text class="ft-14 mg-tp5">收到的订单</text>
				</view>
			</view>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">我的猫咪</text>
		</view>
		<view class="relative pd-lr20 bg-fff mg-tp10 bd-rd10" style="padding-top: 20px;padding-bottom: 20px;">
			<view class="" style="overflow-x: scroll;overflow-y: hidden;">
				<view class="flex flex-direction-row">
					<view  v-for="(item, index) in petList" @click="toAddPet(0,index)" class="w70 h70 bd-rd50 mg-rt10"
						style="border: 1px solid #41B6A8;">
						<image class="w70 h70 bd-rd50" :src="item.showImgUrl" mode="aspectFill"></image>
					</view>
					<view @click="toAddPet(1,0)" class="w70 h70 bd-rd50 bg-eee flex flex-ac flex-jc flex-shrink-0">
						<uni-icons type="plusempty" color="#ffffff" size="32"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">照顾员信息</text>
		</view>
		<!-- 未认证 -->
		<view @click="toAuthentication" v-if="userInfo.authority == 0"
			class="width-full h150 bd-rd20 flex flex-jc relative" style="background-color: #E5F9EE;overflow: hidden;">
			<image class="w150 h150" src="/static/icon/carer.png" mode="aspectFill"></image>
			<view class="absolute left0 top0 w100 h30 flex flex-ac flex-jc"
				style="background-color: #CFE6E7;border-bottom-right-radius: 20px;">
				<text class="color-fff ft-14">未认证</text>
			</view>
			<view class="absolute bottom0 width-full h40 flex flex-jc flex-ac"
				style="background: rgba(140,140,140,0.5);">
				<text class="color-fff">成为猫咪照顾员</text>
			</view>
		</view>
		<!-- 已认证 -->
		<view v-if="userInfo.authority == 1" class="width-full h150 bd-rd20 flex flex-jc relative"
			style="background-color: #E5F9EE;overflow: hidden;">
			<image class="w150 h150" src="/static/icon/carer.png" mode="aspectFill"></image>
			<view class="absolute left0 top0 w100 h30 flex flex-ac flex-jc"
				style="background-color: #CFE6E7;border-bottom-right-radius: 20px;">
				<text class="color-fff ft-14">已认证</text>
			</view>
			<view class="absolute bottom0 width-full h40 flex flex-jc flex-ac"
				style="background: rgba(140,140,140,0.5);">
				<text class="color-fff">更新照顾员信息</text>
			</view>
		</view>
		<view class="mg-tp15 mg-bt10">
			<text class="ft-18 bold">我发布的社区资讯</text>
		</view>
		<view @click="toCommunityDetail(item)" v-for="item in userInfo.blogList"
			class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10" style="border-bottom: 1px solid #ddd;">
			<image class="h80 w80 bd-rd20 flex-shrink-0" :src="`/static/user_img/user_${item+7}.jpg`" mode="aspectFill">
			</image>
			<view class="flex flex-direction-column" style="width: 75%;">
				<view class="flex flex-direction-row flex-ac flex-jsb">
					<text class="block one-line-ellipsis" style="width: 70%;">第二届喵喵运动会开幕第二届喵喵运动会开幕</text>
					<text class="color-666 ft-14">2023/6/15</text>
				</view>
				<view style="width: 100%;margin-top: 6px;">
					<text class="mult_line-ellipsis-2 block ft-14 color-999 text-indent"
						style="width: 100%;">第二届运动会马上开幕，超多活动等你来参加，喵主带喵参加更是能获得超多奖品，参与就有奖，尽情期待！！更多活动好礼请关注官方通知，后续将会举办更多精彩活动！！</text>
				</view>
			</view>
		</view>
		<view v-if="userInfo.blogList.length == 0" class="flex flex-ac flex-jc mg-tp20 pd-bt20">
			<view class="flex flex-direction-column flex-ac">
				<image class="w100 h100" src="/static/icon/empty.png" mode="aspectFill"></image>
				<text v-if="!$store.state.isLogin" class="color-aaa">请先登录</text>
				<text v-else class="color-aaa">还未发布资讯</text>
			</view>
		</view>
		<view v-if="$store.state.isLogin" class="mg-tp20">
			<button @click="toLogOut" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">退 出 登 录</button>
		</view>
	</view>
</template>

<script>
	import router from '@/router/index.js'
	import store from '@/store/index.js'
	import storage from '@/utils/storage.js'
	import http from '@/utils/http/'
	import {
		BASEIMGURL
	} from '@/utils/env.js'
	export default {
		data() {
			return {
				imgShowUrl: '',
				userInfo: {
					user_id: '',
					account: '',
					password: '',
					avatar: '',
					pets: [],
					phone: '',
					username: '',
					authority: 0,
					gender: 0,
					blogList: []
				},
				petList:[],
			}
		},
		onShow() {
			if (!this.$store.state.isLogin) {
				this.init();
			} else {
				this.getUserInfo(); //获取用户信息
				this.getPetList()
			}
		},
		methods: {
			init() {
				this.userInfo = {
					user_id: '',
					account: '',
					password: '',
					avatar: '',
					pets: [],
					phone: '',
					username: '',
					authority: 0,
					gender: 0,
					blogList: []
				}
			},
			getPetList() {
				http.get(`/pet/getPetList/${this.$store.state.userInfo.user_id}`).then(res => {
					if (res.data.code === 1) {
						for(let item of res.data.pet_list){
							item['showImgUrl'] = BASEIMGURL + item.avatar
						}
						this.petList = res.data.pet_list
					}
				})
			},
			getUserInfo() {
				this.userInfo = this.$store.state.userInfo
				this.imgShowUrl = BASEIMGURL + this.userInfo.avatar
				console.log(this.imgShowUrl)
				if (!this.userInfo.avatar) {
					this.userInfo.avatar = '../../../static/logo.png'
				}
				if (!this.userInfo.pets) {
					this.userInfo.pets = []
				}
				if (!this.userInfo.blogList) {
					this.userInfo.blogList = []
				}
			},
			toAddPet(flag, index) {
				if (flag == 0) {
					let data = {
						age: this.petList[index].age,
						avatar: this.petList[index].avatar,
						breed: this.petList[index].breed,
						gender: this.petList[index].gender,
						health: this.petList[index].health,
						pet_id: this.petList[index].pet_id,
						pet_name: this.petList[index].pet_name,
						sterilization: this.petList[index].sterilization,
						user_id: this.petList[index].user_id,
						weight: this.petList[index].weight
					}
					router.navigateTo({
						url: '/pages/addPet/addPet?pet_info=' + encodeURIComponent(JSON.stringify(data)),
					})
				} else {
					router.navigateTo('/pages/addPet/addPet')
				}
			
			},
			toUserInfoDetail() {
				router.navigateTo({
					url: '/pages/userInfoDetail/userInfoDetail',
				})
			},
			toOrder() {
				router.navigateTo({
					url: '/pages/order/order',
				})
			},
			toReceiveOrder(){
				router.navigateTo({
					url: '/pages/receiveOrder/receiveOrder',
				})
			},
			toAuthentication() {
				// 需要判断是否已经通过认证
				router.navigateTo({
					url: '/pages/authentication/authentication',
				})
			},
			toCommunityDetail(id) {
				router.navigateTo({
					url: '/pages/communityDetail/communityDetail?blog_id=' + id,
				})
			},
			toLogOut(){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success: function (res) {
						if (res.confirm) {
							// 清除登录信息
							storage.clearStorage()
							store.commit("updateLoginStatus", false)
							store.commit('updateUserInfo', {})
							store.commit('updateToken', "")
							router.navigateTo('/pages/login/login')
						} else if (res.cancel) {
						}
					}
				});
			},
		}
	}
</script>

<style>

</style>