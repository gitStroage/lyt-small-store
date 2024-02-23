	<template>
		<view>
			<view class="tabContent" v-show="true">


				<view v-for="(item, index) in tableData" :key="index">

					<view class="paramBox">
						<view class="param-title">{{item.name}}</view>
						<view v-for="(subItem, subIndex) in item.list" :key="subIndex">
						<view class="param-item">
							<label>{{subItem.name}}</label>
							<text>{{subItem.value}}</text>
						</view>
						
						</view>
					</view>


				</view>


				<view style="height: 30rpx;"></view>
			</view>


		</view>
	</template>

	<script>
		export default {
			props: {

				tableData: {
					type: Array,
					default () {
						return []
					}
				}

			},
			data() {
				return {

				}
			},
			methods: {


			}

		}
	</script>

	<style scoped>
		.tabContent {
			background: #fff;
			overflow: hidden;
		}

		.param-title {
			background: #f5f5f5;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx 30rpx 0;
			font-size: 28rpx;
			text-indent: 30rpx;
		}

		.param-item {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 24rpx;
			border-bottom: 1rpx solid #f5f5f5;
			margin: 0 30rpx;
			border-left: 1rpx solid #f5f5f5;
			border-right: 1rpx solid #f5f5f5;
			padding: 0 30rpx;
			display: flex;
		}

		.param-item label {
			width: 260rpx;
			color: #999;
		}
	</style>