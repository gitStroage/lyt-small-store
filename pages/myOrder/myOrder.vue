<template>
	<view>
		<view class="aui-ord">
			<view class="ord-nav">
				<view v-for="(menuTab,index) in menuTabs" :key="index" @click="swichMenu(index)"
					:class="[currentTab==index ? 'ord-nav-item ord-active' : 'ord-nav-item']">
					{{menuTab.name}}
				</view>
			</view>
		</view>
		<view class="nav-height">

		</view>
		<view class="ord-panel">
			<view v-for="(menuList,index2) in menuLists" :key="index2"
				:class="[currentTab==index2 ? 'ord-panel-item ord-active' : 'ord-panel-item']">

				<view v-for="(menuList2,index3) in menuList" :key="index3" class="ord-item">
					<view class="aui-well-item aui-well-item-clear">
						<view class="aui-well-item-hd">
							<image src="/static/images/order.png" mode="widthFix"></image>
						</view>
						<view class="aui-well-item-bd">
							订单号：{{menuList2.onumber}}
						</view>
						<view :style="{'color':menuState[menuList2.state].color}" class="aui-well-item-fr">
							{{menuState[menuList2.state].lable}}
						</view>
					</view>
					<view class="aui-mail-product" v-for="product in menuList2.products">
						<view class="product-item">
							<view class="product-img">
								<image :src="product.image" mode="widthFix">
							</view>
							<view class="product-info">
								<view class="goods-title">
									{{product.title}}
								</view>
								<view class="goods-remark">
									规格：{{product.remark}}
								</view>
								<view class="goods-num-box">
									<view class="goods-price">
										KS&nbsp;{{product.price}}
									</view>
									<view class="goods-num">
										数量：×{{product.num}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="aui-mail-payment">
						<view class="products-sum">
							共{{menuList2.sum}}件
						</view>
						<view class="payments">
							实付款: KS&nbsp;{{menuList2.payment}}
						</view>


					</view>
					<view class="aui-mail-button">
						<view :data-order="menuList2.onumber"
							:class="[menuList2.pay==0 ? 'hd' : menuList2.pay==2 ? '' :'aui-df-color']">
							去支付</view>
						<view :data-order="menuList2.onumber"
							:class="[menuList2.logistic==0 ? 'hd' : menuList2.logistic==2 ? '' :'aui-df-color']"
							@click="handleViewLogistic">
							查看物流</view>
						<view :data-order="menuList2.onumber"
							:class="[menuList2.cancel==0 ? 'hd' : menuList2.cancel==2 ? '' :'aui-df-color']"
							@click="handleCancelOrder">
							取消订单</view>
						<view :data-order="menuList2.onumber"
							:class="[menuList2.buy==0 ? 'hd' : menuList2.buy==2 ? '' :'aui-df-color']"
							@click="handleOrderDetail">
							查看详情</view>

					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				menuTabs: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				}, {
					name: '已取消'
				}, ],
				menuState: [{
						value: '0',
						lable: "待付款",
						color: "#FF6700"
					},
					{
						value: '1',
						lable: "待收货",
						color: "#CC2532"
					},
					{
						value: '2',
						lable: "已完成",
						color: "#0081FF"
					},
					{
						value: '3',
						lable: "已取消",
						color: "#999"
					},
				],
				menuLists: [
					[{

							"onumber": "ZXSC5261656",
							"state": "0",
							'products': [{
								"id": '63',
								"title": "HUAWEI Mate 60 Pro+",
								"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png',
								"remark": '16GB + 1TB',
								"num": "1",
								"price": "9999.00",
							}],
							"sum": "1",
							"payment": "9999.00",
							"buy": 1,
							"pay": 2,
							"cancel": 1,
							"logistic": 0,

						}, {

							"onumber": "ZXSC5261657",
							"state": "1",
							'products': [{
								"id": '61',
								"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png',
								"title": "HUAWEI Mate 60 Pro",
								"remark": '12GB + 1TB',
								"num": "1",
								"price": "7999.00",
							}],
							"sum": "1",
							"payment": "9999.00",
							"buy": 1,
							"pay": 0,
							"cancel": 1,
							"logistic": 2,
						},
						{

							"onumber": "ZXSC5261658",
							"state": "2",
							'products': [{
								"id": '53',
								"image": 'https://res8.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6941487279432/800_800_BF66EB274D635C86BCE31D307AE9A6EDmp_tds.png',
								"title": "HUAWEI P50 Pocket",
								"remark": '12GB + 512GB',
								"num": "1",
								"price": "9988.00",
							}],
							"sum": "1",
							"payment": "9999.00",
							"buy": 2,
							"pay": 0,
							"cancel": 0,
							"logistic": 0,

						},
						{

							"onumber": "ZXSC5261659",
							"state": "3",
							'products': [{
								"id": '64',
								"image": 'https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png',
								"title": "HUAWEI P60 Art",
								"remark": '12GB + 512GB',
								"num": "1",
								"price": "7988.00",
							}],
							"sum": "1",
							"payment": "9999.00",
							"buy": 2,
							"pay": 0,
							"cancel": 0,
							"logistic": 0,

						}
					],
					[{

						"onumber": "ZXSC5261656",
						"state": "0",
						'products': [{
							"id": '63',
							"title": "HUAWEI Mate 60 Pro+",
							"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png',
							"remark": '16GB + 1TB',
							"num": "1",
							"price": "9999.00",
						}],
						"sum": "1",
						"payment": "9999.00",
						"buy": 1,
						"pay": 2,
						"cancel": 1,
						"logistic": 0,

					}],
					[{

						"onumber": "ZXSC5261657",
						"state": "1",
						'products': [{
							"id": '62',
							"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png',
							"title": "HUAWEI Mate 60 Pro",
							"remark": '12GB + 1TB',
							"num": "1",
							"price": "7999.00",
						}],
						"sum": "1",
						"payment": "9999.00",
						"buy": 1,
						"pay": 0,
						"cancel": 1,
						"logistic": 2,
					}],
					[{

						"onumber": "ZXSC5261658",
						"state": "2",
						'products': [{
							"id": '53',
							"image": 'https://res8.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6941487279432/800_800_BF66EB274D635C86BCE31D307AE9A6EDmp_tds.png',
							"title": "HUAWEI P50 Pocket",
							"remark": '12GB + 512GB',
							"num": "1",
							"price": "9988.00",
						}],
						"sum": "1",
						"payment": "9999.00",
						"buy": 2,
						"pay": 0,
						"cancel": 0,
						"logistic": 0,

					}],
					[{

						"onumber": "ZXSC5261659",
						"state": "3",
						'products': [{
							"id": '64',
							"image": 'https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png',
							"title": "HUAWEI P60 Art",
							"remark": '12GB + 512GB',
							"num": "1",
							"price": "7988.00",
						}],
						"sum": "1",
						"payment": "9999.00",
						"buy": 2,
						"pay": 0,
						"cancel": 0,
						"logistic": 0,

					}],
				]
			}
		},
		onLoad(option) {
			let {
				menu
			} = option
			console.log(menu)
			if (menu != undefined) {
				this.currentTab = menu
				this.swichMenu(menu)
			}
		},
		methods: {
			//切换菜单
			swichMenu: async function(current) {
				// console.log("current===", current)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
				}
			},
			/* 获取订单列表 */
			getDateList: function() {

			},
			/* 查看物流 */
			handleViewLogistic(e) {
				let order = e.currentTarget.dataset.order
				uni.navigateTo({
					url: '/pages/myOrder/logistics?order=' + order
				})
			},
			/* 取消订单 */
			handleCancelOrder(e) {
				let order = e.currentTarget.dataset.order
				uni.navigateTo({
					url: '/pages/myOrder/cancelOrder?order=' + order
				})
			},
			/* 查看详情 */
			handleOrderDetail(e) {
				let order = e.currentTarget.dataset.order
				uni.navigateTo({
					url: '/pages/myOrder/orderDetails?order=' + order
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-bg-color;
	}

	.aui-ord {
		width: 750upx;
		height: 88upx;
		background-color: $uni-white;
		box-shadow: $uni-shadow-sm;
		position: fixed;
		top: 88upx;
		z-index: 9999;

	}

	.ord-nav {
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		display: flex;
	}

	.ord-nav-item {
		flex: 1;
		height: 100%;
		position: relative;
		text-align: center;
		color: $uni-base-color;
	}

	.ord-nav-item.ord-active {
		color: $uni-main-color;
		font-weight: bold;
	}


	.ord-nav-item.ord-active:before {
		content: '';
		display: block;
		width: 50%;
		height: 0;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		border: 2upx solid $uni-theme-color;
	}

	.nav-height {
		height: 88upx;
	}

	.ord-panel {
		padding: 20upx 0 ;
	}

	.ord-panel .ord-panel-item {
		display: none;
	}

	.ord-panel .ord-panel-item.ord-active {
		display: block;
		-webkit-transition: -webkit-transform .15s;
		transition: -webkit-transform .15s;
		transition: all .15s;
		transition: all.15s, -webkit-transform .15s;
	}

	.ord-item {
		width: 710upx;
		margin: 0 auto;
		padding: 20upx 30upx;
		background-color: $uni-white;
		margin-bottom: 20upx;
	}


	.aui-well-item {
		display: flex;
		align-items: center;
	}

	.aui-well-item-hd {
		width: 32upx;
		height: 32upx;
		line-height: 32upx;
		text-align: center;
		margin-right: 10upx;
	}

	.aui-well-item-hd image {
		width: 100%;
		vertical-align: top;
		display: block;
		border: none;
	}

	.aui-well-item-bd {
		color: $uni-base-color;
	}


	.aui-well-item-fr {
		flex: 1;
		text-align: right;
		color: $uni-car-color;
	}

	.product-item {
		margin-top: 20upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.product-img {
		width: 180upx;
		height: 180upx;
		text-align: center;
		border: 2upx solid $uni-border-1;
		margin-right: 10upx;
	}

	.product-img image {
		display: block;
		width: 100%;
		max-height: 100%;
	}

	.product-info {
		flex: 1;
		margin-left: 24upx;

		.goods-title {
			font-size: $uni-font-size-base;
			font-weight: 550;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.goods-remark {
			font-size: $uni-font-size-sm;
			font-weight: 400;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

		}

		.goods-num-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 10upx;

			.goods-price {
				font-size: $uni-font-size-lg;
				font-weight: 550;
				color: $uni-theme-color;
			}

			.goods-num {
				color: $uni-secondary-color;
			}
		}
	}


	.aui-mail-payment {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.products-sum {
			color: $uni-secondary-color;
			margin-right: 40upx;
		}

		.payments {
			color: $uni-main-color;
		}
	}



	.aui-mail-button {
		padding: 30upx 0 20upx;
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
	}

	.aui-mail-button view {
		background: none;
		color: $uni-theme-color ;
		border: 2upx solid $uni-theme-color;
		border-radius: 6upx;
		padding: 8upx 14upx;
		margin-left: 20upx;
	}

	.aui-mail-button .aui-df-color {
		color: $uni-main-color;
		border: 2upx solid $uni-border-3;
	}


	.hd {
		display: none;
	}
</style>