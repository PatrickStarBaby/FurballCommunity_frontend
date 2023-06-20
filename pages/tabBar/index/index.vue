<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="flex flex-direction-column mg-tp10 mg-bt10">
			<text class="ft-28 bold">Welcome!</text>
			<text class="ft-14">为你的宠物猫找一个贴心的照顾员吧~</text>
		</view>
		<view class="bd-rd5" style="overflow: hidden;">
			<swiper class="h200" :indicator-dots="true" indicator-active-color="#FFFFFF" :autoplay="true" :interval="4000" :duration="1000" circular>
				<swiper-item class="swiper_item bd-rd10" v-for="item in swiperList">
					<view class="swiper-item bd-rd10">
						<image class="bd-rd10 width-full" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view> 
		<view @click="toCarerList" class="relative h40 mg-tp10 bd-rd10 flex flex-ac flex-jc box-shadow" style="background-color: #E3D4FD;">
			<img class="absolute-center-column" style="width: 30px;height: 30px;left: 20px;"
				src="/static/icon/search.png" alt="">
			<text class="color-fff ft-14" style="border-bottom: 1px solid #fff;padding: 2px 60px 5px 60px;">查看附近照顾员</text>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">附近照顾员</text>
		</view>
		<view class="pd-bt15" style="overflow-x: scroll;">
			<view class="flex flex-direction-row">
				<view v-for="item in 5" class="relative w150 h200 bd-rd15 mg-rt10 box-shadow" style="flex-shrink: 0;">
					<image class="w150 h150" style="border-top-left-radius: 15px;border-top-right-radius: 15px;"
						:src="`/static/user_img/user_${item+5}.jpg`" mode="aspectFill"></image>
					<view class="flex flex-direction-column  absolute width-full bg-fff"
						style="left: 0;bottom: 0;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;">
						<text class="ft-16" style="padding: 0 5px;">拉马尔</text>
						<view class="flex flex-direction-row flex-jsb flex-ac" style="padding: 0 5px;">
							<text class="ft-12 color-666">接单数：{{item*2+27}}</text>
							<view class="bd-rd50 w30 h30 flex flex-jc flex-ac"
								style="background-color: #CFF8E6;height: 30px;">
								<image style="width: 20px;height: 20px;" src="../../../static/icon/right.png" mode="aspectFill">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">社区活动</text>
		</view>
		<view class="">
			<view v-for="item in 3" class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10"
				style="border-bottom: 1px solid #ddd;">
				<image class="h80 w80 bd-rd20 flex-shrink-0" :src="`/static/user_img/user_${item+7}.jpg`"
					mode="aspectFill"></image>
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
		</view>
	</view>
</template>
<script>
	import storage from '@/utils/storage.js'
	import store from '@/store/index.js'
	import router from '@/router/index.js'
	export default {
		components: {},
		data() {
			return {
				swiperList: [
					'/static/user_img/user_1.jpg',
					'/static/user_img/user_2.jpg',
					'/static/user_img/user_3.jpg',
					'/static/user_img/user_4.jpg',
					'/static/user_img/user_5.jpg',
					'/static/swiper/swiper_6.jpg',
					'/static/swiper/swiper_7.jpg',
				]
			}
		},
		onShow() {
			console.log(store.state.isLogin)
			console.log(store.state.userInfo)
			console.log(store.state.token)
		},
		methods: {
			toCarerList(){
				router.switchTab("/pages/tabBar/carerList/carerList")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>