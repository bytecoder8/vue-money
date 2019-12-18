import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency({commit}) {
      try {
        let response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        const data = await response.json()
        const currency = {
          rates: {
            'RUB': 1,
            'EUR': data['Valute']['EUR']['Value'],
            'USD': data['Valute']['USD']['Value']
          },
          date: new Date(data['Date'])
        }
        return currency
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  modules: {
    auth, info, category, record
  }
})
