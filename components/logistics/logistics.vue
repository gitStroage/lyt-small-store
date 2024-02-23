<template>

	<!-- 收货地址 -->
	<view class="content bgf">
		<view>
			<view class="flex list">
				<view class="time"></view>
				<view class="info flex1">
					<view class="title address">[收货地址]{{wlInfo.addr}}</view>
				</view>
			</view>
			<view class="flex list" :class="{one: index == 0 && wlInfo.delivery_status == 1}"
				v-for="(item, index) in wlInfo.list" :key="index">
				<view class="time">
					<view class="day">{{item.timeArr[0]}}</view>
					<view>{{item.timeArr[1]}}</view>
				</view>
				<view class="info flex1">
					<view class="title">{{index == 0 && wlInfo.delivery_status == 1 ? '已签收' : '配送中'}}</view>
					<view class="text">{{item.context}}</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			wlInfo: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {}
		},

		onLoad() {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	/*flex 转换成flex容器*/
	.flex {
		display: flex;
		flex-direction: row;
	}

	/*flex1 自动填充*/
	.flex1 {
		flex: 1;
	}

	/*ali-c 竖直居中*/
	.ali-c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	//收货地址
	.content {
		margin: 20upx;
		.list {
			&:first-child {
				.info::before {
					bottom: -20upx;
					margin-top: 40upx;
					border-left: 1px dashed #e5e5e5;
				}

				.title {
					margin-bottom: 56upx;

					&::before {
						width: 46upx;
						height: 46upx;
						left: -23upx;
						background:url('/static/images/address_blue.png') ;
						background-size: 46upx 46upx;
					}
				}
			}

			&:last-child {
				.info::before {
					height: 32upx;
				}
			}

			&.one {
				.info::before {
					margin-top: 20upx;
				}

				.title {
					color: #1a1a1a;

					&::before {
						width: 46upx;
						height: 46upx;
						left: -23upx;
						background:url('/static/images/accept_blue.png');
						background-size: 46upx 46upx;
					}
				}

				.text {
					color: #666;
				}

				.time {
					color: #333;

					.day {
						font-size: 24upx;
					}
				}
			}
		}

		.time {
			width: 200upx;
			padding-right: 30upx;
			font-size: 20upx;
			text-align: right;
			color: #999;

			.day {
				margin-bottom: 4upx;
			}
		}

		.info {
			position: relative;
			padding-top: 12upx;
			color: #999;

			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				z-index: 1;
				width: 0;
				border-left: 1px solid #e5e5e5;
			}

			.title {
				position: relative;
				margin-bottom: 10upx;
				padding-left: 32upx;
				font-size: 28upx;

				&::before {
					content: "";
					position: absolute;
					left: -3px;
					top: 0;
					bottom: 0;
					z-index: 1;
					width: 7px;
					height: 7px;
					margin: auto 0;
					border-radius: 50%;
					background-color: #cecece;
				}

				&.address {
					font-size: 24upx;
					color: #333;
				}
			}

			.text {
				padding: 0 0 44upx 32upx;
			}
		}
	}
</style>