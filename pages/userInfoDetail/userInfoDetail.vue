<!-- 用户信息详情 -->
<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<!-- 头像 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">用户头像</text>
		</view>
		<uni-file-picker class="" v-model="filePathsList" :image-styles="imageStyles" :auto-upload="false"
			file-mediatype="image" :del-icon="false" disable-preview mode="grid" :limit="1" fileMediatype="image"
			@select="handleSelect">
			<view class="bg-fff h100 w100 bd-rd50 flex flex-ac flex-jc">
				<uni-icons color="#97CBCE" type="plusempty" size="40"></uni-icons>
			</view>
		</uni-file-picker>
		<!-- 昵称 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">昵称</text>
		</view>
		<input v-model="username" placeholder-class="color-ccc" class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10"
			placeholder="请输入昵称" />
		<!-- 账号 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">账号</text>
		</view>
		<input v-model="account" placeholder-class="color-ccc" disabled
			class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10" />
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button @click="commit" class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">确 认 提 交</button>
		</view>
	</view>
</template>

<script>
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	import storage from '@/utils/storage.js'
	import http from '@/utils/http/'
	import {
		BASEIMGURL
	} from '@/utils/env.js'
	export default {
		components: {
			uniFilePicker
		},
		data() {
			return {
				user_id: 0,
				account: '',
				username: '',
				avatar: '',
				filePathsList: [],
				imgReturnPathList: [], //服务器返回的图片访问路径
				imageStyles: {
					width: 120,
					height: 120,
					border: {
						radius: "50%"
					}
				},
				uploadImgIndex: 0, //用于将展示图片与上传路径每一项对应起来
			}
		},
		onLoad(e) {
			this.init()
		},
		methods: {
			init() {
				this.user_id = this.$store.state.userInfo.user_id
				this.account = this.$store.state.userInfo.account
				this.username = this.$store.state.userInfo.username
				this.avatar = this.$store.state.userInfo.avatar
			},
			commit(){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定提交吗？',
					success: function (res) {
						if (res.confirm) {
							http.put(`/user/updateUserInfo/${that.user_id}`,{
								username: that.username,
								avatar: that.avatar
							}).then(res => {
								if (res.data.code === 1) {
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
										duration: 3000
									});
								}
							}).catch(res => {
								console.log(res)
							})
						} else if (res.cancel) {
						}
					}
				});
			},
			
			async handleSelect(res) {
				for (let item of res.tempFilePaths) {
					//为了适配所有平台，每循环一次就调用接口上传一次
					await this.uploadImg(item, this.uploadImgIndex++);
				}
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
						that.imgReturnPathList = [{
							url: res.paths[0],
							name: "",
							index
						}]
						this.avatar = res.paths[0]
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

			genderRadioChange(e) {
				console.log(e.detail.value)
			},
			sterilizationRadioChange(e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input {}

	.radio {
		display: flex;
		align-items: center;
	}
</style>