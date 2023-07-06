<template>
	<view>
		<view class="width-full flex flex-jc" style="background-color: #F8F8F8;">
			<view class="h80 bd-rd20 color-fff flex flex-ac" style="width: 90%;background-color: #66C7FA;">
				<uni-icons class="mg-lt20" type="wallet" color="#fff" size="30"></uni-icons>
				<text v-if="order_info.status == -1" class="ft-20">已取消</text>
				<text v-if="order_info.status == 0" class="ft-20">待付款</text>
				<text v-if="order_info.status == 1" class="ft-20">进行中</text>
				<text v-if="order_info.status == 2" class="ft-20">待评价</text>
				<text v-if="order_info.status == 3" class="ft-20">已完成</text>
			</view>
		</view>
		<view class="h40 width-full relative" style="background-color: #F8F8F8;">
		</view>
		<view class="relative pd-lr20"
			style="margin-top: -30px; border-top-right-radius: 35px;border-top-left-radius: 35px;padding-top: 10px;padding-bottom: 20px;background-color: #F8FCFC;">
			<view class="flex flex-ac flex-jsb">
				<view class="flex flex-ac">
					<view class="">
						<image class="bd-rd50 w60 h60" :src="carerInfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="flex flex-direction-column mg-lt15">
						<text class="ft-16">{{carerInfo.username}}</text>
						<text class="color-999 ft-14 mg-tp10">{{order_info.announce_time}}</text>
					</view>
				</view>
				<view class="flex flex-ac" style="color: #66C7FA;">
					<text class="ft-14" style="white-space: nowrap;">总计：￥</text>
					<text class="ft-18">{{order_info.price}}</text>
				</view>
			</view>
			<view class="bg-fff bd-rd20 pd-tp10 pd-bt20">
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999">服务宠物：</text>
						<text>{{order_info.Pet.pet_name}}</text>
					</view>
				</view>
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999">联系人：</text>
						<text>{{$store.state.userInfo.username}}</text>
					</view>
				</view>
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999">联系电话：</text>
						<text>{{order_info.phone}}</text>
					</view>
				</view>
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999">开始时间：</text>
						<text>{{order_info.start_time}}</text>
					</view>
				</view>
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999">结束时间：</text>
						<text>{{order_info.end_time}}</text>
					</view>
				</view>
				<view class="pd-tb10 bd-bt-eee">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999" style="white-space: nowrap;">服务地址：</text>
						<text>{{order_info.place}}</text>
					</view>
				</view>
				<view class="pd-tb10">
					<view class="pd-lr10 flex flex-jsb">
						<text class="color-999" style="white-space: nowrap;">备注信息：</text>
						<text>{{order_info.remark}}</text>
					</view>
				</view>
			</view>
			<view class="flex mg-tp20 width-full"
				:class="[order_info.status == 2 || order_info.status == -1?'flex-jc':'flex-jsb']">
				<button v-if="order_info.status == 0"
					class="w110 ft-14 pd-lr10 bd-rd20 color-999 bd-999 bg-fff">取消订单</button>
				<button v-if="!isReceiverflag" class="w110 ft-14 pd-lr10 bd-rd20 color-fff bg-66C7FA">联系喂养员</button>
				<button v-if="isReceiverflag" class="w110 ft-14 pd-lr10 bd-rd20 color-fff bg-66C7FA">联系寄养员</button>
				<button @click="show_pay = true" v-if="order_info.status == 0 && !isReceiverflag"
					class="w110 ft-14 pd-lr10 bd-rd20 bd-66C7FA color-66C7FA bg-fff">立即支付</button>
				<button @click="toPunch" v-if="order_info.status == 1"
					class="w110 ft-14 pd-lr10 bd-rd20 bd-66C7FA color-66C7FA bg-fff">打卡信息</button>
				<button @click="toComment" v-if="order_info.status == 2 && !isReceiverflag"
					class="w110 ft-14 pd-lr10 bd-rd20 bd-66C7FA color-66C7FA bg-fff">立即评价</button>
				<button @click="getComment" v-if="order_info.status == 3 && isReceiverflag"
					class="w110 ft-14 pd-lr10 bd-rd20 bd-66C7FA color-66C7FA bg-fff">查看用户评价</button>
			</view>
		</view>
		<key-words :mix="true" :show_key="show_pay" :price="order_info.price+''" @closeFuc="closeFuc"
			@getPassword="getPassword"></key-words>
	</view>
</template>

<script>
	import http from '@/utils/http/'
	import {
		BASEIMGURL
	} from '@/utils/env.js'
	import {
		convertDateTimeStringToDate
	} from '@/utils/utils.js'
	import router from '../../router'
	export default {
		data() {
			return {
				order_info: {},
				carerInfo: {},
				show_pay: false, //是否弹出支付窗口
				isReceiverflag: false, //订单是否是照顾员视角
			}
		},
		onLoad(e) {
			this.order_info = JSON.parse(decodeURIComponent(e.order_info))
			this.order_info.announce_time = convertDateTimeStringToDate(this.order_info.announce_time)
			this.isReceiverflag = e.isReceiverflag ? e.isReceiverflag : false
		},
		onShow() {
			this.getCarerInfo()
		},
		methods: {
			getCarerInfo() {
				http.get(`/user/getUserInfoById/${this.order_info.receiver_id}`).then(res => {
					if (res.data.code === 1) {
						this.carerInfo = res.data.user
						this.carerInfo.avatar = BASEIMGURL + this.carerInfo.avatar
					}
				})
			},
			closeFuc() {
				this.show_pay = false;
			},
			getPassword(e) {
				let that = this
				uni.showLoading()
				setTimeout(() => {
					uni.showToast({
						title: "支付成功",
						icon: 'success',
					});
					that.closeFuc()
					uni.hideLoading().then(() => {
						http.put(`/order/updateOrderInfo/${that.order_info.order_id}`, {
							status: 1
						}).then(res => {
							if (res.data.code === 1) {
								that.order_info = res.data.data
							}
						})
					})
				}, 2000)
			},
			toPunch() {
				if (this.isReceiverflag) {
					router.navigateTo({
						url: '/pages/receivePunch/receivePunch?order_info=' + encodeURIComponent(JSON.stringify(
							this.order_info)),
					})
				} else {
					router.navigateTo({
						url: '/pages/punch/punch?order_info=' + encodeURIComponent(JSON.stringify(this
							.order_info)),
					})
				}
			},
			getComment() {
				http.get(`/orderCmt/getOrderCmtList/${this.order_info.order_id}`).then(res => {
					if (res.data.code === 1) {
						uni.showModal({
							title: '用户评价',
							content: res.data.orderCmt_list[0].content,
							showCancel: false
						});
					}
				})
			},
			toComment() {
				let that = this
				uni.showModal({
					title: '订单评价',
					editable: true,
					placeholderText: '请输入评价',
					success: function(res) {
						if (res.confirm) {
							if (!res.content) {
								uni.showToast({
									title: "请输入内容",
								});
								return
							}
							http.post('/orderCmt/create', {
								order_id: that.order_info.order_id,
								user_id: that.$store.state.userInfo.user_id,
								content: res.content,
								is_root: true
							}).then(res => {
								if (res.data.code === 1) {
									http.put(`/order/updateOrderInfo/${that.order_info.order_id}`, {
										status: 3
									}).then(res => {
										if (res.data.code === 1) {
											router.navigateTo({
												url: '/pages/orderDetail/orderDetail?order_info=' +
													encodeURIComponent(JSON.stringify(
														res.data.data)),
											})
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F8FCFC
	}
</style>