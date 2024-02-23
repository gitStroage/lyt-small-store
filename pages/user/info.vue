<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar">
				<view class="imgAvatar" @tap="avatarChoose">
					<view class="iavatar" :style="'background: url('+avater+') no-repeat center/cover #eeeeee;'"></view>
				</view>
				<text>更换头像</text>
			</view>
			<view class="ui-lists">
				<view class="ui-list right">
					<text>昵称</text>
					
					<view @tap="handleEditInfo(0)">
						VIP会员1024
					</view>
				</view>
				<view class="ui-list right">
					<text>姓名</text>
					<view @tap="handleEditInfo(1)">david beckham</view>
				</view>
				<view class="ui-list right">
					<text>手机号</text>
					<view @tap="handleEditInfo(2)">150****4321</view>
					<!-- <button v-if="!mobile" open-type="getPhoneNumber" @getphonenumber="getphonenumber"
						class="getInfo bun">授权手机号</button> -->
				</view>
				<view class="ui-list right">
					<text>邮箱</text>
					<view @tap="handleEditInfo(3)">abc@gmail.com</view>
				</view>

				<!-- 	<view class="ui-list right">
					<text>性别</text>
					<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
						<view class="picker">
							{{sex[index].name}}
						</view>
					</picker>
				</view> -->
				<!-- <view class="ui-list right">
					<text>生日</text>
					<picker mode="date" :value="date" @change="bindDateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view> -->
			</view>

		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				value: '请填写',
				sex: [{
					id: 1,
					name: '男'
				}, {
					id: 2,
					name: '女'
				}],
				index: 0,
				region: ['请填写'],
				date: '请填写',
				avater: '/static/images/face.jpeg',
				url: '',
				nickName: '',
				mobile: '',
				headimg: ''

			}

		},
		methods: {
			handleEditInfo(mode){
				uni.navigateTo({
					url:'/pages/user/editInfo?mode='+mode
				})
			},
			bindPickerChange(e) {
				this.index = e.detail.value;

			},
			bindDateChange(e) {
				this.date = e.detail.value;

			},
			
			bindmobile(e) {
				this.mobile = e.detail.value;

			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						that.imgUpload(res.tempFilePaths);
						const tempFilePaths = res.tempFilePaths;
					}
				});
			},
			getUserInfo() {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res);
						uni.showToast({
							title: '已授权',
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			getphonenumber(e) {
				if (e.detail.iv) {
					console.log(e.detail.iv) //传后台解密换取手机号
					uni.showToast({
						title: '已授权',
						icon: 'none',
						duration: 2000
					})
				}
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			async updata(datas) {
				//传后台

			},
			imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						Authorization: uni.getStorageSync('token')
					},
					url: '/api/upload/image', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					formData: {
						type: 'user_headimg'
					},
					success: function(res) {
						var data = JSON.parse(res.data);
						data = data.data;
						that.avater = that.url + data.img;

						that.headimg = that.url + data.img;


					},
					fail: function(error) {
						console.log(error);
					}
				});
			},

		},
		onLoad() {}

	}
</script>

<style lang="scss" scoped>
	.container {
		display: block;
	}

	.ui-all {
		.avatar {
			width: 100%;
			height: 24vh;
			position: relative;
			background-color: $uni-white;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.imgAvatar {
				width: 168upx;
				height: 168upx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				border: 1upx solid $uni-theme-color;
				display: flex;
				justify-content: center;
				align-items: center;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				font-size: 28upx;
				margin-top: 20upx;
			}


		}

		.ui-lists {
			background-color: $uni-white;
			padding: 0 20upx;
			margin-top: 20upx;
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 40upx 20upx;
			border-bottom: solid 1px #f2f2f2;
			position: relative;
			border-bottom: 2upx solid $uni-border-1;
			display: flex;

			text {
				font-size: 28upx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150upx;
			}

			view {
				flex: 1;
				text-align: right;
				padding-right: 40upx;
				color: $uni-secondary-color;
			}

			input {
				font-size: 30upx;
				display: inline-block;
				vertical-align: middle;
			}

			button {
				font-size: 30upx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;

				&::after {
					display: none;
				}
			}

			picker {
				width: 90%;
				color: #030303;
				font-size: 30upx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30upx;
				left: 150upx;
			}

			textarea {
				color: #030303;
				font-size: 30upx;
				vertical-align: middle;
				height: 150upx;
				width: 100%;
				margin-top: 50upx;
			}

			.place {
				color: #999999;
				font-size: 28upx;
			}

		}

		.right:after {
			content: '';
			width: 16upx;
			height: 16upx;
			border-top: solid 4upx $uni-secondary-color;
			border-right: solid 4upx $uni-secondary-color;
			transform: translateY(-50%) rotate(45deg);
			-ms-transform: translateY(-50%) rotate(45deg);
			/* IE 9 */
			-moz-transform: translateY(-50%) rotate(45deg);
			/* Firefox */
			-webkit-transform: translateY(-50%) rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: translateY(-50%) rotate(45deg);
			position: absolute;
			top: 50%;
			right: 20upx;
		}
	}
</style>