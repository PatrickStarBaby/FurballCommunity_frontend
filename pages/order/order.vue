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
					<text class="ft-16">待接单</text>
				</view>
				<view class="w90 flex flex-ac flex-jc h30" @click="changeTab(3)"
					:class="[tab_index==3?'tab_active':'']">
					<text class="ft-16">进行中</text>
				</view>
			</view>
			<!-- 基本信息 -->
			<view class="" v-if="tab_index==0">
				<view class="flex flex-ac flex-jc mg-tp100">
					<view class="flex flex-direction-column flex-ac">
						<image class="w100 h100" src="../../static/icon/empty.png" mode="aspectFill"></image>
						<text class="color-aaa">订单为空</text>
					</view>
				</view>
			</view>
			<!-- 历史评论 -->
			<view class="" v-if="tab_index==1">
				<view class="flex flex-ac flex-jc mg-tp100">
					<view class="flex flex-direction-column flex-ac">
						<image class="w100 h100" src="../../static/icon/empty.png" mode="aspectFill"></image>
						<text class="color-aaa">订单为空</text>
					</view>
				</view>
			</view>
			<view class="" v-if="tab_index==2">
				<view class="flex flex-ac flex-jc mg-tp100">
					<view class="flex flex-direction-column flex-ac">
						<image class="w100 h100" src="../../static/icon/empty.png" mode="aspectFill"></image>
						<text class="color-aaa">订单为空</text>
					</view>
				</view>
			</view>
			<view class="" v-if="tab_index==3">
				<view class="flex flex-ac flex-jc mg-tp100">
					<view class="flex flex-direction-column flex-ac">
						<image class="w100 h100" src="../../static/icon/empty.png" mode="aspectFill"></image>
						<text class="color-aaa">订单为空</text>
					</view>
				</view>
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
	page{
		background-color: #F8FCFC
	}
</style>