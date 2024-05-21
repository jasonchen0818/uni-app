<template>
	<div class="container">
		<!-- 搜索栏 -->
		<div class="search-bar">
			<uni-icons type="bars" size="30"></uni-icons>
			<uni-search-bar placeholder="搜索订单" v-model="searchQuery" style="flex: 1;" bgColor="#ffffff" radius="20"
				:focus="true" cancel-button="none"></uni-search-bar>
		</div>
		<div class="search-status">
			<text @click="searchOrders(0)">全部</text>
			<text @click="searchOrders(1)">已完成</text>
			<text @click="searchOrders(2)">已取消</text>
		</div>
		<!-- 排序 -->
		<!-- <view class="sort-buttons">
			<button size="mini" @click="sortOrders('date')">时间</button>
			<button size="mini" @click="sortOrders('items')">商品</button>
			<button size="mini" @click="sortOrders('amount')">金额</button>
			<button size="mini" @click="sortOrders('customer')">客户</button>
		</view> -->

		<list-view class="order-list">
			<!-- <uni-list-item v-for="order in filteredOrders" :key="order.id"> -->
			<list-item v-for="order in filteredOrders" :key="order.id" class="order-list-item"
				@click="toInfo(order.id)">
				<div class="leftBlock">
					<div class="productName">{{order.productName}}</div>
					<img class="img" :src="order.img" alt="">
					<div class="dateTime">{{order.dateTime}}</div>
				</div>
				<div class="rightBlock">
					<div class="status" :style="{backgroundColor: order.status==='已完成'?'#92f26f':'#ffacaa'}">
						{{order.status}}
					</div>
					<div class="customerName">客户: {{order.customerName}}</div>
					<div class="totalPrice">总价: ￥{{order.totalPrice}}</div>
					<div style="color: gray;">详情<uni-icons type="right"></uni-icons></div>
				</div>
			</list-item>
		</list-view>
	</div>
	<uni-fab v-show="isShowTopBtn" :pattern="{icon: 'arrow-up'}" horizontal="right" :popMenu="false" @fabClick="topBack"></uni-fab>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: '',	// 搜索
				statusQuery: '',	// 状态筛选
				sortKey: '',		// 排序字段
				isShowTopBtn: false,// 显示回到顶部按钮
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
			};
		},
		computed: {
			filteredOrders() {
				let orders = this.orders;
				// 过滤状态
				if (this.statusQuery) {
					orders = orders.filter(order =>
						order.status === this.statusQuery
					);
				}

				// 搜索过滤
				if (this.searchQuery) {
					orders = orders.filter(order =>
						order.productName.includes(this.searchQuery) ||
						order.customerName.includes(this.searchQuery)
					);
				}

				// 排序
				if (this.sortKey) {
					orders.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]))
				}
				return orders;
			}
		},
		methods: {
			searchOrders(msg) {
				if (msg === 1) {
					// 搜索已完成订单
					this.statusQuery = "已完成";
				} else if (msg === 2) {
					// 已取消订单
					this.statusQuery = "已取消";
				} else {
					this.statusQuery = '';
				}
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
			this.$request('/order/getList', null, 'GET').then(res => {
				this.orders = res;
			});
		},
		onPullDownRefresh: function() {
			this.$request('/order/getList', null, 'GET').then(res => {
				this.orders = res;
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
</style>