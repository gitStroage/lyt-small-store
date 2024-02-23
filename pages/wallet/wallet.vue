<template>
	<view>
		<view class="f1 head">
			<view class="balance">
				<view class="title">
					可用余额
				</view>
				<view class="detail">
					KS 2,024.00
				</view>
			</view>
		</view>
		<view class="f2 monthly-details">
			<view class="monthly">
				<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate"
					@change="bindDateChange">
					<text>{{date}}</text>
					<uni-icons :type="visible ? 'top' : 'bottom' " size="18" color="#333333"></uni-icons>
				</picker>
			</view>
			<view class="income">
				收入&nbsp;{{income}}
			</view>
			<view class="expenditure">
				支出&nbsp;{{expenditure}}
			</view>
		</view>
		<view class="f3 transaction-details">
			<view class="aui-tran">
				<view class="tran-nav">
					<view v-for="(menuTab,index) in menuTabs" :key="index" @click="swichMenu(index)"
						:class="[currentTab==index ? 'tran-nav-item tran-active' : 'tran-nav-item']">
						{{menuTab.name}}
					</view>
				</view>
			</view>
			<view class="tran-panel">
				<view v-for="(menulist,index2) in menuLists" :key="index2"
					:class="currentTab==index2 ? 'tran-panel-item tran-active': 'tran-panel-item'">
					<view v-for="(menuList2,index3) in menulist" :key="index3" class="tran-item">
						<view class="panel-left">
							<view class="panel-tit">
								<text>{{menuList2.title}}</text>
								<text>订单号：{{menuList2.order}}</text>
							</view>
							<view class="panel-time">
								{{menuList2.time}}
							</view>
						</view>
						<view class="panel-right">
							{{menuList2.mode == 'add' ? '+' : '-'}}{{menuList2.sum}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				visible: false,
				indicatorStyle: `height: 50px;`,
				income: '2393',
				expenditure: "3239",
				currentTab: 0,
				menuTabs: [{
					name: '全部'
				}, {
					name: '收入'
				}, {
					name: '支出'
				}],
				menuLists: [
					[{
						title: "售后退款",
						order: "ZXSC5261656",
						time: "2024-01-31 16:35:33",
						sum: "100.00",
						mode: "add",
					}, {
						title: "订单支付",
						order: "ZXSC5261657",
						time: "2024-01-31 16:35:33",
						sum: "100.00",
						mode: "less",
					}],
					[{
						title: "售后退款",
						order: "ZXSC5261656",
						time: "2024-01-31 16:35:33",
						sum: "100.00",
						mode: "add",
					}],
					[{
						title: "订单支付",
						order: "ZXSC5261657",
						time: "2024-01-31 16:35:33",
						sum: "100.00",
						mode: "less",
					}]


				]
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		methods: {
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}年${month}月`;
			},
			//切换菜单
			swichMenu: async function(current) {
				// console.log("current===", current)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
				}
			},
		},
		onLoad() {

		}
	}
</script>

<style lang="scss" scoped>
	.f1 {
		width: 750upx;
		height: 250upx;
		background-color: $uni-white;

		.balance {
			height: 100%;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				font-size: $uni-font-size-base;
				letter-spacing: $uni-font-space;
			}

			.detail {
				font-size: 64upx;
				line-height: 1.8;
			}
		}
	}

	.f2 {
		display: flex;
		text-align: center;

		.monthly {
			padding: 20upx;
			flex: 1;

			text {
				padding-right: 10upx;
			}
		}

		.income {
			flex: 1;
			padding: 20upx;
			color: $uni-secondary-color;
		}

		.expenditure {
			flex: 1;
			padding: 20upx;
			color: $uni-secondary-color;
		}
	}

	.f3 {
		.aui-tran {
			width: 750upx;
			height: 88upx;
			background-color: $uni-white;
			box-shadow: $uni-shadow-sm;

		}

		.tran-nav {
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			display: flex;
		}

		.tran-nav-item {
			flex: 1;
			height: 100%;
			position: relative;
			text-align: center;
			color: $uni-base-color;
		}

		.tran-nav-item.tran-active {
			font-size: $uni-font-size-l;
			color: $uni-theme-color;
			font-weight: bold;
		}


		.tran-nav-item.tran-active:before {
			content: '';
			display: block;
			width: 2.5em;
			height: 0;
			position: absolute;
			left: 50%;
			bottom: 10upx;
			transform: translateX(-50%);
			border: 2upx solid $uni-theme-color;
		}

		.tran-panel {
			background-color: $uni-white;
			margin-top: 20upx;

			.tran-panel-item {
				display: none;

				&.tran-active {
					display: block;
					-webkit-transition: -webkit-transform .15s;
					transition: -webkit-transform .15s;
					transition: all .15s;
					transition: all.15s, -webkit-transform .15s;
				}

				.tran-item {
					width: 750upx;
					padding: 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2upx solid $uni-border-2;
					.panel-left {
						line-height: 2;
						.panel-tit{
							text:nth-child(2){
								padding-left: 20upx;
							}
						}
						.panel-time{
							font-size: $uni-font-size-sm;
							color: $uni-secondary-color;
						}
					}

					.panel-right {}

				}
			}


		}

	}
</style>