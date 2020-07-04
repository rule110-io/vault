const compareVersions = require('compare-versions')

export const state = () => ({
  currentVersion: require('../../../package.json').version,
  remoteVersion: false,
  isNewVersion: false
})

export const mutations = {
  setRemoteVersion (state, version) {
    state.remoteVersion = version
  },
  setIsNewVersion (state, bool) {
    state.isNewVersion = bool
  }
}

export const getters = {
  getCurrentVersion (state) {
    return state.currentVersion
  },
  getRemoteVersion (state) {
    return state.remoteVersion
  },
  getIsNewVersion (state) {
    return state.isNewVersion
  }
}

export const actions = {
  async updateRemoteVersion ({ commit }) {
    const online = this.state.online.online

    if (online === true) {
      const data = await this.$axios.$get(
        'https://api.github.com/repos/rule110-io/vault/releases'
      )
      const currentVersion = this.state.version.currentVersion

      const remoteVersion = data ? data[0].tag_name : currentVersion
      const isNewVersion = compareVersions.compare(remoteVersion, currentVersion, '>')

      commit('setRemoteVersion', remoteVersion)
      commit('setIsNewVersion', isNewVersion)
    }
  }
}
