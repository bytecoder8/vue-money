import firebase from 'firebase/app'
import router from '@/router'

export default {
  actions: {
    async login({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    getUid({ commit }) {
      const user = firebase.auth().currentUser
      if (!user) {
        router.push('/login').catch(e => false)
        throw new Error('auth/lost')
      }
      return user.uid
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}