import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyDT0xrKz_-tqdoFe7GpfMWsxsC3K0KC5F8',
  authDomain: 'todo-d3650.firebaseapp.com',
  projectId: 'todo-d3650',
  storageBucket: 'todo-d3650.appspot.com',
  messagingSenderId: '624772503057',
  appId: '1:624772503057:web:69e7d84ace36a90fa803b0'
})

export const db = firebase.firestore()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
