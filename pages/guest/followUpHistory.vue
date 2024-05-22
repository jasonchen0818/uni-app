<template>
	<div class="option-container" @click="followUp">
		<div class="option">
			<text class="option-text">新的跟进</text>
		</div>
		<uni-icons type="right" size="22" color="#969696"></uni-icons>
	</div>
	<div v-for="(item,index) in list" :key="index">
		<uni-collapse>
			<uni-collapse-item titleBorder="none">
				<template v-slot:title>
					<uni-list>
						<uni-list-item v-if="item.state == 0" :title="item.date" rightText="成交" />
						<uni-list-item v-if="item.state == 1" :title="item.date" rightText="潜在" />
						<uni-list-item v-if="item.state == 2" :title="item.date" rightText="失败" />
						<uni-list-item v-if="item.state == 3" :title="item.date" rightText="洽谈" />
					</uni-list>
				</template>
				<view class="content" style="margin-left: 20px;">
					<view>
						<uni-section title="跟进结果" type="line">
							<text v-if="item.state == 0">成交</text>
							<text v-if="item.state == 1">潜在</text>
							<text v-if="item.state == 2">失败</text>
							<text v-if="item.state == 3">洽谈</text>
						</uni-section>
					</view>
					<view>
						<uni-section title="跟进方式" type="line">
							<text v-if="item.range == 0">打电话</text>
							<text v-if="item.range == 1">发微信</text>
							<text v-if="item.range == 2">拜访</text>
							<text v-if="item.range == 3">到店</text>
							<text v-if="item.range == 4">其他</text>
						</uni-section>
					</view>
					<view>
						<uni-section title="跟进详情" type="line">
							<text>{{item.details}}</text>
						</uni-section>
					</view>
				</view>

			</uni-collapse-item>
		</uni-collapse>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				data: {},
				querry: {
					name: '',
					phone: ''
				}
			}
		},
		mounted() {
			this.history();
		},
		methods: {
			history() {
				let data = uni.getStorageSync('guestName');
				this.data = data;
				uni.removeStorageSync('guestName');
				this.querry.name = this.data.name;
				this.querry.phone = this.data.phone;
				this.$request('/guest/followHistory', this.querry, 'POST').then(res => {
					this.list = res;
					console.log(this.list);
				})
			},
			followUp() {
				uni.setStorageSync('guestName', this.data);
				uni.navigateTo({
					url: '/pages/guest/followUp'
				});
			},
		}
	}
</script>

<style>
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