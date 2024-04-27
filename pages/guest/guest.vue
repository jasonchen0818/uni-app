<template>
	<view>
		<uni-search-bar placeholder="搜索客户姓名/电话" @confirm="search" @cancel="cancel" cancel-text="取消">
			<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
		</uni-search-bar>
	</view>
	<scroll-view scroll-y="true">
		<my-list-item imgUrl="./../static/image/customer-add-fill.png" title="新增客户"></my-list-item>
		<my-list-item imgUrl="./../static/image/discount-fill.png" title="标签"></my-list-item>
		<!-- 下面是正在实现的索引列表 -->
		<view v-for="(item,index) in list" :key="index">
			<view>
				<!-- 判断该字母有没有孩子，没有就不显示了 -->
				<text v-if="item.data.length" style="margin-left: 10px;">{{item.letter}}</text>
			</view>
			<my-list-item v-for="(item2,index2) in item.data" :key="index2" :imgUrl="item2.imgUrl"
				:title="item2.title"></my-list-item>
		</view>
	</scroll-view>
	<!-- 侧边栏 -->
	<view style="position: fixed; right: 5px; bottom: 0; display: flex; flex-direction: column; align-items: center; height: 100%;">
		<view v-for="(item,index) in list" :key="index" style="display: flex; flex: 1; align-items: center; justify-content: center;">
			<text style="font-size: 18px; text-align: center; color: #aaa;">{{item.letter}}</text>
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
				list: {}
			}
		},
		methods: {
			getList() {
				this.$request('/guest/getList', null, 'GET').then(res => {
					console.log("获取客户列表成功！", res);
					this.list = res;
				})
			}
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style>

</style>