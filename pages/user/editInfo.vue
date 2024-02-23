<template>
	<view>
		<view class="edit-info-form">
			<navigator open-type="navigateBack" :delta='1'>
				<uni-icons class="back" type="back" size="24" color="#FFF"></uni-icons>
			</navigator>
			<view class="edit-title">
				{{title}}
			</view>
		</view>
		<view class="info-form">
			<view class="nickname-info info-item" v-if="mode == '0'">
				<view class="normal-input">
					<input type="text" :placeholder="value" :value="nickName" @input="bindnickName"
						placeholder-class="place" />
				</view>
				<view class="input-tip">
					昵称为2-20个中英文组成
				</view>
				<view class="save-btn" @tap="savenickName">
					保存
				</view>
			</view>
			<view class="name-info info-item" v-if="mode == '1'">
				<view class="normal-input">
					<input type="text" :placeholder="value" :value="name" @input="bindName" placeholder-class="place" />
				</view>
				<view class="input-tip">
					姓名为2-20个中英文组成
				</view>
				<view class="save-btn" @tap="saveName">
					保存
				</view>
			</view>
			<view class="mobile-info info-item" v-if="mode == '2'">
				<view class="special-input">
					<text>手机号</text>
					<input type="text" :placeholder="value" :value="mobile" @input="bindmobile"
						placeholder-class="place" />
				</view>
				<view class="special-input">
					<text>验证码</text>
					<input type="text" :placeholder="value" :value="code" @input="bindCode" placeholder-class="place" />
					<button @tap="handleMobileCode">获取验证码</button>
				</view>
				<view class="save-btn" @tap="saveMobile">
					保存
				</view>
			</view>
			<view class="email-info info-item" v-if="mode == '3'">
				<view class="special-input">
					<text>邮箱</text>
					<input type="text" :placeholder="value" :value="email" @input="bindEmail"
						placeholder-class="place" />
				</view>
				<view class="special-input">
					<text>验证码</text>
					<input type="text" :placeholder="value" :value="code" @input="bindCode" placeholder-class="place" />
					<button @tap="handleEmailCode">获取验证码</button>
				</view>
				<view class="save-btn" @tap="saveEmail">
					保存
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: "修改信息",
				mode: '',
				modeArr: [
					'修改昵称',
					"修改姓名",
					"修改手机号",
					"修改邮箱"
				],
				value: '请输入',
				nickName: '',
				name: "",
				mobile: '',
				email: "",
				code: "",
			}
		},
		methods: {

			initTilte() {
				let {
					mode,
					modeArr
				} = this
				this.title = modeArr[mode]
			},

			/* 绑定昵称 */
			bindnickName(e) {
				this.nickName = e.detail.value;
			},
			/* 验证昵称 */
			isnickNameAvailable(nickName) {
				var myreg = /^[\u4E00-\u9FA5A-Za-z]{2,20}$/;
				if (!myreg.test(nickName)) {
					return false;
				} else {
					return true;
				}
			},
			/* 保存昵称 */
			savenickName() {
				let that = this;
				let nickname = that.nickName;
				if (that.isnickNameAvailable(nickname)) {

				} else {
					uni.showToast({
						title: '昵称有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}

			},
			/* 绑定姓名 */
			bindName(e) {
				this.name = e.detail.value;
			},
			/* 验证姓名 */
			isNameAvailable(name) {
				var myreg = /^[\u4E00-\u9FA5A-Za-z]{2,20}$/;
				if (!myreg.test(name)) {
					return false;
				} else {
					return true;
				}
			},
			/* 保存姓名 */
			saveName() {
				let that = this;
				let name = that.name;
				if (that.isNameAvailable(name)) {

				} else {
					uni.showToast({
						title: '姓名有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			},
			/* 绑定手机号 */
			bindmobile(e) {
				this.mobile = e.detail.value;
			},
			/* 验证手机号 */
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			/* 获取手机验证码 */
			handleMobileCode(){
				let that = this;
				let mobile = that.mobile;
				if (that.isPoneAvailable(mobile)) {
				
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			},
			/* 保存手机号 */
			saveMobile() {
				let that = this;
				let mobile = that.mobile;
				let code = that.code
				if (that.isPoneAvailable(mobile) && that.isCodeAvailable(code)) {
				
				} else {
					uni.showToast({
						title: '手机号码或验证码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			},
			/* 绑定邮箱 */
			bindEmail(e) {
				this.email = e.detail.value;
			},
			/* 验证邮箱 */
			isEmailAvailable(email) {
				var myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				// var myreg = /\w[-.\w]*\@[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|cn|edu|uk)/ig;
				if (!myreg.test(email)) {
					return false;
				} else {
					return true;
				}
			},
			/* 获取邮箱验证码 */
			handleEmailCode(){
				let that = this;
				let email = that.email;
				if (that.isEmailAvailable(email)) {
				
				} else {
					uni.showToast({
						title: '邮箱地址有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			},
			/* 保存邮箱 */
			saveEmail() {
				let that = this;
				let email = that.email;
				let code = that.code
				if (that.isEmailAvailable(email) && that.isCodeAvailable(code)) {

				} else {
					uni.showToast({
						title: '邮箱地址有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
			},
			
			/* 校验验证码 */
			isCodeAvailable(code) {
				var myreg = /^\d{6}$/;
				if (!myreg.test(code)) {
					return false;
				} else {
					return true;
				}
			},
		},
		onLoad(option) {
			// console.log(option)
			let {
				mode
			} = option
			this.mode = mode
			this.initTilte()
		}
	}
</script>

<style lang="scss" scoped>
	.edit-info-form {
		width: 750upx;
		height: calc(44px + env(safe-area-inset-top));
		background-color: $uni-theme-color;
		position: relative;

		.back {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 20upx;
		}

		.edit-title {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 700;
			font-size: 32upx;
			color: $uni-white;
		}
	}

	.info-form {
		.info-item {
			.normal-input {
				background-color: $uni-white;
				padding: 20upx;
				margin-top: 20upx;

				input {
					display: inline-block;
					width: 100%;
					height: 98upx;
					padding: 0 20upx;
					vertical-align: middle;
					font-size: $uni-font-size-lg;
				}
			}

			.input-tip {
				font-size: $uni-font-size-sm;
				color: $uni-secondary-color;
				line-height: 2;
				padding: 10upx 40upx;
			}

			.save-btn {
				width: 73%;
				margin: 100upx auto 0;
				text-align: center;
				background-color: $uni-theme-color;
				color: $uni-white;
				font-weight: 550;
				line-height: 3;
				border-radius: $uni-radius-root;
				letter-spacing: $uni-font-space;

				&.disabled {
					opacity: 0.5;
				}
			}

			.special-input {
				width: 100%;
				background-color: $uni-white;
				padding-left: 40upx;
				text-align: left;
				position: relative;
				border-bottom: 2upx solid $uni-border-3;
				display: flex;
				align-items: center;

				text {
					font-size: 28upx;
					min-width: 150upx;
				}

				input {
					flex: 1;
					font-size: 32upx;
					height: 98upx;
					padding-right: 40upx;
				}

				button {
					height: 98upx;
					padding: 0 20upx;
					line-height: 98upx;
					font-size: $uni-font-size-base;
					color: $uni-white;
					background-color: $uni-theme-color;
					border-color: $uni-theme-color;
					outline: none;
					border-radius: 0;
				}
			}

		}

		.place {
			color: #999999;
			font-size: $uni-font-size-base;
			letter-spacing: $uni-font-space;
		}
	}
</style>