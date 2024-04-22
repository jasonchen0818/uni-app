const baseUrl = "http://127.0.0.1:4523/m1/4177433-0-default"

//为了之后发送请求方便，不用每次传写header和解构，我又写了二次封装……
//之后要和后端协商这个header写什么,目前就是传token
const header = {
	Authorization: uni.getStorageSync('token')
}

//二次封装的核心函数，参数分别是接口路径，数据（对象，可以为空），方法不写就是GET
//这里因为发送请求是小程序和uniapp的接口，我没写统一的api管理文件
//所以说整个文件具体有哪些接口、单独控制mock开关还未实现
const request = (url = '', data = {}, method = 'GET') => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: header,
			data: data,
			method: method,
			success: (res) => {
				if (res.data.code == 200) {
					resolve(res.data.data)
				} else {
					reject(res.data)
					//由于和web端框架不同，还没弄好怎么方便地弹出错误信息
					//应该只能在vue文件里自己写了，这只是js文件
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default request