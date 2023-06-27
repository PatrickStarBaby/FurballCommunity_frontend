<template>
	<view class="pd-20">
		<view class="relative flex flex-direction-column flex-ac">
			<image class="w100 h100 bd-rd50" src="../../../static/logo.png" mode="aspectFill"></image>
			<view class="flex flex-direction-column flex-ac">
				<text class="ft-20 bold">坤坤</text>
				<text class="ft-18">18327061400</text>
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
				<view @click="toAuthentication" class="flex flex-direction-column flex-ac">
					<view class="">
						<image class="w40 h40" src="../../../static/icon/authentication.png" mode="aspectFill"></image>
					</view>
					<text class="ft-14 mg-tp5">我要认证</text>
				</view>
			</view>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">我的猫咪</text>
		</view>
		<view class="relative pd-lr20 bg-fff mg-tp10 bd-rd10" style="padding-top: 20px;padding-bottom: 20px;">
			<view class="" style="overflow-x: scroll;">
				<view class="flex flex-direction-row">
					<view v-for="item in 3" class="w70 h70 bd-rd50 mg-rt10" style="border: 1px solid #41B6A8;">
						<image class="w70 h70 bd-rd50" src="../../../static/logo.png" mode="aspectFill"></image>
					</view>
					<view @click="toAddPet(0)" class="w70 h70 bd-rd50 bg-eee flex flex-ac flex-jc">
						<uni-icons type="plusempty" color="#ffffff" size="32"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">照顾员信息</text>
		</view>
		<!-- 未认证 -->
		<view @click="toAuthentication" v-if="false" class="width-full h150 bd-rd20 flex flex-jc relative"
			style="background-color: #E5F9EE;overflow: hidden;">
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
		<view v-if="true" class="width-full h150 bd-rd20 flex flex-jc relative"
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
		<view @click="toCommunityDetail(item)" v-for="item in 3" class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10"
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
</template>

<script>
	import router from '@/router/index.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			toUserInfoDetail(){
				router.navigateTo({
					url: '/pages/userInfoDetail/userInfoDetail',
				})
			},
			toOrder(){
				router.navigateTo({
					url: '/pages/order/order',
				})
			},
			toAddPet(pet_id) {
				router.navigateTo({
					url: '/pages/addPet/addPet?pet_id=' + pet_id,
				})
			},
			toAuthentication(){
				// 需要判断是否已经通过认证
				router.navigateTo({
					url: '/pages/authentication/authentication',
				})
			},
			toCommunityDetail(id){
				router.navigateTo({
					url: '/pages/communityDetail/communityDetail?blog_id=' + id,
				})
			},
		}
	}
</script>

<style>

</style>