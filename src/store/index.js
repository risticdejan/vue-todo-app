import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import plugins from './plugins.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
