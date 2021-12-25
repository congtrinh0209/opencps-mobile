import Vue from 'vue'
import Vuex from 'vuex'
import dossierService from './modules/dossier_service'
import userService from './modules/user_service'
import serviceInfoService from './modules/serviceInfo_service'
import extendService from './modules/extend_service'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    serviceInfoService,
    extendService,
    dossierService,
    userService,
    dossierService
  },
  strict: debug,
})