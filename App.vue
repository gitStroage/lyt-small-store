<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	/*  #endif */
	//对一个不存在的标签进行取反 , 相当于*号通配符选择器
	:not(not) {
		margin: 0;
		padding: 0;
		// 盒子模型的计算方案 边框盒子
		box-sizing: border-box;
	}

	// 全局
	page {
		background-color: $uni-bg-color;
		color: $uni-main-color;
		font-size: $uni-font-size-base;
	}
	
</style>