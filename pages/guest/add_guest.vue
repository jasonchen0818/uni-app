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
					<uni-easyinput v-model="guestFormData.name" prefixIcon="person" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-section title="性别" type="line" />
				<view>
					<!-- <view class="text">单选选中：{{JSON.stringify(guestFormdata.sex)}}</view> -->
					<uni-data-checkbox v-model="guestFormData.sex" :localdata="sex"></uni-data-checkbox>
				</view>
				<uni-section title="年龄" type="line" />
				<uni-forms-item>
					<uni-easyinput type="number" v-model="guestFormData.age" prefixIcon="calendar" placeholder="年龄" />
				</uni-forms-item>
				<uni-section title="联系方式" type="line" />
				<uni-forms-item>
					<uni-easyinput v-model="guestFormData.phone" prefixIcon="phone" placeholder="电话" />
				</uni-forms-item>
				<uni-forms-item>
					<view>
						<button style="background-color: #18bc37; color:#fff; width: 85px;" @click="add">完成</button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				guestFormData: {
					name: '',
					sex: 0,
					age: null,
					phone: '',
				},
				active: 0,
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
				messageText: '添加客户成功！'
			}
		},
		methods: {
			add() {
				if(this.guestFormData.name != '' && this.guestFormData.age != null && this.guestFormData.phone != '')
				{
					this.$request('/guest/addGuest', this.guestFormData, 'POST').then(res => {
						console.log(res);
					})
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.msgType = "error"
					this.messageText = "请输入完整信息！"
				}
				this.$refs.message.open();
			}
		}
	}
</script>

<style>
</style>