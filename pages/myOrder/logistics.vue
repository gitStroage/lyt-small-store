<template>
	<view>
		<!-- <view class="f1 products-info">
			<view class="mail-product" v-for="product in products">
				<view class="product-img">
					<image :src="product.image" mode="widthFix">
				</view>
				<view class="product-info">
					<view class="goods-title">
						{{product.title}}
					</view>
					<view class="goods-num-box">
						<view class="goods-price">
							￥&nbsp;{{product.price}}
						</view>
						<view class="goods-num">
							×{{product.num}}
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="f2 logistics-info">
			<view class="log-head">
				<view class="log-icon">
					<image src="/static/images/logistics.png" mode="widthFix"></image>
				</view>
				<view class="log-main">
					<view class="log-com">
						<text class="log-con-tit">物流公司：</text>
						<text>顺丰速运</text>
					</view>
					<view class="log-ord">
						<text class="log-con-tit">快递单号：</text>
						<text>5156462154515444</text>
					</view>
				</view>
				<view class="log-num-copy">
					复制单号
				</view>
			</view>
			<view class="dividing-line"></view>
			<view class="log-knots">
				<logistics :wlInfo="wlInfo"></logistics>
			</view>
		</view>
	</view>
</template>

<script>
	import logistics from '@/components/logistics/logistics.vue'
	export default {
		components: {
			logistics
		},
		data() {
			return {
				order: "", //订单编号
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
				wlInfo: {
					delivery_status: 1, //快递状态 1已签收 2配送中
					post_name: '顺丰速运', //快递名称
					exp_phone: '95546', //快递电话
					post_no: '5156462154515444', //快递单号
					addr: '江西省南昌市青云谱区', //收货地址
					//物流信息
					list: [{
							"time": "2020-04-12 13:00:57",
							"timeArr": ['2020-04-12', '13:00:57'],
							"context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
							"location": ""
						},
						{
							"time": "2020-04-12 12:58:53",
							"timeArr": ['2020-04-12', '12:58:53'],
							"context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
							"location": ""
						},
						{
							"time": "2020-04-11 15:45:44",
							"timeArr": ['2020-04-11', '15:45:44'],
							"context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
							"location": ""
						},
						{
							"time": "2020-04-11 15:08:45",
							"timeArr": ['2020-04-11', '15:08:45'],
							"context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
							"location": ""
						},
						{
							"time": "2020-04-10 17:42:41",
							"timeArr": ['2020-04-10', '17:42:41'],
							"context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
							"location": ""
						},
						{
							"time": "2020-04-10 17:39:38",
							"timeArr": ['2020-04-10', '17:39:38'],
							"context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
							"location": ""
						},
						{
							"time": "2020-04-10 16:02:46",
							"timeArr": ['2020-04-10', '16:02:46'],
							"context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
							"location": ""
						},
						{
							"time": "2020-04-10 15:48:42",
							"timeArr": ['2020-04-10', '15:48:42'],
							"context": "浙江义乌城西公司城西营销部 进行揽件扫描",
							"location": ""
						}
					]
				},

			}
		},
		onLoad(option) {
			let {
				order
			} = option
			this.order = order
		}
	}
</script>

<style lang="scss" scoped>
	.f1 {
		width: 750upx;
		background-color: $uni-white;
		padding: 20upx;

		.mail-product {
			display: flex;
			margin-bottom: 20upx;

			.product-img {
				width: 160upx;
				height: 160upx;
				text-align: center;
				border: 2upx solid $uni-border-1;
				margin-right: 10upx;

				image {
					display: block;
					width: 100%;
					max-height: 100%;
				}
			}

			.product-info {
				flex: 1;
				display: flex;

				.goods-title {
					flex: 1;
					padding: 0 50upx 0 10upx;
				}

				.goods-num-box {
					color: $uni-secondary-color;
					font-weight: 500;
					text-align: right;
				}
			}


		}
	}

	.f2 {
		width: 750upx;
		background-color: $uni-white;
		.log-head {
			padding: 20upx;
			display: flex;
			align-items: center;

			.log-icon {
				width: 60upx;
				height: 60upx;
				background-color: $uni-bg-dark-gery;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 40upx;
				}
			}

			.log-main {
				flex: 1;
				padding: 0 50upx 0 20upx;

				.log-con-tit {
					color: $uni-secondary-color;
				}
			}

			.log-num-copy {
				width: 144upx;
				height: 56upx;
				text-align: center;
				line-height: 56upx;
				display: inline-block;

				border: 2upx solid $uni-border-3;
			}
		}

		.dividing-line {
			width: 750upx;
			height: 2upx;
			background-color: $uni-border-2;
			margin: 20upx 0;
		}
	}
</style>