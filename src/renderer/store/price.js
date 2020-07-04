import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  currentPrice: false,
  dailyHistoryPrice: {
    'USD': []
  }
})

export const mutations = {
  setCurrentPrice (state, priceObj) {
    state.currentPrice = priceObj
  },
  setDailyHistoryPrice (state, priceObj) {
    state.dailyHistoryPrice = priceObj
  }
}

export const getters = {
  getCurrentPrice (state) {
    return state.currentPrice
  },
  getDailyHistoryPrice (state) {
    return state.dailyHistoryPrice
  }
}

export const actions = {
  async updateCurrentPrice ({ commit }) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\currentPrice.json'

    if (online === true) {
      const data = await this.$axios.$get(
        'https://price.nknx.org/price?quote=NKN&currency=USD,ETH'
      )

      const jsonCurrentPrice = JSON.stringify(data[0])
      fs.writeFileSync(path, jsonCurrentPrice)

      commit('setCurrentPrice', data[0])
    } else {
      const currentPriceJson = fs.readFileSync(path)
      const currentPriceObj = JSON.parse(currentPriceJson)

      commit('setCurrentPrice', currentPriceObj)
    }
  },
  async updateDailyHistoryPrice ({ commit }) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\dailyHistoryPrice.json'

    if (online === true) {
      const data = await this.$axios.$get(
        'https://price.nknx.org/history?quote=NKN&currency=USD,ETH&aggregate=days'
      )

      const jsonDailyHistoryPrice = JSON.stringify(data[0])
      fs.writeFileSync(path, jsonDailyHistoryPrice)

      commit('setDailyHistoryPrice', data[0])
    } else {
      const dailyHistoryPriceJson = fs.readFileSync(path)
      const dailyHistoryPriceObj = JSON.parse(dailyHistoryPriceJson)

      commit('setDailyHistoryPrice', dailyHistoryPriceObj)
    }
  }
}
