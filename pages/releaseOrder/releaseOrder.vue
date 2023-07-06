<!-- 发布订单 -->
<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<!-- 选择猫咪 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">选择猫咪</text>
		</view>
		<picker @change="bindPetChange" :value="petIndex" :range="petArray">
			<view class="uni-input">{{petArray[petIndex]}}</view>
		</picker>

		<!-- 选择开始时间 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">选择开始时间</text>
		</view>
		<picker mode="date" :value="startDate" :start="startDateRange" :end="endDateRange"
			@change="bindStartDateChange">
			<view class="uni-input">{{startDate}}</view>
		</picker>

		<!-- 选择结束时间 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">选择结束时间</text>
		</view>
		<picker mode="date" :value="endDate" :start="startDateRange" :end="endDateRange" @change="bindEndDateChange">
			<view class="uni-input">{{endDate}}</view>
		</picker>
		<!-- 交接地址 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">交接地址</text>
		</view>
		<input v-model="place" placeholder-class="color-ccc" class="bg-fff h40 pd-lr10 ft-18 bd-rd10"
			placeholder="请输入宠物交接地址" style="width: 310px;" />
		<!-- 联系电话 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">联系电话</text>
		</view>
		<input v-model="phone" placeholder-class="color-ccc" class="bg-fff h40 pd-lr10 ft-18 bd-rd10"
			placeholder="请输入联系电话" style="width: 310px;" />
		<!-- 订单备注 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">订单备注</text>
		</view>
		<view class="width-full">
			<textarea v-model="remark" placeholder-class="color-ccc" auto-focus class="bg-fff pd-5 ft-18 bd-rd10"
				placeholder="请输入订单备注"></textarea>
		</view>
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button @click="commit" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">提 交 订 单 </button>
		</view>
	</view>
</template>

<script>
	import http from '@/utils/http/'
	import router from '@/router/index.js'
	import storage from '@/utils/storage.js'
	import {
		calculateDaysDifference,
		punch,
		createPunchList,
		imgPunch
	} from '@/utils/utils.js'

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			year = year + 10;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				carer_id: 0,
				petList: [],
				petArray: [],
				petIndex: 0,
				remark: '', //订单备注
				place: '', //交接地点
				phone: '',
				startDate: getDate({
					format: true
				}),
				endDate: getDate({
					format: true
				}),
				startDateRange: getDate('start'),
				endDateRange: getDate('end'),
			}
		},
		onLoad(e) {
			this.carer_id = parseInt(e.carer_id)
		},
		onShow() {
			this.getPetList()
		},
		methods: {
			getPetList() {
				http.get(`/pet/getPetList/${this.$store.state.userInfo.user_id}`).then(res => {
					if (res.data.code === 1) {
						this.petList = res.data.pet_list
						this.petList.forEach((item, index) => {
							this.petArray.push(item.pet_id + '-' + item.pet_name)
						})
					}
				})
			},
			commit() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定提交吗？',
					success: function(res) {
						if (res.confirm) {
							http.post('/order/create', {
								pet_id: that.petList[that.petIndex].pet_id,
								announcer_id: that.$store.state.userInfo.user_id,
								receiver_id: that.carer_id,
								start_time: that.startDate,
								end_time: that.endDate,
								place: that.place,
								phone: that.phone,
								pet_health: that.petList[that.petIndex].health,
								status: 0,
								remark: that.remark,
								price: 60 * calculateDaysDifference(that.startDate, that.endDate),
								check_in_status: createPunchList(that.startDate, that.endDate),
								check_in_pictures: createPunchList(that.startDate, that.endDate)
							}).then(res => {
								if (res.data.code === 1) {
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
									}).then(() => {
										router.navigateTo({
											url: '/pages/orderDetail/orderDetail?order_info=' +
												encodeURIComponent(JSON.stringify(res
													.data.order_info)),
										})
									})

								}
							}).catch(res => {
								console.log(res)
							})
						} else if (res.cancel) {}
					}
				});
			},
			bindPetChange(e) {
				this.petIndex = e.detail.value
				console.log(this.petList[this.petIndex])
			},
			bindStartDateChange(e) {
				this.startDate = e.detail.value
				console.log(this.startDate)
			},
			bindEndDateChange(e) {
				this.endDate = e.detail.value
				/* console.log(calculateDaysDifference(this.startDate, this.endDate))
				console.log(createPunchList(this.startDate, this.endDate))
				console.log(punch("0,0,0,0", this.startDate, this.endDate, getDate({
					format: true
				})))
				console.log(imgPunch("0,0,0,0", "/static/img/user_1.jpg", this.startDate, this.endDate, getDate({
					format: true
				}))) */
			},

		}
	}
</script>

<style lang="scss" scoped>
	.uni-input {
		background-color: #ffffff;
		height: 40px;
		width: 150px;
		padding: 0 10px;
		font-size: 18px;
		border-radius: 10px;
		display: flex;
		align-items: center;
	}
</style>