<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face" @click="handleUserInfo">
					<image :src="userinfo.face"></image>
				</view>
				<view v-if="JSON.stringify(userinfo) != '{}' " class="info" @click="handleUserLogin">
					<view class="username">{{userinfo.username}}</view>
				</view>
				<view v-else class="login" @click="handleUserLogin">
					点击登录/注册
				</view>
			</view>
			<view class="setting" @click="handleUserSetting">
				<!-- <image src="../../static/images/setting.png"></image> -->
				<uni-icons class="setting-icon" type="right" size="28" color="#fff"></uni-icons>

			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="head">
					<view class="title">
						我的订单
					</view>
					<navigator url="/pages/myOrder/myOrder?menu=0" class="more">
						全部订单
						<uni-icons type="right" size="14" color="#999999"></uni-icons>

					</navigator>
				</view>
				<view class="label-list">
					<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover"
						@tap="toOrderType(index)">
						<view class="icon">
							<view class="badge" v-if="row.badge>0">{{row.badge}}</view>
							<image :src="'../../static/images/'+row.icon"></image>
						</view>
						<view class="state">
							{{row.name}}
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="list">
			<view class="li" v-for="(li,li_i) in severList" @tap="toPage(li_i)"
				v-bind:class="{'noborder':li_i==severList.length}" hover-class="hover" :key="li.name">
				<view class="icon">
					<image :src="'../../static/images/sever/'+li.icon"></image>
				</view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../static/images/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import Mixins from "../../mixins"
	export default {
		mixins: [Mixins],
		data() {
			return {
				language: uni.getStorageSync('language') || this._i18n.locale,
				//#ifdef APP-PLUS
				isH5Plus: true,
				//#endif
				//#ifndef APP-PLUS
				isH5Plus: false,
				//#endif
				userinfo: {},
				orderTypeLise: [
					//name-标题 icon-图标 badge-角标
					{
						name: '待付款',
						icon: 'l1.png',
						badge: 1,
						url: "/pages/myOrder/myOrder?menu=1"
					},
					{
						name: '待发货',
						icon: 'l2.png',
						badge: 2,
						url: "/pages/myOrder/myOrder?menu=2"
					},
					{
						name: '待收货',
						icon: 'l3.png',
						badge: 2,
						url: "/pages/myOrder/myOrder?menu=2"
					},
					// {
					// 	name: '待评价',
					// 	icon: 'l4.png',
					// 	badge: 9
					// },
					{
						name: '退换/退款',
						icon: 'l5.png',
						badge: 0,
						url: "/pages/myOrder/myOrder?menu=4"
					}
				],
				severList: [{
						name: '我的钱包',
						icon: 'momey.png',
						url: "/pages/wallet/wallet",

					},
					{
						name: '收货地址',
						icon: 'addr.png',
						url: "/pages/address/address"
					},
					// {
					// 	name: '银行卡',
					// 	icon: 'bank.png'
					// },
					// {
					// 	name: '安全中心',
					// 	icon: 'security.png'
					// },
					{
						name: '联系客服',
						icon: 'kefu.png',
						url: "/pages/service/service"
					}
				],
			};
		},

		onShow() {
			//切换标题
			uni.setNavigationBarTitle({
				title: this.$t('navBar.me')
			});
			//切换语言
			this.handleSetTabBarItme()
		},
		onLoad() {
			//加载
			this.init();
		},

		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '../../static/images/face.jpeg',
					username: "VIP会员1024",
				}
			},
			/* 跳转登录 */
			handleUserLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			/* 用户信息 */
			handleUserInfo() {
				uni.navigateTo({
					url: '/pages/user/info'
				})
			},
			/* 用户设置 */
			handleUserSetting() {
				uni.navigateTo({
					url: '/pages/user/setting'
				})
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.navigateTo({
					url: this.orderTypeLise[index].url
				})
			},
			//用户点击列表项
			toPage(li_i) {
				uni.navigateTo({
					url: this.severList[li_i].url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:$uni-theme-color;
		width:750upx;
		height:250upx;
		padding:0 30upx;
		display:flex;
		align-items:center;
		justify-content: space-between;

		.userinfo {
			flex-shrink: 0;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 120upx;
				height: 120upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;
				align-items: center;

				.username {
					width: 100%;
					color: #fff;
					font-size: 36upx;
					font-weight: bold;
					letter-spacing: $uni-font-space;
				}

			}

			.login {
				display: flex;
				align-items: center;
				padding-left: 30upx;
				font-size: $uni-font-size-lg;
				color: $uni-white;
				letter-spacing: $uni-font-space;

			}
		}

		.setting {
			flex-shrink: 0;
			width: 90upx;
			height: 75upx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 45upx;
				height: 45upx;
			}
			
			.set-cion{
				
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: $uni-theme-color;
		width: 750upx;
		height: 140upx;
		padding: 0 30upx;
		margin-bottom: 120upx;
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 100%;
			padding: 0 1%;
			height: 240upx;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;

			.head {
				display: flex;
				justify-content: space-between;
				padding: 20upx;

				.title {}

				.more {
					font-size: $uni-font-size-sm;
					color: $uni-secondary-color;
				}
			}

			.label-list {
				width: 100%;
				margin-top: 20upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.label {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 120upx;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 50upx;
					height: 50upx;
					margin: 0 10upx;

					.badge {
						position: absolute;
						width: 40upx;
						height: 40upx;
						background: $uni-white;
						border: 2upx solid $uni-theme-color;
						top: -15upx;
						right: -15upx;
						border-radius: 100%;
						font-size: 20upx;
						line-height: 40upx;
						color: $uni-theme-color;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 50upx;
						height: 50upx;
						z-index: 9;
					}
				}

				.state {
					line-height: 2;
				}
			}
		}
	}

	.list {
		width: 100%;

		.li {
			width: 750upx;
			height: 100upx;
			padding: 0 30upx;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>