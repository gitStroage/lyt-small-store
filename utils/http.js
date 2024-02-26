const url_all = {
	'DEV': 'https://web.codeboy.com/xuezi', // 开发
	'PRO': 'https://web.codeboy.com/xuezi', // 生产
}

// 当前环境
let BASEURL = url_all['DEV']

//设置tokenkey
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "/login";
// 不用token的地址
var exceptionAddrArr = [""];

/*
 * 全局请求封装
 * @param path 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @oaram data 请求体数据
 * @param loading 请求未完成是是否显示加载中，默认为true
 */
export default (path, method, data = {}, contentType = 'json', loading = true) => {
	if (loading) {
		uni.showLoading({
			title: "加载中",
			mask: true
		});
	};
	return alRequest(path, method, data, contentType, loading)
};

// 发送请求函数
function alRequest(path, method, data, contentType, loading) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASEURL + path,
			method: method,
			data,
			header: CreateHeader(path, contentType),
			success(response) {
				if (response.data.code !== 200) {
					uni.showToast({
						icon: "none",
						duration: 4000,
						title: response.data.msg
					});
				}
				if (path === logInUrl) {
					uni.setStorageSync(tokenKey, response.data.token)
				}
				console.log(response.data)
				resolve(response.data);
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
}


/** 
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 */
function CreateHeader(path, contentType) {
	var header = {
		'content-type': contentType == 'json' ? "application/json" : "application/x-www-form-urlencoded",
	}
	if (exceptionAddrArr.indexOf(path) == -1) { //排除请求的地址不需要token的地址
		header['Authorization'] = uni.getStorageSync(tokenKey);
		return header
	} else {
		return header
	}
}