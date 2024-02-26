<template>
	<view>
		<!-- F1 head-start -->
		<view class="f1">
			<view class="page-title">
				<view class="title">{{$t('index.title')}}</view>
				<!-- language -->
				<view class="language">
					<picker mode="selector" :range="langs" range-key="label" :value="index"
						@change="handleLanguageChange">
						<!-- <image src="../../static/images/language.png" mode="widthFix"></image> -->
						{{langs[index].label}}
					</picker>
				</view>
			</view>
			<!-- 搜索条 -->
			<view class="search-bar">
				<icon class="search" type="search" size="16"></icon>
				<navigator url="/pages/search/search">
					<input type="text" placeholder="请输入商品关键字" />
				</navigator>
			</view>
		</view>
		<!-- head-end -->
		<!-- F2 swiper-start -->
		<view class="f2">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
				:indicator-active-color="themeColor" :interval="interval" :duration="duration">
				<swiper-item v-for="item in swiperArr" :key="item.cid">
					<view class="swiper-item">
						<image :src="item.img" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<!-- swiper-end -->
		<!-- F3 nav-start -->
		<view class="f3">
			<view class="category-menu">
				<view v-for="item in productCategory" :key="item.id" class="category-item" :data-id="item.id"
					@click="handleJumpCategory">
					<view class="category-poster">
						<image :src="item.poster" mode="widthFix"></image>
					</view>
					<view class="category-name">
						{{item.name}}
					</view>

				</view>
			</view>
		</view>
		<!-- F3 nav-end -->
		<!-- F4 list-start -->
		<view class="f4">
			<view class="flagship-product">
				<view class="flagship-title">
					<text> {{$t("index.pick")}}</text>
				</view>
				<view class="product-lists">
					<view class="product-item" v-for="item in flagshipProduct" :key="item.id">
						<image class="pro-img" :src="item.poster" mode="widthFix" :data-id="item.id"
							@click="handleViewDetail">
						</image>
						<view class="pro-tit">
							{{item.name}}
						</view>
						<view class="pro-store-1">
							{{item.store_first.name}}&ensp;库存：{{item.store_first.value}}
						</view>
						<view class="pro-store-2">
							{{item.store_second.name}}&ensp;库存：{{item.store_second.value}}
						</view>
						<view class="pro-org-price">
							{{item.org_price == null ? '' : 'Ks&nbsp;' + item.org_price}}
						</view>
						<view class="pro-fot">
							<view class="pro-trade-price">KS&nbsp;{{item.trade_price}}</view>
							<view class="shop-cart">
								<image src="../../static/images/shop-cart.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="more-form">
					<view class="more-btn" @click="handleViewMore">
						{{$t('index.more')}}
					</view>
				</view>
			</view>

		</view>
		<!-- list-end -->
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import Mixins from "../../mixins"
	import {
		index
	} from '../../i18n/langs/en'
	export default {
		mixins: [Mixins],
		data() {
			return {
				langs: [{
						label: "中文",
						value: "zh-CN"
					},
					{
						label: "English",
						value: "en"
					},
					{
						label: "မိုန်မာရ်",
						value: "bur"
					},
				],
				index: 0, //默认
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				swiperArr: [{
						id: 1,
						img: "../../static/images/banner-1.jpg"
					},
					{
						id: 2,
						img: "../../static/images/banner-2.jpg"
					},
					{
						id: 3,
						img: "../../static/images/banner-3.jpg"
					},
					{
						id: 4,
						img: "../../static/images/banner-4.jpg"
					},
				],
				productCategory: [{
					id: 1,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/aad731e470d14e9b841562b7e8bc71d3.png",
					name: "影音娱乐",
				}, {
					id: 2,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/5cad2b3f688d43108f2f8ab53257838d.png",
					name: "运动健康",
				}, {
					id: 3,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-02/ea0183acdb3a4ebe87e4e4ca55cdcf3b.png",
					name: "智能手机",
				}, {
					id: 4,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/ea67174f07394a32a4d896be04fc3c69.png",
					name: "耳机音箱",
				}, {
					id: 5,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/ea67174f07394a32a4d896be04fc3c69.png",
					name: "耳机音箱",
				}, {
					id: 6,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-02/ea0183acdb3a4ebe87e4e4ca55cdcf3b.png",
					name: "智能手机",
				}, {
					id: 7,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/5cad2b3f688d43108f2f8ab53257838d.png",
					name: "运动健康",
				}, {
					id: 8,
					poster: "https://res.vmallres.com/uomcdn/CN/cms/2024-01/aad731e470d14e9b841562b7e8bc71d3.png",
					name: "影音娱乐",
				}],
				id: "",
				flagshipProduct: [{
						id: 1,
						name: "HUAWEI P50 Pocket",
						poster: "https://res8.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6941487279432/800_800_BF66EB274D635C86BCE31D307AE9A6EDmp_tds.png",
						store_first: {
							name: "昆明仓",
							value: 999
						},
						store_second: {
							name: "深圳仓",
							value: 9999
						},
						org_price: 10988.00,
						trade_price: 9988.00
					},
					{
						id: 2,
						name: "HUAWEI Mate 60 Pro",
						poster: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202309/gbom/6942103109485/800_800_F1DA56814893C1749B69B9606A7FA57Fmp.png",
						store_first: {
							name: "昆明仓",
							value: 999
						},
						store_second: {
							name: "深圳仓",
							value: 9999
						},
						org_price: null,
						trade_price: 7999.00
					}, {
						id: 3,
						name: "HUAWEI P60 Art",
						poster: "https://res7.vmallres.com/pimages//uomcdn/CN/pms/202303/gbom/6941487290710/800_800_F6083CCDA64E43AF09DAD021C5F4595Dmp.png",
						store_first: {
							name: "昆明仓",
							value: 999
						},
						store_second: {
							name: "深圳仓",
							value: 9999
						},
						org_price: 8988.00,
						trade_price: 7988.00
					}, {
						id: 4,
						name: "HUAWEI Mate 60 Pro+",
						poster: "https://res5.vmallres.com/pimages//uomcdn/CN/pms/202401/gbom/6942103109591/800_800_650AA2D1F4312445D02527C6CC0FD74Fmp.png",
						store_first: {
							name: "昆明仓",
							value: 999
						},
						store_second: {
							name: "深圳仓",
							value: 9999
						},
						org_price: null,
						trade_price: 9999.00
					},
				]
			}
		},
		computed: {
			...mapGetters(['themeColor']),
			...mapState([
				'themeColor'
			])
		},
		methods: {
			...mapMutations(['switchTheme']),
			//切换语言
			handleLanguageChange(e) {
				// console.log(e.detail.value)
				let index = e.detail.value
				let lang = this.langs[index].value
				this.index = index
				//存储语言
				this.language = lang
				this._i18n.locale = lang
				uni.setStorageSync('language', lang)
				//切换tabBar 语言
				this.handleSetTabBarItme()
			},
			// 商品类型查询
			handleJumpCategory(e) {
				// this.id = e.currentTarget.dataset.id
				// // console.log(this.id)
				// uni.navigateTo({
				// 	url: '/pages/search/search?id=' + this.id
				// })
				uni.switchTab({
					url: "/pages/category/category"
				})
			},
			//查看详情
			handleViewDetail(e) {
				const pid = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '/pages/details/details?id=' + pid
				})
			},
			//加载更多
			handleViewMore() {
				let moreProduct = this.flagshipProduct
				this.flagshipProduct.push(...moreProduct)
			},
		},
		onReady() {
			//Vuex的方式 
			// 设置导航条
			uni.setNavigationBarColor(this.$store.state.themes.navBar);
			// 设置tabbar
			uni.setTabBarStyle(this.$store.state.themes.tabBar);
		},
		onShow() {
			//匹配语言
			let langs = this.langs
			let language = uni.getStorageSync('language') || this._i18n.locale
			langs.forEach((item, index) => {
				if (item.value == language) {
					this.index = index
				}
			})
			//切换语言
			this.handleSetTabBarItme()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		//背景图片:渐变色
		background-image: linear-gradient(to bottom, $uni-theme-color 60upx, $uni-bg-color 300upx)
	}

	.f1 {
		.page-title {
			position: relative;
			text-align: center;
			padding: 20upx;

			.title {
				font-size: $uni-font-size-lg;
				color: $uni-inverse-color;
				line-height: 2.5;
				letter-spacing: $uni-font-space;
			}

			.language {
				position: absolute;
				right: 30upx;
				top: 30upx;
				color: $uni-inverse-color;
				line-height: 2;
				padding: 0 12upx;
				background-color: rgba(0, 0, 0, .1);
				border-radius: $uni-radius-root;
			}
		}

		.search-bar {
			width: 690upx;
			margin: 0 auto 20upx;
			position: relative;

			.search {
				color: $uni-secondary-color;
				position: absolute;
				left: 20upx;
				top: 50%;
				right: 20upx;
				transform: translateY(-50%);
			}

			input {
				padding-left: 60upx;
				padding-right: 20upx;
				background-color: $uni-inverse-color;
				height: 70upx;
				border-radius: 35upx;
			}

			.input-placeholder {
				font-size: $uni-font-size-base;
				color: $uni-secondary-color;
			}
		}
	}

	.f2 {

		.swiper {
			width: 710upx;
			margin: 0 auto;
			height: 310upx;

			.swiper-item {
				image {
					width: 100%;
					border-radius: $uni-radius-root;
				}
			}
		}
	}

	.f3 {
		.category-menu {
			width: 750upx;
			display: flex;
			flex-wrap: wrap;
			background-color: $uni-white;
			margin-bottom: 20upx;
			padding: 10upx 0;

			.category-item {
				width: 25%;
				padding: 10upx 0;
				text-align: center;

				.category-poster {
					image {
						width: 100upx;
						height: 100upx;
					}
				}

				.category-name {
					font-size: 28upx;
					line-height: 2;
				}

			}
		}
	}

	.f4 {
		.flagship-product {
			background-color: $uni-white;
			padding: 10px;

			.flagship-title {
				font-size: $uni-font-size-lg ;
				letter-spacing: $uni-font-space;
				text-align: center;
				line-height: 2;
				font-weight: bold;
				margin-bottom: 40upx;

				text {
					display: inline-block;
					position: relative;

					&::before {
						display: block;
						content: "";
						width: 1.4rem;
						height: 4upx;
						background-color: $uni-border-4;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						left: -2rem;
					}

					&::after {
						display: block;
						content: "";
						width: 1.4rem;
						height: 4upx;
						background-color: $uni-border-4;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: -2rem;
					}
				}
			}

			.product-lists {
				width: 710upx;
				margin: 0 auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: flex-start;

				.product-item {
					width: 340upx;
					margin-bottom: 20upx;

					.pro-img {
						display: inline-block;
						width: 100%;
						cursor: pointer;
						border: 1px solid $uni-border-1;
					}

					.pro-tit {
						font-size: $uni-font-size-lg;
						font-weight: bold;
						line-height: 1.5;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						min-height: 96upx;
					}

					.pro-store-1,
					.pro-store-2 {
						height: 1.3rem;
						line-height: 1.3rem;
					}

					.pro-org-price {
						height: 1.5rem;
						color: $uni-secondary-color;
						line-height: 1.5rem;
						text-decoration: line-through;
					}

					.pro-fot {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-right: 10upx;

						.pro-trade-price {
							color: $uni-theme-color;
							font-weight: bold;
						}

						.shop-cart {
							width: 24px;
							cursor: pointer;

							image {
								width: 100%;
							}
						}
					}
				}
			}

			.more-form {
				display: flex;
				justify-content: center;
				padding: 20upx;

				.more-btn {
					width: 236upx;
					height: 2.5rem;
					font-size: $uni-font-size-lg;
					line-height: 2.5rem;
					text-align: center;
					border: 1px solid $uni-border-3;
					border-radius: 1.25rem;
					cursor: pointer;
				}
			}
		}
	}
</style>