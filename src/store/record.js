import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ commit, dispatch, getters }, { name, amount, categoryId, date }) {
      try {
        amount = +amount
        const uid = await dispatch('getUid')
        const record = await firebase.database()
          .ref(`/users/${uid}/categories/${categoryId}/records/`)
          .push({ name, amount, date })

        await dispatch('fetchInfo')
        const category = await dispatch('fetchCategory', categoryId)
        const bill = +getters.info.bill + (category.type === 'income' ? amount : -amount)
        
        await dispatch('updateInfo', { bill })
        return { id: record.key, name, amount, categoryId, date }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        let categories = await dispatch('fetchCategories')
        const records = []
        for (let cat of categories) {
          for (let key in cat.records) {
            records.push({ ...cat.records[key], categoryId: cat.id, id: key })
          }
        }
        return records
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  }
}
