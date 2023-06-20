<template>
	<view class="" style="padding-bottom: 20px;">
		<view class="relative">
			<image class="width-full" style="height: 300px;border-top-right-radius: 25px;border-top-left-radius: 25px;" src="../../static/user_img/user_11.jpg" mode="aspectFill">
			</image>
			<view class="absolute-center-row bd-rd15 h70 flex flex-ac flex-jsb pd-lr20 box-shadow"
				style="bottom: 50px;width: 85%;background: rgba(51,51,51,0.3);">
				<view class="">
					<text class="color-fff ft-24">坤坤</text>
				</view>
				<view class="bg-fff" style="height: 60%;width: 2px;">

				</view>
				<view class="flex flex-ac mg-tp5" style="opacity: 0.8;">
					<view class="flex flex-direction-column">
						<view class="flex flex-ac">
							<uni-icons color="#fff" type="location" size="20"></uni-icons>
							<text class="ft-14 color-fff">距离{{userData.distance}}km</text>
						</view>
						<view class="flex flex-ac mg-tp5">
							<uni-icons color="#fff" type="chat" size="20"></uni-icons>
							<text class="ft-14 color-fff">{{userData.commentNum}}条评论</text>
						</view>
					</view>
					<view class="flex flex-direction-column mg-lt15">
						<view class="flex flex-ac">
							<uni-icons color="#fff" type="wallet" size="20"></uni-icons>
							<text class="ft-14 color-fff">已接单数{{userData.oderNum}}</text>
						</view>
						<view class="flex flex-ac mg-tp5">
							<uni-icons color="#fff" type="hand-up" size="20"></uni-icons>
							<text class="ft-14 color-fff">好评数{{userData.acclaim}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="relative pd-lr20"
			style="margin-top: -40px;border-top-right-radius: 35px;border-top-left-radius: 35px;padding-top: 10px;padding-bottom: 20px;background-color: #F8FCFC;">
			<view class="flex flex-jsb width-full" style="padding-bottom: 8px;border-bottom: 1px solid #ccc;">
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(0)"
					:class="[tab_index==0?'tab_active':'']">
					<text class="ft-16">基本信息</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(1)"
					:class="[tab_index==1?'tab_active':'']">
					<text class="ft-16">历史评论</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(2)"
					:class="[tab_index==2?'tab_active':'']">
					<text class="ft-16">服务详情</text>
				</view>
			</view>
			<!-- 基本信息 -->
			<view class="" v-if="tab_index==0">
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">关于我</text>
				</view>
				<view class="">
					<text
						style="color: #747680;">我是大橘子的爸爸，养猫经验超过五年，我只要在求真苑以及附近社区接单，基本每周保证四天回去照顾猫咪，我相信每一只猫都值得精心呵护。</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾时光</text>
				</view>
				<view class="pd-bt10" style="overflow-x: scroll;">
					<view class="flex">
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_1.jpg" mode="aspectFill">
							</image>
						</view>
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_2.jpg" mode="aspectFill">
							</image>
						</view>
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_3.jpg" mode="aspectFill">
							</image>
						</view>
					</view>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">技能经验</text>
				</view>
				<view class="">
					<text style="color: #747680;">更换猫砂、补充食物、洗浴清洁、药物使用、毛发护理等。</text>
				</view>
			</view>
			<!-- 历史评论 -->
			<view class="" v-if="tab_index==1">
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">最新评论</text>
				</view>
				<view class="">
					<view v-for="item in 5" class="h100 box-shadow flex flex-ac pd-lr10 bd-rd15 mg-bt10 bg-fff" style="padding-top: 8px;padding-bottom: 10px;">
						<view class="h100 flex flex-ac">
							<image class="w80 h80 bd-rd50" src="../../static/user_img/user_17.jpg" mode="aspectFill"></image>
						</view>
						<view class="pd-lt10">
							<view class="flex flex-jsb">
								<view class="">
									<text class="ft-16 bold">Laura</text>
									<uni-rate :readonly="true" allow-half :value="5" />
								</view>
								<text class="color-999 ft-14">2023.5.1</text>
							</view>
							<view class="pd-lt10 mg-tp10" style="border-left: #D3FAED 3px solid;">
								<text class="ft-14 block mult_line-ellipsis-2 width-full" style="color: #20232C;">大卫真的很贴心，每次都会给我发很多我家猫咪的照片~而且特别会照顾猫猫~ 棒棒哒！！！！！！！！</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="tab_index==2">

			</view>
			
			<view class="mg-tp30 ">
				<button class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">联系照顾员</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab_index: 0,
				user_id: 0,
				userData: {
					user_id: 1,
					avatar: "../../../static/swiper/swiper_5.jpg",
					name: "坤坤",
					score: 4.5, //0~5,可以有0.5
					distance: 9.8,
					oderNum: 288,
					commentNum: 98,
					acclaim: 89
				},
			}
		},
		onLoad(e) {
			this.user_id = e.user_id
		},
		methods: {
			changeTab(index) {
				this.tab_index = index
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
</style>