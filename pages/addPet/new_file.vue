<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<uni-file-picker class="" v-model="filePathsList" :image-styles="imageStyles" :auto-upload="false" file-mediatype="image"
			mode="grid" :limit="9" fileMediatype="image" @select="handleSelect" @delete="handleDelete" />
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">宠物姓名</text>
		</view>
		<input class="uni-input bg-fff h40 pd-lr10 ft-18" placeholder="自动获得焦点" />
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
				pet_id:0,
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
.uni-input{
	
}
</style>
