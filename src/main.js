import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date'
import currencyFilter from '@/filters/currency'
import messagePlugin from '@/plugins/message'
import tooltipDirective from '@/directives/tooltip'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from './firebaseConfig'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Paginate', Paginate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
