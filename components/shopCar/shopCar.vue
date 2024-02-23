<template>
	<view class="common-car">
		<view class="empty-shop-car" v-if="isEmpty">
			<image src="../../static/images/empty_shop_car.png" class="empty-shop-car-image" mode=""></image>
			<text>当前您的购物车是空的</text>
			<view class="empty-shop-car-btn" @tap="handleShopGoods">
				<text>去逛逛</text>
			</view>
		</view>
		<view class="shop-car" v-else>
			<view class="store-box" v-for="(itemq,indexq) in datas" :key="indexq">
				<view class="store-header">
					<image :src='"../../static/images/select_"+ theme +".png"' v-if="itemq.checked" class="checked-image" mode=""
						@tap="storeCheck(indexq,itemq.checked)"></image>
					<image src="../../static/images/not_select.png" v-else class="checked-image" mode=""
						@tap="storeCheck(indexq,itemq.checked)">
					</image>
					<text>{{itemq.name}}</text>
					<image src="../../static/images/youjiantou1.png" class="label" mode=""></image>
				</view>
				<view class="goodsInfo" v-for="(itemw,indexw) in itemq.goods" :key="indexw">
					<image :src='"../../static/images/select_"+ theme +".png"' v-if="itemw.checked" class="checked-image" mode=""
						@tap="goodsCheck(indexq,indexw,itemw.checked)"></image>
					<image src="../../static/images/not_select.png" v-else class="checked-image" mode=""
						@tap="goodsCheck(indexq,indexw,itemw.checked)"></image>
					<view class="goodsInfo-right">
						<image :src="itemw.img" class="goods-image" mode=""></image>
						<view class="goodsInfo-box">
							<text class="goods-name">{{itemw.title}}</text>
							<text class="spe">规格：{{itemw.remark}}</text>
							<view class="goods-box">
								<text class="goods-price">KS&nbsp;{{itemw.price}}</text>
								<view class="goods-num-box" v-if="isCut">
									<view class="goods-image" @tap="sub(indexq,indexw,itemw.number)">
										<text>-</text>
									</view>
									<view class="goods-num">
										<text>{{itemw.number}}</text>
									</view>
									<view class="goods-image" @tap="add(indexq,indexw,itemw.number)">
										<text>+</text>
									</view>
								</view>
								<view class="goods-remove" v-else @tap="goodsQuickDel(indexq,indexw)">
									<uni-icons type="trash" size="24" color="#FFF"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="statistics-box">
				<view class="statistics">
					<view class="statistics-left" v-if="statisticsIndex" @tap="allCheck">
						<image :src='"../../static/images/select_"+ theme +".png"' class="checked-image" mode="">
						</image>
						<text>全选</text>
					</view>
					<view class="statistics-left" v-else @tap="allCheck">
						<image src="../../static/images/not_select.png" class="checked-image" mode="">
						</image>
						<text>全选</text>
					</view>
					<view class="statistics-right" v-if="isCut">
						<text>总计：</text><text class="text-color">KS&nbsp;{{total}}元</text>
						<view class="btn" @tap="accounts">
							<text>结算</text>
						</view>
					</view>
					<view class="statistics-right" v-else>
						<view class="btn" @tap="delect">
							<text>删除</text>
						</view>
					</view>
				</view>
				<view class="gap"></view>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		name: "commonCar",
		data() {
			return {
				isEmpty: true,
				iPhoneX: false,
				datas: {},
				statisticsIndex: false,
				total: 0,
				isCut: true
			}
		},
		props: {
			list: {
				type: [Object, Array],
				default: {}
			}
		},
		created() {
			this.iPhoneX = uni.getStorageSync('iPhoneX')
			this.handleProps()
		},
		watch: {
			list: {
				handler(newVal, oldVal) { // newVal是获取的是新的值
					this.handleProps()
				},
				deep: true // deep属性是深度监听formData对象里的属性的值是否改变。
			}
		},
		computed: {
			...mapGetters(['theme']),
			...mapState([
				'theme'
			])
		},

		methods: {
			//去首页
			handleShopGoods() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//列表赋值
			handleProps() {
				if (this.list.length == 0) {
					this.isEmpty = true
				} else {
					this.datas = this.list
					this.isEmpty = false
				}
			},

			//商品选择
			goodsCheck(storeIndex, goodsIndex, goodsChecked) {
				if (goodsChecked == false) {
					this.datas[storeIndex].goods[goodsIndex].checked = true
				} else {
					this.datas[storeIndex].goods[goodsIndex].checked = false
				}
				//判断是否该店铺全选
				let storeChecked = true
				this.datas[storeIndex].goods.map((item, index) => {
					if (item.checked == false) {
						storeChecked = false
					}
				})
				if (storeChecked == false) {
					this.datas[storeIndex].checked = false
				} else {
					this.datas[storeIndex].checked = true
				}

				//判断是否全选
				let statisticsIndex = true
				this.datas.find((item, index) => {
					if (item.checked == false) {
						statisticsIndex = false
					}
				})
				if (statisticsIndex == false) {
					this.statisticsIndex = false
				} else {
					this.statisticsIndex = true
				}

				this.statistics()
			},
			//店铺选择
			storeCheck(storeIndex, storeCheck) {
				if (storeCheck == false) {
					this.datas[storeIndex].checked = true
					this.datas[storeIndex].goods.find((item, index) => {
						item.checked = true
					})
				} else {
					this.datas[storeIndex].checked = false
					this.datas[storeIndex].goods.find((item, index) => {
						item.checked = false
					})
				}
				//判断是否全选
				let statisticsIndex = true
				this.datas.find((item, index) => {
					if (item.checked == false) {
						statisticsIndex = false
					}
				})
				if (statisticsIndex == false) {
					this.statisticsIndex = false
				} else {
					this.statisticsIndex = true
				}
				this.statistics()
			},
			//减少
			sub(storeIndex, goodsIndex, goodsnum) {
				if (goodsnum == 1) {
					return
				} else {
					this.datas[storeIndex].goods[goodsIndex].number--
				}
				this.statistics()
			},
			//增加
			add(storeIndex, goodsIndex, goodsnum) {
				this.datas[storeIndex].goods[goodsIndex].number++
				this.statistics()
			},
			//全选
			allCheck() {
				if (this.statisticsIndex) {
					this.datas.find((item, index) => {
						item.checked = false
						item.goods.find((itemq, indexq) => {
							itemq.checked = false
						})
					})
					this.statisticsIndex = false
				} else {
					this.datas.find((item, index) => {
						item.checked = true
						item.goods.find((itemq, indexq) => {
							itemq.checked = true
						})
					})
					this.statisticsIndex = true
				}
				this.statistics()
			},
			//统计
			statistics() {
				let total = 0
				this.datas.find((item, index) => {
					item.goods.find((itemq, indexq) => {
						if (itemq.checked == true) {
							total = total + itemq.price * itemq.number
						}
					})
				})
				this.total = total.toFixed(2)
			},
			//管理
			cut() {
				this.isCut = !this.isCut
				this.statisticsIndex = true
				this.allCheck()
			},
			//结算
			accounts() {
				let judge = this.judgeSelect()
				if (judge) {
					this.$emit('accounts',encodeURIComponent(JSON.stringify(this.datas)) )
				} else {
					uni.showToast({
						title: '您当前未选择任何商品,结算失败',
						icon: 'none'
					})
				}
			},
			//删除
			delect() {
				let judge = this.judgeSelect()
				if (judge) {
					uni.showModal({
						title: '提示',
						content: '确认要删除选择的商品吗?',
						confirmText: '删除',
						confirmColor: '#CC2532',
						success: (res) => {
							if (res.confirm) {
								uni.showToast({
									title: '删除成功~',
									icon: 'none'
								})
								this.$emit('delect', encodeURIComponent(JSON.stringify(this.datas)))
							}
						}
					})

				} else {
					uni.showToast({
						title: '您当前未选择任何商品,删除失败',
						icon: 'none'
					})
				}

			},
			//检查选择
			judgeSelect() {
				let judge = false
				this.datas.find((item, index) => {
					item.goods.find((itemq, indexq) => {
						if (itemq.checked == true) {
							judge = true
						}
					})
				})
				return judge
			},
			//快捷删除
			goodsQuickDel(storeIndex, goodsIndex) {
				uni.showModal({
					title: '提示',
					content: '确认要删除该商品吗?',
					confirmText: '删除',
					confirmColor: '#CC2532',
					success: (res) => {
						if (res.confirm) {
							// uni.showToast({
							// 	title: '删除成功~',
							// 	icon: 'none'
							// })
							this.datas[storeIndex].goods[goodsIndex].checked = true

							//判断是否该店铺全选
							let storeChecked = true
							this.datas[storeIndex].goods.map((item, index) => {
								if (item.checked == false) {
									storeChecked = false
								}
							})
							if (storeChecked == false) {
								this.datas[storeIndex].checked = false
							} else {
								this.datas[storeIndex].checked = true
							}

							this.$emit('delect',encodeURIComponent(JSON.stringify(this.datas)) )
						}
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.common-car {
		width: 750upx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F5F5F5;
	}

	.empty-shop-car {
		width: 750upx;
		min-height: 680upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.empty-shop-car-image {
			width: 340upx;
			height: 278upx;
			margin-top: 102upx;
		}

		text {
			margin-top: 40upx;
			font-size: 28upx;
			font-weight: 400;
			color: #666666;
		}

		.empty-shop-car-btn {
			width: 240upx;
			height: 90upx;
			background: $uni-theme-color;
			border-radius: 200upx;
			margin-top: 40upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			font-weight: 400;
			cursor: pointer;

			text {
				color: $uni-white;
			}
		}
	}

	.shop-car {
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.store-box {
			width: 750upx;
			margin-bottom: 20upx;
			padding-top: 10upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;

			.store-header {
				width: 690upx;
				height: 78upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 28upx;
				font-weight: 400;


				.checked-image {
					width: 36upx;
					height: 36upx;
				}

				text {
					font-size: 28upx;
					font-weight: 400;

					margin-left: 20upx;
				}

				.label {
					width: 14upx;
					height: 24upx;
					margin-left: 10upx;
					margin-top: 5upx;
				}
			}

			.goodsInfo {
				width: 690upx;
				height: 246upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 2upx solid #EDEDED;

				&:nth-last-child(1) {
					border: none;
				}

				.checked-image {
					width: 36upx;
					height: 36upx;
				}

				.goodsInfo-right {
					width: 634upx;
					height: 246upx;
					margin-left: 20upx;
					display: flex;
					flex-direction: row;
					align-items: center;

					.goods-image {
						width: 180upx;
						height: 180upx;
					}

					.goodsInfo-box {
						width: 428upx;
						margin-left: 24upx;
						display: flex;
						flex-direction: column;

						.goods-name {
							width: 428upx;
							font-weight: 550;

						}

						.spe {
							width: 428upx;
							// margin-top: 10upx;
							font-size: 24upx;
							font-weight: 400;
						}

						.goods-box {
							width: 428upx;
							margin-top: 16upx;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;

							.goods-price {
								font-size: 32upx;
								font-weight: 550;
								color: $uni-theme-color;
							}

							.goods-num-box {
								width: 200upx;
								height: 46upx;
								display: flex;
								flex-direction: row;
								align-items: center;

								.goods-image {
									width: 56upx;
									height: 48upx;
									text-align: center;
									line-height: 48upx;
									border: 1upx solid #CFCFCF;
									font-size: 40upx;
								}

								.goods-num {
									width: 88upx;
									height: 48upx;
									text-align: center;
									line-height: 48upx;
									font-size: 33upx;
									font-weight: 400;
									color: #666666;
									border-top: 1px solid #CFCFCF;
									border-bottom: 1px solid #CFCFCF;
								}
							}

							.goods-remove {
								width: 48upx;
								height: 48upx;
								margin-right: 20upx;
								background-color: $uni-theme-color;
								border-radius: $uni-radius-root;
								display: flex;
								justify-content: center;
								align-items: center;
								cursor: pointer;
							}
						}
					}
				}
			}
		}

		.statistics-box {
			width: 750upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;

			.statistics {
				width: 100%;
				padding: 0 0 0 30upx;
				height: 98upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.statistics-left {
					width: 120upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					image {
						width: 36upx;
						height: 36upx;
					}

					text {
						font-size: 30upx;
						font-weight: 400;
					}
				}

				.statistics-right {
					width: 600upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;

					.btn {
						width: 218upx;
						height: 98upx;
						background: $uni-theme-color;
						text-align: center;
						line-height: 98upx;
						font-size: 30upx;
						font-weight: 400;
						color: $uni-white;
						margin-left: 40upx;
						cursor: pointer;
					}

					text {
						font-size: 30upx;
						font-weight: 400;
					}

					.text-color {
						color: $uni-theme-color;
					}
				}
			}

			.gap {
				width: 750upx;
				height: 100upx;
			}
		}
	}
</style>