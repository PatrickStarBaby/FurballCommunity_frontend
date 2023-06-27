<template>
	<view class="" style="padding-bottom: 20px;">
		<view class="pd-tp10" style="background-color: #FAFAFA;">
			<text class="ft-14 mg-lt20">为你的宠物猫找一个贴心的照顾员吧~</text>
			<view class="width-full h30 mg-tp10"
				style="border-top-left-radius: 30px;border-top-right-radius: 30px;background-color: #F8FCFC;">
			</view>
		</view>
		<view class="pd-lr20" style="margin-top: -25px;">
			<view class="mg-tp15 mg-bt5">
				<text class="ft-18 bold">我的猫咪</text>
			</view>
			<view v-for="item in 3" class="h120 bg-fff bd-rd20 mg-tp10 box-shadow flex flex-ac pd-lr10">
				<image class="w100 h100 bd-rd15" src="../../../static/user_img/user_6.jpg" mode="aspectFill"></image>
				<view class="mg-lt20">
					<view class="flex flex-ac h30">
						<text class="ft-20 bold">团子</text>
						<image class="w20 h20 mg-lt6" src="../../../static/icon/female.png" mode="aspectFill"></image>
					</view>
					<view class="flex flex-as mg-tp10">
						<view class="">
							<view class="flex flex-ac">
								<uni-icons color="#999999" type="vip" size="20"></uni-icons>
								<text class="ft-14 color-999">英短蓝白</text>
							</view>
							<view class="flex flex-ac mg-tp5">
								<uni-icons color="#999999" type="minus" size="20"></uni-icons>
								<text class="ft-14 color-999">已绝育</text>
							</view>
						</view>
						<view class="mg-lt40 flex flex-ac">
							<uni-icons color="#999999" type="calendar" size="20"></uni-icons>
							<text class="ft-14 color-999">两岁半</text>
						</view>
					</view>
				</view>
			</view>
			<view @click="toAddPet(0)" class="h120 bd-rd20 relative mg-tp10 box-shadow addBtn flex flex-ac flex-jc"
				style="background-color: #D2FBE9;">
				<image class="w120 h120 absolute-center" src="../../../static/icon/cat.png" mode="aspectFill"></image>
				<text class="ft-20 color-999 z-index99 text-shadow">新建猫咪卡片</text>
			</view>
			<view class="mg-tp30 ">
				<button @click="toReleaseOrder" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">发 布 订 单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/utils/http/'
	import router from '@/router/index.js'
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		onReady() {},
		methods: {
			toAddPet(pet_id) {
				router.navigateTo({
					url: '/pages/addPet/addPet?pet_id=' + pet_id,
				})
			},
			toReleaseOrder(){
				router.navigateTo('/pages/releaseOrder/releaseOrder')
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F8FCFC;
	}

	.addBtn:active {
		box-shadow: none;
	}
</style>