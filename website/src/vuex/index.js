import userModule from './modules/userModule'
import petModule from './modules/petModule'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        userModule,
        petModule
    }
})

export default store;
