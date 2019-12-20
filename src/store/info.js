import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)      
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo({ commit, dispatch, state }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = {...state.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)      
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
