<template>
	<view>
		<scroll-view scroll-y="true" :style="`height:${scrollHeight}px`" :scroll-into-view="scrollinto">
<!-- 		<uni-search-bar placeholder="搜索客户姓名/电话" @confirm="search" @cancel="cancel" cancelButton="none">
			<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
		</uni-search-bar> -->
		<!-- 搜索还是放在新页面好，不然逻辑很混乱，之后再加个按钮吧 -->
		
		<view class="item-container" hover-class="bg-light" @click="click">
			<view class="image-container">
				<image class="avatar" src="./../static/image/customer-add-fill.png" mode="aspectFit">
				</image>
			</view>
			<view class="label-container">
				<text>新增客户</text>
			</view>
		</view>
		<view class="item-container" hover-class="bg-light" @click="click">
			<view class="image-container">
				<image class="avatar" src="./../static/image/discount-fill.png" mode="aspectFit">
				</image>
			</view>
			<view class="label-container">
				<text>标签</text>
			</view>
		</view>

			<!-- 索引列表 -->
			<view v-for="(item,index) in list" :key="index" :id="`item-` + item.letter">
				<view>
					<!-- 判断该字母有没有孩子，没有就不显示了 -->
					<text v-if="item.data.length" style="margin-left: 10px;">{{item.letter}}</text>
				</view>
				<my-list-item v-for="(item2,index2) in item.data" :key="index2" :imgUrl="item2.imgUrl" :title="item2.title"
					:phone="item2.phone"></my-list-item>
			</view>
		</scroll-view>

		<!-- 侧边栏 -->
		<view style="position: fixed; right: 5px; bottom: 0; display: flex; flex-direction: column; align-items: center; height: 100%;"
			:style="`top:${top}px`" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<view v-for="(item,index) in list" :key="index"
				style="display: flex; flex: 1; align-items: center; justify-content: center;">
				<text style="font-size: 12px; text-align: center; color: #aaa;">{{item.letter}}</text>
			</view>
		</view>
		
		<!-- 字母提示 -->
		<view v-if="current" style="width: 80px; height: 80px; line-height: 80px; left: 150px; position: fixed; align-items: center; justify-content: center; top:30%;
		background-color: #f0f0f0; border-radius: 50%; text-align: center;">
			<text class="font-lg">{{current}}</text>
		</view>
	</view>
</template>

<script>
	// 这个是我自己写的组件,放在components的目录里面了
	//官方组件对于版本兼容性很好，但是对于内容拓展不好，还要解决很多样式冲突
	//所以就自己写了一个
	import MyListItem from '@/components/my-list-item.vue'
	export default {
		components: {
			MyListItem
		},
		data() {
			return {
				top: 0, //侧边栏顶部动态距离，算不好，摆了
				scrollHeight: 0, //可滑动距离
				scrollinto: '',
				current: '',
				list: {}
			}
		},
		onLoad() {
			uni.getSystemInfoAsync().then(info => {
				this.scrollHeight = info.windowHeight;
				console.log("scrollHeight", this.scrollHeight);
			});
		},
		computed: {
			itemHeight() {
				//因为是数组，没有高度，用的长度
				//原理就是用高度和长度算出当前点击的是第几个元素然后跳转
				const count = this.list.length;
				return this.scrollHeight / count;
			}
		},
		methods: {
			getList() {
				this.$request('/guest/getList', null, 'GET').then(res => {
					// console.log("获取客户列表成功！", res);
					this.list = res;
					uni.setStorageSync('guestList', res);
				})
			},
			touchstart(e) {
				this.changeScrollinto(e);
			},
			touchmove(e) {
				this.changeScrollinto(e);
			},
			touchend() {
				this.current = null; // 重置 current 变量为 null，隐藏字母提示
			},
			changeScrollinto(e) {
				const Y = e.touches[0].pageY;
				const index = Math.floor(Y / this.itemHeight);
				// console.log("index", index)
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
	}
</script>

<style>
	.item-container {
		display: flex;
		background-color: #fff;
	}
	
	.image-container {
		display: flex;
		width: 50px;
		height: 50px;
		align-items: center;
	}
	
	.label-container {
		display: flex;
		margin-left: 5px;
		border-bottom: 1px solid #e9e9eb;
		width: 100%;
		height: 50px;
		align-items: center;
	}
	
	.avatar {
		margin-left: 10px;
		width: 40px;
		height: 40px;
		border-radius: 10%;
	}
</style>