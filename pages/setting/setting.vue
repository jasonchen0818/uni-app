<template>
	<div
		style="text-align: center; background: linear-gradient(to bottom, #a4dbff, #cef0d4); box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); ">
		<image :src="avatar" style="width: 160px; height: 160px; border-radius: 50%; margin: auto; margin-top: 40px;"
			mode="aspectFit"></image>
		<!-- 个人信息表格 -->
		<uni-row>
			<uni-col :span="12">
				<text style="color: #f3993f;">{{infoFormData.userName}}</text>
				<div style="margin-top: 5px; margin-bottom: 20px;">
					<uni-icons type="person" size="20" color="#c7c9ce"></uni-icons>
					<text style="line-height: 20px; color: #969696;">用户</text>
				</div>
			</uni-col>
			<uni-col :span="12">
				<text v-if="infoFormData.roleId == 1" style="color: #17bc17;">超级管理员</text>
				<text v-else-if="infoFormData.roleId == 2" style="color: #17bc17;">管理员</text>
				<text v-else-if="infoFormData.roleId == 3" style="color: #17bc17;">店长</text>
				<text v-else-if="infoFormData.roleId == 4" style="color: #17bc17;">普通员工</text>
				<div style="margin-top: 5px; margin-bottom: 20px;">
					<uni-icons type="medal" size="20" color="#c7c9ce"></uni-icons>
					<text style="line-height: 20px; color: #969696;">职务</text>
				</div>
			</uni-col>
		</uni-row>
	</div>

	<div style="background-color: #fff;margin: 0 auto; margin-top: 40px; width: 90%;">
		<div class="option-container">
			<div class="option">
				<uni-icons type="email" size="20" color="#f3a73f"></uni-icons>
				<text class="option-text">账号：</text>
				<text class="option-text">{{infoFormData.account}}</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="phone" size="20" color="#18bc37"></uni-icons>
				<text class="option-text">联系方式：</text>
				<text class="option-text">{{infoFormData.phoneNumber}}</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="shop" size="20" color="#e43d33"></uni-icons>
				<text class="option-text">所在门店：</text>
				<text class="option-text">{{infoFormData.storeName}}</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="info" size="20" color="#94bcff"></uni-icons>
				<text class="option-text">状态：</text>
				<text v-if="infoFormData.status == 0" style="margin-left: 5px; color: #18bc37; line-height: 20px;">工作中</text>
				<text v-else-if="infoFormData.status == 1"
					style="margin-left: 5px; color: #969696; line-height: 20px;">休息中</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="scan" size="20" color="#f3a73f"></uni-icons>
				<text class="option-text">扫一扫</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="gear" size="20" color="#94bcff"></uni-icons>
				<text class="option-text">设置</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
		<div class="option-container">
			<div class="option">
				<uni-icons type="locked" size="20" color="#e43d33"></uni-icons>
				<text class="option-text">退出登录</text>
			</div>
			<uni-icons type="right" size="22" color="#969696"></uni-icons>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				avatar: uni.getStorageSync('avatar'),
				infoFormData: {
					userName: '',
					account: '',
					storeName: '',
					roleId: null,
					phoneNumber: '',
					status: null
				}
			}
		},
		methods: {
			//这里使用的就是二次封装，不用自己找存在本地的token再写到header了
			//网络请求失败的判断写好了，但是如果后端给的code不是200，就自己在下面加弹出错误提示的逻辑
			//例：如果账号不存在的code是4001，就在下面判断code是4001后，上面加弹窗，然后打开弹窗
			//因为之后展示商品会同时获取大量图片，所以我写了一个第一次获取图片后缓存到本地的操作
			//第二次进入页面就不会再调用接口导致要等待图片加载了
			getAvatar() {
				if (this.avatar == null || this.avatar == "") {
					this.$request('/users/getImage', null, 'GET').then(res => {
						console.log("获取头像成功", res);
						this.avatar = res.avatar;
						uni.setStorageSync('avatar', res.avatar);
					})
				}
			},
			getInfo() {
				this.$request('/users/getInfo', null, 'GET').then(res => {
					console.log(res);
					this.infoFormData = res;
					console.log(this.infoFormData);
					uni.setStorageSync('userInfo', this.infoFormData);  // 缓存个人信息
				})
			}
		},
		mounted() {
			this.getAvatar();
			this.getInfo();
		}
	}
</script>

<style>
	.option-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 10px;
	}

	.option {
		display: flex;
		align-items: center;
	}
	
	.option-text {
		margin-left: 5px;
		color: #969696;
		line-height: 20px;
	}
</style>