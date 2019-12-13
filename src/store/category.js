import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { name, limit, type }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit, type})
        return { id: category.key, name, limit, type }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
