import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import shopCar from './modules/shopCar'

export default new Vuex.Store({
  modules: {
    user,
    shopCar
  }
})
