<template>
	<view class="customer-service">
		<view class="service-box">
			<!-- <view class="service-title">
				需要帮助
			</view> -->
			<view class="service-hotline">
				<view class="service-icon">
					<uni-icons type="phone" color="#ffffff" size="24"></uni-icons>
				</view>
				<view class="hotline">
					12345678900
				</view>
			</view>
			<view class="service-mailbox">
				<view class="service-icon">
					<uni-icons type="email" color="#ffffff" size="24"></uni-icons>
				</view>
				<view class="mailbox">
					abc@qq.com
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.customer-service {
		width: 100%;
		height: 100vh;
		background-color: $uni-white;
	}

	.service-box {
		font-size: 32upx;
		line-height: 2;
		padding: 40upx;

		.service-title {
			font-size: 32upx;
			line-height: 2;
			text-align: center;
		}

		.service-hotline { 
			display: flex;
			align-items: center;

			.hotline {}
		}

		.service-mailbox {
			display: flex;
			align-items: center;
			margin-top: 20upx;
			.mailbox {}
		}

		.service-icon {
			width: 68upx;
			height: 68upx;
			background-color: $uni-theme-color;
			border-radius: $uni-radius-circle;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20upx;
		}
	}
</style>