<template>
	<view>
			<uni-section>
				<uni-steps :options="list1" :active="active" />
			</uni-section>
		</view>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			list1:[{
				title: '填写账号密码'
			},{
				title: '填写身份信息'
			},{
				title: '填写门店信息'
			}]
		}
	},
	methods: {
		
	}
}
</script>

<style>
</style>