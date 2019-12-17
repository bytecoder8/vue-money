import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ commit, dispatch, getters }, { name, amount, categoryId, date }) {
      try {
        const uid = await dispatch('getUid')
        const record = await firebase.database()
          .ref(`/users/${uid}/categories/${categoryId}/records/`)
          .push({name, amount})

        await dispatch('fetchInfo')
        const category = await dispatch('fetchCategory', categoryId)
        const bill = getters.info.bill + (category.type === 'income' ? amount : -amount)
        
        await dispatch('updateInfo', { bill })
        return { id: record.key, name, amount, categoryId, date }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
