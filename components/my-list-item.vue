<template>
	<view class="item-container" hover-class="bg-light" @click="click">
		<view class="image-container">
			<image class="avatar" v-if="imgUrl" :src="imgUrl" mode="aspectFit">
			</image>
		</view>
		<view class="label-container">
			<text>{{name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgUrl: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			phone: {
				type: String,
				default: ''
			},
			sex: {
				type: Number,
				default: null
			},
			age: {
				type: Number,
				default: null
			},
			state: {
				type: Number,
				default: null
			}
		},
		methods: {
			click() {
				//数据缓存到仓库，让另一个组件调用，之后会消除缓存
				let data = {imgUrl: this.imgUrl, name: this.name, phone: this.phone, sex: this.sex, age: this.age, state: this.state};
				uni.setStorageSync('guestName',data);
				uni.navigateTo({
					url: '/pages/guest/info'
				});
			}
		}
	}
</script>

<style>
	.item-container {
		display: flex;
		background-color: #fff;
	}
	
	.image-container {
		display: flex;
		width: 50px;
		height: 50px;
		align-items: center;
	}
	
	.label-container {
		display: flex;
		margin-left: 5px;
		border-bottom: 1px solid #e9e9eb;
		width: 100%;
		height: 50px;
		align-items: center;
	}
	
	.avatar {
		margin-left: 10px;
		width: 40px;
		height: 40px;
		border-radius: 10%;
	}
</style>