<template>
	<div style="background-color: #fff; width: 100%; height: 100vh;">
		<image :src="avatar" style="width: 200px; height: 200px; border-radius: 50%;" mode="aspectFit"></image>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				avatar: ""
			}
		},
		methods: {
			getAvatar() {
				uni.request({
					url: this.$baseUrl + "/users/getImage",
					method: "GET",
					data: null,
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							this.avatar = res.data.data.avatar;
						}
					}
				})
			}
		},
		mounted() {
			this.getAvatar();
		}
	}
</script>

<style>
</style>