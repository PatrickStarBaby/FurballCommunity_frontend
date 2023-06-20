<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<!-- 头像 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">上传宠物头像</text>
		</view>
		<uni-file-picker class="" v-model="filePathsList" :image-styles="imageStyles" :auto-upload="false"
			file-mediatype="image" :del-icon="false" disable-preview mode="grid" :limit="1" fileMediatype="image"
			@select="handleSelect" @delete="handleDelete">
			<view class="bg-fff h100 w100 bd-rd50 flex flex-ac flex-jc">
				<uni-icons color="#97CBCE" type="plusempty" size="40"></uni-icons>
			</view>
		</uni-file-picker>
		<!-- 昵称 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">宠物昵称</text>
		</view>
		<input placeholder-class="color-ccc" class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10" placeholder="请输入宠物昵称" />
		<!-- 品种 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">品种</text>
		</view>
		<input placeholder-class="color-ccc" class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10" placeholder="请输入宠物品种" />
		<!-- 性别 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">性别</text>
		</view>
		<radio-group class="flex flex-direction-row" @change="genderRadioChange">
			<label class="radio">
				<radio value="1" />
				<image class="w20 h20" src="../../static/icon/male.png" mode=""></image>
			</label>
			<label class="radio mg-lt20">
				<radio value="0" />
				<image class="w20 h20" src="../../static/icon/female.png" mode=""></image>
			</label>
		</radio-group>
		<!-- 绝育情况 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">绝育情况</text>
		</view>
		<radio-group class="flex flex-direction-row" @change="sterilizationRadioChange">
			<label class="radio">
				<radio value="1" />
				<text>已绝育</text>
			</label>
			<label class="radio mg-lt20">
				<radio value="0" />
				<text>未绝育</text>
			</label>
		</radio-group>
		<!-- 年龄 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">年龄</text>
		</view>
		<input placeholder-class="color-ccc" class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10" placeholder="请输入宠物年龄,例: 2年3个月" />
		<!-- 重量 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">重量</text>
		</view>
		<input placeholder-class="color-ccc" class="uni-input bg-fff h40 pd-lr10 ft-18 bd-rd10" placeholder="请输入宠物重量,例: 3kg" />
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">确 认 提 交</button>
		</view>
	</view>
</template>

<script>
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	import storage from '@/utils/storage.js'
	export default {
		components: {
			uniFilePicker
		},
		data() {
			return {
				pet_id: 0,
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
			this.pet_id = e.pet_id
			console.log(this.pet_id)
		},
		methods: {
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
						that.imgReturnPathList = [{
							url: res.paths[0],
							name: "",
							index
						}]
						console.log('imgReturnPathList', that.imgReturnPathList);
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
			sterilizationRadioChange(e){
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