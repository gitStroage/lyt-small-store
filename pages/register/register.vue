<template>
	<view class="content">
		<view class="header">
			<image src="/static/images/logo_blue.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<uni-icons type="person" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="name" type="text" maxlength="11" placeholder="用户名" />
			</view>
			<view class="list-call">
				<uni-icons type="phone" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<uni-icons type="locked" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="登录密码"
					:password="!showPassword" />
				<uni-icons @click="display" :type="showPassword ?'eye-slash-filled': 'eye-filled'" :color="themeColor"
					size="24"></uni-icons>
			</view>
			<view class="list-call">
				<uni-icons type="checkbox" :color="themeColor" size="28"></uni-icons>
				<input class="sl-input" v-model="code" type="number" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			<text>注册</text>
		</view>

		<view class="agreement">
			<checkbox @tap="agreementSuccess" value="" :checked="agreement" :borderColor="themeColor" :color="themeColor"
				:activeBorderColor="themeColor" style="transform: scale(0.9);" />
			<text @tap="agreementSuccess"> 同意</text>
			<navigator url="/pages/login/agreement?id=1" open-type="navigate">《软件用户协议》</navigator>
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
		onLoad() {
			_this = this;

		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				name:"",
				phone: '',
				password: '',
				code: '',
				agreement: false,
				showPassword: false,
				second: 0,
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
		onUnload() {
			this.clear()
		},
		methods: {
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			display() {
				this.showPassword = !this.showPassword
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
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
				this.second = 60;
				//请求业务
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
			},
			bindLogin() {
				console.log(this.agreement)
				if (this.agreement == false) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读并同意《软件用户协议》'
					});
					return;
				}
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
				// 	url: 'http://***/reg.html',
				// 	data: {
				// 		phone: this.phone,
				// 		password: this.password,
				// 		code: this.code,
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

	.yzm {
		color:$uni-theme-color;
		font-size: 24upx;
		line-height: 64upx;
		padding-left: 20upx;
		padding-right: 20upx;
		width: auto;
		height: 64upx;
		border: 1upx solid $uni-theme-color;
		border-radius: $uni-radius-root;
	}

	.yzms {
		color: #999999 !important;
		border: 1upx solid #999999;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34upx;
		width: 73%;
		height: 80upx;
		line-height: 80upx;
		background: $uni-theme-color;
		border-radius: 40upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 80upx;
	}

	.button-hover {
		background: $uni-theme-color;
	}

	.agreement {
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
</style>