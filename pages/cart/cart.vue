<template>
	<view>
		<view class="shop-car-header">
			<text @tap="handleCut">{{isCut?'管理':'完成'}}</text>
		</view>
		<view class="shop-car">
			<shop-car ref="shopCar" :list="goodsProducts" @delect="delect" @accounts="accounts">
			</shop-car>

		</view>
	</view>
</template>

<script>
	import shopCar from "@/components/shopCar/shopCar.vue"
	export default {
		components: {
			shopCar
		},
		data() {
			return {
				isCut: true,
				goodsProducts: [{
					name: '华为旗舰店',
					checked: false,
					goods: [{
						img: 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png',
						title: 'HUAWEI Mate 60 Pro+',
						remark: '16GB + 1TB',
						price: '9999.00',
						number: 1,
						checked: false
					}, {
						img: 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png',
						title: 'HUAWEI Mate 60 Pro',
						remark: '12GB + 1TB',
						price: '7999.00',
						number: 1,
						checked: false
					}]
				}, {
					name: '华为旗舰店',
					checked: false,
					goods: [{
						img: 'https://res8.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6941487279432/800_800_BF66EB274D635C86BCE31D307AE9A6EDmp_tds.png',
						title: 'HUAWEI P50 Pocket',
						remark: '12GB + 512GB',
						price: '9988.00',
						number: 1,
						checked: false
					}, {
						img: 'https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png',
						title: 'HUAWEI P60 Art',
						remark: '12GB + 512GB',
						price: '7988.00',
						number: 1,
						checked: false
					}]
				}],
			}
		},
		
		methods: {
			//管理
			handleCut() {
				this.isCut = !this.isCut
				//调用组件方法
				this.$refs.shopCar.cut();
			},
			//删除
			delect(e) {
				let products = JSON.parse(decodeURIComponent(e))
				products = products.filter((item) => {
					return item.checked == false
				})
				for (let i = 0; i < products.length; i++) {
					products[i].goods = products[i].goods.filter((itemq) => {
						return itemq.checked == false
					})
				}
				this.goodsProducts = products
			},
			//结算
			accounts(e) {
				let products = JSON.parse(decodeURIComponent(e))
				let buyGoods = []
				for (let i = 0; i < products.length; i++) {
					 products[i].goods.forEach((itemq) => {
						 if(itemq.checked == true){
							 buyGoods.push(itemq)
						 }
					})
				}
				uni.navigateTo({
					url:`/pages/order/order` 
				})
				uni.setStorageSync('products',encodeURIComponent(JSON.stringify(buyGoods)) )
			}
		},
		onReady(){
		    //Vuex的方式 
		    // 设置导航条
		    uni.setNavigationBarColor(this.$store.state.themes.navBar);
		    // 设置tabbar
		    uni.setTabBarStyle(this.$store.state.themes.tabBar); 
		},
	}
</script>

<style lang="scss" scoped>
	.shop-car-header {
		position: fixed;
		top: 0;
		right: 30upx;
		z-index: 999;
		cursor: pointer;

		text {
			color: $uni-white;
			line-height: 44px;
			font-weight: 400;

		}
	}

	.shop-car {
		width: 100%;
		min-height: calc(100vh + 100upx);
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F5F5F5;
	}
</style>