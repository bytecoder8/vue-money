import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ commit, dispatch, rootState }, { name, amount, categoryId, date }) {
      try {
        amount = +amount
        const uid = await dispatch('getUid')
        const record = await firebase.database()
          .ref(`/users/${uid}/records/`)
          .push({ name, amount, date, categoryId })

        await dispatch('fetchInfo')

        const category = await dispatch('fetchCategoryById', categoryId)
        const bill = +rootState.info.info.bill + (category.type === 'income' ? amount : -amount)
        
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
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({
          ...records[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records/${id}`).once('value')).val()
        return {...record, id: record.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
