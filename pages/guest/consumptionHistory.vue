<template>
	<div class="container">
		<!-- 个人信息展示 -->
		<div
			style="text-align: center; background-color: #fff; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); border-radius: 20; margin-bottom: 10px;">
			<view style="display: flex; align-items: center; background-color: #fff; height: 120px;">
				<view style="display: flex; width: 100px; height: 100px; align-items: center;">
					<image style="margin-left: 20%; width: 100px; height: 100px; border-radius: 10%;" :src="data.imgUrl"
						mode="aspectFit">
					</image>
				</view>
				<view style="display: flex; flex-direction: column; margin-left: 20px;
		width: 100%; height: 50px; align-items: flex-start;">
					<text>{{data.name}}</text>
					<text style="color: #969696;">{{data.phone}}</text>
				</view>
			</view>
			<!-- 订单统计 -->
			<uni-row>
				<uni-col :span="12">
					<text style="color: #f3993f;"></text>
					<div style="margin-top: 5px; margin-bottom: 5px;">
						<uni-icons type="wallet" size="20" color="#c7c9ce"></uni-icons>
						<text style="line-height: 20px; color: #969696;">总计消费</text>
					</div>
					<text style="color: #e43d33;">{{totalMoney}}</text>
				</uni-col>
				<uni-col :span="12">
					<div style="margin-top: 5px; margin-bottom: 5px;">
						<uni-icons type="cart" size="20" color="#c7c9ce"></uni-icons>
						<text style="line-height: 20px; color: #969696;">已完成订单数</text>
					</div>
					<text style="color: #e43d33;">{{totalOrder}}</text>
				</uni-col>
			</uni-row>
		</div>
		<div v-if="recentOrders.length">
			<h2>近一个月订单</h2>
			<list-view class="order-list">
				<list-item v-for="order in recentOrders" :key="order.id" class="order-list-item" @click="toInfo(order.id)">
					<div class="leftBlock">
						<div class="productName">{{order.productName}}</div>
						<img class="img" :src="order.img" alt="">
						<div class="dateTime">{{order.dateTime}}</div>
					</div>
					<div class="rightBlock">
						<div class="status" :style="{backgroundColor: order.status==='已完成'?'#92f26f':'#ffacaa'}">
							{{order.status}}
						</div>
						<div class="customerName">业务员: {{order.guestName}}</div>
						<div class="totalPrice">总价: ￥{{order.totalPrice}}</div>
						<div style="color: gray;">详情<uni-icons type="right"></uni-icons></div>
					</div>
				</list-item>
			</list-view>
		</div>
		<div v-if="olderOrders.length">
			<h2>更久以前</h2>
			<list-view class="order-list">
				<list-item v-for="order in olderOrders" :key="order.id" class="order-list-item" @click="toInfo(order.id)">
					<div class="leftBlock">
						<div class="productName">{{order.productName}}</div>
						<img class="img" :src="order.img" alt="">
						<div class="dateTime">{{order.dateTime}}</div>
					</div>
					<div class="rightBlock">
						<div class="status" :style="{backgroundColor: order.status==='已完成'?'#92f26f':'#ffacaa'}">
							{{order.status}}
						</div>
						<div class="customerName">业务员: {{order.guestName}}</div>
						<div class="totalPrice">总价: ￥{{order.totalPrice}}</div>
						<div style="color: gray;">详情<uni-icons type="right"></uni-icons></div>
					</div>
				</list-item>
			</list-view>
		</div>
	</div>
	<uni-fab v-show="isShowTopBtn" :pattern="{icon: 'arrow-up'}" horizontal="right" :popMenu="false"
		@fabClick="topBack"></uni-fab>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: '', // 搜索
				statusQuery: '', // 状态筛选
				sortKey: '1dateTime', // 排序字段，开头0表示升序，1表示降序
				isShowTopBtn: false, // 显示回到顶部按钮
				orders: [{
						id: 1,
						productName: "面膜",
						customerName: "AAA农村土鸡蛋批发王姐",
						totalPrice: "58.6",
						status: "已完成",
						dateTime: '2024-05-01 19:38:06',
						img: "http://dummyimage.com/400x400"
					},
					{
						id: 2,
						productName: "黑头你好，黑头再见",
						customerName: "小花",
						totalPrice: "399.6",
						status: "已取消",
						dateTime: '2024-05-03 09:15:47',
						img: "http://dummyimage.com/150x150"
					}
				],
				data: {}, //客户数据
				totalOrder: 0, //订单总数
				totalMoney: 0, //订单总额
				querry: {
					name: '',
					phone: ''
				}
			};
		},
		computed: {
			//这里没有对订单的日期进行排序，只是进行了是否在一个月内的分类
			recentOrders() {
				const oneMonthAgo = new Date();
				oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
				return this.orders.filter(order => new Date(order.dateTime) >= oneMonthAgo);
			},
			olderOrders() {
				const oneMonthAgo = new Date();
				oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
				return this.orders.filter(order => new Date(order.dateTime) < oneMonthAgo);
			}
		},
		mounted() {
			this.getinfo();
			this.calculateTotals();
		},
		methods: {
			getinfo() {
				let data = uni.getStorageSync('guestName');
				this.data = data;
				uni.removeStorageSync('guestName');
				this.querry.name = this.data.name;
				this.querry.phone = this.data.phone;
			},
			calculateTotals() {
				this.totalOrder = this.orders.filter(order => order.status === "已完成").length;
				this.totalMoney = this.orders.reduce((sum, order) => {
					if (order.status === "已完成") {
						return sum + parseFloat(order.totalPrice);
					}
					return sum;
				}, 0).toFixed(2); // 保留两位小数
			},
			sortOrders(key) {
				this.sortKey = key;
			},
			toInfo(id) {
				uni.navigateTo({
					url: '/pages/order/info?id=' + id
				})
			},
			topBack() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		},
		onLoad: function() {
			this.$request('/guest/consumptionHistory', this.querry, 'POST').then(res => {
				this.orders = res;
				this.calculateTotals(); // 重新计算总数和总金额
			});
		},
		onPullDownRefresh: function() {
			this.$request('/guest/consumptionHistory', this.querry, 'POST').then(res => {
				this.orders = res;
				this.calculateTotals(); // 重新计算总数和总金额
				uni.stopPullDownRefresh();
				return;
			});
			// 设置超时结束刷新动画
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 3000);
		},
		onPageScroll(e) {
			if (e.scrollTop >= 200) {
				this.isShowTopBtn = true
			} else {
				this.isShowTopBtn = false
			}
		}
	};
</script>

<style>
	.container {
		padding: 10px;
	}

	.search-bar {
		display: flex;
		align-items: center;
	}

	.search-status {
		display: flex;
		justify-content: space-around;
		margin-bottom: 10px;
		font-size: 18px;
	}

	.order-list {
		margin-bottom: 30px;
	}

	.order-list-item {
		margin-bottom: 10px;
		padding: 10px 30px;
		border-radius: 20px;
		display: flex;
		justify-content: space-between;
		background-color: #ecffff;
		box-shadow: 0px 3px 4px 0px grey;
	}

	.order-list-item:active {
		background-color: #ceffff;
	}

	.order-list-item:nth-last-child(1) {
		margin-bottom: 100px;
	}

	.leftBlock {
		max-width: 50%;
	}

	.productName {
		font-weight: bold;
		font-size: 20px;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #454545;
	}

	.img {
		height: 100px;
		width: 100px;
		border-radius: 10px;
	}

	.dateTime {
		color: gray;
	}

	.rightBlock {
		margin-top: 10px;
		max-width: 50%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10px;
		color: black;
	}

	.status {
		margin-top: 10px;
		border-radius: 3px;
		padding: 0 2px;
	}

	.customerName {
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sortTitle {
		padding: 20px 10px;
		font-size: 18px;
	}

	.sortView {
		display: flex;
		gap: 10px;
		padding: 10px 10px;
	}
</style>