<template>
	<view class="page-main">
		<!-- <chooseAddress ref="liuChooseAddress" @submit="submitAddress" @delete="deteleAddress">
		</chooseAddress> -->
		<view class="address-form">
			<view class="form-item">
				<view class="form-item-label">收货人</view>
				<view class="form-item-prop">
					<input type="text" v-model="formData.name" placeholder="姓名"
						placeholder-class="input-placeholder" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">手机号</view>
				<view class="form-item-prop">
					<input type="number" maxlength="11" v-model="formData.phone" placeholder="收货人手机号码"
						placeholder-class="input-placeholder" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">所在地区</view>
				<view class="form-item-prop">
					<picker mode="multiSelector" @columnchange="bindMultiPickerRegionsChange" :range="regional"
						range-key="region_name" @change="changeRegions">
						<input type="text" v-model="formData.address" placeholder="国家、城市、州/区"
							placeholder-class="input-placeholder" />
						<uni-icons class="uni-icon" type="right" size="20"></uni-icons>
					</picker>

				</view>
			</view>
			<view class="form-item form-item2">
				<view class="form-item-label form-item-label2">详细地址</view>
				<view class="form-item-prop form-item-prop2">
					<textarea type="text" v-model="formData.detailAddress" placeholder="详细地址"
						placeholder-class="input-placeholder" />

				</view>
			</view>
			<view class="form-item-agree">
				<view class="agreetext">设为默认地址</view>
				<switch :checked="formData.isdefult" style="transform:scale(0.8)" @change="changeAgree" />
			</view>
			<view class="form-submit-btn" @click="saveAddress">保存</view>
		</view>
	</view>
</template>

<script>
	import ChooseAddress from "@/components/chooseAddress/chooseAddress.vue"
	export default {
		components: {
			ChooseAddress
		},
		data() {
			return {
				regional: [
					['云南省'],
					['昆明市'],
					['五华区']
				],
				formData: {
					name: '',
					phone: '',
					address: '',
					detailAddress: '',
					isdefult: false
				},
				id: '', //地址id
				adobj: "", //地址对象
				addressList: [{
					id: 1,
					name: '张三',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					isdefult: true,

				}, {
					id: 2,
					name: '王五',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					isdefult: false,
				}, {
					id: 3,
					name: '李四',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					isdefult: false,
				}],
			}
		},
		methods: {
			//piker中的数据动态生成
			bindMultiPickerRegionsChange(e) {

			},
			//点击确认之后获取对应的地区
			changeRegions(e) {

			},
			//获取地区数据
			getRegionalData() {

			},
			//设为默认地址
			changeAgree(e) {
				let ckecked = e.detail.value
				this.formData.isdefult = ckecked
			},
			//保存地址
			saveAddress() {

				if (!this.formData.name) {
					uni.showToast({
						title: '请输入收货人',
						icon: 'none'
					})
					return
				}
				if (!this.formData.phone) {
					uni.showToast({
						title: '请输入收货人手机号',
						icon: 'none'
					})
					return
				}
				if (!this.formData.address) {
					uni.showToast({
						title: '请选择或输入所在地区',
						icon: 'none'
					})
					return
				}
				if (!this.formData.detailAddress) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
					return
				}
				let obj = {
					...this.formData,
				}
				this.handleSaveAddress(obj)
			},
			//添加地址成功回调
			submitAddress(e) {
				let {
					address,
					agreeState,
					detailAddress,
					lableName,
					latitude,
					longitude,
					title,
					userName,
					userPhone
				} = e
				let obj = {
					name: userName,
					phone: userPhone,
					title,
					address,
					detailAddress,
					label: lableName,
					isdefult: agreeState
				}
				this.handleSaveAddress(obj)
			},
			//删除地址回调
			deteleAddress(e) {
				console.log('删除调地址信息：', e)
			},
			// 地址回显(编辑)调用此方法
			editAddress() {
				let {
					id,
					name,
					phone,
					title,
					address,
					detailAddress,
					lable,
					isdefult
				} = this.adobj
				let obj = {
					id, //地址id
					detailAddress, //门牌号(详细地址)
					userName: name, //联系人姓名
					userPhone: phone, //手机号
					lableName: lable, //标签
					// sexType: '', //性别
					title, //地址概述
					address, //详细地址
					longitude: '', //经度
					latitude: '', //纬度
					agreeState: isdefult, //是否是默认地址
				}
				this.$refs.liuChooseAddress.setData(obj)
			},
			//匹配地址
			handleMatchAddress(id) {
				if (id) {
					for (let i = 0; i < this.addressList.length; i++) {
						if (id == this.addressList[i].id) {
							// this.adobj = this.addressList[i]
							// this.editAddress()
							this.formData = this.addressList[i]
						}
					}

				}

			},

			/* 保存地址 */
			handleSaveAddress(obj) {
				let id = this.id
				if (id != '') {
					obj.id = id
					let params = encodeURIComponent(JSON.stringify(obj))
					uni.navigateTo({
						url: "/pages/address/address?obj=" + params
					})
				} else {
					let params = encodeURIComponent(JSON.stringify(obj))
					uni.navigateTo({
						url: "/pages/address/address?obj=" + params
					})
				}
			},
		},
		onLoad(option) {
			let {
				id
			} = option
			this.id = id
			if (id) {
				wx.setNavigationBarTitle({
					title: "编辑地址"
				})
				this.$nextTick(() => {
					this.handleMatchAddress(id)
				})
			}

		},
		onShow() {},
	}
</script>

<style lang="scss" scoped>
	.page-main {
		width: 100%;
		height: 100vh;
		background: #FFFFFF;
		position: relative;
	}

	.address-form {
		width: 100%;
		height: calc(65vh - 152upx);
		padding: 0 20upx;
		.form-item {
			display: flex;
			width: 100%;
			height: 120upx;
			border-bottom: 4upx solid $uni-border-2;

			.input-placeholder {
				height: 120upx;
				line-height: 120upx;
				font-size: 28upx;
				color: #999999;

			}

			.form-item-label {
				width: 160upx;
				height: 120upx;
				line-height: 120upx;
				text-align: left;
				font-size: 28upx;
				font-weight: bold;
				color: #333333;

			}

			.form-item-prop {
				display: flex;
				width: calc(100% - 160upx);
				height: 120upx;
				position: relative;

				picker {
					width: 100%;
				}

				input {
					width: 100%;
					height: 120upx;
					line-height: 120upx;
					padding-right: 20upx;
				}

				.uni-icon {
					color: #666;
					position: absolute;
					top: 50%;
					right: 10upx;
					transform: translateY(-50%);
				}
			}


		}

		.form-item2 {
			height: 240upx;

			.form-item-prop2 {
				height: 240upx;

				textarea {
					width: 100%;
					height: 240upx;
					line-height: 2;
				}
			}
		}

		.form-item-agree {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 120upx;
			line-height: 120upx;
			.agreetext{
				font-size: 28upx;
				font-weight: bold;
				color: #333333;
			}
			switch {
				color: $uni-theme-color;
			}
		}
		
		.form-submit-btn{
			width: 710upx;
			height: 80upx;
			margin: 100upx auto 0;
			text-align: center;
			line-height: 80upx;
			background-color: $uni-theme-color;
			color: $uni-white;
			border-radius: $uni-radius-root;
			
		}
	}
</style>