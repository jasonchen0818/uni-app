<!-- ProductDetail.vue -->
<template>
  <div class="ProductDetail">
    <image :src="product.image" style="width: 100%;"></image>
	<div class="container">
		<text class="title">{{ product.title }}</text>
		<div class="tag">
		  <image src="../../static/image/商品标签.png" style="height: 24rpx; width: 24rpx;margin-right: 15rpx;"></image>{{ product.tag }}
		</div>
		<div class="intro">
			<text>{{ product.intro }}</text>
		</div>
		<div class="tips">
		  <text>【饮茶小贴士】</text>
		  <div v-for="(tip, index) in product.tips" :key="index" class="tip-item">
		        <text>* {{ tip }}</text>
			</div>
		</div>
		
		<div class="specs">
			<div class="specs-title">
				<text>规格</text>
			</div>
		  <div class="specs-buttons">
		    <button v-for="(spec, index) in product.specs" 
			:key="index" 
			:class="{ 'specs-button': true, 'selected': selectedSpecIndex === index }"
			@click="selectSpec(index)">
		      {{ spec.name }}
		    </button>
		  </div>
		</div>
	</div>
    <image :src="product.poster" style="width:100%"></image>
  </div>
  
  <div class="cart">
    <div class="price-sum">
      <text class="price">¥ {{ price }}</text>
      <div class="sum">
        <button @click="decrement" class="decrement-button"> - </button>
        <text>{{ sum }}</text>
        <button @click="increment" class="increment-button"> + </button>
      </div>
    </div>
    <button @click="addToCart" class="addToCart-button">加入购物车</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        image: '',
        title: '',
        tag: '',
        intro: '',
        tips: [],
        specs: [],
        poster: ''
      },
      price: 0,
      sum: 1,
      selectedSpecIndex: 0
    };
  },
  methods: {
    increment() {
      this.sum++;
      this.updatePrice();
    },
    decrement() {
      if (this.sum > 1) {
        this.sum--;
        this.updatePrice();
      }
    },
    addToCart() {
        const cartItem = {
          productId: this.product.id,
          title: this.product.title,
          price: this.price,
          quantity: this.sum,
          spec: this.product.specs[this.selectedSpecIndex].name
        };
        
        // 获取当前购物车数据
        let cart = uni.getStorageSync('cart') || [];
        
        // 检查购物车中是否已经存在该商品
        const existingItemIndex = cart.findIndex(item => item.productId === cartItem.productId && item.spec === cartItem.spec);
        if (existingItemIndex > -1) {
          // 更新已有商品的数量
          cart[existingItemIndex].quantity += cartItem.quantity;
        } else {
          // 添加新商品到购物车
          cart.push(cartItem);
        }
        
        // 存储更新后的购物车数据
        uni.setStorageSync('cart', cart);
        
        // 跳转到商品首页
        uni.switchTab({
          url: '/pages/goods/goods'  // 商品首页路径，请根据实际路径修改
        });
    },
    selectSpec(index) {
		console.log(index);
      this.selectedSpecIndex = index;
      this.price = this.product.specs[index].price;
      this.updatePrice();
    },
    updatePrice() {
      if (this.selectedSpecIndex !== null) {
        this.price = this.product.specs[this.selectedSpecIndex].price * this.sum;
      }
    }
  },
  onLoad(options) {
    const productId = options.id;
    uni.request({
      url: `http://127.0.0.1:4523/m1/4177433-0-default/products/detail`,
      method: 'GET',
      data: {
        id: productId
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.product = res.data.goods;
		  console.log(res.data);
          // 设置默认选中第一个规格并更新价格
          this.price = this.product.specs[0].price;
        }
      },
      fail: (err) => {
        console.error('Error fetching product details:', err);
      }
    });
  }
};
</script>

<style>
/* 商品详情页样式 */
.ProductDetail{
	background-color: white;
}
.container{
	padding: 40rpx;
}

.title{
	margin-top: 20rpx;
	font-size: 20px;
}
.tag{
	margin-top: 20rpx;
	font-size: 12px;
	margin-bottom: 20rpx;
}
.intro text{
	font-size: 15px;
	display: block;
}
.tips{
	margin-top: 20rpx;
	font-size: 14px;
	color: #999;
}


.tip-item text {
  display: block;
  margin-top: 10rpx;
  white-space: pre-wrap;
}
.specs{
	margin-top: 20rpx;
}
.specs-title{
	font-size: 15px;
	margin-bottom: 20rpx;
}
.specs-buttons{
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	  
}
button.selected {
  background-color: #2249d5;
  color: white;
}

button.specs-button {
  padding: 2rpx 50rpx;
  margin-bottom: 10rpx;
  font-size: 13px;
  border-radius: 50rpx;
  color: #000;
  background-color: #edf1f6;
}

button.specs-button.selected {
  padding: 2rpx 50rpx;
  margin-bottom: 10rpx;
  font-size: 13px;
  border-radius: 50rpx;
  color: #fff;
  background-color: #2249d5;
}
.cart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: -webkit-fill-available;
  height: 180rpx;
  padding: 20rpx 40rpx;
  border-top: 2px solid #f5f5f5;
  background-color: #fff;
}

.price-sum {
  display: flex;
  font-size: 20px;
  height: 50rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}

.sum {
  margin-left: auto;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
}

.decrement-button,
.increment-button {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  border: 1px solid #999;
  background-color: white;
}
.decrement-button{
	margin-right: 20rpx;
}
.increment-button {
  margin-left: 20rpx;
  background-color: #2249d5;
  color: #fff;
  border: none;
}

.addToCart-button {
  height: 80rpx;
  font-size: 18px;
  background-color: #2249d5;
  color: #fff;
  padding: 5rpx;
  border-radius: 200rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
