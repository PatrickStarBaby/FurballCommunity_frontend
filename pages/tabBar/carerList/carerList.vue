<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="bd-rd20 width-full box-shadow" style="overflow: hidden;">
			<map v-if="showMap" id="map" style="width: 100%; height: 250px;" :latitude="latitude" :longitude="longitude"
				:markers="markers" :show-location="true" :circles="circles" scale="14" :controls="controls"
				@controltap="toLoaction">
			</map>
		</view>
		<view class="mg-tp15 mg-bt5 flex flex-direction-row flex-jsb flex-ac">
			<text class="ft-18 bold">附近照顾员</text>
			<image class="w25 h25" src="../../../static/icon/list.png" mode="aspectFill"></image>
		</view>
		<view class="">
			<view v-for="item in carerList" @click="toDetail(item.user_id)"
				class="flex flex-direction-row flex-ac h100 bg-fff bd-rd15 mg-tp10 pd-lr10 box-shadow">
				<image class="w80 h80 bd-rd15" :src="item.avatar" mode="aspectFill"></image>
				<view class="flex flex-direction-column mg-lt20">
					<view class=" flex flex-direction-row flex-ac flex-jsb">
						<text class="ft-18 mg-rt20">{{item.name}}</text>
						<uni-rate :readonly="true" allow-half :value="item.score" />
					</view>
					<view class="flex flex-ac mg-tp5">
						<view class="flex flex-direction-column">
							<view class="flex flex-ac">
								<uni-icons color="#cccccc" type="location" size="20"></uni-icons>
								<text class="ft-14 color-ccc">距离{{item.distance}}km</text>
							</view>
							<view class="flex flex-ac mg-tp5">
								<uni-icons color="#cccccc" type="chat" size="20"></uni-icons>
								<text class="ft-14 color-ccc">{{item.commentNum}}条评论</text>
							</view>
						</view>
						<view class="flex flex-direction-column mg-lt25">
							<view class="flex flex-ac">
								<uni-icons color="#cccccc" type="wallet" size="20"></uni-icons>
								<text class="ft-14 color-ccc">已接单数{{item.oderNum}}</text>
							</view>
							<view class="flex flex-ac mg-tp5">
								<uni-icons color="#cccccc" type="hand-up" size="20"></uni-icons>
								<text class="ft-14 color-ccc">好评数{{item.acclaim}}</text>
							</view>
						</view>
					</view>
				</view>
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
				showMap: false,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 32.034856,
				longitude: 118.936165,
				markers: [{
					id: 10,
					title: "老王",
					latitude: 32.03,
					longitude: 118.9342,
					width: 30,
					height: 30,
					iconPath: '../../../static/icon/location.png',
					label: {
						content: "卿卿如我",
						color: "#FFF",
						anchorX: -25,
						anchorY: -70,
						borderWidth: 2,
						padding: 10,
						borderRadius: 10,
						bgColor: "#3D80F566",
						borderColor: "#FFFFFF66"
					}
				}, {
					id: 11,
					title: "老王231",
					latitude: 32.032,
					longitude: 118.942,
					width: 30,
					height: 30,
					iconPath: '../../../static/icon/location.png',
					label: {
						content: "老王",
						color: "#FFF",
						anchorX: -25,
						anchorY: -70,
						borderWidth: 2,
						padding: 10,
						borderRadius: 10,
						bgColor: "#3D80F566",
						borderColor: "#FFFFFF66"
					}
				}],
				circles: [{
					latitude: 32.034856,
					longitude: 118.936165,
					// color: "#BECBE066",
					// fillColor: "#D1DEEE66",
					color: "#AACCEE",
					fillColor: "#AACCEE32",
					radius: 5000,
					strokeWidth: 2,
				}],
				controls: [{
					position: {
						left: 10,
						top: 260,
						width: 30,
						height: 30
					},
					iconPath: "../../../static/icon/fixed_position.png",
					clickable: true
				}],
				carerList: [{
						user_id: 1,
						avatar: "../../../static/swiper/swiper_5.jpg",
						name: "坤坤",
						score: 4.5, //0~5,可以有0.5
						distance: 9.8,
						oderNum: 288,
						commentNum: 98,
						acclaim: 89
					},
					{
						user_id: 2,
						avatar: "../../../static/swiper/swiper_3.jpg",
						name: "大卫",
						score: 5, //0~5,可以有0.5
						distance: 7.2,
						oderNum: 187,
						commentNum: 198,
						acclaim: 98
					},
					{
						user_id: 3,
						avatar: "../../../static/swiper/swiper_1.jpg",
						name: "爱坤",
						score: 3.5, //0~5,可以有0.5
						distance: 0.8,
						oderNum: 897,
						commentNum: 63,
						acclaim: 49
					},
					{
						user_id: 4,
						avatar: "../../../static/swiper/swiper_2.jpg",
						name: "姬霓泰煤",
						score: 4.5, //0~5,可以有0.5
						distance: 6.5,
						oderNum: 178,
						commentNum: 66,
						acclaim: 89
					},
					{
						user_id: 5,
						avatar: "../../../static/swiper/swiper_4.jpg",
						name: "食不食油饼",
						score: 2.5, //0~5,可以有0.5
						distance: 0.98,
						oderNum: 397,
						commentNum: 54,
						acclaim: 35
					},
				]
			}
		},
		created() {
		},
		onShow() {
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					this.longitude = res.longitude
					this.latitude = res.latitude
					this.circles[0].longitude = res.longitude
					this.circles[0].latitude = res.latitude
					this.showMap = true
				},
				fail: (e) => {
					console.log(e)
				},
				complete: () => {
					this.showMap = true
				}
			});
		},
		onReady() {
			this._mapContext = uni.createMapContext("map", this);
		},
		methods: {
			toLoaction() {
				// this._mapContext = uni.createMapContext("map", this);
				this._mapContext.moveToLocation({
					longitude: this.longitude,
					latitude: this.latitude,
					success: (res) => {},
					fail: (res) => {
						console.log(res)
					},
					complete: () => {}
				})
			},
			toDetail(user_id) {
				router.navigateTo({
					url: '/pages/carerDetail/carerDetail?user_id=' + user_id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>