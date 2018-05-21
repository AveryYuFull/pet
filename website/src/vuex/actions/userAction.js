import myAxios from '../../common/myAxios'
import config from '../../configs/config'
import PubSub from 'pubsub-js'
import types from '../mutation-types'

const actions = {
    /**
     * 0. 数据库出错
     * 1. 注册成功
     * 2. 邮件重复
     * 3. 昵称重复
     */
    register ({ commit }, data) {
        myAxios.post(config.REGISTER, (res) => {
            const code = res.code
            if (code === 1) {
                // 注册成功
                PubSub.publish('registerSuccess', data)
            } else if (code === 2) {
                // 邮件重复
                alert('邮件重复')
            } else if (code === 3) {
                // 昵称重复
                alert('昵称重复')
            } else if (code === 0) {
                // 数据库出错
                alert('数据库出错')
            }
        }, data)
    },
    login ({ commit }, data) {
        myAxios.post(config.LOGIN, (res) => {
            if (res.success) {
                PubSub.publish('loginSuccess')
                commit(types.LOGIN, res.data)
            } else {
                alert(res.message)
            }
        }, data)
    },
    logout ({ commit }) {
        myAxios.get(config.LOGOUT, (res) => {
            res.success && commit(types.LOGIN, null)
        })
    },
    checkSession ({commit, state}) {
        if (!state.userInfo || JSON.stringify(state.userInfo) === '{}') {
            myAxios.get(config.GET_SESSION, (res) => {
                if (res.data && JSON.stringify(res.data) !== '{}') {
                    commit(types.LOGIN, res.data)
                }
            })
        }
    }
}

export default actions;
