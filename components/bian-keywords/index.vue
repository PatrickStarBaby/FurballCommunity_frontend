<template>
	<view class="mark" :class="[show_key ? '' : 'hidden']">
		<view class="kong"></view>
		<!-- 信息框 -->
		<view class="msg">
			<!-- 关闭按钮 -->
			<view class="img iconfont icon-guanbi" @tap="closeFuc">
				<uni-icons size="30" type="close"></uni-icons>
			</view>
			<view class="title">
				请输入支付密码
			</view>
			<view class="subTitle" v-show="show_subTitle">
				付款¥{{price}}
			</view>
			<view class="pswBox">
				<view v-for="(item,index) in 6" :key="index" class="content_item">{{password[index] ? '●' : ''}}</view>
			</view>
			<view class="forget" @tap="forgetFuc">找回密码</view>
		</view>
		<!-- 数字键盘 -->
		<view class="numeric">
			<!-- <view class="num" v-for="item in 12" :key="item" :class="item == 9 ? 'amend1' : item == 11 ? 'amend3 iconfont icon-backspace' : ''" @tap="press({num:item+1})">
				{{item == 9 ? '' : item == 10 ? item - 10 : item == 11 ? '': item+1}}
			</view> -->
			<view class="num" v-for="item in num" :key="item" :class="item == 10 ? 'amend1':''" @tap="press({num:item})">
				<view v-if="item<=9">{{item}}</view>
				<view v-if="item==11">0</view>
				<view v-if="item == 12" class=" flex flex-ac flex-jc" style="height: 100%;">
					<image class="w30 h30" src="../../static/icon/del.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show_key:Boolean,
			price:String,
			show_subTitle:{
				default:true
			},
		},
		data () {
			return { 
				num:[1,2,3,4,5,6,7,8,9,10,11,12],
				password:"",
			}
		},
		created() {
		},
		methods:{
			press (obj) {
				let num = obj.num
				if (obj.num == 10) {
					console.log('我是10我什么都不干')
				} else if (obj.num == 12) {
					this.password = this.password.slice(0,this.password.length-1);
				} else if (obj.num == 11) {
					num = '0'
					this.password += num;
				} else {
					this.password += num;
				}
				if (this.password.length == 6) {
					this.$emit('getPassword',{password:this.password})
					this.password = "";
					// uni.showModal({
					// 	title:'密码',
					// 	content:this.password,
					// 	success: () => {
					// 		this.password = "";
					// 	}
					// })
				}
			},
			// 关闭支付页面
			closeFuc () {
				console.log('关闭支付页面');
				this.$emit("closeFuc",false)
			},
			// 找回密码
			forgetFuc () {
				uni.navigateTo({
					url:'/pages/mine/myWallet/changezfPwd/changezfPwd'
				})
			}
		}
	}
</script>

<style>
	.mark{
		width: 750upx;
		background: rgba(0,0,0,0.7);
		padding: 0 0 500upx 0;
		position: fixed;
		top: 0upx;
		left: 0upx;
		z-index: 99;
	}
	.hidden{
		display: none;
	}
	.kong{
		width: 750upx;
		height: 450upx;
	}
	.msg{
		width: 550upx;
		height: 450upx;
		background: rgba(255,255,255,1);
		border-radius: 20upx;
		margin: 0 auto;
		animation: msgBox .2s linear;
	}
	@keyframes msgBox{
		0%{
			transform:translateY(50%);
			opacity: 0;
		}
		50%{
			transform:translateY(25%);
			opacity: 0.5;
		}
		100%{
			transform:translateY(0%);
			opacity: 1;
		}
	}
	@keyframes numBox{
		0%{
			transform:translateY(50%);
			opacity: 0;
		}
		50%{
			transform:translateY(25%);
			opacity: 0.5;
		}
		100%{
			transform:translateY(0%);
			opacity: 1;
		}
	}
	.msg>.img{
		padding: 20upx 0 0 20upx;
		font-size: 40upx;
	}
	.msg>.title{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-weight: 500;
		font-size: 36upx;
		text-align: center;
	}
	.msg>.subTitle{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-weight: 600;
		font-size: 40upx;
		text-align: center;
	}
	.pswBox{
		width: 80%;
		height: 80upx;
		margin: 50upx auto 0;
		display: flex;
	}
	.content_item{
		flex: 2;
		text-align: center;
		line-height: 80upx;
		border: 1upx solid #D6D6D6;
		border-right: 0upx solid;
	}
	.content_item:nth-child(1){
		border-radius: 10upx 0 0 10upx;
	}
	.content_item:nth-child(6){
		border-right: 1upx solid #D6D6D6;
		border-radius: 0 10upx 10upx 0;
	}
	.numeric{
		width: 750upx;
		height: 440upx;
		border: 1upx solid;
		position: fixed;
		z-index: 98;
		bottom: 0upx;
		background-color: #CCCFD6;
		animation: msgBox .2s linear;
	}
	.num{
		width: 222upx;
		height: 90upx;
		font-size: 42upx;
		font-weight: 500;
		line-height: 90upx;
		text-align: center;
		vertical-align: middle;
		margin: 12upx 12upx 0 12upx;
		display: inline-block;
		border: 1upx solid #999999;
		border-radius: 10upx;
		background-color: #FFFFFF;
		position: relative;
		z-index: 99;
	}
	.forget{
		font-size: 28upx;
		font-weight: 500;
		color: #3D84EA;
		text-align: center;
		line-height: 80upx;
	}
	.amend1{
		border: 1upx solid #CCCFD6;
		background-color: #CCCFD6;
	}
	.amend3{
		font-size: 60upx;
		border: 1upx solid #CCCFD6;
		background-color: #CCCFD6;
	}
	/* .amend11{
		position: absolute;
		top: 313upx;
		left: 0upx;
		background-color: #CCCFD6;
		border: 1upx solid #FF0000;
	}
	.amend1{
		height: 100upx !important;
		position: absolute;
		top: 306upx;
		left: 0upx;
		z-index: 99;
		background-color: #CCCFD6;
		border: 2upx solid #CCCFD6;
	}
	.amend2{
		position: absolute;
		top: 306upx;
		left: 250upx;
		z-index: 99;
	}
	.amend3{
		position: absolute;
		top: 306upx;
		left: 500upx;
		z-index: 99;
		font-size: 60upx;
		border: 0upx;
		background-color: #CCCFD6;
	} */
	
</style>