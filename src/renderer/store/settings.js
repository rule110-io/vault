import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  selectedCurrency: 'USD'
})

export const mutations = {
  setSelectedCurrency (state, currencyObj) {
    const path = app.getPath('userData') + '\\settings.json'
    state.selectedCurrency = currencyObj
    const settings = JSON.stringify(state)
    fs.writeFileSync(path, settings)
  },
  setSettings (state, payload) {
    state = Object.assign(state, payload)
  },
  createSettingsFile (state) {
    const path = app.getPath('userData') + '\\settings.json'
    const settings = JSON.stringify(state)
    fs.writeFileSync(path, settings)
  }
}

export const getters = {
  getSelectedCurrency (state) {
    return state.selectedCurrency
  }
}

export const actions = {
  async init ({ commit }) {
    const path = app.getPath('userData') + '\\settings.json'
    try {
      const settings = fs.readFileSync(path)
      const settingsObj = JSON.parse(settings)
      if (settingsObj) {
        commit('setSettings', settingsObj)
      }
    } catch (err) {
      commit('createSettingsFile')
    }
  },
  setCurrency ({ commit }, currency) {
    commit('setSelectedCurrency', currency)
  }

}
