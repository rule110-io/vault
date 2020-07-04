export const state = () => ({
  online: false
})

export const mutations = {
  setOnline (state, online) {
    state.online = online
  }
}

export const getters = {
  getOnline (state) {
    return state.online
  }
}

export const actions = {
  async updateOnline ({ commit }) {
    const isOnline = require('is-online')
    const online = await isOnline()
    commit('setOnline', online)
  }
}
