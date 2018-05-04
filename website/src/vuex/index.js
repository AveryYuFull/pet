import userModule from './modules/userModule'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        userModule
    }
})

export default store;
