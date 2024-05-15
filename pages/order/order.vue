<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-bar">
			<input type="text" placeholder="搜索订单" v-model="searchQuery" @input="searchOrders" />
		</view>

		<!-- 排序按钮 -->
		<view class="sort-buttons">
			<button size="mini" @click="sortOrders('date')">时间</button>
			<button size="mini" @click="sortOrders('items')">商品</button>
			<button size="mini" @click="sortOrders('amount')">金额</button>
			<button size="mini" @click="sortOrders('customer')">客户</button>
		</view>

		<!-- 订单列表 -->
		<view class="order-list">
			<block v-for="order in filteredOrders" :key="order.id">
				<view class="order-item">
					<text>{{ order.date }}</text>
					<text>商品: {{ order.items }}</text>
					<text>客户: {{ order.customer }}</text>
					<text>支付金额: ¥{{ order.amount }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: '',
				sortKey: '',
				orders: [{
						id: 1,
						date: '2024-05-01',
						items: '商品A, 商品B',
						customer: '张三',
						amount: 100
					},
					{
						id: 2,
						date: '2024-05-02',
						items: '商品C',
						customer: '李四',
						amount: 350.0
					},
					{
						id: 3,
						date: '2024-05-03',
						items: '商品D',
						customer: '王五',
						amount: 281.7
					},
					// 更多订单数据
				]
			};
		},
		computed: {
			filteredOrders() {
				let orders = this.orders;

				// 搜索过滤
				if (this.searchQuery) {
					orders = orders.filter(order =>
						order.items.includes(this.searchQuery) ||
						order.customer.includes(this.searchQuery)
					);
				}

				// 排序
				if (this.sortKey === 'date') {
					orders.sort((a, b) => new Date(b.date) - new Date(a.date));
				} else if (this.sortKey === 'items') {
					orders.sort((a, b) => a.items.localeCompare(b.items));
				} else if (this.sortKey === 'amount') {
					orders.sort((a, b) => b.amount - a.amount);
				} else if (this.sortKey === 'customer') {
					orders.sort((a, b) => a.customer.localeCompare(b.customer));
				}

				return orders;
			}
		},
		methods: {
			searchOrders() {
				// 这里可以添加更多搜索逻辑
			},
			sortOrders(key) {
				this.sortKey = key;
			}
		}
	};
</script>

<style>
	.container {
		padding: 10px;
	}

	.search-bar {
		margin-bottom: 10px;
	}

	.sort-buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.sort-buttons button {}

	.order-list {
		border-top: 1px solid #ccc;
	}

	.order-item {
		padding: 10px;
		border-bottom: 1px solid #ccc;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.order-item text {
		padding: 0 10px;
		flex-basis: 40%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>