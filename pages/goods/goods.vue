<template>
  <div class="top">
    <div class="function-area">
      <image src="../../static/image/人脸识别.png" style="height: 70rpx;width: 70rpx;"></image>
      <text style="margin-left: 15rpx;font-size: 24rpx;">扫一扫</text>
    </div>
    <div class="search-area">
      <input class="search-input"/>
      <uni-icons size="24" type="search" style=""></uni-icons>
    </div>
  </div>
  <div class="goods-area">
    <div class="sort-list">
      <div v-for="(category, index) in categories" :key="index" class="category-item" :class="{ 'selected': selectedCategory === category, 'has-border-bottom-right-radius': category.hasBorderBottomRightRadius }" @click="selectCategory(category, index)">
        {{ category.categoryName }}
      </div>
    </div>
    <scroll-view class="all-goods-list" scroll-y="true" ref="scrollView">
      <div v-for="(category, catIndex) in categories" :key="catIndex" class="category-container" :id="'category-' + catIndex">
        <!-- 分类名称 -->
        <div class="category-name">{{ category.categoryName }}</div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <div v-for="(good, index) in category.goods" :key="index" class="goods">
            <image :src="good.image" style="height: 200rpx; width: 200rpx;"></image>
            <div class="goods-content">
              <div class="title">{{ good.title }}</div>
              <div class="tag">
                <image src="../../static/image/商品标签.png" style="height: 24rpx; width: 24rpx;margin-right: 15rpx;"></image>{{ good.tag }}
              </div>
              <div class="intro">{{ good.intro }}</div>
              <div class="price-button">
                <div class="price">¥ {{ good.price }} <text style="font-size: 10px;margin-left: 8rpx;">起</text></div>
                <button class="add" @click="viewProductDetail(good.id)">选规格</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
  <div class="cart-area" @click="toggleCartDetails">
      <image src="../../static/image/cart-full (1).png" style="height: 80rpx;width: 80rpx;"></image>
      <div class="total-price">
        ¥ {{ totalPrice }}
      </div>
      <button class="checkout-button" @click="goToCheckout">去结算</button>
    </div>
  
    <!-- Shopping Cart Details -->
    <div v-if="showCartDetails" class="cart-details">
      <div class="cart-header">
        <span>购物车 (共{{ cart.length }}件商品)</span>
        <text @click="clearCart">清空购物车</text>
      </div>
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <image :src="item.image" style="height: 150rpx; width: 150rpx;"></image>
          <div class="item-details">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-spec">规格: {{ item.spec }}</div>
			<div class="price-sum">
				<div class="item-price">¥ {{ item.price }} </div>
				<div class="item-quantity">
					<button class="decrement-button" @click="decreaseQuantity(item)">-</button>
					<span>{{ item.quantity }}</span>
				    <button class="increment-button" @click="increaseQuantity(item)">+</button>
				</div>
			</div>
			  
            
          </div>
        </div>
      </div>
     
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      goods: [],
      totalPrice: '0',
      categoryHeights: [], // 用于存储每个分类的高度
      cart: [],
      showCartDetails: false, // 控制购物车详情的显示和隐藏
    };
  },
  mounted() {
    // 在组件挂载后加载分类和商品数据
    this.loadCategories(); 
    this.loadGoods();
    // 每次初始打开时清空购物车
    this.clearCart();
  },
  onLoad() {},
  onShow() {
    this.loadCart();
  },
  methods: {
    loadCategories() {
      // 加载分类数据
	  this.$request('/goods/categories', null, 'GET').then(res => {
		  this.categories = res;
	  })
      // uni.request({
      //   url: "http://127.0.0.1:4523/m2/4177433-0-default/171989370",
      //   method: 'GET',
      //   success: res => {
      //     this.categories = res.data.categories;
      //   },
      //   fail: err => {
      //     console.error('加载分类数据失败', err);
      //   }
      // });
    },
    loadGoods() {
      // 加载商品数据
      uni.request({
        url: "http://127.0.0.1:4523/m1/4177433-0-default/goods/list",
        method: 'GET',
        success: res => {
          this.goods = res.data.goods;
          // 数据加载完成后渲染分类和商品列表
          this.renderCategoriesAndGoods();
          // 计算每个分类容器的高度
          this.calculateCategoryHeights();
        },
        fail: err => {
          console.error('加载商品数据失败', err);
        }
      });
    },
    loadCart() {
      // 从本地存储中加载购物车数据
      this.cart = uni.getStorageSync('cart') || [];
      this.updateTotalPrice();
    },
    updateTotalPrice() {
      // 计算购物车中商品的总价
      this.totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    },
    goToCheckout() {
      // 跳转到结算页（示例路径，请根据实际路径修改）
      uni.navigateTo({
        url: '/pages/goods/checkout/checkout'
      });
    },
    clearCart() {
      // 清空本地存储中的购物车数据
      uni.removeStorageSync('cart');
      this.cart = [];
      this.totalPrice = '0';
    },
    toggleCartDetails() {
      this.showCartDetails = !this.showCartDetails;
    },
    increaseQuantity(item) {
      item.quantity++;
      this.updateTotalPrice();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateTotalPrice();
      }
    },
    renderCategoriesAndGoods() {
      // 清空之前的数据
      this.categories.forEach(category => category.goods = []);
	  
      // 将商品按照分类放入对应的分类中
      this.goods.forEach(good => {
        const category = this.categories.find(category => category.id === good.category_id);
        if (category) {
          category.goods.push(good);
        }
      });
    },
    calculateCategoryHeights() {
      this.$nextTick(() => {
        this.categoryHeights = [];
        let totalHeight = 0;
        this.categories.forEach(category => {
          this.categoryHeights.push(totalHeight);
          const goodsHeight = category.goods.length * 230; // 每个商品 200rpx + margin-bottom 30rpx
          const categoryNameHeight = 70; // category-name 高度为 70rpx
          totalHeight += categoryNameHeight + goodsHeight;
        });
      });
    },
    selectCategory(category) {
      // 将所有 category 的 hasBorderBottomRightRadius 设置为 false
      this.categories.forEach(cat => cat.hasBorderBottomRightRadius = false);
      
      this.selectedCategory = category;
      const selectedIndex = this.categories.findIndex(c => c === category);
      
      if (selectedIndex > 0) {
        this.categories[selectedIndex - 1].hasBorderBottomRightRadius = true;
      }
    
      // 获取选中分类容器的 id
      const selectedCategoryId = 'category-' + selectedIndex;
    
      // 设置 scroll-view 组件的 scroll-into-view 属性，使其内容滚动到选中分类容器的可视区域顶部
      this.$refs.scrollView.scrollIntoView(selectedCategoryId);
    },
    viewProductDetail(productId) {
      // 导航到商品详情页路由，并将商品ID作为路由参数传递
      // 导航到商品详情页，并传递商品ID作为参数
      uni.navigateTo({
        url: '/pages/goods/productDetail?id=' + productId
      });
    },
    addToCart(good) {
      // 处理点击添加到购物车的逻辑
      console.log('添加商品到购物车:', good);
    },
  }
};
</script>

<style>
  /* 样式保持不变 */
  .top{
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 10rpx 15rpx 10rpx 15rpx;
  }
  .function-area{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 23%;
  }
  .search-area{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77%;
  }
  .search-input
  {
    height: 60rpx;
    background-color: #f5f5f5;
    width: 70%;
    border-radius: 25rpx;
    margin-right: 15rpx;
    padding: 5rpx 25rpx;
    font-size: 13px;
    color: #999;
  }
  .goods-area{
    margin-top: 10rpx;
    background-color: white;
    display: flex;
  }
  .sort-list{
    height: 1200rpx;
    width: 28%;
    overflow: auto;
  }
  .category-item {
    position: relative; /* 相对定位，为了让伪元素相对于该元素定位 */
    background-color: #F5F6F7;
    text-align: center; /* 文本居中 */
    font-size: 16px; /* 文本大小 */
    padding: 35rpx 20rpx; /* 30rpx 顶部和底部的 padding，15rpx 左侧和右侧的 padding */
    cursor: pointer; /* 鼠标指针样式为手型 */
  }
  
  .category-item:before {
    content: ''; /* 伪元素内容为空 */
    position: absolute; /* 绝对定位 */
    top: 50%; /* 位于容器的中间位置 */
    left: 0; /* 位于容器的左侧 */
    transform: translateY(-50%); /* 将竖线向上偏移自身高度的一半，以使其居中 */
    height: 70%; /* 竖线的高度为容器高度的70%，可以根据需要调整 */
    width: 3px; /* 竖线的宽度 */
    background-color: transparent; /* 初始状态为透明 */
  }
  
  .category-item.selected:before {
    background-color: #234ad8; /* 左侧竖线颜色为蓝色 */
  }
  
  .category-item.selected {
    background-color: #ffffff; /* 背景色为白色 */
    font-weight: bold; /* 文本加粗 */
    border-left-color: #234ad8; /* 左侧竖线颜色为蓝色 */
  }
  
  /* 添加被选中的上下两个 div 的圆角 */
  .category-item.selected + .category-item {
    border-top-right-radius: 25rpx;
  }
  .category-item.has-border-bottom-right-radius {
    border-bottom-right-radius: 25rpx; /* 根据需要设置右下圆角 */
  }
  .all-goods-list{
    padding: 20rpx;
    width: 72%;
    overflow-y: scroll; /* 使用 scroll 实现垂直滚动 */
  }
  .category-name{
	height: 70rpx;
    font-size: 14px;
    font-weight: bold;
  }
  .goods{
    display: flex;
	height: 200rpx;
    margin-bottom: 30rpx;
  }
  .goods-content{
    width: 70%;
    margin-left: 20rpx;
  }
  .title{
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  .tag{
    margin-top: 6rpx;
    font-size: 11px;
    color: #000;
  }
  .intro{
    margin-top: 8rpx;
    font-size: 11px;
    color: #999;
    overflow: hidden;
  }
  .price-button{
    margin-top: 8rpx;
    width: 100%;
    display: flex;
    align-items: flex-end; /* 垂直底部对齐 */
  }
  .price{
    font-size: 16px;
    color: #000;
    display: flex;
    align-items: flex-end; /* 垂直底部对齐 */
    flex-grow: 1; /* 占据剩余空间 */
  }
  .add{
    align-self: center;
    font-size: 10px;
    border-radius: 25rpx;
    color: #fff;
    background-color: #2249d5;
    margin-left: auto;
  }
  .cart-area{
    position: fixed;
    bottom: 0;
    left: 0; /* 或者使用 right: 0; 控制元素水平方向上的位置 */
    width: -webkit-fill-available;
    height: 100rpx;
    background-color: #fff; /* 为了让元素更明显，可以添加背景色 */
    padding: 10rpx 40rpx 10rpx 30rpx; /* 可选的内边距 */
    border-top: 2px solid #f5f5f5; /* 左侧竖线，初始状态为透明 */
    display: flex;
    align-items: center;
  }
  .total-price{
    margin-left: 30rpx;
    font-size: 24px;
    flex-grow: 1; /* 占据剩余空间 */
  }
  .checkout-button {
    margin-left: auto;
    background-color: #2249d5; /* 按钮背景颜色 */
    color: #fff; /* 按钮文字颜色 */
    border: none; /* 去除按钮边框 */
    border-radius: 35rpx; /* 圆角边框 */
    font-size: 16px; /* 按钮文字大小 */
    height: 80rpx;
    width: 220rpx;
  }
  .cart-details {
    position: fixed;
    bottom: 120rpx;
    left: 0;
    width: 100%;
    background-color: white;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
	font-size: 14px;
    padding: 10rpx 20rpx;
    border-bottom: 1px solid #ddd;
  }
  
  .cart-items {
    max-height: 400rpx;
    overflow-y: auto;
  }
  
  .cart-item {
    display: flex;
    padding: 10rpx 20rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .item-details {
    margin-left: 10rpx;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .item-title, .item-price{
	  font-size: 14px;
	  margin-bottom: 5rpx;
  }
   .item-spec {
    font-size: 12px;
	color: #999;
	margin-bottom: 20rpx;
  }
  .price-sum {
    display: flex;
  }
  .item-quantity {
    display: flex;
	margin-left: auto;
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
  
  .decrement-button {
    margin-right: 20rpx;
  }
  
  .increment-button {
    margin-left: 20rpx;
    background-color: #2249d5;
    color: #fff;
    border: none;
  }
  
  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 20rpx;
    border-top: 1px solid #ddd;
  }



</style>
