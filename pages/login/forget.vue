<template>
	<view class="content">
		<view class="list">
			<view class="tishi">若您忘记了密码，可在此重新设置新密码。</view>
			<view class="list-call">
				<uni-icons type="phone" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<uni-icons type="locked" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="新密码"
					:password="!showPassword" />
				<uni-icons @click="display" :type="showPassword ?'eye-slash-filled': 'eye-filled'" :color="themeColor"
					size="24"></uni-icons>

			</view>
			<view class="list-call">
				<uni-icons type="checkbox" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>修改密码</text>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	var _this, js;
	export default {
		data() {
			return {
				phone: '',
				second: 0,
				code: "",
				showPassword: false,
				password: ''
			}
		},
		onLoad() {
			_this = this;
		},
		computed: {
			...mapGetters(['themeColor']),
			...mapState([
				'themeColor'
			]),
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				_this.second = 60;
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
				uni.request({
					url: 'http://***/getPassWord', //仅为示例，并非真实接口地址。
					data: {
						phone: this.phone,
						type: 'forget'
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							_this.second = 0;
						} else {
							uni.showToast({
								title: res.data.msg
							});
							_this.second = 60;
							js = setInterval(function() {
								_this.second--;
								if (_this.second == 0) {
									_this.clear()
								}
							}, 1000)
						}
					},
					fail() {
						this.clear()
					}
				});
				
				
				
				
			},
			bindLogin() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				if (this.code.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				// uni.request({
				// 	url: 'http://***/forget',
				// 	data: {
				// 		phone: this.phone,
				// 		password: this.password,
				// 		code: this.code
				// 	},
				// 	method: 'POST',
				// 	dataType: 'json',
				// 	success: (res) => {
				// 		if (res.data.code != 200) {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: 'none'
				// 			});
				// 		} else {
				// 			uni.showToast({
				// 				title: res.data.msg
				// 			});
				// 			setTimeout(function() {
				// 				uni.navigateBack();
				// 			}, 1500)
				// 		}
				// 	}
				// });

			}
		}
	}
</script>

<style lang="scss" scpoed>
	page {
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tishi {
		color: #999999;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 40rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}


	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 73%;
		height: 80rpx;
		background: $uni-theme-color;
		border-radius: 40rpx;
		line-height: 80rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: $uni-theme-color;
	}

	.yzm {
		color: $uni-theme-color;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid $uni-theme-color;
		border-radius: $uni-radius-root;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>
