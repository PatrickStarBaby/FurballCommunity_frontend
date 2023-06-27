<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="bd-rd5" style="overflow: hidden;">
			<swiper class="swiper_item" :indicator-dots="true" indicator-active-color="#FFFFFF" :autoplay="true"
				:interval="4000" :duration="1000" circular>
				<swiper-item class="swiper_item" v-for="item in swiperList">
					<view class="swiper_item">
						<image class="swiper_item width-full" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">第二届“喵喵”运动会来啦！</text>
		</view>
		<view class="width-full flex flex-je">
			<text class="ft-14">2023.3.8</text>
		</view>
		<view class="text-indent pd-bt30 mg-tp10" style="border-bottom: 1px solid #ccc;">
			<text class="">第二届运动会马上开幕，超多活动等你来参加，喵主带喵参加更是能获得超多奖品，参与就有奖，尽情期待！！更多活动好礼请关注官方通知，后续将会举办更多精彩活动！！</text>
		</view>
		<view class="">
			<view class="flex flex-ac pd-tb20" style="border-bottom: 1px solid #ccc;">
				<view>
					<image class="w50 h50 bd-rd50" src="../../static/user_img/user_1.jpg" mode="aspectFill"></image>
				</view>
				<view class="flex flex-direction-column mg-lt10">
					<text class="ft-16 bold">坤坤</text>
					<text class="ft-14">只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~只因你太美，再看一眼就会爆炸~</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blog_id: 0,
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
		onLoad(e) {
			this.blog_id = e.blog_id
		},
		methods: {

		}
	}
</script>

<style>
.swiper_item{
	height: 300px;
	border-radius: 20px;
}
</style>