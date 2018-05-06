import state from '../states/petState'
import actions from '../actions/petAction'

const petModule = {
    namespaced: true,

    state,
    actions
}

export default petModule;
