<template>
	<div class="container">
		<div class="title">
			订单{{order.status}}
			<uni-icons type="right" size=30></uni-icons>
		</div>
		<!-- 订单商品 -->
		<div class="productBox">
			<list-view class="product-list" v-for="(product,index) in order.products" :key="index">
				<list-item class="product-item">
					<img :src="product.image" alt="" class="img">
					<div class="productInfo">
						<div class="name">{{product.name}}</div>
						<div class="specs">规格: {{product.specs}}</div>
						<div class="uniPrice">单价: {{product.uniPrice}}</div>
						<div class="quantity">数量: {{product.quantity}}</div>
					</div>
					<div class="productPrice">{{product.totalPrice}}</div>
				</list-item>
			</list-view>
			<div class="line"></div>
			<div class="totalPrice">
				<span>合计: </span>
				<span style="color: red;">￥{{order.totalPrice}}</span>
			</div>
		</div>
		<!-- 其他信息 -->
		<div class="infoBox">
			<list-view class="info-list">
				<list-item class="info-item">
					<div class="leftItem">订单编号</div>
					<div class="rightItem">{{order.id}}</div>
				</list-item>
				<list-item class="info-item">
					<div class="leftItem">订单创建时间</div>
					<div class="rightItem">{{order.dateTime}}</div>
				</list-item>
				<list-item class="info-item">
					<div class="leftItem">业务员</div>
					<div class="rightItem">{{order.salesman}}</div>
				</list-item>
				<list-item class="info-item">
					<div class="leftItem">客户</div>
					<div class="rightItem">{{order.customerName}}</div>
				</list-item>
				<list-item class="info-item">
					<div class="leftItem">联系方式</div>
					<div class="rightItem">{{order.customerPhone}}</div>
				</list-item>
				<list-item class="info-item">
					<div class="leftItem">备注</div>
					<div class="rightItem" id="note">{{order.note}}</div>
				</list-item>
			</list-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				order: {
					id: 123456,
					dateTime: "2023-11-24 16:15:33",
					totalPrice: 165,
					status: "已完成",
					salesman: "王翠花",
					customerName: "侯芳",
					customerPhone: "18144305638",
					note: "土鸡蛋批发就找AAA王姐\n包物美价廉的",
					products: [{
							image: "http://dummyimage.com/200x100/894FC4/FFF.png&text=!",
							name: "护肤水",
							specs: "100g",
							quantity: "1",
							uniPrice: 165,
							totalPrice: 165
						},
						{
							image: "http://dummyimage.com/200x100/894FC4/FFF.png&text=!",
							name: "asflasdfasdflakasdfaslkdfjlkasdjflkajsdflkasdjlfsad",
							specs: "10alskdfja123kj5h1k23h5l1325",
							quantity: "10asd8f90asduf9jas09dfja0s9dfasdf",
							uniPrice: 65165495354313235353513,
							totalPrice: 9849843513545434156156
						},
						{
							image: "http://dummyimage.com/200x100/894FC4/FFF.png&text=!",
							name: "护肤水",
							specs: "100g",
							quantity: "1",
							uniPrice: 165,
							totalPrice: 165
						}
					]
				}
			}
		},
		methods: {
			getInfo(id) {
				this.$request('/order/getInfo', {id: id}, 'GET').then(res => {
					this.order = res;
				})
			}
		},
		onLoad: function(option) {
			this.getInfo(option.id);
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}

	.title {
		font-size: 32px;
		margin: 10px 0;
	}

	.productBox {
		border-radius: 20px;
		border: 1px solid gray;
		background-color: white;
		margin: 10px 0;
	}

	.product-list {}

	.product-item {
		padding: 10px;
		display: flex;
		flex-direction: row;
		gap: 20px;
		align-items: flex-start;
	}

	.img {
		height: 100px;
		width: 100px;
		border-radius: 10px;
	}

	.productInfo {
		flex-grow: 1;
		width: 0;
		color: gray;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.name,
	.specs,
	.uniPrice,
	.quantity,
	.productPrice,
	.leftItem,
	.rightItem{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name {
		font-size: 20px;
		color: black;
	}

	.productPrice {
		width: 20%;
		text-align: right;
		font-size: 20px;
		color: red;
		padding-top: 13px;
	}

	.line {
		width: 85%;
		height: 1px;
		background-color: gray;
		margin: 5px auto;
	}

	.totalPrice {
		text-align: right;
		margin: 10px 20px 20px 0;
		font-size: 22px;
	}
	
	.infoBox {
		border-radius: 20px;
		border: 1px solid gray;
		background-color: white;
		padding: 10px;
	}
	
	.info-item {
		display: flex;
		padding: 4px 0;
	}
	
	.leftItem {
		width: 50%;
		color: gray;
		font-size: 14px;
	}
	
	.rightItem {
		width: 50%;
		color: black;
		font-size: 18px;
	}
	
	#note {
		white-space: unset;
	}
</style>