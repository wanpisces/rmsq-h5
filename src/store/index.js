import Vue from 'vue'
import Vuex from 'vuex'
import service from './modules/service'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        service,
    },
    getters
})

export default store