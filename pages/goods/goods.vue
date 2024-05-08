<template>
	<div class="top">
		<div class="function-area">
			<image src="../../static/image/人脸识别.png" style="height: 70rpx;width: 70rpx;"></image>
			<text style="margin-left: 15rpx;font-size: 24rpx;">扫一扫</text>
		</div>
		<div class="search-area">
			<input class="search-input"/>
			<uni-icons   size="24" type="search" style=""></uni-icons>
		</div>
	</div>
	<div class="goods-area">
		<div class="sort-list">
			<!-- 使用 v-for 循环渲染分类列表 -->
<!-- 使用 v-for 循环渲染分类列表 -->
			<div v-for="(category, index) in categories" :key="index" class="category-item" :class="{ 'selected': selectedCategory === category, 'has-border-bottom-right-radius': category.hasBorderBottomRightRadius  }" @click="selectCategory(category)">
				{{ category.name }}
			</div>
			
		</div>
		<div class="all-goods-list">
			<div v-for="(category, catIndex) in categories" :key="catIndex" class="category-container">
			  <!-- 分类名称 -->
			  <div class="category-name">{{ category.name }}</div>
			  <!-- 商品列表 -->
			  <div class="goods-list">
			    <div v-for="(good, index) in category.goods" :key="index" class="goods" >
			      <image :src="good.image" style="height: 200rpx; width: 200rpx;"></image>
			      <div class="goods-content">
			        <div class="title">{{ good.title }}</div>
			        <div class="tag">
			          <image src="../../static/image/商品标签.png" style="height: 24rpx; width: 24rpx;margin-right: 15rpx;"></image>{{ good.tag }}
			        </div>
			        <div class="intro">{{ good.intro }}</div>
			        <div class="price-button">
			          <div class="price">¥ {{ good.price }}  <text style="font-size: 10px;margin-left: 8rpx;">起</text></div>
			          <button class="add" >选规格</button>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>

		</div>
		
		
	</div>
	<div class="cart-area">
		<image src="../../static/image/cart-full (1).png" style="height: 80rpx;width: 80rpx;"></image>
		<div class="total-price">
			¥ {{ totalPrice }}  
		</div>
		<button class="checkout-button">去结算</button>
		
	</div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      goods: [],
      totalPrice: '0'
    };
  },
  mounted() {
    // 在组件挂载后加载分类和商品数据
	
    this.loadCategories();
	this.loadGoods();
    
  },
  methods: {
    loadCategories() {
      // 这里可以使用 Ajax 请求或者直接设置数据来加载分类数据
      // 示例中直接设置了一些示例数据
      uni.request({
          url:  "http://127.0.0.1:4523/m2/4177433-0-default/171989370",
          method: 'GET',
          success: res => {
			  console.log(res)
            // 请求成功后更新分类数据
            this.categories = res.data.categories;
          },
          fail: err => {
            console.error('加载分类数据失败', err);
          }
        });
    },
    loadGoods() {
      // 这里可以使用 Ajax 请求或者直接设置数据来加载商品数据
      // 示例中直接设置了一些示例数据
      uni.request({
      	url:"http://127.0.0.1:4523/m1/4177433-0-default/goods/list",
		method: 'GET',
		success: res => {
					  console.log(res)
		  // 请求成功后更新分类数据
		  this.goods = res.data.goods;
		  
		},
		fail: err => {
		  console.error('加载分类数据失败', err);
		},
		complete: () => {
		          // 在获取到商品信息后再渲染分类和商品列表
		          this.renderCategoriesAndGoods();
		        }
      })
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

    selectCategory(category) {
    				// 将所有 category 的 hasBorderBottomRightRadius 设置为 false
    				  this.categories.forEach(cat => cat.hasBorderBottomRightRadius = false);
    
    				  this.selectedCategory = category;
    				  const selectedIndex = this.categories.findIndex(c => c === category);
    				  
    				  if (selectedIndex > 0) {
    				    this.categories[selectedIndex - 1].hasBorderBottomRightRadius = true;
    				  }
					  
    				  // Other logic related to category selection
    				},
    addToCart(good) {
      // 处理点击添加到购物车的逻辑
      console.log('添加商品到购物车:', good);
    }
  }
};
</script>

<style>
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
		width: 81%;
		border-radius: 25rpx;
		margin-right: 15rpx;
	}
	.goods-area{
		margin-top: 10rpx;
		background-color: white;
		display: flex;
		
	}
	.sort-list{
		height: 1100rpx;
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
		height: 1050rpx;
		width: 72%;
		overflow: auto;
	}
	.category-name{
		margin-bottom: 30rpx;
		font-size: 14px;
		font-weight: bold;
	}
	.goods{
		display: flex;
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
		width: 700rpx;
		height: 100rpx;
		background-color: #fff; /* 为了让元素更明显，可以添加背景色 */
		padding:  10rpx 40rpx 10rpx 30rpx; /* 可选的内边距 */
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
	    cursor: pointer; /* 鼠标指针样式 */
	    font-size: 16px; /* 按钮文字大小 */
		height: 80rpx;
		width: 220rpx;
	}

	
</style>