<template>
	<view>
		<view class="order-details">
			<!-- head-start -->
			<view class="f1 order-head">
				<view class="goods-icon">
					<image src="/static/images/package.png" mode="widthFix"></image>
				</view>
				<view class="order-state">
					<view class="state-title">
						{{menuState[0].lable}}
					</view>
					<view class="state-time">
						2024-01-24 10:42:37
					</view>
				</view>
			</view>
			<!-- head-end -->
			<!-- steps-strat -->
			<view class="f2 order-steps">
				<uni-steps :options="list1" active-icon="circle-filled" :active="active" :active-color="themeColor" />
			</view>
			<!-- steps-end -->
			<!-- address-start -->
			<view class="f3 shipping-address">
				<view class="user-info">
					<view class="user-nickname">
						张三
					</view>
					<view class="user-phone">
						12345678901
					</view>
				</view>
				<view class="address-info">
					云南省昆明市五华区二环西路398号高新科技广场20F
				</view>
			</view>
			<!-- address-end -->
			<!-- goods-start -->
			<view class="f4 product-info">
				<view class="product-total">
					共{{products.length}}件商品
				</view>
				<view class="mail-product" v-for="product in products">
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
								￥&nbsp;{{product.price}}
							</view>
							<view class="goods-num">
								数量：×{{product.num}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- goods-end -->
			<!-- info - start -->
			<view class="f5 order-info">
				<view class="order-info-item">
					<view class="order-item-tit">
						订单编号：
					</view>
					<view class="order-item-del">
						ZXSC5261564
					</view>
				</view>
				<view class="order-info-item">
					<view class="order-item-tit">
						订单时间：
					</view>
					<view class="order-item-del">
						2024-01-24 09:47:33
					</view>
				</view>
				<view class="order-info-item">
					<view class="order-item-tit">
						支付状态：
					</view>
					<view class="order-item-del">
						未支付
					</view>
				</view>
				<view class="order-btn">
					<view class="order-cel">
						取消订单
					</view>
					<view class="post-sale-start">
						申请售后
					</view>
				</view>

				<!-- 				<view class="post-sale-end">
					售后状态
				</view> -->
			</view>
			<!-- info - end -->
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from "vuex"
	export default {
		data() {
			return {
				order: "", //订单号
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
						color: "#333"
					},
					{
						value: '3',
						lable: "已取消",
						color: "#999"
					},
				],
				active: 0, //订单状态
				list1: [{
					title: '待付款'
				}, {
					title: '代发货'
				}, {
					title: '待收货'
				}, {
					title: '已完成'
				}],
				products: [{
						"id": '63',
						"title": "HUAWEI Mate 60 Pro+",
						"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png',
						"remark": '16GB + 1TB',
						"num": "1",
						"price": "9999.00",
					},
					{
						"id": '61',
						"image": 'https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png',
						"title": "HUAWEI Mate 60 Pro",
						"remark": '12GB + 1TB',
						"num": "1",
						"price": "7999.00",
					},
					{
						"id": '53',
						"image": 'https://res8.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6941487279432/800_800_BF66EB274D635C86BCE31D307AE9A6EDmp_tds.png',
						"title": "HUAWEI P50 Pocket",
						"remark": '12GB + 512GB',
						"num": "1",
						"price": "9988.00",
					}
				],

			}
		},
		computed:{
			...mapGetters(['themeColor']),
			...mapState(['themeColor']),
		
		},
		onLoad(option) {
		let { order } =option
		this.order = order
		}
	}
</script>

<style lang="scss" scoped>
	.f1 {
		width: 750upx;
		padding: 30upx 30upx 40upx;
		background: $uni-theme-color;
		color: $uni-white;
		display: flex;
		align-items: center;

		.goods-icon {
			width: 100upx;
			height: 100upx;
			border: 4upx solid $uni-white;
			border-radius: $uni-radius-circle;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 50upx;
				height: 50upx;
			}
		}

		.order-state {
			margin-left: 40upx;

			.state-title {
				letter-spacing: $uni-font-space;
			}

			.state-time {
				color: rgba(255, 255, 255, .55);
			}
		}
	}

	.f2 {
		width: 750upx;
		background: $uni-white;
		padding: 20upx 0 30upx;
	}

	.f3 {
		background-color: $uni-white;
		margin-top: 20upx;
		padding: 30upx;

		.user-info {
			display: flex;
			line-height: 2;
			font-weight: 550;

			.user-nickname {}

			.user-phone {
				margin-left: 30upx;
			}
		}

		.address-info {
			color: $uni-secondary-color;
		}
	}

	.f4 {
		background-color: $uni-white;
		margin-top: 20upx;

		.product-total {
			font-size: $uni-font-size-lg;
			line-height: 2;
			padding: 10upx 30upx;
		}

		.mail-product {
			padding: 30upx;
			border-top: 2upx solid $uni-border-2 ;
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
	}

	.f5 {
		background-color: $uni-white;
		margin-top: 20upx;
		padding: 30upx;
		.order-info-item{
			display: flex;
			justify-content: space-between;
			line-height: 2;
			.order-item-del{
				color: $uni-secondary-color;
			}
		}
		.order-btn{
			margin-top: 20upx;
			margin-bottom: 30upx;
			display: flex;
			flex-direction: row-reverse;
			justify-content: flex-start;
			view{
				background: none;
				color: $uni-main-color;
				border: 2upx solid $uni-border-3;
				border-radius: 6upx;
				padding: 8upx 14upx;
				margin-left: 20upx;
			}
		}
	}
</style>