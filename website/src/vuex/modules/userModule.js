import userState from '../states/userState'
import userGetter from '../getters/userGetter'
import userMutation from '../mutations/userMutation'
import userAction from '../actions/userAction'

const userModule = {
    namespaced: true,

    state: userState,
    getters: userGetter,
    mutations: userMutation,
    actions: userAction
}

export default userModule;
