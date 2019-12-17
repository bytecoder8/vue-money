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
        const currency = await new Promise((resolve, reject) => setTimeout(() => {
          if (Math.random() > 0.5) {
            reject(new Error('currency-error'))
          } else {
            resolve({
                rates: {
                  'RUB': 1,
                  'EUR': 77,
                  'USD': 64
                },
                date: new Date()
              })
          }
        }, 300))
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
