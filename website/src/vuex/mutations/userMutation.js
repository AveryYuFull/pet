import types from '../mutation-types'

const mutations = {
    [types.LOGIN] (state, data) {
        state.userInfo = data
    }
}

export default mutations;
