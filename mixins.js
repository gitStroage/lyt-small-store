let mixin = {
	data() {
		return {
			language: uni.getStorageSync('language') || this._i18n.locale
		}
	},
	created() {

	},
	mounted() {


	},
	methods: {
		//切换tabBar 语言
		handleSetTabBarItme() {
			this.language = uni.getStorageSync('language') || this._i18n.locale
			const {
				tabBar
			} = this._i18n.messages[this._i18n.locale]
			uni.setTabBarItem({
				index: 0,
				text: tabBar.home
			})
			uni.setTabBarItem({
				index: 1,
				text: tabBar.category
			})
			uni.setTabBarItem({
				index: 2,
				text: tabBar.cart
			})
			uni.setTabBarItem({
				index: 3,
				text: tabBar.me
			})
		},
	}
}

export default mixin