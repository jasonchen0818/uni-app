<template>
	<view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000" style="text-align: center;"></uni-popup-message>
		</uni-popup>
	</view>
	<div style="background-color: #fff; width: 100%; height: 100vh;">
		<div style="width: 80%; margin: auto;">
			<uni-section title="日期" type="line">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="date" :end="date" />
			</uni-section>
			<uni-section title="类型" type="line">
				<uni-data-select v-model="range" :localdata="rangeData" />
			</uni-section>
			<uni-section title="跟进详情" type="line">
				<uni-easyinput type="textarea" v-model="details" placeholder="请输入跟进详情" />
			</uni-section>
			<uni-section title="客户目前状态" type="line">
				<uni-data-select v-model="state" :localdata="stateData" />
			</uni-section>
			<button style="background-color: #2979ff; color:#fff;  width: 80%; position: fixed; bottom: 10%;" @click="save">保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				date: '',
				details: '',
				state: null,
				stateData: [{
						value: 0,
						text: "成交",
					},
					{
						value: 1,
						text: "潜在",
					},
					{
						value: 2,
						text: "失败",
					},
					{
						value: 3,
						text: "洽谈",
					}
				],
				range: null,
				rangeData: [{
						value: 0,
						text: "打电话",
					},
					{
						value: 1,
						text: "发微信"
					},
					{
						value: 2,
						text: "拜访"
					},
					{
						value: 3,
						text: "到店"
					},
					{
						value: 4,
						text: "其他"
					}
				],
				msgType: 'success',
				messageText: '跟进保存成功！'
			}
		},
		mounted() {
			setTimeout(() => {
				this.date = Date.now()
			}, 500)
		},
		methods: {
			save() {
				let data = {range: this.range, state: this.state, date: this.date, details: this.details};
				if(this.details != '' && this.state != null && this.range != null)
				{
					this.$request('/guest/followUp', data, 'POST').then(res => {
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