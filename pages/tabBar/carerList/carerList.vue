<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="bd-rd20 width-full box-shadow" style="overflow: hidden;">
			<!-- <map v-if="showMap" id="map" style="width: 100%; height: 250px;" :latitude="latitude" :longitude="longitude"
				:markers="markers" :show-location="true" :circles="circles" scale="14" :controls="controls"
				@controltap="toLoaction">
			</map> -->
			<map v-if="showMap" id="map" style="width: 100%; height: 250px;" :latitude="latitude" :longitude="longitude"
				:markers="markers" :show-location="true" :circles="circles" scale="14" @controltap="toLoaction">
			</map>
		</view>
		<view class="mg-tp15 mg-bt5 flex flex-direction-row flex-jsb flex-ac">
			<text class="ft-18 bold">附近照顾员</text>
			<image class="w25 h25" src="../../../static/icon/list.png" mode="aspectFill"></image>
		</view>
		<view class="">
			<view v-for="(item,index) in carerList" @click="toDetail(index)"
				class="flex flex-direction-row flex-ac h100 bg-fff bd-rd15 mg-tp10 pd-lr10 box-shadow">
				<view class="">
					<image class="w80 h80 bd-rd15" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="flex flex-direction-column mg-lt20" style="width: 72%;">
					<view class="width-full flex flex-direction-row flex-ac flex-jsb">
						<view class="flex flex-ac mg-rt20" style="line-height: 18px;">
							<text class="ft-18 one-line-ellipsis block"
								style="max-width: 90px;">{{item.username}}</text>
							<image v-if="item.gender == 0" class="w20 h20" src="../../../static/icon/female.png"
								mode="aspectFill"></image>
							<image v-else class="w20 h20" src="../../../static/icon/male.png" mode="aspectFill"></image>
						</view>
						<uni-rate :readonly="true" allow-half :value="item.score" />
					</view>
					<view class="mg-tp5">
						<view class="flex">
							<view class="flex flex-ac">
								<uni-icons color="#cccccc" type="location" size="20"></uni-icons>
								<text class="ft-14 color-ccc">距离{{item.Distance}}km</text>
							</view>
							<view class="flex flex-ac mg-lt25">
								<uni-icons color="#cccccc" type="hand-up" size="20"></uni-icons>
								<text class="ft-14 color-ccc">评分{{item.score}}</text>
							</view>
						</view>
						<view class="flex mg-tp5">
							<view class="flex flex-ac">
								<uni-icons color="#cccccc" type="wallet" size="20"></uni-icons>
								<text class="ft-14 color-ccc block one-line-ellipsis"
									style="max-width: 65%;">地址：{{item.address}}</text>
							</view>
							<!-- <view class="flex flex-ac mg-tp5">
								<uni-icons color="#cccccc" type="hand-up" size="20"></uni-icons>
								<text class="ft-14 color-ccc">好评数{{item.acclaim}}</text>
							</view> -->
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
	import {
		BASEIMGURL
	} from '@/utils/env.js'
	import {
		mergeArrays
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				showMap: false,
				nearbyCarer: [], //记录
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 32.034856,
				longitude: 118.936165,
				markers: [],
				circles: [{
					latitude: 32.034856,
					longitude: 118.936165,
					// color: "#BECBE066",
					// fillColor: "#D1DEEE66",
					color: "#AACCEE",
					fillColor: "#AACCEE32",
					radius: 50000,
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
				carerList: []
			}
		},
		created() {
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					this.longitude = res.longitude
					this.latitude = res.latitude
					this.circles[0].longitude = res.longitude
					this.circles[0].latitude = res.latitude
					if (this.$store.state.isLogin) {
						this.sendLocation()
						this.getNearbyCarer()
					}
				},
				fail: (e) => {
					console.log(e)
				},
				complete: () => {
					this.showMap = true
				}
			});
		},
		onShow() {

		},
		onReady() {
			this._mapContext = uni.createMapContext("map", this);
		},
		methods: {
			sendLocation() {
				http.post('/api/setUserLocation', {
					name: this.$store.state.userInfo.user_id + '',
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					if (res.data.code === 1) {

					}
				}).catch(res => {
					console.log(res)
				})
			},
			getNearbyCarer() {
				http.post('/api/getUserLocationRadius', {
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					if (res.data.code === 1) {
						this.nearbyCarer = res.data.data
						this.getUserList()

					}
				}).catch(res => {
					console.log(res)
				})
			},
			getUserList() {
				http.get('/user/getUserList').then(res => {
					if (res.data.code === 1) {
						// 给附近的人数组添加上具体信息
						let mergeList = mergeArrays(this.nearbyCarer, res.data.list.filter(item => item.user_id !=
							this.$store.state.userInfo.user_id))
						// 筛选出其中的照顾员
						let resultList = mergeList.filter((item) =>
							parseInt(item.authority) === 1
						)
						this.carerList = resultList
						console.log(this.carerList)
						let list = []
						for (let item of resultList) {
							item.avatar = BASEIMGURL + item.avatar
							list.push({
								id: parseInt(item.Name),
								title: "老王",
								latitude: item.Latitude,
								longitude: item.Longitude,
								width: 30,
								height: 30,
								iconPath: '../../../static/icon/location.png',
								label: {
									content: item.username,
									color: "#FFF",
									anchorX: -25,
									anchorY: -70,
									borderWidth: 2,
									padding: 10,
									borderRadius: 10,
									bgColor: "#3D80F566",
									borderColor: "#FFFFFF66"
								}
							})
						}
						this.markers = list
						this.showMap = true
					}
				}).catch(res => {
					console.log(res)
				})
			},
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
			toDetail(index) {
				router.navigateTo({
					url: '/pages/carerDetail/carerDetail?user_info=' + encodeURIComponent(JSON.stringify(this
						.carerList[index])),
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>