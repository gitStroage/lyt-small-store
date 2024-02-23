<template>
	<view>
		<!-- search-start -->
		<view class="search-form">
			<navigator url="/pages/index/index" open-type="switchTab">
				<uni-icons class="back" type="back" size="24" color="#FFF"></uni-icons>
			</navigator>
			<icon class="icon" type="search" size="16"></icon>
			<input type="text" @confirm="handleSearch" v-model="kw" placeholder="请输入商品关键字">
			<view class="search-btn" @click="handleSearch">
				搜索
			</view>
		</view>
		<!-- search-end -->
		<!-- History-search -->
		<view class="history-search">
			<uni-card title="历史搜索" :isFull="true" :clickable="true">
				<uni-tag :inverted="true" :circle="true" v-for=" (item,index) in tags" :key="index" :text="item"
					:type=" tagActive == index ? 'error' : tagType" @click="handleTag(index)"
					custom-style="display:inline-block;padding:14upx 20upx;margin: 0 10upx 20upx 0" />
			</uni-card>
		</view>
		<!-- History - end -->
		<!-- list-start -->
		<view class="product-lists" v-if="products.length>0">
			<!-- 商品列表 -->
			<uni-list>
				<uni-list-item v-for="item in products" :key="item.id" :thumb="item.pic" thumb-size="lg" ellipsis=1
					:title="item.title" link @click="handleDetail(item.id)"></uni-list-item>
			</uni-list>

			<view class="pagination">
				<uni-pagination title="分页" show-icon="true" :total="total" current="1" :pageSize="pageSize"
					@change="changePage"></uni-pagination>
			</view>
		</view>
		<!-- list-end -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				kw: '', //  双向绑定input的值
				pno: 1, //当前页
				products: [], //保存请求数据
				pageCount: 999, //存储商品列表总页面
				pageSize: 10, //每页显示的数量
				total: 0, //数据总量
				isLoading: false, //请求状态,防抖
				tags: [" P50 Pocket", " Mate 60 Pro", " P60 Art", "HUAWEI Mate 60 Pro+"],
				tagActive: null,
				tagType: 'default',
				testProducts: [{
					id: "60",
					title: "HUAWEI Mate 60 Pro",
					pic: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png"
				}, {
					id: "61",
					title: "HUAWEI P60 Art",
					pic: "https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png"
				}, {
					id: "62",
					title: "HUAWEI Mate 60 Pro+",
					pic: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png"
				}, ]
			}
		},
		methods: {
			//执行搜索
			handleSearch() {
				console.log(this.kw)
				this.products = this.testProducts
				this.total = this.testProducts.length
			},
			//历史标签查询
			handleTag(index) {
				console.log(index)
				this.tagActive = index
				this.products = this.testProducts
				this.total = this.testProducts.length
			},
			//点击列表项跳转到详情页面
			handleDetail(id) {
				let url = `/pages/details/details?id=${id}`
				uni.navigateTo({
					url
				})
			},
			//监听分页,重新请求数据
			changePage(e) {
				console.log(e)
				this.pno = e.current
			}
		},
		onLoad(option) {
			let {
				keyWord
			} = option
			console.log(keyWord)
			if (keyWord){
				this.handleSearch()
			}
		},
		onShow() {
			this.kw = ''
		}
	}
</script>

<style lang="scss" scoped>
	.search-form {
		background-color: $uni-theme-color;
		padding: 20upx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		position: relative;

		.back {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 20upx;
		}

		.icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 15%;

		}

		input {
			background-color: $uni-inverse-color;
			width: 73%;
			height: 70upx;
			border-radius: 35upx;
			padding-left: 80upx;
			padding-right: 20upx;
		}

		.input-placeholder {
			font-size: $uni-font-size-lg;
			color: $uni-secondary-color;
		}

		.search-btn {
			color: $uni-inverse-color;
			font-size: $uni-font-size-lg;
			font-weight: bold;
			cursor: pointer;
		}

		.history-search {
			background: $uni-white;

			uni-card {
				padding: 0;
			}
		}

		.product-lists {}
	}
</style>