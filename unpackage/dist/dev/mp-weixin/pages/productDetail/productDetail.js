"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      product: {
        image: "",
        title: "",
        tag: "",
        intro: "",
        tips: [],
        specs: [],
        poster: ""
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
        image: this.product.image,
        title: this.product.title,
        price: this.price,
        quantity: this.sum,
        spec: this.product.specs[this.selectedSpecIndex].name
      };
      let cart = common_vendor.index.getStorageSync("cart") || [];
      const existingItemIndex = cart.findIndex((item) => item.productId === cartItem.productId && item.spec === cartItem.spec);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }
      common_vendor.index.setStorageSync("cart", cart);
      common_vendor.index.switchTab({
        url: "/pages/goods/goods"
        // 商品首页路径，请根据实际路径修改
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
    common_vendor.index.request({
      url: `http://127.0.0.1:4523/m1/4177433-0-default/products/detail`,
      method: "GET",
      data: {
        goodsId: productId
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.product = res.data.goods;
          console.log(res.data);
          this.price = this.product.specs[0].price;
        }
      },
      fail: (err) => {
        console.error("Error fetching product details:", err);
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.product.image,
    b: common_vendor.t($data.product.title),
    c: common_vendor.t($data.product.tag),
    d: common_vendor.t($data.product.intro),
    e: common_vendor.f($data.product.tips, (tip, index, i0) => {
      return {
        a: common_vendor.t(tip),
        b: index
      };
    }),
    f: common_vendor.f($data.product.specs, (spec, index, i0) => {
      return {
        a: common_vendor.t(spec.name),
        b: index,
        c: $data.selectedSpecIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $options.selectSpec(index), index)
      };
    }),
    g: $data.product.poster,
    h: common_vendor.t($data.price),
    i: common_vendor.o((...args) => $options.decrement && $options.decrement(...args)),
    j: common_vendor.t($data.sum),
    k: common_vendor.o((...args) => $options.increment && $options.increment(...args)),
    l: common_vendor.o((...args) => $options.addToCart && $options.addToCart(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huanglinna/IdeaProjects/AIbeatuify/uni-app/pages/productDetail/productDetail.vue"]]);
wx.createPage(MiniProgramPage);
