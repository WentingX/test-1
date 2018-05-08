import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        options: [],
        activeIndex: '',
        userInfo: {},
        userInfo2: {},
        userInfo3: {},
        hidden: '',
        leaf: '',
        dealInfo:{},
    },
    mutations: {
        // 添加tabs
        add_tabs(state, data) {
            this.state.options.push(data);
        },
        // 删除tabs
        delete_tabs(state, route) {
            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.activeIndex = index;
        },
        // 设置详情信息
        save_detail_info(state, info) {
            this.state.userInfo = info;
        },
        //用户-撮合信息到详情
        save_detail_info2(state, info) {
            this.state.userInfo2 = info;
        },
        //用户-技能展示到详情
        save_detail_info3(state, info) {
            this.state.userInfo3 = info;
            console.log(info)
        },
        //人才库首页到信息页
        save_detail_info4(state, info) {
            this.state.userInfo4 = info;
            console.log(info)
        },
        menu_leaf(state, leaf) {
            this.state.userInfo = leaf;
        }
    }
});

export default store;
