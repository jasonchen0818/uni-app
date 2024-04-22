// 这个是项目的全局配置文件,和web端不同,大多数环境uniapp装好
// 但是带来的限制是需要尽量使用它框架提供的组件
// 常见的axios等插件要额外引入并注册,太麻烦了搞不定一直报错
//底下的两行代码是vue3为了兼容vue2额外进行的判断，本项目是vue3
//实际更改（装插件啥的）尽量都加上，hbuilder官网装插件很方便，但是要有账号

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import request from './utils/request.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

//这个是项目的基础url,以后调接口就注释掉然后换上后端自己环境的URL
app.config.globalProperties.$baseUrl = "http://127.0.0.1:4523/m1/4177433-0-default";
app.config.globalProperties.$request = request

app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import request from './utils/request.js'

export function createApp() {
  const app = createSSRApp(App)
	
	//这个是项目的基础url,以后调接口就注释掉然后换上后端自己环境的URL
	app.config.globalProperties.$baseUrl = "http://127.0.0.1:4523/m1/4177433-0-default";
	app.config.globalProperties.$request = request
  return {
    app
  }
}

// #endif