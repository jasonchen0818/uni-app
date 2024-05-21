<template>
	<view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000" style="text-align: center;"></uni-popup-message>
		</uni-popup>
	</view>
	<div style="background-color: #fff; width: 100%; height: 100vh;">
		<div style="width: 80%; margin: auto;">
			<uni-forms ref="guestForm" :modelValue="guestFormData">
				<uni-section title="姓名" type="line" />
				<uni-forms-item>
					<uni-easyinput v-model="data.name" prefixIcon="person" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-section title="性别" type="line" />
				<view>
					<!-- <view class="text">单选选中：{{JSON.stringify(guestFormdata.sex)}}</view> -->
					<uni-data-checkbox v-model="data.sex" :localdata="sex"></uni-data-checkbox>
				</view>
				<uni-section title="年龄" type="line" />
				<uni-forms-item>
					<uni-easyinput type="number" v-model="data.age" prefixIcon="calendar" placeholder="年龄" />
				</uni-forms-item>
				<uni-section title="联系方式" type="line" />
				<uni-forms-item>
					<uni-easyinput v-model="data.phone" prefixIcon="phone" placeholder="电话" />
				</uni-forms-item>
			</uni-forms>
			<button style="background-color: #2979ff; color:#fff;  width: 80%; position: fixed; bottom: 10%;" @click="save">保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data:{},
				sex: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '未知',
					value: 2
				}],
				msgType: 'success',
				messageText: '修改保存成功！'
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
			save() {
				if(this.data.name != '' && this.data.sex != null && this.data.age != null && this.data.phone != '')
				{
					this.$request('/guest/followUp', this.data, 'POST').then(res => {
						console.log(res);
					})
					this.$refs.message.open();
					setTimeout(() => {
					    uni.navigateBack({
					        delta: 1
					    });
					}, 2000);
				}else{
					this.msgType = "error"
					this.messageText = "请输入完整信息！"
					this.$refs.message.open();
				}
			}
		}
	}
</script>

<style>
</style>