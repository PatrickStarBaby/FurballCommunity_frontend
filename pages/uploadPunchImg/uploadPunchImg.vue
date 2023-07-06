<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">选择打卡图片</text>
		</view>
		<uni-file-picker class="bg-fff pd-20 bd-rd15" v-model="filePathsList" :image-styles="imageStyles"
			:auto-upload="false" file-mediatype="image" mode="grid" :limit="1" fileMediatype="image"
			@select="handleSelect" />
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button @click="commit" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">确 认 提 交</button>
		</view>
	</view>
</template>

<script>
	import http from '@/utils/http/'
	import router from '@/router/index.js'
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	import storage from '@/utils/storage.js'
	import {
		punch,
		imgPunch,
	} from '@/utils/utils.js'

	export default {
		components: {
			uniFilePicker
		},
		data() {
			return {
				order_info: {},
				date: "",
				filePathsList: [],
				imgReturnPathList: [], //服务器返回的图片访问路径
				imageStyles: {
					width: 120,
					height: 120,
				},
				uploadImgIndex: 0, //用于将展示图片与上传路径每一项对应起来
			}
		},
		onLoad(e) {
			this.order_info = JSON.parse(decodeURIComponent(e.order_info))
			this.date = e.date
		},
		methods: {
			commit() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定提交吗？',
					success: function(res) {
						if (res.confirm) {
							// 如果是修改调用修改接口，否则是新增
							http.put(`/order/updateOrderInfo/${that.order_info.order_id}`, {
								check_in_pictures: imgPunch(that.order_info.check_in_pictures, that
									.imgReturnPathList[0].url, that.order_info.start_time, that
									.order_info.end_time, that.date),
								check_in_status: punch(that.order_info.check_in_status, that.order_info
									.start_time, that.order_info.end_time, that.date)
							}).then(res => {
								if (res.data.code === 1) {
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
									});
									router.navigateTo({
										url: '/pages/receivePunch/receivePunch?order_info=' +
											encodeURIComponent(JSON.stringify(res.data.data)),
									})
								}
							}).catch(res => {
								console.log(res)
							})
						} else if (res.cancel) {}
					}
				});
			},
			async handleSelect(res) {
				for (let item of res.tempFilePaths) {
					//为了适配所有平台，每循环一次就调用接口上传一次
					await this.uploadImg(item, this.uploadImgIndex++);
				}
			},

			handleDelete(err) {
				this.imgReturnPathList.sort(this.sortByindex)
				// console.log(this.imgReturnPathList)
				// 删除显示图片
				const num1 = this.filePathsList.findIndex(v => v.url === err.tempFilePath);
				// console.log(num1)
				this.filePathsList.splice(num1, 1);
				// 删除图片上传到服务器的相应路径
				this.imgReturnPathList.splice(num1, 1);
				// console.log(this.imgReturnPathList)
			},

			async uploadImg(tempFilePath, index) {
				let that = this
				await uni.uploadFile({
					url: '/baseUrl/api/multiUpload', //后台地址
					filePath: tempFilePath,
					header: {
						'Authorization': 'Bearer ' + storage.getToken(),
						'UserId': storage.getUserInfo().user_id ? storage.getUserInfo().user_id : ''
					},
					name: 'file',
					success: (uploadFileRes) => {
						var res = JSON.parse(uploadFileRes.data)
						//每循环一次就把后台返回的图片地址添加到imgReturnPathList数组
						that.imgReturnPathList.push({
							url: res.paths[0],
							name: "",
							index
						})
						// console.log('imgReturnPathList', that.imgReturnPathList);
					}
				});
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},

			sortByindex(a, b) {
				if (a.index < b.index) {
					return -1;
				} else if (a.index > b.index) {
					return 1;
				} else if (a.index == b.index) {
					return 0;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input {}
</style>