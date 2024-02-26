import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './langs/zh-CN'
import en from './langs/en'
import bur from './langs/bur'

Vue.use(VueI18n)

const messages = {
    en,
    'zh-CN':zhCN,
	bur
}

const i18n = new VueI18n({
    locale: uni.getStorageSync("language") || 'zh-CN',  //默认中文，也可根据系统语言动态设置
    messages
})

export default i18n