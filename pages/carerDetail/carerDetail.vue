<template>
	<view>
		<view class="relative">
			<image class="width-full" style="height: 300px;border-top-right-radius: 25px;border-top-left-radius: 25px;"
				src="../../static/user_img/user_11.jpg" mode="aspectFill">
			</image>
			<view class="absolute-center-row bd-rd15 h70 flex flex-ac flex-jsb pd-lr20 box-shadow"
				style="bottom: 50px;width: 85%;background: rgba(51,51,51,0.3);">
				<view class="">
					<text class="color-fff ft-24 block one-line-ellipsis"
						style="max-width: 100px">{{userData.username}}</text>
				</view>
				<view class="bg-fff" style="height: 60%;width: 2px;">

				</view>
				<view class="flex flex-direction-column mg-tp5" style="opacity: 0.8;width: 65%;">
					<view class="flex">
						<view class="flex flex-ac">
							<uni-icons color="#fff" type="location" size="20"></uni-icons>
							<text class="ft-14 color-fff" style="white-space: nowrap;">距离{{userData.Distance}}km</text>
						</view>
						<view class="flex flex-ac mg-lt25">
							<uni-icons color="#fff" type="hand-up" size="20"></uni-icons>
							<text class="ft-14 color-fff" style="white-space: nowrap;">评分:{{userData.score}}</text>
						</view>
					</view>
					<view class="flex mg-tp5">
						<view class="flex flex-ac">
							<uni-icons color="#fff" type="wallet" size="20"></uni-icons>
							<text class="ft-14 color-fff block one-line-ellipsis"
								style="max-width: 65%;">地址：{{userData.address}}</text>
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
					<text style="color: #747680;">{{userData.intro}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾时光</text>
				</view>
				<view class="pd-bt10" style="overflow-x: scroll;">
					<view class="flex">
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_1.jpg"
								mode="aspectFill">
							</image>
						</view>
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_2.jpg"
								mode="aspectFill">
							</image>
						</view>
						<view class="mg-rt20">
							<image class="w300 h170 bd-rd20 box-shadow" src="../../static/user_img/user_3.jpg"
								mode="aspectFill">
							</image>
						</view>
					</view>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">技能经验</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.pet_exp}}</text>
				</view>
			</view>
			<!-- 历史评论 -->
			<view class="" v-if="tab_index==1">
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">最新评论</text>
				</view>
				<view class="">
					<view v-for="item in commentList" class="h100 box-shadow flex flex-ac pd-lr10 bd-rd15 mg-bt10 bg-fff"
						style="padding-top: 8px;padding-bottom: 10px;">
						<view class="h100 flex flex-ac">
							<image class="w80 h80 bd-rd50" :src="item.avatar" mode="aspectFill">
							</image>
						</view>
						<view class="pd-lt10">
							<view class="flex flex-jsb">
								<view class="">
									<text class="ft-16 bold">{{item.name}}</text>
									<uni-rate :readonly="true" allow-half :value="item.score" />
								</view>
								<text class="color-999 ft-14">{{item.date}}</text>
							</view>
							<view class="pd-lt10 mg-tp10" style="border-left: #D3FAED 3px solid;">
								<text class="ft-14 block mult_line-ellipsis-2 width-full"
									style="color: #20232C;">{{item.comment}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="tab_index==2">
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾员名称</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.username}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾员联系电话</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.phone}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾员账号</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.account}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾员住址</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.address}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">照顾员评分</text>
				</view>
				<view class="flex flex-ac">
					<uni-rate :readonly="true" allow-half :value="userData.score" />
					<text style="color: #747680;margin-left: 5px;">{{userData.score}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">每天可工作时间</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.work_time==0?'<= 4h':'> 4h'}}</text>
				</view>
				<view class="mg-tp15 mg-bt5">
					<text class="ft-18 bold">最大可照顾宠物数量</text>
				</view>
				<view class="">
					<text style="color: #747680;">{{userData.pet_num}}只</text>
				</view>
			</view>

			<view class="mg-tp30 flex flex-jsb">
				<button class="bd-rd15 box-shadow" style="background-color: #E3D4FD;width: 45%">联系照顾员</button>
				<button @click="toReleaseOrder" class="bd-rd15 box-shadow"
					style="background-color: #66C7FA;width: 45%;">立即预约</button>
			</view>
		</view>
	</view>
</template>

<script>
	import router from '@/router/index.js'
	export default {
		data() {
			return {
				tab_index: 0,
				userData: {},
				commentList: [{
						name:'Laura',
						date:'2023-05-11',
						avatar: '../../static/user_img/user_12.jpg',
						comment: '真的很贴心，每次都会给我发很多我家猫咪的照片~而且特别会照顾猫猫~ 棒棒哒！！！！！！！！',
						score: 5
					},
					{
						name:'坤坤',
						date:'2023-07-05',
						avatar: '../../static/user_img/user_2.jpg',
						comment: '真的是太棒了！他对猫咪的关爱和耐心让我感到非常放心。我的猫咪在他的照顾下总是快乐满满，回家后精神状态非常好！',
						score: 4.5
					},
					{
						name:'姬霓泰煤',
						date:'2023-07-02',
						avatar: '../../static/user_img/user_3.jpg',
						comment: '感谢猫咪照顾员的辛勤工作，真的是专业而且善于和猫咪沟通。我的猫咪在他身边总是乖巧听话，看得出来他是真心喜欢动物，这让我非常放心！',
						score: 3.5
					},
					{
						name: '海绵宝宝',
						date:'2023-06-07',
						avatar: '../../static/user_img/user_4.jpg',
						comment: '猫咪照顾员的服务超出了我的期望！他们不仅关心猫咪的日常生活，还会给予他们爱和温暖。我的猫咪在他们的陪伴下度过了愉快的时光，我会毫不犹豫地推荐他们给任何有需要的猫咪主人。',
						score: 5
					},
					{
						name:'痞老板',
						date:'2023-06-24',
						avatar: '../../static/user_img/user_5.jpg',
						comment: '我是一个很挑剔的猫咪主人，但是猫咪照顾员真的让我很满意！他们细心照料每只猫咪，并且时不时给我发猫咪的照片，让我在旅行期间也能放心。谢谢你们，你们是最棒的！',
						score: 4
					},
					{
						name:'蟹老板',
						date:'2023-07-06',
						avatar: '../../static/user_img/user_6.jpg',
						comment: '猫咪照顾员具备很高的专业素养，不仅确保猫咪的饮食和卫生，还能及时发现猫咪的不适。每次回家，猫咪看到他们都会兴奋不已，这足以证明他们得到了很好的照顾和关爱。我非常感谢他们的辛勤付出！',
						score: 5
					},
				]
			}
		},
		onLoad(e) {
			this.userData = JSON.parse(decodeURIComponent(e.user_info))
		},
		methods: {
			changeTab(index) {
				this.tab_index = index
			},
			toReleaseOrder() {
				router.navigateTo(`/pages/releaseOrder/releaseOrder?carer_id=${this.userData.user_id}`)
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