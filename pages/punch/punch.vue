<template>
	<view style="padding-bottom: 20px;">
		<!-- <view class="mg-tp15 mg-bt5 pd-lr10">
			<text class="ft-18 bold color-1ccfcf">打卡日历</text>
		</view> -->
		<uni-calendar :insert="true" :selected="selectList" :lunar="true" :start-date="order_info.start_time"
			:end-date="order_info.end_time" @change="change" />
		<view class="mg-tp15 mg-bt5 pd-lr10">
			<text class="ft-18 bold color-1ccfcf">打卡图片</text>
		</view>
		<view class="pd-lr10">
			<view v-for="(item, index) in allDate" class="flex flex-direction-column mg-bt10">
				<text class="block pd-lt10" style="border-left: 1px solid #999;">{{item}}</text>
				<image v-if="allImg[index] != '0'" class="w300 h200 mg-tp5" :src="allImg[index]" mode="aspectFill"></image>
				<text v-else class="mg-tp5">未打卡</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		convertDateTimeStringToDate,
		filterDates,
		getAllDates
	} from '@/utils/utils.js'
	import {
		BASEIMGURL
	} from '@/utils/env.js'
	export default {
		data() {
			return {
				order_info: {},
				selectStrList: [], //已打卡，里面存日期字符串
				selectList: [], //已打卡展示列表，里面存对象
				allDate:[], //订单所有时间段
				allImg:[], //打卡图片
			}
		},
		onLoad(e) {
			this.order_info = JSON.parse(decodeURIComponent(e.order_info))
			this.allDate = getAllDates(this.order_info.start_time, this.order_info.end_time)
			this.allImg = this.order_info.check_in_pictures.split(',').map(item => {
				if(item == '0') return item
				else return item = BASEIMGURL + item
			})
			console.log(this.allImg)
			this.selectStrList = filterDates(this.order_info.start_time, this.order_info.end_time, this.order_info
				.check_in_status)
			let list = []
			this.selectStrList.forEach(item => {
				list.push({
					date: item,
					info: '已打卡',
				})
			})
			this.selectList = list
		},
		methods: {
			change() {}
		}
	}
</script>

<style>

</style>