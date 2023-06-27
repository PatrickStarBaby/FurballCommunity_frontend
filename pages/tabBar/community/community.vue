<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">社区资讯</text>
		</view>
		<view class="pd-bt15" style="overflow-x: scroll;">
			<view class="flex flex-direction-row">
				<view v-for="(item,id) in 5"
					class="box-shadow bg-fff w200 h200 bd-rd20 flex flex-ac flex-direction-column mg-rt10 flex-shrink-0"
					style="border-top-left-radius: 10px;border-top-right-radius: 50px;"
					@click="toCommunityDetail(id)">
					<image class="h120 bd-rd10" style="width: 190px;border-top-right-radius: 46px;margin-top: 4px;"
						src="../../../static/user_img/user_1.jpg" mode="aspectFill"></image>
					<text class="ft-14 bold block width-full one-line-ellipsis mg-lt5">第二届"喵喵"运动会开幕！</text>
					<text class="ft-12 mg-lt5 mg-tp5 color-999 width-full">2022年1月2日</text>
					<view class="flex flex-direction-row flex-ac flex-jsb width-full mg-tp5">
						<view class="flex flex-direction-row flex-ac mg-lt5">
							<image class="w30 h30 bd-rd50" src="../../../static/logo.png" mode="aspectFill"></image>
							<text class="ft-12">坤坤</text>
						</view>
						<view class="flex flex-direction-row flex-ac mg-rt5">
							<uni-icons type="heart" color="#1ccfcf" size="14"></uni-icons>
							<text class="ft-12">235</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mg-tp10" style="overflow-y: scroll;height: 350px;">
			<view @click="toCommunityDetail(item)" v-for="item in 6" class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10"
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
		<view class="mg-tp30 ">
			<button @click="toAddBlog" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">发布社区资讯</button>
		</view>
	</view>
</template>

<script>
	import router from '@/router/index.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			toCommunityDetail(id){
				router.navigateTo('/pages/communityDetail/communityDetail?blog_id=' + id)
			},
			toAddBlog() {
				router.navigateTo('/pages/addBlog/addBlog')
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>