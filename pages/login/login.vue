<template>
	<view class="content">
		<view class="header">
			<image src="/static/images/logo_blue.png"></image>
		</view>
		<view class="list" v-if="captcha">
			<view class="list-call">
				<uni-icons type="phone" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<uni-icons type="checkbox" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="list" v-else>
			<view class="list-call">
				<uni-icons type="person" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="login.account" type="number" maxlength="11" placeholder="用户名/手机号/邮箱" />
			</view>
			<view class="list-call">
				<uni-icons type="locked" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="login.password" type="text" maxlength="32" placeholder="密码"
					password="true" />
			</view>
		</view>


		<view class="other-login-options">
			<view class="captcha-login" @click="handleCaptchaLogin">
				{{ captcha  ? '返回用户名登录' : '验证码登录' }}
			</view>
			<view class="login-or">
				或者
			</view>
			<view class="facebook-login" @click="handleFacebookLogin">
				<image src="../../static/images/facebook.png" mode="widthFix"></image>
				<view class="facebook">
					Facebook
				</view>
			</view>
		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>

		<view class="agreenment">
			<navigator url="/pages/login/forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="/pages/register/register" open-type="navigate">注册账户</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
	} from 'vuex'
	var _this, js;
	export default {
		data() {
			return {
				login: {
					account: '',
					password: ''
				},
				phone: '',
				second: 0,
				code: "",
				captcha: false,

			};
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
		methods: {
			//获取验证码
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
			//验证码登录
			handleCaptchaLogin() {
				this.captcha = !this.captcha
			},

			//facebook账号登录
			handleFacebookLogin() {

			},
			//执行登录
			bindLogin() {
				let that = this;
				if (this.login.account.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '账号不正确'
					});
					return;
				}
				if (this.login.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				// postLogin(this.login).then(res => {
				// 	uni.showToast({
				// 		title: '登录成功！',
				// 		icon: 'none'
				// 	});
				// 	this.$store.dispatch('setUserData', res.userInfo);
				// 	// 跳转首页
				// 	that.$Router.pushTab({
				// 		path: '/pages/tabbar/home',
				// 	});
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
		margin-top: 75upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 80upx;
		padding-left: 40upx;
		padding-right: 40upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}



	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		margin-left: 16upx;
	}

	.other-login-options {
		margin-top: 80upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.captcha-login {
			padding: 15upx;
			border: 2upx solid $uni-border-4;
			border-radius: $uni-radius-root;
		}

		.login-or {
			font-size: 30upx;
			font-weight: bold;
			padding: 40upx;
		}

		.facebook-login {
			width: 50%;
			height: 100upx;
			box-sizing: border-box;
			padding: 15upx;
			background-color: #4969AD;
			border-radius: $uni-radius-root;
			display: flex;
			align-items: center;

			image {
				width: 70upx;
			}

			.facebook {
				color: $uni-white;
				font-size: 32upx;
				padding-left: 10upx;
			}
		}
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

	.button-login {
		color: #FFFFFF;
		font-size: 34upx;
		width: 73%;
		height: 80upx;
		background: $uni-theme-color;
		border-radius: 40upx;
		line-height: 80upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.button-hover {
		background: $uni-theme-color;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 40upx;
		color: $uni-theme-color;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.agreenment text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>