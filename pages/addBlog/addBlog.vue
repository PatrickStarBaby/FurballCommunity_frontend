<!-- 发布社区资讯 -->
<template>
	<view class="pd-lr10" style="padding-bottom: 20px;">
		<!-- 资讯标题 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">资讯标题</text>
		</view>
		<input placeholder-class="color-ccc" class="bg-fff h40 pd-lr10 ft-18 bd-rd10" placeholder="请输入资讯标题" />
		
		<!-- 资讯内容 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">资讯内容</text>
		</view>
		<view class="width-full">
			<textarea placeholder-class="color-ccc" auto-focus class="bg-fff pd-lr10 ft-18 bd-rd10"
				placeholder="请输入具体的资讯正文内容"></textarea>
		</view>
		<!-- 资讯宣传轮播图 -->
		<view class="mg-tp15 mg-bt5">
			<text class="ft-18 bold">资讯宣传轮播图</text>
		</view>
		<uni-file-picker class="bg-fff pd-20 bd-rd10" v-model="filePathsList" :image-styles="imageStyles" :auto-upload="false" file-mediatype="image"
			mode="grid" :limit="2" fileMediatype="image" @select="handleSelect" @delete="handleDelete" />
		
		<!-- 提交按钮 -->
		<view class="mg-tp30 ">
			<button class="bd-rd15 box-shadow" style="background-color: #E3D4FD;">提 交 审 核</button>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage.js'
	export default {
		data() {
			return {
				filePathsList: [],
				imgReturnPathList: [], //服务器返回的图片访问路径
				imageStyles: {
					width: 120,
					height: 120,
				},
				uploadImgIndex: 0, //用于将展示图片与上传路径每一项对应起来
			}
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

</style>