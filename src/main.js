// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from "vue-router"
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'
//import VueResource from 'vue-resource';
import 'font-awesome/css/font-awesome.css'
import MenuUtils from '@/utils/MenuUtils'
import API from '@/api/api'

    

// import API from '@/api/api'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(require('vue-moment')); 
//Vue.use(VueResource);
/* eslint-disable no-new */
let data = JSON.parse(window.sessionStorage.getItem('menu'));
if (data) {
    let routes = []
    MenuUtils(routes, data)
    router.addRoutes(routes)
}
router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('access-user')
        next()
    } else {
        let user = JSON.parse(window.sessionStorage.getItem('access-user'))
        if (!user) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    }
})
new Vue({
    el: '#app',
    router,
    VueRouter,
    store,
    template: '<App/>',
    components: {
        App
    },
    filters:{
        //日期时间格式
        dateFormat (dataStr) {
            if(dataStr == ''){
                return false
            }
            var d = new Date(dataStr)
            var year = d.getFullYear()
            var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
            var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
            var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
            var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
            return  year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        },
        //日期格式
        dateFormat2 (dataStr) {
            if(dataStr == ''){
                return false
            }
            var d = new Date(dataStr)
            var year = d.getFullYear()
            var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
            return  year + '-' + month + '-' + day
            // var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
            // var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
            // var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
            // return  year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        }
    }
    
})

