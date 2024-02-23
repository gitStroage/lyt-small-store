<template>
	<view>
		<view class="product-detail-form">
			<!-- back-start -->
			<view class="nav-back" @click="handleBack">
				<uni-icons class="back" type="back" size="24" color="#FFF"></uni-icons>
			</view>
			<!-- back-end -->
			<!-- F1 swiper-start -->
			<view class="f1">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:indicator-active-color="themeColor" :interval="interval" :duration="duration">
					<swiper-item v-for="item in product.posters" :key="item.cid">
						<view class="swiper-item">
							<image :src="item.img" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>

			</view>
			<!-- swiper-end -->
			<!-- bas-info-start -->
			<view class="f2">
				<view class="pro-bas-info">
					<view class="pro-title">
						{{product.title}}
					</view>
					<view class="pro-sub-tit">
						{{product.subtitle}}
					</view>
					<view class="pro-syno">
						{{product.synopsis}}
					</view>
					<view class="pro-price">
						<view class="pro-trade-price">
							KS&nbsp;{{specSelected.price}}
						</view>
						<view class="pro-org-price">
							{{specSelected.org_price == null ? '' : 'KS&nbsp;' + specSelected.org_price}}
						</view>
					</view>
				</view>
			</view>
			<!-- bas-info-end -->
			<!-- norm-option-start -->
			<view class="f3">
				<view class="pro-store-option">
					<view class="store-option-tit">
						仓库
					</view>
					<view class="store-option-detail">
						<picker @change="bindStockChange" :value="stockIndex" :range="product.stock" range-key="name">
							<view class="uni-input">
								{{product.stock[stockIndex].name}}&ensp;库存：{{product.stock[stockIndex].value}}
							</view>
						</picker>
					</view>
					<view class="store-option-open">
						<uni-icons class="open-option" type="forward" size="20" color="#666"></uni-icons>
					</view>
				</view>
				<view class="pro-norm-option" @click="toggleSpec">
					<view class="norm-option-tit">
						规格
					</view>
					<view class="norm-option-detail">
						{{product.norm}}
					</view>
					<view class="norm-option-open">
						<uni-icons class="open-option" type="forward" size="20" color="#666"></uni-icons>
					</view>
				</view>

			</view>
			<!-- norm-option-end -->
			<!-- details-start -->
			<view class="f4">
				<view class="pro-details">
					<view class="details-menu">
						<view :class="{ 'active': isActive }" class="details-menu-item" @click="isActive = true">
							商品详情
						</view>
						<view :class="{ 'active': !isActive }" class="details-menu-item" @click="isActive = false">
							规格参数
						</view>
					</view>
					<view class="details-box">
						<view class="detail-pic" v-if="isActive">
							<view class="detail-pic-preface">

							</view>
							<view class="pic-lists">
								<image v-for="item in product.detail_pic" :key="item" :src="item" mode="widthFix">
								</image>
							</view>
						</view>
						<view class="detail-param" v-if="!isActive">
							<!-- table-list:表格数组 数组里对象可自定义字段  -->
							<cc-defineTable :tableData="product.parameters"></cc-defineTable>
						</view>
					</view>
				</view>
			</view>
			<!-- details-end -->
			<!-- good-carts-start -->
			<view class="f5">
				<view class="goods-carts">
					<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
						@buttonClick="buttonClick" />
				</view>
			</view>
			<!-- good-carts-end -->
			<!-- 规格-模态层弹窗 -->
			<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer attr-content" @click.stop="stopPrevent">
					<view class="a-t">
						<image
							src="https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png">
						</image>
						<view class="right">
							<view class="title">
								{{product.subtitle}}
							</view>
							<text class="price">KS&nbsp;{{specSelected.price}}</text>
						</view>
					</view>
					<view class="attr-list">
						<text>{{product.specification.name}}</text>
						<view class="item-list">
							<text v-for="(childItem, childIndex) in product.specification.specChildList"
								:key="childIndex" class="tit" :class="{selected: childItem.selected}"
								@click="selectSpec(childIndex)">
								{{childItem.name}}
							</text>
						</view>
					</view>
					<view class="amount-lists">
						<text>{{product.publicSpec.name}}</text>
						<view class="amount-item" v-for="(childItem, childIndex) in product.publicSpec.specChildList"
							v-if="childItem.pid == specSelected.id">
							<view class="amount-info">
								<view class="amount-tit">
									{{childItem.name}}
								</view>
								<view class="amount-stock">
									库存&nbsp;{{childItem.stocks}}
								</view>
							</view>
							<view class="amount-calc">
								<view class="amount-red" :class="{disabled : childItem.pieces<=0}"
									@click="handleDropPieces(childIndex)">
									-
								</view>
								<view class="amount-val">
									{{childItem.pieces}}
								</view>
								<view class="amount-add" :class="{disabled : childItem.pieces>=childItem.stocks}"
									@click="handleAddPieces(childIndex)">
									+
								</view>
							</view>
						</view>
					</view>

					<view class="a-g" v-if="!buyMode">
						<view class="p-d">
							<view class="p-n">
								已选<text>0</text>部
							</view>
							<view class="p-t">
								商品金额：<text>KS&nbsp;0.00</text>
							</view>
						</view>
						<button class="btn" @click="handleBuyNow">确定</button>
					</view>
					<view class="a-c" v-if="buyMode">
						<view class="p-d">
							<view class="p-n">
								已选<text>{{pieces}}</text>部
							</view>
							<view class="p-t">
								商品金额：<text>KS&nbsp;{{total}}</text>
							</view>
						</view>
						<button class="btn" @click="handleBuyNow">立即下单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CCdefineTable from "@/components/cc-defineTable/cc-defineTable.vue"
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		components: {
			CCdefineTable
		},
		data() {
			return {
				pid: "", //商品id
				stockIndex: 0, //默认仓库
				buyMode: true, //购买状态
				specClass: 'none',
				specSelected: '',
				pieces: 0, //商品总数
				total: 0.00, //商品总金额
				product: {
					title: "HUAWEI Mate 60 Pro+ 16GB+1TB 宣白",
					subtitle: "HUAWEI Mate 60 Pro+",
					synopsis: "双卫星通信，超可靠玄武架构，全焦段超清影像，静谧通话",
					norm: "2种颜色 · 2种机身内存 可选",
					specification: {
						name: '机身内存',
						specChildList: [{
								id: 1,
								name: '16GB+1TB',
								price: 8999.00,
								org_price: 9999.00,
								selected: false,
							},
							{
								id: 2,
								name: '16GB+512GB',
								price: 8499.00,
								org_price: 9499.00,
								selected: false
							},
						],
					},
					publicSpec: {
						name: "颜色",
						specChildList: [{
							id: 1,
							pid: 1,
							name: '砚黑',
							stocks: '1229',
							price: 8499.00,
							batch: 1,
							pieces: 0,
						}, {
							id: 2,
							pid: 1,
							name: '宣白',
							stocks: '1225',
							price: 8499.00,
							batch: 1,
							pieces: 0,
						}, {
							id: 3,
							pid: 2,
							name: '砚黑',
							stocks: '1224',
							price: 8499.00,
							batch: 1,
							pieces: 0,
						}, {
							id: 4,
							pid: 2,
							name: '宣白',
							stocks: '1221',
							price: 8499.00,
							batch: 1,
							pieces: 0,
						}]
					},
					stock: [{
						id: 's1',
						name: '深圳仓',
						value: 9999
					}, {
						id: 's2',
						name: '昆明仓',
						value: 999
					}],

					posters: [{
							id: 1,
							img: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png"
						},
						{
							id: 2,
							img: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png",
						},
						{
							id: 3,
							img: "https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png",
						},
					],
					detail_pic: [
						"https://res.vmallres.com//uomcdn/CN/pms/202309/44960CB716DDAAF4DE5F8339022FA692.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/3D46DC831E963E8242AC5504F2769DA1.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/2C8DB00F13D456A3CD6C235ADF176F0E.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/0FFDC3836CC2809074953231255D2866.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/20E6D7738704C122F90EE1A6304D30DA.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/45E53D25603303B3888C02F38B462F9D.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/E481438C91A89709291B729E769EDD6F.jpg",
						"https://res.vmallres.com//uomcdn/CN/pms/202309/5F720DC52C9086E84E85F08E938AB58F.jpg"
					],
					parameters: [{
							'name': '基本信息',
							'list': [{
									'name': '品牌',
									'value': '华为'
								},
								{
									'name': '型号',
									'value': 'ALN-AL10'
								},
								{
									'name': '传播名',
									'value': 'HUAWEI Mate 60 Pro+'
								},
								{
									'name': '颜色',
									'value': '宣白、砚黑'
								},
								{
									'name': '操作系统',
									'value': '鸿蒙操作系统4.0'
								}
							]
						},
						{
							'name': "详细信息",
							'list': [{
									'name': '品牌',
									'value': 'HUAWEI'
								},
								{
									'name': '屏幕尺寸',
									'value': '6.82英寸'
								},
								{
									'name': '分辨率',
									'value': 'FHD+ 2720 × 1260像素'
								},
								{
									'name': '运行内存（RAM）',
									'value': '16GB'
								},
								{
									'name': '机身内存（ROM）',
									'value': '1TB'
								}, {
									'name': '音效',
									'value': '华为Histen，支持立体声'
								}, {
									'name': '电池容量',
									'value': '5000mAh（典型值）'
								},
							]
						}
					],

				}, // 商品信息
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				isActive: true,
				options: [{
					icon: 'home',
					text: '首页'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 4,
					infoBackgroundColor: '#0088f1',
					infoColor: "#ffffff"
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #0088f1)',
						color: '#fff'
					}
				],
			}
		},
		computed: {
			...mapGetters(['themeColor']),
			...mapState(['themeColor'])
		},
		methods: {
			/* 返回上页面 */
			handleBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}


			},
			/* 获取商品详情 */
			handelProductDetail(id) {
				console.log(id)
				//默认已选
				this.selectSpec(0)
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
						this.buyMode = true
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}

			},
			//选择规格
			selectSpec(index) {
				let list = this.product.specification.specChildList;
				list.forEach((item, index) => {
					item.selected = false
				})
				this.$set(list[index], 'selected', true);
				//存储已选择
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected = item;
					}
				})

			},
			stopPrevent() {},
			/* 选择仓库 */
			bindStockChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.stockIndex = e.detail.value
			},
			/* 页脚导航 */
			onClick(e) {
				let index = e.index
				let navUrl = [
					'/pages/index/index',
					"/pages/cart/cart"
				]
				uni.switchTab({
					url: navUrl[index]
				})
				// if (index == 1) {
				// 	uni.navigateTo({
				// 		url: navUrl[index]
				// 	})
				// } else {
				// 	uni.switchTab({
				// 		url: navUrl[index]
				// 	})
				// }

			},
			/* 页脚按钮 */
			buttonClick(e) {
				let index = e.index
				if (index == 0) {
					this.toggleSpec()
					this.buyMode = false
				} else if (index == 1) {
					this.toggleSpec()
					this.buyMode = true
				}

			},
			/* 减少选择商品 */
			handleDropPieces(index) {
				let list = this.product.publicSpec.specChildList
				list[index].pieces -= list[index].batch
				this.pieces -= list[index].batch
				this.total -= list[index].batch * list[index].price
			},
			/* 增加选择商品 */
			handleAddPieces(index) {
				let list = this.product.publicSpec.specChildList
				list[index].pieces += list[index].batch
				this.pieces += list[index].batch
				this.total += list[index].batch * list[index].price
				console.log(this.pieces, this.total)
			},

			/* 立即购买 */
			handleBuyNow() {
				/* 跳转确认订单 */
			}
		},
		onLoad(option) {
			const pid = option.id
			this.pid = pid
			this.handelProductDetail(pid)
		},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
	.product-detail-form {
		position: relative;
	}

	.nav-back {
		position: absolute;
		width: 40px;
		height: 40px;
		background-color: $uni-bg-gery;
		border-radius: $uni-radius-circle;
		top: 20upx;
		left: 20upx;
		cursor: pointer;
		z-index: 999;

		.back {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.f1 {

		.swiper {
			width: 750upx;
			height: 750upx;
			margin: 0 auto;

			.swiper-item {
				image {
					width: 100%;
					border-radius: $uni-radius-root;
				}
			}
		}
	}

	.f2 {
		.pro-bas-info {
			background-color: $uni-white;
			padding: 20upx;
			line-height: 1.5;

			.pro-title {
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}

			.pro-sub-tit {
				color: $uni-base-color;
			}

			.pro-syno {
				color: $uni-base-color;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.pro-price {
				display: flex;
				align-items: center;

				.pro-trade-price {
					font-size: 1.2rem;
					color: $uni-theme-color;
					font-weight: 500;
				}

				.pro-org-price {
					color: $uni-secondary-color;
					text-decoration: line-through;
					margin-left: 20upx;
				}
			}
		}
	}

	.f3 {

		.pro-norm-option,
		.pro-store-option {
			background-color: $uni-white ;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			margin-top: 20upx;
			line-height: 2;
			cursor: pointer;
		}

		.norm-option-tit,
		.store-option-tit {
			color: $uni-secondary-color;
			padding-right: 20upx;
		}

		.norm-option-detail,
		.store-option-detail {
			flex: 1;

			text {
				padding-right: 10upx;
			}
		}

		.norm-option-open,
		.store-option-open {
			padding-left: 20upx;
		}
	}

	.f4 {
		.pro-details {
			background-color: $uni-white;
			margin-top: 20upx;
			padding-bottom: 100upx;

			.details-menu {
				display: flex;
				justify-content: center;
				margin-bottom: 20upx;

				.details-menu-item {
					padding: 40upx;
					position: relative;

					&.active::after {
						content: "";
						display: block;
						width: 80%;
						height: 4upx;
						background-color: $uni-theme-color;
						position: absolute;
						left: 10%;
					}
				}
			}

			.details-box {
				.detail-pic {
					.detail-pic-preface {}

					.pic-lists {
						image {
							display: block;
							width: 100%;
						}
					}
				}

				.detail-param {}
			}
		}

	}

	.f5 {

		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 30upx;

		.a-t {
			display: flex;

			image {
				width: 160upx;
				height: 160upx;
				flex-shrink: 0;
				border-radius: 6upx;
				border: 1px solid $uni-border-2;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $uni-font-size-base;
				color: $uni-base-color;
				line-height: 1.5;

				.title {
					font-size: $uni-font-size-lg;
					font-weight: bold;

				}

				.price {
					font-size: $uni-font-size-lg;
					color: $uni-theme-color;
					font-weight: bold;
				}

				.selected {
					color: $uni-main-color ;
				}

				.selected-text {
					&:not(:first-child) {
						&::before {
							content: "·";
							padding: 0 10upx;
						}
					}
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $uni-font-size-lg;
			color: $uni-base-color;
			padding-top: 30upx;
			padding-left: 10upx;

			text {
				color: $uni-main-color;
				font-size: $uni-font-size-lg;
			}
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: $uni-white;
				border: 2upx solid $uni-border-3;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 8upx;
				min-width: 70upx;
				height: 60upx;
				padding: 0 30upx;
				font-size: $uni-font-size-base;
				color: $uni-base-color;
			}

			.selected {
				color: $uni-theme-color;
				border-color: $uni-theme-color;
			}
		}

		.amount-lists {
			padding-top: 30upx;
			padding-left: 10upx;

			text {
				font-size: $uni-font-size-lg;
			}
		}

		.amount-item {
			font-size: $uni-font-size-sm;
			color: $uni-base-color;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.amount-info {
				.amount-tit {
					font-size: $uni-font-size-base;
					color: $uni-main-color;
					line-height: 1.2;
				}

				.amount-stock {
					color: $uni-secondary-color;
				}
			}

			.amount-calc {
				display: flex;
				align-items: center;
				border: 2upx solid $uni-border-3;
				border-radius: $uni-radius-root;

				.amount-red,
				.amount-add {
					width: 60upx;
					height: 60upx;
					font-size: 1.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					&.disabled {
						pointer-events: none;
						color: $uni-disable-color;
						border-color: $uni-border-1;
					}
				}

				.amount-red {
					border-right: 2upx solid $uni-border-3;
				}

				.amount-add {
					border-left: 2upx solid $uni-border-3;
				}

				.amount-val {
					color: $uni-black;
					padding: 0 30upx;
				}
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.a-g {
				margin: 40upx 10upx 10upx;

				.btn {
					width: 690upx;
					height: 80upx;
					margin: 0 auto;
					background: $uni-theme-color;
					line-height: 80upx;
					border-radius: 40upx;
					font-size: $uni-font-size-lg;
					color: $uni-white;
				}
			}

			.a-c {
				margin: 40upx 10upx 10upx;

				.btn {
					width: 690upx;
					height: 80upx;
					margin: 0 auto;
					background: $uni-theme-color;
					line-height: 80upx;
					border-radius: 40upx;
					font-size: $uni-font-size-lg;
					color: $uni-white;
				}
			}

			.p-d {
				display: flex;
				justify-content: space-between;
				padding-bottom: 20upx;

				.p-n {
					color: $uni-secondary-color;
					font-size: $uni-font-size-sm;

					text {
						color: $uni-theme-color;
						font-size: $uni-font-size-base;
						padding: 0 10upx;
					}
				}

				.p-t {
					text {
						color: $uni-theme-color;
						padding: 0 5upx;
					}
				}


			}

		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>