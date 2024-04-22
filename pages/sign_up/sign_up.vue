<template>
	<div style="background-color: #fff; width: 100%; height: 100vh;">
		<view>
			<uni-section>
				<uni-steps :options="list1" :active="active" />
			</uni-section>
		</view>
		<!-- 填写账号密码 -->
		<div v-if="active == 0" style="width: 70%; margin: 50px auto;">
			<uni-forms ref="signUpForm" :modelValue="signUpFormData">
				<uni-section title="账号" type="line" />
				<uni-forms-item>
					<uni-easyinput v-model="signUpFormData.account" prefixIcon="person" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-section title="密码" type="line" />
				<uni-forms-item>
					<uni-easyinput type="password" v-model="signUpFormData.password" prefixIcon="locked" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item>
					<view style="float: right;">
						<button style="background-color: #2979ff; color:#fff; width: 85px;" @click="next">下一步</button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</div>

		<!-- 填写身份信息 -->
		<div v-if="active == 1" style="width: 70%; margin: 50px auto;">
			<uni-forms ref="signUpForm" :modelValue="signUpFormData">
				<uni-section title="姓名" type="line" />
				<uni-forms-item>
					<uni-easyinput v-model="signUpFormData.name" prefixIcon="person" placeholder="真实姓名" />
				</uni-forms-item>
				<uni-section title="性别" type="line" />
				<uni-forms-item>
					<uni-easyinput type="password" v-model="signUpFormData.gender" prefixIcon="locked" placeholder="性别" />
				</uni-forms-item>
				<uni-section title="电话号码" type="line" />
				<uni-forms-item>
					<uni-easyinput type="password" v-model="signUpFormData.phone" prefixIcon="locked" placeholder="电话号码" />
				</uni-forms-item>
				<uni-forms-item>
					<view style="float: left;">
						<button style="background-color: #8f939c; color:#fff; width: 85px;" @click="back">上一步</button>
					</view>
					<view style="float: right;">
						<button style="background-color: #2979ff; color:#fff; width: 85px;" @click="next">下一步</button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</div>

		<!-- 填写门店信息 -->
		<div v-if="active == 2" style="width: 70%; margin: 50px auto;">
			<uni-forms ref="signUpForm" :modelValue="signUpFormData">
				<uni-forms-item>
					<view style="float: left;">
						<button style="background-color: #8f939c; color:#fff;  width: 85px;" @click="back">上一步</button>
					</view>
					<view style="float: right;">
						<button style="background-color: #18bc37; color:#fff;  width: 85px;">完成</button>
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
				signUpFormData: {},
				active: 0,
				list1: [{
					title: '填写账号密码'
				}, {
					title: '填写身份信息'
				}, {
					title: '填写门店信息'
				}]
			}
		},
		methods: {
			next() {
				this.active = this.active + 1;
			},
			back() {
				this.active = this.active - 1;
			}
		}
	}
</script>

<style>
</style>