//总体都是vue3的语法，虽然目前本地pinia仓库还没有完善，但是这个文件包含了你写其他文件要的代码
//类似饿了么，输入u会自己弹出来响应的组件，具体有哪些参照：https://uniapp.dcloud.net.cn/component/
//项目中已经全局导入了uni-UI，无需再显示导入，也就这个东西包含样式了……
//想找什么图标啥的，类似饿了么，在这上面找https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html
//找的时候记得用vue3的代码，不要用vue2的！单页面可能没事，多组件容易报错
<template>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000" style="text-align: center;"></uni-popup-message>
		</uni-popup>
	</view>
	<div style="text-align: center;">
		<image style="width: 200px; height: 200px; margin: 20px auto;" src="../../static/image/head.png" mode="aspectFit" ></image>
	</div>
	<!-- 登录信息填写表格 -->
<!-- 	我把表单的总校验给去掉了，目前在这里没什么用 -->
	<div style="width: 70%; margin: 0 auto;">
		<uni-forms>
			<uni-forms-item>
				<uni-easyinput v-model="loginFormData.account" prefixIcon="person" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput type="password" v-model="loginFormData.password" prefixIcon="locked" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item>
				<button style="background-color: #18bc37; color:#fff; width: 40%;" @click="login">登录</button>
			</uni-forms-item>
			<uni-forms-item>
				<view style="float: left; color: #2979ff;" @click="sign_up">立即注册</view>
				    <view style="float: right; color: #2979ff;">忘记密码</view>
			</uni-forms-item>
		</uni-forms>
	</div>
	
</template>

//登录界面的发送接口的示例，别问我为什么不写setup，问就是写了报错
//好消息是数据不写reactive，用v-model绑定就行
//坏消息是官方文档推荐使用ref，之后报错记得看有没有加.value
	
<script>
	
	export default {
		data() {
			//可以在这里定义静态变量
			return {
				loginFormData: {
					account: 'admin',
					password: 'admin'
				}, //使用了v-model有自动填充，为数不多的好处
				msgType: 'success',
				messageText: '这是一条成功提示',
			}
		},
		methods: {
			//下面是函数和接口的使用，函数你在template用什么名字这里些什么就行，const加不加都行
			//发送请求的标准格式在下面，因为没有二次封装，所以耦合很高
			//要自己读后端返回的code是不是200，底下的succes只是http的code是200而已
			//this.$baseUrl是全局变量，方便联调的时候换真的接口用的，定义在main.js中
			//底下登录展示了没有header时登录的情况，不使用二次封装，二次封装的用法更简单，
			//可在setting中看我直接写好的request函数
			login() {
				uni.request({
					url: this.$baseUrl + "/users/login",
					method: "POST",
					data: this.loginFormData,
					header: {'Authorization': 'Bearer'},
					success: (res) => {
						// console.log(res);
						if (res.data.code == 200) {
							console.log(res.data.data);
							
							//uniapp中有自带的仓库，使用接口调用即可，具体查看官方文档
							try {
								uni.setStorageSync('token', res.data.data.token);
							} catch (err) {
								console.log(err);
							}
							
							//下面三行分别是弹窗的类型、弹窗的内容、以及打开弹窗（2秒自己关）
							this.msgType = "success"
							this.messageText = res.data.message
							this.$refs.message.open();
							
							//官方不用vue自己的路由？？？所以跳转不是名字，用的是前端本地的组件位置
							//这里跳转的函数很多可以上文档看一下，这个Switchtab跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
							uni.switchTab({
								url: '/pages/goods/goods'
							});
						} else {
							this.msgType = "error"
							this.messageText = res.data.message
							this.$refs.message.open();
						}
					},
					fail: (err) => {
						this.msgType = "error"
						this.messageText = err
						this.$refs.message.open();
					},
				});
			},
			sign_up() {
				uni.navigateTo({
					url: '/pages/sign_up/sign_up'
				});
			},
		},
		onLoad() {
			// uni.switchTab({
			// 	url: '/pages/goods/goods'
			// });
		}	
	}
</script>

<style>
</style>