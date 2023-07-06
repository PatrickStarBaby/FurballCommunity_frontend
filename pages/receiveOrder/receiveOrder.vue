<template>
	<view>
		<view class="h30 width-full relative" style="background-color: #F8F8F8;">
		</view>
		<view class="relative pd-lr20"
			style="margin-top: -30px; border-top-right-radius: 35px;border-top-left-radius: 35px;padding-top: 10px;padding-bottom: 20px;background-color: #F8FCFC;">
			<view class="flex flex-jsb width-full" style="padding-bottom: 8px;border-bottom: 1px solid #ccc;">
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(0)"
					:class="[tab_index==0?'tab_active':'']">
					<text class="ft-16">全部</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(1)"
					:class="[tab_index==1?'tab_active':'']">
					<text class="ft-16">待付款</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(2)"
					:class="[tab_index==2?'tab_active':'']">
					<text class="ft-16">进行中</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(3)"
					:class="[tab_index==3?'tab_active':'']">
					<text class="ft-16">待评价</text>
				</view>
			</view>
			<!-- 全部 -->
			<view class="">
				<view v-if="orderStatusList.length == 0" class="flex flex-ac flex-jc mg-tp100">
					<view class="flex flex-direction-column flex-ac">
						<image class="w100 h100" src="../../static/icon/empty.png" mode="aspectFill"></image>
						<text class="color-aaa">订单为空</text>
					</view>
				</view>
				<view v-for="(item,index) in orderStatusList" @click="toOrderDetail(index)"
					class="bg-fff pd-lr10 flex flex-direction-column flex-ac bd-rd20 mg-tp15"
					style="padding-bottom: 15px;">
					<view class="flex flex-jsb flex-ac width-full pd-tb10" style="border-bottom: 1px solid #eee;">
						<text class="ft-14 color-999">订单编号：NO124545451{{item.order_id}}</text>
						<view v-if="item.status == -1" class="pd-5 bd-rd5 flex flex-jc flex-ac"
							style="background-color: #ccc;">
							<text class="ft-12" style="color: #fff;">已取消</text>
						</view>
						<view v-if="item.status == 0" class="pd-5 bd-rd5 flex flex-jc flex-ac"
							style="background-color: bisque;">
							<text class="ft-12" style="color: coral;">待付款</text>
						</view>
						<view v-if="item.status == 1" class="pd-5 bd-rd5 flex flex-jc flex-ac"
							style="background-color: limegreen">
							<text class="ft-12" style="color: #fff;">进行中</text>
						</view>
						<view v-if="item.status == 2" class="pd-5 bd-rd5 flex flex-jc flex-ac"
							style="background-color: cornflowerblue;">
							<text class="ft-12 color-fff">待评价</text>
						</view>
						<view v-if="item.status == 3" class="pd-5 bd-rd5 flex flex-jc flex-ac"
							style="background-color: green;">
							<text class="ft-12 color-fff">已完成</text>
						</view>
					</view>
					<view class="mg-tp10 width-full">
						<view class="flex flex-ac width-full flex-js">
							<uni-icons type="calendar" size="24" color="#999"></uni-icons>
							<text class="ft-14 color-999 mg-lt5">服务时间：</text>
							<text class="ft-14 mg-lt5">{{item.start_time}} ~ {{item.end_time}}</text>
						</view>
						<view class="flex flex-ac width-full flex-js mg-tp5">
							<uni-icons type="location" size="24" color="#999"></uni-icons>
							<text class="ft-14 color-999 mg-lt5" style="white-space: nowrap;">服务地址：</text>
							<text class="ft-14 mg-lt5">{{item.place}}</text>
						</view>
						<view class="flex flex-ac width-full flex-js mg-tp5">
							<view class="">
								<image style="width: 24px;height: 24px;" src="../../static/icon/catclaw.png"
									mode="aspectFill"></image>
							</view>
							<text class="ft-14 color-999 mg-lt5" style="white-space: nowrap;">服务宠物：</text>
							<text class="ft-14 mg-lt5">{{item.Pet.pet_name}}</text>
						</view>
						<view class="flex flex-ac width-full flex-jsb mg-tp5">
							<text class="ft-20 color-1ccfcf">￥{{item.price}}</text>
							<view class="flex">
								<button @click.stop="cancel(item)" v-if="item.status == 0" style="white-space: nowrap;"
									class="mg-lt20 ft-14 pd-lr10 bd-rd20 color-999 bd-999 bg-fff">取消订单</button>
								<button style="white-space: nowrap;"
									class="mg-lt10 ft-14 pd-lr10 bd-rd20 color-fff bg-1ccfcf">联系寄养员</button>
								<button @click.stop="toPunch(item)" v-if="item.status == 1" style="white-space: nowrap;"
									class="mg-lt10 ft-14 pd-lr10 bd-rd20 bd-1ccfcf color-1ccfcf bg-fff">打卡信息</button>
								<button @click.stop="toFinish(item)" v-if="item.status == 1"
									style="white-space: nowrap;"
									class="mg-lt10 ft-14 pd-lr10 bd-rd20 bd-66C7FA color-66C7FA bg-fff">完成订单</button>
								<button @click.stop="toComment(item)" v-if="item.status == 3"
									style="white-space: nowrap;"
									class="mg-lt10 ft-14 pd-lr10 bd-rd20 bd-1ccfcf color-1ccfcf bg-fff">查看用户评价</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import router from '@/router/index.js'
	import http from '@/utils/http/'
	import {
		convertDateTimeStringToDate
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				tab_index: 0,
				orderList: [],
				orderStatusList: [],
			}
		},
		onShow() {
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				http.get(`/order/getOrderOfReceiver/${this.$store.state.userInfo.user_id}`).then(res => {
					if (res.data.code === 1) {
						this.orderList = res.data.order?res.data.order:[]
						this.orderList.forEach(item => {
							item.announce_time = convertDateTimeStringToDate(item.announce_time)
						})
						this.changeList()
					}
				})
			},
			changeTab(index) {
				this.tab_index = index
				this.changeList()
			},
			changeList() {
				if (this.tab_index != 0) {
					this.orderStatusList = this.orderList.filter((item) => item.status == this.tab_index - 1)
				} else {
					this.orderStatusList = this.orderList
				}
			},
			toOrderDetail(index) {
				router.navigateTo({
					url: '/pages/orderDetail/orderDetail?order_info=' + encodeURIComponent(JSON.stringify(this
						.orderStatusList[index])) + '&isReceiverflag=true',
				})
			},
			closeFuc() {
				this.show_pay = false;
			},

			toPunch(item) {
				router.navigateTo({
					url: '/pages/receivePunch/receivePunch?order_info=' + encodeURIComponent(JSON.stringify(item)),
				})
			},
			cancel(item){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定取消订单吗？',
					success: function(res) {
						if (res.confirm) {
							http.put(`/order/updateOrderInfo/${item.order_id}`, {
								status: -1
							}).then(res => {
								if (res.data.code === 1) {
									router.navigateTo({
										url: '/pages/orderDetail/orderDetail?order_info=' +
											encodeURIComponent(JSON.stringify(
												res.data.data)) + '&isReceiverflag=true',
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toFinish(item){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定已完成该订单吗？',
					success: function(res) {
						if (res.confirm) {
							http.put(`/order/updateOrderInfo/${item.order_id}`, {
								status: 2
							}).then(res => {
								if (res.data.code === 1) {
									router.navigateTo({
										url: '/pages/orderDetail/orderDetail?order_info=' +
											encodeURIComponent(JSON.stringify(
												res.data.data)) + '&isReceiverflag=true',
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toComment(item) {
				http.get(`/orderCmt/getOrderCmtList/${item.order_id}`).then(res => {
					if (res.data.code === 1) {
						uni.showModal({
							title: '用户评价',
							content: res.data.orderCmt_list[0].content,
							showCancel: false
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab_active {
		background-color: #20232C;
		color: #fff;
		border-radius: 8px;
	}

	page {
		background-color: #F8FCFC
	}
</style>