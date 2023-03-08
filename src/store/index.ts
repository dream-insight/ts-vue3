import { createStore } from 'vuex'

import type { State, StateSession, StateCodeName } from '@/types/store'

export default createStore<State>({
  modules: {
  },
  state: {
    session: {
      id: '',
      idx: 0,
      lev: '',
      name: '',
    },
    code: [],
    codeName: {},
    stackPopup: [],
  },
  getters: {
    getLoginState({ session }): boolean {
      return session.id ? true : false
    },
    getUserName({ session }): string {
      return session.name ? session.name : ''
    },
    getPopupLastId(state): string {
      return state.stackPopup[state.stackPopup.length - 1]
    }
  },
  mutations: {
    mutSession({ session }, { id, idx, lev, name }: StateSession) {
      if (id) {
        session.id = id
      }

      if (idx) {
        session.idx = idx
      }

      if (lev) {
        session.lev = lev
      }

      if (name) {
        session.name = name
      }
    },
    mutClearSession({ session }) {
      session.id = ''
      session.idx = 0
      session.name = ''
      session.lev = ''
    },
    mutCode(state, payload: any) {
      state.code = payload
    },
    mutCodeName(state, payload: StateCodeName) {
      state.codeName = payload
    },
    mutStackPopup(state, popupId: string) {
      state.stackPopup.push(popupId)
    }
  },
  actions: {
    setSession({ commit }, payload: any) {
      commit('mutSession', payload)
    },
    setClearSession({ commit }) {
      commit('mutClearSession')
    },
    setCode({ commit }, payload: any) {
      commit('mutCode', payload.code)
      commit('mutCodeName', payload.codeName)
    },
    setStackPopup({ commit }, popupId: string) {
      commit('mutStackPopup', popupId)
    }
  },
})
