<template>
  <view class="checkout-page">
    <view class="client-content">
      <!-- 客户搜索 -->
      <view class="section">
        <text class="label">客户：</text>
        <input type="text" style="text-align: end;width: 500rpx;" placeholder="输入手机号或名称" v-model="customerQuery" @input="searchCustomer" />
      </view>
      <view v-if="showCustomerList" class="customer-list">
        <view v-for="group in filteredCustomers" :key="group.letter">
          <view class="letter">{{ group.letter }}</view>
          <view v-for="customer in group.data" :key="customer.phone" class="customer-item" @click="selectCustomer(customer)">
            <image :src="customer.imgUrl" class="customer-img" />
            <view class="customer-info">
              <text>{{ customer.name }}</text>
              <text style="margin-left: auto;">{{ customer.phone }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 业务员名称 -->
      <view class="section">
        <text class="label">业务员：</text>
        <text style="margin-left: auto">{{ salesperson }}</text>
      </view>
    </view>
    <view class="cart-content">
      <!-- 购物车详情 -->
      <text class="label">订单详情</text>
      <view class="cart-item" v-for="item in cart" :key="item.id">
        <image :src="item.image" class="cart-item-image" />
        <view class="cart-item-details">
          <text class="cart-item-title">{{ item.title }}</text>
          <text class="cart-item-spec">规格: {{ item.spec }}</text>
          <text class="cart-item-price">¥ {{ item.price }}</text>
          <text class="cart-item-quantity">x {{ item.quantity }}</text>
        </view>
      </view>
      <view class="total-price">
        总价: ¥ {{ totalPrice }}
      </view>
    </view>
    <!-- 备注 -->
    <view class="remarks-content">
      <text class="label">备注：</text>
      <textarea class="textarea" v-model="remarks" placeholder="输入备注"></textarea>
    </view>
    <!-- 提交按钮 -->
    <!-- 提交订单按钮 -->
    <view class="submit-content">
      <button class="submit-button" @click="submitOrder">提交订单</button>
    </view>
	<!-- 收款对话框 -->
    <view v-if="showPaymentDialog" class="payment-dialog">
      <view class="dialog-content">
        <text class="dialog-title">扫码收款</text>
		<view class="amount">需收款金额: ¥ {{ totalPrice }}</view>
		<view class="button-view">
			<text class="close-button" @click="closePaymentDialog">取消</text>
			<text class="pay-button" @click="scanCustomerQRCode">去收款</text>
			
		</view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      customerQuery: '',
      filteredCustomers: [],
      showCustomerList: false,
      selectedCustomer: null,
      salesperson: '',
      date: '',
      cart: [],
      totalPrice: '0',
      remarks: '',
      allCustomers: [], // 客户数据
	  showPaymentDialog: false, // 控制收款对话框的显示
      orderId: null // 订单ID
    };
  },
  mounted() {
    this.loadCart();
    this.setCustomer();
    this.setSaleperson();
  },
  methods: {
    loadCart() {
      this.cart = uni.getStorageSync('cart') || [];
      this.updateTotalPrice();
    },
    setCustomer() {
      // 加载客户数据
      this.allCustomers = uni.getStorageSync('guestList');
      if (this.allCustomers == null) {
        this.getList(); // 如果没有缓存，调用接口获取客户信息
      } 
    },
    getList(){
      this.$request('/guest/getList', null, 'GET').then(res => {
        console.log("获取客户列表成功！", res);
        this.allCustomers = res.data.customers;
        uni.setStorageSync('guestList', res.data);
      })
    },
    setSaleperson(){
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo && userInfo.name) {
        this.salesperson = userInfo.userName;
      } else {
        this.getInfo(); // 如果没有缓存，调用接口获取个人信息
      }
    },
    getInfo() {
      this.$request('/users/getInfo', null, 'GET').then(res => {
        console.log(res);
        this.infoFormData = res;
        console.log(this.infoFormData);
        uni.setStorageSync('userInfo', this.infoFormData);  // 缓存个人信息
        this.salesperson = res.userName; // 设置业务员名称
      });
    },
    searchCustomer() {
      if (this.customerQuery.trim() === '') {
        this.showCustomerList = false;
        return;
      }
      // 过滤客户列表
      const filteredGroups = [];
	  console.log("测试", this.allCustomers)
      this.allCustomers.forEach(group => {
        const filteredData = group.customers.filter(customer =>
          customer.name.includes(this.customerQuery) || customer.phone.includes(this.customerQuery)
        );
        if (filteredData.length > 0) {
          filteredGroups.push({
            letter: group.letter,
            data: filteredData
          });
        }
      });
      this.filteredCustomers = filteredGroups;
      this.showCustomerList = true;
    },
    selectCustomer(customer) {
      this.selectedCustomer = customer;
      this.customerQuery = `${customer.name} - ${customer.phone}`;
      this.showCustomerList = false;
    },
    updateTotalPrice() {
      this.totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    },
    validateOrder(order) {
      if (!order.customer) {
        uni.showToast({
          title: '请选择客户',
          icon: 'none'
        });
        return false;
      }
      if (!order.salesperson || !order.date || !order.cart.length || !order.totalPrice) {
        uni.showToast({
          title: '订单信息不完整',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    submitOrder() {
      const order = {
        customer: this.selectedCustomer,
        salesperson: this.salesperson,
        date: new Date().toISOString().split('T')[0],
        cart: this.cart,
        totalPrice: this.totalPrice,
        remarks: this.remarks,
        status: 'unpaid' // 订单状态为未付款
      };
      console.log('提交订单', order);

      // 检查订单信息是否完整
      if (!this.validateOrder(order)) {
        return;
      }
      // 发送订单信息到后端
      this.$request('/orders/create', order, 'POST').then(res => {
        console.log('订单创建成功', res);
        this.orderId = res.orderId; // 假设后端返回订单ID
		
		this.showPaymentDialog = true; // 显示收款对话框
      }).catch(err => {
        console.error('订单创建失败', err);
        uni.showToast({
          title: '订单创建失败',
          icon: 'none'
        });
      });
    },
    scanCustomerQRCode() {
      // 调用扫码功能
      uni.scanCode({
        onlyFromCamera: true,
        scanType: ['qrCode'],
        success: res => {
          console.log('扫码成功', res);
          const scannedData = res.result; // 获取扫描结果
          this.handleScannedData(scannedData); // 处理扫描结果
        },
        fail: err => {
          console.error('扫码失败', err);
          uni.showToast({
            title: '扫码失败',
            icon: 'none'
          });
        }
      });
    },
    handleScannedData(scannedData) {
      // 处理扫描结果，这里假设扫描结果是客户的支付信息或标识符
      console.log('处理扫描结果', scannedData);
      // 你可以在这里实现相应的支付逻辑，例如向服务器发送支付请求
      this.initiatePayment(scannedData);
    },
    initiatePayment(paymentIdentifier) {
      // 模拟获取支付参数
      const paymentParams = {
        appId: 'wx2421b1c4370ec43b',
        timeStamp: String(Math.floor(Date.now() / 1000)),
        nonceStr: 'e61463f8efa94090b1f366cccfbbb444',
        package: `prepay_id=${paymentIdentifier}`,
        signType: 'MD5',
        paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89'
      };
      uni.requestPayment({
        provider: 'wxpay',
        ...paymentParams,
        success: res => {
          console.log('Payment success', res);
          uni.showToast({
            title: '支付成功',
            icon: 'success'
          });
          this.updateOrderStatus('paid'); // 更新订单状态为已付款
          this.closePaymentDialog(); // 关闭收款对话框
        },
        fail: err => {
          console.error('Payment failed', err);
          uni.showToast({
            title: '支付失败',
            icon: 'none'
          });
        }
      });
    },
    updateOrderStatus(status) {
      const updateData = {
        orderId: this.orderId,
        status: status
      };
      this.$request('/orders/updateStatus', updateData, 'POST').then(res => {
        console.log('订单状态更新成功', res);
      }).catch(err => {
        console.error('订单状态更新失败', err);
      });
    },
    closePaymentDialog() {
      this.showPaymentDialog = false;
    }
  
  }
};
</script>

<style>
	.checkout-page {
	  padding: 20rpx;
	}
	.client-content {
	  background-color: #fff;
	  border-radius: 30rpx;
	  margin: 10rpx;
	  margin-bottom: 20rpx;
	  padding: 20rpx;
	}
	.cart-content {
	  background-color: #fff;
	  border-radius: 30rpx;
	  margin: 10rpx;
	  margin-bottom: 20rpx;
	  padding: 20rpx;
	}
	.remarks-content {
	  background-color: #fff;
	  border-radius: 30rpx;
	  margin: 10rpx;
	  margin-bottom: 20rpx;
	  padding: 20rpx;
	}
	.label{
		font-size: 26rpx;
	}
	.title {
	  font-size: 26rpx;
	  font-weight: bold;
	}
	
	.content {
	  padding: 20rpx;
	}
	
	.section {
	  margin-bottom: 20rpx;
	  display: flex;
	  font-size: 26rpx;
	  padding: 20rpx;
	  justify-content: space-between;
	}
	
	.customer-list {
	  border: 1px solid #ddd;
	  border-radius: 25rpx;
	  margin-top: 10rpx;
	  font-size: 24rpx;
	  padding: 20rpx 30rpx;
	}
	
	.customer-item {
	  padding: 10rpx;
	  display: flex;
	  align-items: center;
	}
	
	.customer-img {
	  width: 80rpx;
	  height: 80rpx;
	  margin-right: 10rpx;
	}
	
	.customer-info {
		font-size: 28rpx;
	  display: flex;
	  margin-left: auto;
	  width: 480rpx;
	  text-align: end;
	  padding: 20rpx 5rpx;
	  border-bottom: 1px solid #ddd;
	}
	
	.cart-item {
	  display: grid;
	  grid-template-columns: 120rpx 2fr 1fr;
	  grid-gap: 10rpx;
	  padding: 10rpx 0;
	}
	
	.cart-item-image {
	  width: 100rpx;
	  height: 100rpx;
	}
	
	.cart-item-details {
	  display: grid;
	  grid-template-columns: 400rpx 120rpx;
	  grid-template-rows: auto auto;
	  gap: 5rpx;
	}
	
	.cart-item-title {
	  grid-column: 1 / 2;
	  grid-row: 1 / 2;
	  font-size: 24rpx;
	}
	
	.cart-item-price {
	  grid-column: 2 / 3;
	  grid-row: 1 / 2;
	  font-size: 24rpx;
	  text-align: right;
	}
	
	.cart-item-spec {
	  grid-row: 2 / 3;
	  grid-column: 1 / 2;
	  font-size: 16rpx;
	}
	
	.cart-item-quantity {
	  grid-row: 2 / 3;
	  grid-column: 2 / 3;
	  font-size: 16rpx;
	  text-align: right;
	}
	.total-price {
	  border-top: 2px solid #f5f5f5;
	  padding: 10rpx 5px;
	  font-size: 28rpx;
	  font-weight: bold;
	  margin-top: 10rpx;
	  text-align: right;
	}
	
	.textarea {
	  width: 100%;
	  height: 100rpx;
	  padding: 10rpx;
	  font-size: 24rpx;
	}
	.submit-content {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: -webkit-fill-available;
	  height: 150rpx;
	  padding: 20rpx 40rpx;
	  border-top: 2px solid #f5f5f5;
	}
	.submit-button {
	  width: 75%;
	  padding: 15rpx;
	  background-color: #2249d5;
	  color: #fff;
	  font-size: 26rpx;
	  border: none;
	  border-radius: 55rpx;
	  text-align: center;
	}
	
	
	.payment-dialog {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.5);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.dialog-content {
	  background-color: #fff;
	  padding: 20rpx;
	  border-radius: 10rpx;
	  width: 80%;
	  max-width: 500rpx;
	  text-align: center;
	}
	
	.dialog-title {
	  font-size: 28rpx;
	  margin-bottom: 20rpx;
	}
	.amount{
		font-size: 26rpx ;
		padding: 50rpx;
	}
	.button-view{
		display: flex;
		justify-content: space-around;
	}
	.pay-button {
	  width: 45%;
	  margin-top: 50rpx;
	  color: green;
	  font-size: 28rpx;
	  text-align: center;
	}
	.close-button {
	  width: 45%;
	  margin-top: 50rpx;
	  font-size: 28rpx;
	  text-align: center;
	  color: #999;
	}

</style>