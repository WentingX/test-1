import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router'
import routes from './routerConfig.js'
//
Vue.use(Router)
//export default new Router({
//    routes
//})
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes
})
//返回上一层
Vue.prototype.$setgoindex = function () {
    if (window.history.length <= 1) {
        if (location.href.indexOf('?') === -1) {
            window.location.href = location.href + '?goindex=true'
        } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
            window.location.href = location.href + '&goindex=true'
        }
    }
}
