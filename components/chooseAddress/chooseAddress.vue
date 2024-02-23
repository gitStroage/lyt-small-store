<template>
	<view class="view-main">
		<map :latitude="latitude" :longitude="longitude" scale="16" show-location style="width: 100%; height: 35vh;">
			<image class="map-marker" :src="markerIcon"></image>
		</map>
		<view class="page-con">
			<view class="con-hd">
				<view class="choose-address" v-if="!addressInfo || !addressInfo.address" @click="chooseAddressView">
					选择收货地址 >
				</view>
				<view class="choose-address2" v-else>
					<view class="address2-l">
						<view class="address2-lhd">{{addressInfo.title}}</view>
						<view class="address2-lbd">{{addressInfo.address}}</view>
					</view>
					<view class="address2-r" @click="chooseAddressView">修改地址</view>
				</view>
			</view>
			<view class="con-bd">
				<view class="con-bd-item">
					<view class="con-bd-item-name">门牌号</view>
					<view class="con-bd-item-con">
						<input type="text" v-model="formData.detailAddress" placeholder="详细地址，例如1层101室"
							placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="con-bd-item">
					<view class="con-bd-item-name">标签</view>
					<view class="con-bd-item-con">
						<view :class="formData.lableName == item ? 'lable-item lable-item-on':'lable-item'"
							v-for="(item,index) in labelData" :key="index" @click="chooseLable(item)">{{item}}</view>
					</view>
				</view>
				<view class="con-bd-item">
					<view class="con-bd-item-name">联系人</view>
					<view class="con-bd-item-con con-bd-item-con2">
						<input type="text" v-model="formData.userName" placeholder="请填写收货人姓名"
							placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="con-bd-item">
					<view class="con-bd-item-name">手机号</view>
					<view class="con-bd-item-con">
						<input type="number" maxlength="11" v-model="formData.userPhone" placeholder="请填写收货人手机号码"
							placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="con-bd-agree" @click="changeAgree">
					<image class="agreeicon" :src="agreeState ? seleIcon : noseleIcon" mode=""></image>
					<view class="agreetext">设为默认地址</view>
				</view>
				<view class="con-ft-btn"
					:class="{'con-ft-btn1':addressInfo && addressInfo.address,'con-ft-btn3':!addressInfo || !addressInfo.address}"
					@click="submitAddress">
					保存地址</view>
				<!-- <view class="con-ft-btn con-ft-btn2" @click="deleteAddress">删除</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
	} from 'vuex'
	export default {
		data() {
			return {
				formData: {
					detailAddress: '',
					userName: '',
					userPhone: '',
					lableName: '家',
					// sexType: 1, //1 先生 2 女士
				},
				labelData: ['家', '公司', '学校'],
				addressInfo: {}, //选中的地址信息
				agreeState: false, //是否是默认地址
				longitude: null,
				latitude: null,
				markerIcon: require('../../static/images/marker.png'),
				seleIcon: require('../../static/images/select_blue.png'),
				sele2Icon: require('../../static/images/sele_blue.png'),
				noseleIcon: require('../../static/images/no-sele.png'),
				oldObj: ''
			}
		},
		mounted() {
			this.getLocation()
		},
		computed: {
			...mapGetters(['theme']),
			...mapState([
				'theme'
			])
		},
		methods: {
			//数据回显时使用此方法
			setData(obj) {
				this.oldObj = obj
				this.formData.detailAddress = obj.detailAddress
				this.formData.userName = obj.userName
				this.formData.userPhone = obj.userPhone
				this.formData.lableName = obj.lableName
				// this.formData.sexType = obj.sexType
				this.addressInfo.title = obj.title
				this.addressInfo.address = obj.address
				this.addressInfo.latitude = obj.latitude
				this.addressInfo.longitude = obj.longitude
				this.agreeState = obj.agreeState
			},
			//获取当前的地理位置
			getLocation() {
				uni.showLoading({
					title: '正在获取定位中...',
				})
				uni.getLocation({
					type: 'gcj02',
					isHighAccuracy: true,
					geocode: 'true',
					highAccuracyExpireTime: 3500,
					success: (res) => {
						uni.hideLoading();
						this.longitude = res.longitude;
						this.latitude = res.latitude;
					},
					fail: (res) => {
						if (res.errMsg == "getLocation:fail auth deny") {
							uni.showModal({
								content: '检测到您没打开获取信息功能权限，是否去设置打开？',
								confirmText: "确认",
								cancelText: '取消',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success: (res) => {}
										})
									} else {
										return false;
									}
								}
							})
						}
					}
				})
			},
			//保存地址
			submitAddress() {
				// if (!this.addressInfo.latitude) {
				// 	uni.showToast({
				// 		title: '请选择收货地址',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				if (!this.formData.detailAddress) {
					uni.showToast({
						title: '请输入门牌号',
						icon: 'none'
					})
					return
				}
				if (!this.formData.userName) {
					uni.showToast({
						title: '请输入联系人',
						icon: 'none'
					})
					return
				}
				if (!this.formData.userPhone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				let obj = {
					...this.formData,
					...this.addressInfo
				}
				obj.agreeState = this.agreeState
				this.$emit('submit', obj)
			},
			//删除地址
			deleteAddress() {
				this.$emit('detele', this.oldObj)
			},
			//选择地址、修改编辑地址
			chooseAddressView() {
				uni.chooseLocation({
					success: res => {
						console.log(res)
						if (!res.name || !res.address || !res.latitude || !res.longitude) return
						let addressObj = {
							title: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude
						}
						this.latitude = res.latitude
						this.longitude = res.longitude
						this.addressInfo = addressObj
					}
				});
			},
			//联系人性别选择
			chooseSex(type) {
				// this.formData.sexType = type
			},
			//标签选择
			chooseLable(item) {
				this.formData.lableName = item
			},
			//点击隐私协议
			changeAgree() {
				this.agreeState = !this.agreeState
			}
		}
	}
</script>

<style scoped lang="scss">
	.view-main {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	.map-marker {
		width: 44upx;
		height: 62upx;
		position: absolute;
		top: 15vh;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.map-tip {
		font-size: 20upx;
		color: #b6b6b6;
		line-height: 42upx;
		padding: 0 20upx;
		position: absolute;
		left: 50%;
		top: 30upx;
		box-shadow: 0px 1px 10px 1px rgba(153, 153, 153, 0.34);
		background-color: #fff;
		border-radius: 4px;
		transform: translateX(-50%);
	}

	.poiss-box {
		width: 100%;
		padding: 20upx 0;
		background-color: #FFFFFF;
		font-size: 26upx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.poiss-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: calc(100% - 48upx);
		height: 100upx;
		padding: 0 24upx;
		border-bottom: 1px solid #f9f9f9;
	}

	.poiss-item-l {
		width: calc(100% - 184upx);
	}

	.poiss-item-lhd {
		font-size: 32upx;
		color: #333333;
		line-height: 48upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.poiss-item-lbd {
		font-size: 28upx;
		color: #b6b6b6;
		line-height: 42upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.poiss-item-r {
		width: 36upx;
		height: 36upx;
		margin: 0 30upx;
	}

	.primary-btn {
		width: 688upx;
		height: 88upx;
		margin: 0 auto;
		margin-top: 28upx;
		background: $uni-theme-color;
		border-radius: 44upx;
		font-size: 32upx;
		color: #FFFFFF;
		line-height: 88upx;
		text-align: center;
	}

	.page-con {
		width: 702upx;
		height: 65vh;
		position: fixed;
		bottom: 0;
		left: 24upx;
	}

	.con-hd {
		display: flex;
		align-items: center;
		width: 702upx;
		height: 128upx;
		margin: 0 auto;
		background: #FFFFFF;
		box-shadow: 0upx 4upx 8upx 0upx rgba(88, 102, 123, 0.2);
		border-radius: 24upx;
	}

	.choose-address {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 92%;
		height: 64upx;
		margin: 0 auto;
		border-radius: 12upx;
		border: 2upx solid $uni-theme-color;
		font-size: 32upx;
		color: $uni-theme-color;
	}

	.choose-address2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: calc(100% - 48upx);
		padding: 0 24upx;
	}

	.address2-l {
		width: calc(100% - 184upx);
	}

	.address2-lhd {
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
		line-height: 48upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.address2-lbd {
		font-size: 28upx;
		color: #999999;
		line-height: 42upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.address2-r {
		width: 144upx;
		height: 60upx;
		background: #FFFFFF;
		border-radius: 12upx;
		border: 2upx solid $uni-theme-color;
		font-size: 28upx;
		color: $uni-theme-color;
		line-height: 60upx;
		text-align: center;
	}

	.con-bd {
		width: 702upx;
		height: calc(65vh - 152upx);
		padding: 8upx 24upx 0;
		margin-top: 24upx;
		background: #FFFFFF;
		border-radius: 24upx 24upx 0upx 0upx;
	}

	.con-bd-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 110upx;
	}

	.con-bd-item-name {
		width: 120upx;
		height: 110upx;
		text-align: left;
		font-size: 28upx;
		font-weight: bold;
		color: #333333;
		line-height: 110upx;
	}

	.con-bd-item-con {
		display: flex;
		align-items: center;
		width: calc(100% - 120upx);
		height: 108upx;
		border-bottom: 2upx solid #F7F7F7;
	}

	.con-bd-item-con input {
		width: 100%;
		height: 60upx;
	}

	.lable-item {
		width: 88upx;
		height: 48upx;
		margin-right: 18upx;
		background: #FFFFFF;
		border-radius: 6upx;
		border: 2upx solid #E3E3E3;
		font-size: 24upx;
		color: #333333;
		line-height: 48upx;
		text-align: center;
	}

	.lable-item-on {
		background: $uni-theme-color ;
		border: 2upx solid $uni-theme-color;
		color: #FFFFFF;
	}

	.con-bd-item-con2 input {
		width: 50%;
		height: 60upx;
	}

	.con-bd-sex-box {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 16upx;
		font-size: 28upx;
	}

	.choose-sex-icon {
		width: 36upx;
		height: 36upx;
		margin-right: 12upx;
	}

	.con-bd-agree {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 40upx;
		width: 100%;
	}

	.agreeicon {
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
		margin-top: 2upx;
	}

	.agreetext {
		display: flex;
		align-items: center;
		font-size: 28upx;
		line-height: 28upx;
		color: #999999;
	}

	.con-ft-btn {
		width: 644upx;
		height: 88upx;
		border-radius: 44upx;
		font-size: 32upx;
		line-height: 88upx;
		text-align: center;
	}

	.con-ft-btn:last-child {
		margin-top: 44upx;
	}

	.con-ft-btn1 {
		background-color: #FFFFFF;
	}

	.con-ft-btn2 {
		background: #FFFFFF;
		border: 2upx solid #DEDEDE;
		color: #666666;
	}

	.con-ft-btn3 {
		background: #DEDEDE;
		border: 2upx solid #DEDEDE;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.input-placeholder {
		font-size: 28upx;
		color: #999999;
	}
</style>