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
		<picker mode="date" :value="startDate" :start="startDateRange" :end="endDateRange" @change="bindStartDateChange">
			<view class="uni-input">{{startDate}}</view>
		</picker>
		
		<!-- 选择结束时间 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">选择结束时间</text>
		</view>
		<picker mode="date" :value="endDate" :start="startDateRange" :end="endDateRange" @change="bindEndDateChange">
			<view class="uni-input">{{endDate}}</view>
		</picker>
		
		<!-- 订单备注 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">订单备注</text>
		</view>
		<view class="width-full">
			<textarea placeholder-class="color-ccc" auto-focus class="bg-fff pd-5 ft-18 bd-rd10"
				placeholder="请输入订单备注"></textarea>
		</view>
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">提 交 订 单 </button>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage.js'
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
				petArray:['小黄','坤坤','姬霓泰煤'],
				petIndex:0,
				startDate:getDate({
					format: true
				}),
				endDate:getDate({
					format: true
				}),
				startDateRange:getDate('start'),
				endDateRange:getDate('end'),
			}
		},
		methods: {
			bindPetChange(e){
				this.petIndex = e.detail.value
			},
			bindStartDateChange(e){
				this.startDate = e.detail.value
			},
			bindEndDateChange(e){
				this.endDate = e.detail.value
			},

		}
	}
</script>

<style lang="scss" scoped>
.uni-input{
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