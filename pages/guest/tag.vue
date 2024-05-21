<template>
	<div style="background-color: #fff; width: 100%; height: 100vh;">
		<view style="height: 120px;">
			<uni-search-bar placeholder="搜索客户姓名/电话" @confirm="search" @cancel="cancel" cancelButton="none">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#2979ff"
				@clickItem="onClickItem" />
			<view style="margin: 5px auto; text-align: center;">
				共{{ count[current] || 0}} 项
			</view>	
		</view>
		<scroll-view scroll-y="true" :style="`height:${scrollHeight}px`">
			<view v-if="current == 0">
				<view v-for="(item,index) in list" :key="index" :id="`item-` + item.letter">
					<my-list-item v-for="(item2,index2) in item.data" :key="index2" :imgUrl="item2.imgUrl" :name="item2.name"
						:phone="item2.phone" :sex="item2.sex" :age="item2.age" :state="item2.state"></my-list-item>
				</view>
			</view>
			<view v-if="current != 0">
				<view v-for="(item,index) in filteredList" :key="index" :id="`item-` + item.letter">
					<my-list-item v-for="(item2,index2) in item.data" :key="index2" :imgUrl="item2.imgUrl" :name="item2.name"
						:phone="item2.phone" :sex="item2.sex" :age="item2.age" :state="item2.state"></my-list-item>
				</view>
			</view>

		</scroll-view>

	</div>
</template>

<script>
	import MyListItem from '@/components/my-list-item.vue'
	export default {
		components: {
			MyListItem
		},
		data() {
			return {
				date: '',
				details: '',
				current: 0,
				scrollHeight: 0,
				items: ['全部', '潜在', '洽谈', '成功', '失败'],
				list: []
			}
		},
		computed: {
			filteredList() {
				if (this.current === 0) {
					return this.list;
				}
				return this.list.map(item => {
					return {
						...item,
						data: item.data.filter(item2 => item2.state === this.current - 1)
					};
				}).filter(item => item.data.length > 0);
			},
			count() {
				const count = {
					0: 0,
					1: 0,
					2: 0,
					3: 0,
					4: 0
				};
				this.list.forEach(item => {
					item.data.forEach(item2 => {
						if (count[item2.state + 1] !== undefined) {
							count[item2.state + 1]++;
						}
					});
				});
				count[0] = this.list.reduce((acc, item) => acc + item.data.length, 0);
				return count;
			}
		},
		onLoad() {
			uni.getSystemInfoAsync().then(info => {
				this.scrollHeight = info.windowHeight - 120;
				console.log("scrollHeight", this.scrollHeight);
			});
		},
		mounted() {
			this.getList();
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				console.log(this.current)
			},
			getList() {
				this.list = uni.getStorageSync('guestList');
			}
		}
	}
</script>

<style>
</style>