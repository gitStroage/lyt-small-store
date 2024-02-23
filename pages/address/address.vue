<template>
	<view>
		<cc-addressSet :colors="themeColor" :addressList="addressList" @chooseClick="chooseClick"
			@editClick="editClick"></cc-addressSet>

		<view class="save">
			<view class="btn" :style="'background:' + themeColor" @tap="addAddress">添加收货地址</view>
		</view>
	</view>
</template>

<script>
	import CCaddressSet from "@/components/cc-addressSet/cc-addressSet.vue"
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			CCaddressSet
		},
		data() {
			return {
				addressList: [{
					id: 1,
					name: '张三',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					lable: "",
					isdefult: true,

				}, {
					id: 2,
					name: '王五',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					lable: "",
					isdefult: false,
				}, {
					id: 3,
					name: '李四',
					phone: '12345678915',
					address: '云南省昆明市五华区',
					detailAddress: '二环西路398号高新科技广场20F',
					lable: "",
					isdefult: false,
				}],
			}
		},
		computed: {
			...mapGetters(['themeColor']),
			...mapState([
				'themeColor'
			])
		},
		methods: {
			// 编辑地址
			editClick(item) {
				let {
					id
				} = item
				uni.navigateTo({
					url: '/pages/addAddress/addAddress?id=' + id
				})
			},
			//选择地址
			chooseClick(item) {
				let {
					id
				} = item
				uni.navigateTo({
					url: "/pages/order/order?id=" + id

				})
			},
			// 增加地址
			addAddress() {
				uni.navigateTo({
					url: '/pages/addAddress/addAddress'
				})
			},
		},
		onLoad(option) {
			if (JSON.stringify(option) != "{}") {
				let obj = JSON.parse(decodeURIComponent(option.obj))
				let {
					id
				} = obj
				if (id) {
					for (let i = 0; i < this.addressList.length; i++) {
						if (obj.isdefult == true) {
							this.addressList[i].isdefult = false
						}
						if (id == this.addressList[i].id) {
							this.addressList[i] = obj
						}
					}
				} else {
					if (obj.isdefult == true) {
						for (let i = 0; i < this.addressList.length; i++) {
							this.addressList[i].isdefult = false
						}
					}
					obj.id = this.addressList.length + 1
					this.addressList.push(obj)
				}
			}


		},
		onShow() {

		},
	}
</script>

<style lang="scss" scoped>
	.save {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 2upx solid $uni-border-2;
	}

	.save view {
		display: flex;
	}

	.save .btn {
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
		width: 73%;
		height: 80upx;
		border-radius: 80upx;
		background-color: #f23a3a;
		color: #fff;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		// margin-bottom: 60px;
	}
</style>