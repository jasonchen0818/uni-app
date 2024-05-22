<template>
	<view class="item-container" hover-class="bg-light">
		<view class="image-container">
			<image class="avatar" :src="data.imgUrl" mode="aspectFit">
			</image>
		</view>
		<view class="label-container">
			<text>{{data.name}}</text>
			<text style="color: #969696;">{{data.phone}}</text>
		</view>
	</view>
	<div class="option-container" @click="consume">
		<div class="option">
			<text class="option-text">消费记录</text>
		</div>
		<uni-icons type="right" size="22" color="#969696"></uni-icons>
	</div>
	<div class="option-container" @click="followUp">
		<div class="option">
			<text class="option-text">跟进</text>
		</div>
		<uni-icons type="right" size="22" color="#969696"></uni-icons>
	</div>
	<div class="option-container" @click="edit">
		<div class="option">
			<text class="option-text">编辑</text>
		</div>
		<uni-icons type="right" size="22" color="#969696"></uni-icons>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad() {
			let data = uni.getStorageSync('guestName');
			// console.log(data);
			this.data = data;
			//拿到数据后消除缓存
			uni.removeStorageSync('guestName');
		},
		methods: {
			followUp() {
				uni.setStorageSync('guestName', this.data);
				uni.navigateTo({
					url: '/pages/guest/followUpHistory'
				});
			},
			consume() {
				uni.setStorageSync('guestName', this.data);
				uni.navigateTo({
					url: '/pages/guest/consumptionHistory'
				});
			},
			edit() {
				uni.setStorageSync('guestName', this.data);
				uni.navigateTo({
					url: '/pages/guest/edit'
				});
			}
		}
	}
</script>

<style>
	.item-container {
		display: flex;
		align-items: center;
		background-color: #fff;
		height: 150px;
	}

	.image-container {
		display: flex;
		width: 100px;
		height: 100px;
		align-items: center;
	}

	.label-container {
		display: flex;
		flex-direction: column;
		margin-left: 20px;
		width: 100%;
		height: 50px;
		align-items: flex-start;
		/* 左对齐 */
	}

	.avatar {
		margin-left: 20%;
		width: 100px;
		height: 100px;
		border-radius: 10%;
	}

	.option-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 10px;
		background-color: #fff;
		margin-top: 5px;
	}

	.option {
		display: flex;
		align-items: center;
	}

	.option-text {
		margin-left: 5px;
		line-height: 20px;
	}
</style>