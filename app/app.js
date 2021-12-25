import Vue from 'nativescript-vue'
// import VueDevtools from 'nativescript-vue-devtools'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'

import "./app.scss"
import { CheckBox } from '@nstudio/nativescript-checkbox'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import store from './store/store'
import HomeController from "./views/HomeController"
import {FilterableListpicker} from '@nstudio/nativescript-filterable-listpicker';
import { Menu } from "nativescript-menu";
// Load TNSFonticon
TNSFontIcon.debug = true
TNSFontIcon.paths = {
  fa: './assets/css/fontawesome.min.css',
  far: './assets/css/regular.min.css',
  fas: './assets/css/solid.min.css',
  fab: './assets/css/brand.min.css'
}
TNSFontIcon.loadCss()
Vue.filter('fonticon', fonticon)




Vue.registerElement(
  'CheckBox',
  () => CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);
Vue.config.silent = false;
Vue.use(RadSideDrawer)

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement("FilterableListpicker", () => require("@nstudio/nativescript-filterable-listpicker").FilterableListpicker);
const Device = require("@nativescript/core/platform").Device
Vue.use(Menu)
Vue.config.silent = true
// Vue.use(VueDevtools)
Vue.mixin({
  data() {
    return {
      groupId: 35417,
      deviceType: Device.deviceType,
      isIOS: (Device.os === 'iOS') ? true : false,
      isAndroid: (Device.os === 'Android') ? true : false,
      osVersion: Device.osVersion,
      apiDomainOpencps: 'http://119.17.200.69:8074',
      apiDomainProxy: 'http://119.17.200.66:8378',
      apiDomainEs: 'http://119.17.200.66:8374'
      // selectedTab: 0
    }
  },
  methods: {
  }
})
new Vue({
  store,
  render: (h) => h('frame', [h(HomeController)]),
}).$start()
