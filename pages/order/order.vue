<template>
	<view>
		<!-- f1 address-start -->
		<view class="f1 shipping-address" @click="handleCheckAddress">
			<view class="ad-left">
				<view class="left-top">
					<view class="name">
						{{address.name}}
					</view>
					<view class="phone">
						{{address.phone}}
					</view>
				</view>
				<view class="left-down">
					{{address.title}}{{address.address}}{{address.moreAddres}}
				</view>
			</view>
			<view class="ad-right">
				<view class="cicon">
					<uni-icons type="forward" size="24"></uni-icons>
				</view>
			</view>
		</view>
		<!-- address-end -->
		<!-- f2 goods-start -->
		<view class="f2 goods-lists">
			<view class="goods-item" v-for="item in products" :key="item.title">
				<view class="goods-img">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="goods-info">
					<view class="goods-title">
						{{item.title}}
					</view>
					<view class="goods-remark">
						规格：{{item.remark}}
					</view>
					<view class="goods-num-box">
						<view class="goods-price">
							KS&nbsp;{{item.price}}
						</view>
						<view class="goods-num">
							共{{item.number}}件
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- goods-end -->
		<!-- f3 postage-start -->
		<view class="f3 postage-methods">
			<view class="col-title">
				配送方式
			</view>
			<view class="postage-lists">
				<view class="postage-item" v-for="(item,index) in postageOption">
					<view class="postage-tit">
						{{item.text}}
					</view>
					<view class="cicon">
						<image @click="handleSelePostage(item.value)" v-if="item.checked" :src="sele" mode="widthFix">
						</image>
						<image @click="handleSelePostage(item.value)" v-else :src="no_sele" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="postage-fee">
				配送费：<text>Ks&nbsp;{{postageFee}}</text>
			</view>
		</view>
		<!-- postage-end -->
		<!-- f4 payment-start -->
		<view class="f4 payment-methods">
			<view class="col-title">
				支付方式
			</view>
			<view class="pay-lists">
				<view class="pay-item" v-for="item in paymentOption">
					<view class="pay-tit">
						{{item.text}}
					</view>
					<view class="cicon">
						<image @click="handleSelePayment(item.value)" v-if="item.checked" :src="theme == 'blue' ? sele : sele_red" mode="widthFix">
						</image>
						<image @click="handleSelePayment(item.value)" v-else :src="no_sele" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- payment-end -->
		<!-- pay-start -->
		<view class="f5 pay-Now">
			<view class="goods-number">
				共{{products.length}}件
			</view>
			<view class="goods-total">
				<text class="total-tit">合计:</text><text class="total-del">KS&nbsp;{{total}}</text>
			</view>
			<view class="pay-btn" @click="">
				提交订单
			</view>
		</view>
		<!-- pay-end -->
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
	} from 'vuex'
	export default {
		data() {
			return {
				sele: '../../static/images/sele_blue.png',
				sele_red:'../../static/images/sele_red.png',
				no_sele: "../../static/images/no-sele.png",
				postageType: "", //配送方式
				postageOption: [{
						"value": 0,
						"text": "物流配送",
						"checked": true,
						"disable": false // 禁用当前项
					},
					{
						"value": 1,
						"text": "自提",
						"checked": false,
						"disable": false
					}
				],
				payment: "", //支付方式
				paymentOption: [{
					"value": 0,
					"text": "现金支付",
					"checked": true,
					"disable": false // 禁用当前项
				}, {
					"value": 1,
					"text": "微信支付",
					"checked": false,
					"disable": false // 禁用当前项
				}, {
					"value": 3,
					"text": "钱包支付",
					"checked": false,
					"disable": false // 禁用当前项
				}, ],
				postageFee: '12.00',
				addressList: [{
					id: 1,
					name: '三儿',
					phone: '12345678915',
					title: "云南省昆明市五华区",
					address: '二环西路398号',
					detailAddress: '高新科技广场20F',
					lable: "",
					isdefult: true,

				}, {
					id: 2,
					name: '小五',
					phone: '12345678915',
					title: "云南省昆明市五华区",
					address: '二环西路398号',
					detailAddress: '高新科技广场20F',
					lable: "",
					isdefult: false,
				}, {
					id: 3,
					name: '小李子',
					phone: '12345678915',
					title: "云南省昆明市五华区",
					address: '二环西路398号',
					detailAddress: '高新科技广场20F',
					lable: "",
					isdefult: false,
				}],
				address: {}, //收货地址
				visible: true, //电话脱敏
				products: {}, //商品信息
				total: 0, //订单总额
			}
		},
		computed: {
			...mapGetters(['theme']),
			...mapState([
				'theme'
			])
		},
		methods: {
			/* 电话号码脱敏 */
			handlephoneHiding() {
				let {
					phone
				} = this.address
				phone = this.phoneNuberConvert(phone)
				this.address.phone = phone
			},
			/**
			 * 手机号码脱敏
			 * @param number
			 */
			phoneNuberConvert(number) {
				if (!number) return "";
				let pat = /(\d{3})\d*(\d{4})/;
				let result = number.replace(pat, "$1****$2");
				return result;
			},

			/* 选择地址 */
			handleCheckAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			//匹配地址
			handleMatchAddress(id) {
				if (id) {
					for (let i = 0; i < this.addressList.length; i++) {
						if (id == this.addressList[i].id) {
							this.address = this.addressList[i]
						}
					}
				}

			},
			// 选择配送方式
			handleSelePostage(value) {
				if (this.postageType == value) {
					return
				} else {
					this.postageOption.map((item) => {
						if (item.value == value) {
							item.checked = true
						} else {
							item.checked = false
						}
					})
					this.postageType = value
				}

			},
			/* 选择支付方式 */
			handleSelePayment(value) {
				if (this.payment == value) {
					return
				} else {
					this.paymentOption.map((item) => {
						if (item.value == value) {
							item.checked = true
						} else {
							item.checked = false
						}
					})
					this.payment = value
				}

			}
		},
		onLoad(option) {
			//默认地址
			this.address = this.addressList[1]
			if (JSON.stringify(option) != "{}") {
				let {
					id
				} = option
				this.handleMatchAddress(id)

			}
			//获取订单信息
			let products = JSON.parse(decodeURIComponent(uni.getStorageSync('products')))
			// console.log("goods===", products)
			//商品数据
			this.products = products
			let total = 0
			products.forEach((item) => {
				total += item.price * item.number
			})
			//订单总计
			this.total = total.toFixed(2)
			// console.log(this.products)

		},
		onShow() {
			//手机脱敏
			this.handlephoneHiding()

		},
	}
</script>

<style lang="scss" scoped>
	page {
		padding: 20upx 30upx 140upx;
	}

	.f1 {
		background-color: $uni-white;
		padding: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;

		.ad-left {
			width: 480upx;

			.left-top {
				display: flex;

				.name {}

				.phone {
					margin-left: 20upx;
				}
			}

			.left-down {}

		}

		.ad-right {
			width: 100upx;
			text-align: right;
		}
	}

	.f2 {
		background-color: $uni-white;
		margin-top: 20upx;

		.goods-item {
			padding: 20upx 40upx 20upx 20upx;
			display: flex;
			flex-direction: row;

			.goods-img {
				width: 180upx;
				height: 180upx;
				margin-bottom: 10upx;

				image {
					width: 100%;
				}
			}

			.goods-info {
				flex: 1;

				.goods-title {
					font-weight: 550;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}

				.goods-remark {
					font-size: 24upx;
					font-weight: 400;
					color: $uni-base-color;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}

				.goods-num-box {
					margin-top: 20upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.goods-price {
						font-size: 32upx;
						font-weight: 550;
						color: $uni-theme-color;
					}

					.goods-num {}
				}
			}
		}
	}

	.f3 {
		background-color: $uni-white;
		padding: 20upx 40upx 20upx 20upx;
		margin-top: 20upx;

		.col-title {}

		.postage-lists {
			padding-left: 112upx;

			.postage-item {
				display: flex;
				justify-content: space-between;
				line-height: 2;

				.postage-tit {}

				.cicon {
					image {
						width: 40upx;
					}
				}
			}

		}

		.postage-fee {
			text {
				color: $uni-theme-color;
				font-weight: 600;
			}
		}
	}

	.f4 {
		background-color: $uni-white;
		padding: 20upx 40upx 20upx 20upx;
		margin-top: 20upx;

		.col-title {}

		.pay-lists {
			padding-left: 112upx;

			.pay-item {
				display: flex;
				justify-content: space-between;
				line-height: 2;

				.pay-tit {}

				.cicon {
					image {
						width: 40upx;
					}
				}
			}
		}
	}

	.f5 {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 120upx;
		box-sizing: border-box;
		padding: 0 30upx;
		background-color: $uni-white;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-top: 2upx solid $uni-border-2;
		line-height: 80upx;
		letter-spacing: $uni-font-space;

		.goods-number {
			color: $uni-base-color;
			font-weight: 550;
		}

		.goods-total {
			margin: 0 20upx 0 10upx;

			.total-tit {
				font-weight: 550;
			}

			.total-del {
				color: $uni-theme-color;
				font-size: $uni-font-size-lg;
				font-weight: 600;
			}
		}

		.pay-btn {
			width: 240upx;
			height: 80upx;
			text-align: center;
			border-radius: 80upx;
			background-color: $uni-theme-color;
			color: #fff;
			font-size: $uni-font-size-lg;
			font-weight: 550;
			// margin-bottom: 60px;
		}
	}
</style>