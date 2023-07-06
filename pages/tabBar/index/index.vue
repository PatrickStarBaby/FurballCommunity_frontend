<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="flex flex-direction-column mg-tp10 mg-bt10">
			<text class="ft-28 bold">Welcome!</text>
			<text class="ft-14">为你的宠物猫找一个贴心的照顾员吧~</text>
		</view>
		<view class="bd-rd5" style="overflow: hidden;">
			<swiper class="h200" :indicator-dots="true" indicator-active-color="#FFFFFF" :autoplay="true"
				:interval="4000" :duration="1000" circular>
				<swiper-item class="swiper_item bd-rd10" v-for="item in swiperList">
					<view class="swiper-item bd-rd10">
						<image class="bd-rd10 width-full" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view @click="toCarerList" class="relative h40 mg-tp10 bd-rd10 flex flex-ac flex-jc box-shadow"
			style="background-color: #E3D4FD;">
			<img class="absolute-center-column" style="width: 30px;height: 30px;left: 20px;"
				src="/static/icon/search.png" alt="">
			<text class="color-fff ft-14"
				style="border-bottom: 1px solid #fff;padding: 2px 60px 5px 60px;">查看附近照顾员</text>
		</view>
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">附近照顾员</text>
		</view>
		<view class="pd-bt15" style="overflow-x: scroll;">
			<view class="flex flex-direction-row">
				<view @click="toCarerDetail(index)" v-for="(item,index) in carerList"
					class="relative w150 h200 bd-rd15 mg-rt10 box-shadow" style="flex-shrink: 0;">
					<image class="w150 h150" style="border-top-left-radius: 15px;border-top-right-radius: 15px;"
						:src="item.avatar" mode="aspectFill"></image>
					<view class="flex flex-direction-column  absolute width-full bg-fff"
						style="left: 0;bottom: 0;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;">
						<text class="ft-16" style="padding: 0 5px;">{{item.username}}</text>
						<view class="flex flex-direction-row flex-jsb flex-ac" style="padding: 0 5px;">
							<text class="ft-12 color-666">评分：{{item.score}}</text>
							<view class="bd-rd50 w30 h30 flex flex-jc flex-ac"
								style="background-color: #CFF8E6;height: 30px;">
								<image style="width: 20px;height: 20px;" src="../../../static/icon/right.png"
									mode="aspectFill">
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
			<view @click="toCommunityDetail(item)" v-for="(item,index) in communityList"
				class="h80 flex flex-direction-row flex-jsb mg-bt10 pd-bt10" style="border-bottom: 1px solid #ddd;">
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
				],
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
				carerList: [{
						"Name": "10",
						"Longitude": 118.90484422445297,
						"Latitude": 32.04323644179899,
						"Distance": 3.0978,
						"user_id": 10,
						"account": "amd125a",
						"password": "123456789",
						"Pets": null,
						"phone": "17664068592",
						"username": "该用户已注销",
						"authority": 1,
						"gender": 0,
						"address": "中国江苏省南京市栖霞区孝陵卫百水芊城秀水坊14幢",
						"score": 3.5,
						"intro": "我是一名喵星使者，对猫咪充满热爱与关怀。照顾猫咪是我的使命，我会用心陪伴每一只小天使，为它们创造一个快乐、舒适的生活环境。我相信，每一只猫咪都是独特而可爱的，我会用我的爱与耐心，让它们感受到宾至如归的温暖。",
						"id_number": "430224197008225612 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_6.jpg",
						"pet_exp": "我是一名充满爱心和责任感的猫咪收养照顾者。我善于观察猫咪的需求和情绪，用心照顾它们的健康和幸福。了解猫咪的饮食要求，我为它们提供科学合理的食谱。专业的医疗知识让我能够及时处理健康问题。陪伴着猫咪的快乐时光，我们共同创造美好回忆。让每一只猫咪都感受到宠爱与关怀，是我最大的心愿。",
						"work_time": 0,
						"pet_num": 5,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "14",
						"Longitude": 118.91582518815994,
						"Latitude": 32.04145706754513,
						"Distance": 2.0541,
						"user_id": 14,
						"account": "12054541",
						"password": "123456789",
						"Pets": null,
						"phone": "17264068592",
						"username": "珊迪",
						"authority": 1,
						"gender": 0,
						"address": "江苏省南京市栖霞区花港·幸福城茉莉园",
						"score": 4.5,
						"intro": "作为一名猫咪护理达人，我深知每一只猫咪都有一颗柔软的心跳。我会用我的关怀和爱心，为它们营造一个安心的环境，照料每一份可爱与脆弱。在我眼中，它们都是独特的宝贝，值得被无微不至地宠爱。",
						"id_number": "61042819740124174X ",
						"avatar": "http://127.0.0.1:8080/public/img/user_10.jpg",
						"pet_exp": "热爱、细心观察、科学饮食、医疗知识、快乐陪伴、责任感",
						"work_time": 0,
						"pet_num": 1,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "9",
						"Longitude": 118.91053587198257,
						"Latitude": 32.04817661333853,
						"Distance": 2.8334,
						"user_id": 9,
						"account": "1235054",
						"password": "123456789",
						"Pets": null,
						"phone": "17714068592",
						"username": "起个名字真难",
						"authority": 1,
						"gender": 0,
						"address": "中国江苏省南京市栖霞区孝陵卫怡水坊8幢",
						"score": 3,
						"intro": "我明白猫咪在离开主人身边时可能会感到不安和紧张，因此我会用心建立与它们的信任关系。我会陪伴它们，给予关爱和温暖，使它们在我身边能够感到宾至如归，快乐舒适地度过每一天。",
						"id_number": "44051419730321353X ",
						"avatar": "http://127.0.0.1:8080/public/img/user_5.jpg",
						"pet_exp": "作为猫咪收养照顾者，我热爱猫咪，用心观察它们的需求和情绪，为它们提供贴心的照顾。我了解猫咪的营养需求，能够制定科学合理的饮食计划。专业的医疗知识让我能够守护猫咪的健康。快乐的游戏时光让我们彼此更加亲近。我以责任和爱心，为每只猫咪打造一个温暖的家，让它们始终幸福快乐。",
						"work_time": 1,
						"pet_num": 4,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "16",
						"Longitude": 118.92689734697342,
						"Latitude": 32.038856443635645,
						"Distance": 0.9803,
						"user_id": 16,
						"account": "48945411",
						"password": "123456789",
						"Pets": null,
						"phone": "17164068592",
						"username": "痞老板",
						"authority": 1,
						"gender": 1,
						"address": "江苏省南京市江宁区天旺路先惠科技园",
						"score": 5,
						"intro": "我是一名猫咪幸福管家，我相信快乐是猫咪最简单的需求。我会陪伴每一只猫咪玩耍、蹦跳、探索，让快乐时刻永驻。我会为它们创造一个充满欢声笑语的环境，让它们的尾巴永远高高翘起，流露出幸福的笑容。",
						"id_number": "340405197007161741 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_12.jpg",
						"pet_exp": "悉心照料、生活乐趣、爱心陪伴、紧急应对、疾病预防、亲密互动、训练指导、心理抚慰",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "11",
						"Longitude": 118.92942398786545,
						"Latitude": 32.0333865153738,
						"Distance": 0.6618,
						"user_id": 11,
						"account": "a75asdf1",
						"password": "123456789",
						"Pets": null,
						"phone": "17564068592",
						"username": "海绵宝宝",
						"authority": 1,
						"gender": 1,
						"address": "中国江苏省南京市江宁区麒麟人工智能产业园D区",
						"score": 2.5,
						"intro": "我是一名猫语专家，能够与猫咪用心交流。通过细微的表情和动作，我能够准确地理解猫咪的需求和情绪。我善于抚摸它们，让它们感受到温暖和安心。在我的陪伴下，每一只猫咪都能享受到贴心的照顾和关爱。",
						"id_number": "150105198101283991 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_7.jpg",
						"pet_exp": "专业医疗、饮食调理、毛发护理、环境优化、健康监测、行为评估",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "15",
						"Longitude": 118.9362046122551,
						"Latitude": 32.03492762583867,
						"Distance": 0.0001,
						"user_id": 15,
						"account": "18327061400",
						"password": "18327061400",
						"Pets": null,
						"phone": "18327061400",
						"username": "蟹老板",
						"authority": 1,
						"gender": 1,
						"address": "江苏省南京市栖霞区花港·幸福城金桂园",
						"score": 5,
						"intro": "我是一名猫咪快乐使者，相信每一只猫咪都有着自己的快乐秘籍。我会与它们一同探索快乐的源泉，让它们尽情撒欢、尽情舒展。在我照顾下，每一只猫咪都将绽放幸福的微笑，成为家的一份子。",
						"id_number": "542301198207187148",
						"avatar": "http://127.0.0.1:8080/public/img/user_11.jpg",
						"pet_exp": "照顾细致、情感交流、健康护理、行为训练、安全环境、快乐游戏、心理慰藉、紧急救护",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "5",
						"Longitude": 118.92133444547653,
						"Latitude": 32.04799918285738,
						"Distance": 2.0197,
						"user_id": 5,
						"account": "1264546",
						"password": "123456789",
						"Pets": null,
						"phone": "18527061400",
						"username": "拉马尔",
						"authority": 1,
						"gender": 1,
						"address": "中国江苏省南京市江宁区孝陵卫银河湾·紫苑天王座55幢",
						"score": 3.5,
						"intro": "我是大橘子的爸爸，养猫经验超过五年，我只要在求真苑以及附近社区接单，基本每周保证四天回去照顾猫咪，我相信每一只猫都值得精心呵护。",
						"id_number": "321281197710296018",
						"avatar": "http://127.0.0.1:8080/public/img/user_1.jpg",
						"pet_exp": "更换猫砂、补充食物、洗浴清洁、药物使用、毛发护理等。",
						"work_time": 1,
						"pet_num": 3,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "13",
						"Longitude": 118.92724603414536,
						"Latitude": 32.04200963675786,
						"Distance": 1.1549,
						"user_id": 13,
						"account": "74451221",
						"password": "123456789",
						"Pets": null,
						"phone": "17364068592",
						"username": "章鱼哥",
						"authority": 1,
						"gender": 1,
						"address": "江苏省南京市江宁区麒麟紫荆城锁石苑",
						"score": 5,
						"intro": "作为猫咪知心人，我深知它们的内心世界和需求。无论是开心还是不安，我都会细心倾听，用我的陪伴和关爱为它们撑起一片安心的天空。每一只猫咪都是我生活中的重要伙伴，我会用我的真心，守护它们的幸福与安宁。",
						"id_number": "410182198404221807 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_9.jpg",
						"pet_exp": "作为猫咪收养照顾者，我充满热爱和耐心。细心观察猫咪的需求和情绪，给予它们温暖的家。了解猫咪的饮食和保健需求，为它们提供最优质的照顾。快乐的陪伴与互动，让每只猫咪感受到真正的关爱与快乐。为宠物的幸福和健康而努力，是我的终身使命。",
						"work_time": 0,
						"pet_num": 3,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "12",
						"Longitude": 118.93106549978256,
						"Latitude": 32.04169026189179,
						"Distance": 0.8947,
						"user_id": 12,
						"account": "75841512",
						"password": "123456789",
						"Pets": null,
						"phone": "17464068592",
						"username": "派大星",
						"authority": 1,
						"gender": 1,
						"address": "江苏省南京市江宁区麒麟紫荆城定林苑",
						"score": 5,
						"intro": "我是一名猫咪保姆，专注于呵护宝贝们的健康成长。我会定期为猫咪提供健康饮食和适时的运动，确保它们保持良好的身体状况。同时，我还会陪伴它们，让它们不再孤独，感受到主人不在身边时的温暖和陪伴。",
						"id_number": "522323198409252651 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_8.jpg",
						"pet_exp": "我是一位富有经验和热爱的猫咪照顾者。我善于观察猫咪的需求和情绪，细心照顾它们的健康和幸福。我了解猫咪的饮食要求，并能提供适当的营养计划。通过专业的医疗知识，我能及时处理猫咪的健康问题。我喜欢陪伴猫咪玩耍和互动，创造快乐的时光。我以责任和爱心，为每只猫咪提供温暖的家，让它们感受到宠爱与关怀。",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "6",
						"Longitude": 118.92716556787491,
						"Latitude": 32.04835150909853,
						"Distance": 1.7192,
						"user_id": 6,
						"account": "kunkun",
						"password": "123456789",
						"Pets": null,
						"phone": "17744068592",
						"username": "坤坤",
						"authority": 1,
						"gender": 0,
						"address": "中国江苏省南京市江宁区天赋广场",
						"score": 4,
						"intro": "我是一名热爱猫咪的照顾员，对于这些可爱的小天使们，我充满了无限的爱和耐心。我专业接受过相关的培训和教育，了解猫咪的行为习惯和健康需求，能够为它们提供最贴心的照顾。",
						"id_number": "350102199003261193 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_2.jpg",
						"pet_exp": "作为一名猫咪收养照顾者，我拥有丰富的养宠技能和经验，致力于为每一只可爱的猫咪提供最贴心的照顾。我细心观察猫咪的行为和表情，了解它们的需求和情绪，以便及时发现并解决问题。我了解猫咪对于营养均衡的饮食的重要性，能够为它们提供合理的食谱，确保它们健康成长。我热爱猫咪，愿意陪伴它们玩耍、蹦跳和探索，让它们感受到无微不至的关爱和幸福。",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "7",
						"Longitude": 118.92857104539871,
						"Latitude": 32.04864300203186,
						"Distance": 1.6867,
						"user_id": 7,
						"account": "niganma",
						"password": "123456789",
						"Pets": null,
						"phone": "17734068592",
						"username": "尼甘玛·艾育",
						"authority": 1,
						"gender": 0,
						"address": "中国江苏省南京市江宁区兴安家园",
						"score": 5,
						"intro": "作为一名猫咪照顾员，我不仅仅是为猫咪提供食物和水，更关注它们的身心健康。我定期给猫咪洗澡、梳毛，确保它们的毛发干净整洁；同时，我会为猫咪提供丰富多样的玩具和游戏，使它们在寄养期间不会感到孤单和无聊。",
						"id_number": "653225198608275837",
						"avatar": "http://127.0.0.1:8080/public/img/user_3.jpg",
						"pet_exp": "爱心陪伴，呵护小生命；经验丰富，养宠有道；专业医疗照顾；细心照料，呵护细节。",
						"work_time": 1,
						"pet_num": 2,
						"id_card_photo": "",
						"liked_blog": ""
					},
					{
						"Name": "8",
						"Longitude": 118.92940253019333,
						"Latitude": 32.0514641466822,
						"Distance": 1.9479,
						"user_id": 8,
						"account": "jinitaimei",
						"password": "123456789",
						"Pets": null,
						"phone": "17724068592",
						"username": "姬霓泰煤",
						"authority": 1,
						"gender": 0,
						"address": "中国江苏省南京市江宁区银河湾13栋双子座",
						"score": 4.5,
						"intro": "在照顾猫咪的过程中，我会与主人保持及时的沟通。我会定期向主人报告猫咪的健康状况和生活状态，分享它们的趣事和日常表现，让主人能够放心，安心地将猫咪托付给我照顾。",
						"id_number": "530822198303203350 ",
						"avatar": "http://127.0.0.1:8080/public/img/user_4.jpg",
						"pet_exp": "我作为猫咪收养照顾者，拥有丰富的养宠技能与经验。细心观察每只猫咪的需求和情绪，为它们提供贴心的照顾。我了解猫咪的营养需求，能够提供科学合理的饮食计划。我热爱猫咪，善于与它们互动，创造快乐的时光。专业的医疗知识让我能够守护猫咪的健康。我以责任和爱心，打造一个温暖的家，让每只猫咪都感受到无微不至的关爱与幸福。",
						"work_time": 1,
						"pet_num": 3,
						"id_card_photo": "",
						"liked_blog": ""
					}
				]
			}
		},
		onShow() {
			console.log(store.state.isLogin)
			console.log(store.state.userInfo)
			console.log(store.state.token)
		},
		methods: {
			toCarerList() {
				router.switchTab("/pages/tabBar/carerList/carerList")
			},
			toCarerDetail(index) {
				router.navigateTo({
					url: '/pages/carerDetail/carerDetail?user_info=' + encodeURIComponent(JSON.stringify(this
						.carerList[index])),
				})
			},
			toCommunityDetail(id) {
				router.navigateTo('/pages/communityDetail/communityDetail?blog_id=' + id)
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>