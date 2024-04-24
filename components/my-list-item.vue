<template>
	<view class="item-container" hover-class="bg-light">
		<view class="image-container">
			<image class="avatar" v-if="imgUrl" :src="imgUrl" mode="aspectFit">
			</image>
		</view>
		<view class="label-container">
			<text>{{title}}</text>
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
			title: {
				type: String,
				default: ''
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