<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">社区资讯</text>
		</view>
		<view class="pd-bt15" style="overflow-x: scroll;">
			<view class="flex flex-direction-row">
				<view v-for="(item,index) in communityList"
					class="box-shadow bg-fff w200 h200 bd-rd20 flex flex-ac flex-direction-column mg-rt10 flex-shrink-0"
					style="border-top-left-radius: 10px;border-top-right-radius: 50px;"
					@click="toCommunityDetail(index)">
					<image class="h120 bd-rd10" style="width: 190px;border-top-right-radius: 46px;margin-top: 4px;"
						:src="item.imgUrl" mode="aspectFill"></image>
					<text class="ft-14 bold block width-full one-line-ellipsis mg-lt5">{{item.title}}</text>
					<text class="ft-12 mg-lt5 mg-tp5 color-999 width-full">{{item.date}}</text>
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
			<view @click="toCommunityDetail(item)" v-for="item in communityList" class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10"
				style="border-bottom: 1px solid #ddd;">
				<image class="h80 w80 bd-rd20 flex-shrink-0" :src="item.imgUrl"
					mode="aspectFill"></image>
				<view class="flex flex-direction-column" style="width: 75%;">
					<view class="flex flex-direction-row flex-ac flex-jsb">
						<text class="block one-line-ellipsis" style="width: 70%;">{{item.title}}</text>
						<text class="color-666 ft-14">{{item.date}}</text>
					</view>
					<view style="width: 100%;margin-top: 6px;">
						<text class="mult_line-ellipsis-2 block ft-14 color-999 text-indent"
							style="width: 100%;">{{item.content}}</text>
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
				communityList:[{
					title: '第二届喵喵运动会开幕',
					date:'2023-06-11',
					content: '第二届运动会马上开幕，超多活动等你来参加，喵主带喵参加更是能获得超多奖品，参与就有奖，尽情期待！！',
					imgUrl: '/static/user_img/user_13.jpg'
				},{
					title: '麒麟社区喵喵驿站正式启用',
					date:'2023-05-22',
					content: '为方便广大业主养猫需求，喵喵驿站提前启用，更多活动好礼请关注官方通知，后续将会举办更多精彩活动！！',
					imgUrl: '/static/user_img/user_14.jpg'
				},{
					title: '喵喵免费官方体检活动开始',
					date:'2023-07-03',
					content: '经过投票，此次体检活动初步预定在晨光宠物医院进行，请喵主及时关注后续通知',
					imgUrl: '/static/user_img/user_15.jpg'
				},{
					title: '姗姗猫咖正式开门营业！！',
					date:'2023-03-19',
					content: '珊珊猫咖江宁分店今日起正式开门营业，提供免费吸猫服务，还有口味很多的咖啡哦',
					imgUrl: '/static/user_img/user_16.jpg'
				}],
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