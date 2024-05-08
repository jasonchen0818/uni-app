"use strict";
const common_vendor = require("../../common/vendor.js");
const MyListItem = () => "../../components/my-list-item.js";
const _sfc_main = {
  components: {
    MyListItem
  },
  data() {
    return {
      top: 0,
      //侧边栏顶部动态距离，算不好，摆了
      scrollHeight: 0,
      //可滑动距离
      scrollinto: "",
      current: "",
      list: {}
    };
  },
  onLoad() {
    common_vendor.index.getSystemInfoAsync().then((info) => {
      this.scrollHeight = info.windowHeight;
      console.log("scrollHeight", this.scrollHeight);
    });
  },
  computed: {
    itemHeight() {
      const count = this.list.length;
      return this.scrollHeight / count;
    }
  },
  methods: {
    getList() {
      this.$request("/guest/getList", null, "GET").then((res) => {
        this.list = res;
        common_vendor.index.setStorageSync("guestList", res);
      });
    },
    touchstart(e) {
      this.changeScrollinto(e);
    },
    touchmove(e) {
      this.changeScrollinto(e);
    },
    touchend() {
      this.current = null;
    },
    changeScrollinto(e) {
      const Y = e.touches[0].pageY;
      const index = Math.floor(Y / this.itemHeight);
      const item = this.list[index];
      if (item) {
        this.scrollinto = `item-` + item.letter;
        this.current = item.letter;
      }
    }
  },
  mounted() {
    this.getList();
  }
};
if (!Array) {
  const _component_my_list_item = common_vendor.resolveComponent("my-list-item");
  _component_my_list_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => _ctx.click && _ctx.click(...args)),
    b: common_vendor.o((...args) => _ctx.click && _ctx.click(...args)),
    c: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.data.length
      }, item.data.length ? {
        b: common_vendor.t(item.letter)
      } : {}, {
        c: common_vendor.f(item.data, (item2, index2, i1) => {
          return {
            a: index2,
            b: "54b9c413-0-" + i0 + "-" + i1,
            c: common_vendor.p({
              imgUrl: item2.imgUrl,
              title: item2.title,
              phone: item2.phone
            })
          };
        }),
        d: index,
        e: `item-` + item.letter
      });
    }),
    d: common_vendor.s(`height:${$data.scrollHeight}px`),
    e: $data.scrollinto,
    f: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.letter),
        b: index
      };
    }),
    g: common_vendor.s(`top:${$data.top}px`),
    h: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    i: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args)),
    j: common_vendor.o((...args) => $options.touchend && $options.touchend(...args)),
    k: $data.current
  }, $data.current ? {
    l: common_vendor.t($data.current)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/guest/guest.vue"]]);
wx.createPage(MiniProgramPage);
