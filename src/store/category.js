import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({
          ...categories[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { name, limit, type }) {
      try {
        limit = +limit
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit, type})
        return { id: category.key, name, limit, type }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { name, limit, type, id }) {
      try {
        limit = +limit
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ name, limit, type })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategory({dispatch, commit}, categoryId) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories/${categoryId}`).once('value')).val()
        return category
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }    
  }
}
