import Vue from 'vue'

import Vuex from 'vuex'
// 引入主题
import themes from '@/common/theme.js';
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		// 主题方案
		scheme: ['blue', 'red'],
		//当前主题
		theme: uni.getStorageSync('theme') || 'blue',
		//主题样式
		themes: themes[uni.getStorageSync('theme') || 'blue'],
		//主题色
		themeColor: '#0081ff',
		hasLogin: false,
		unit: 'KS'
	},
	mutations: {
		//相当于同步的操作
		updateTheme(state, mode = 'blue') {
			state.theme = mode
			uni.setStorageSync({
				key: "theme",
				data: mode
			})
		},
		updateThemes(state, mode = 'blue') {
			state.themes = themes[mode];
			uni.setStorageSync({
				key: "themes",
				data: themes[mode]
			})
		},
		switchTheme(state, provider) {
			state.themeColor = provider
			uni.setStorageSync({
				key: "themeColor",
				data: provider
			})
		},
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
	actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
	}
})
export default store