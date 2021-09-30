import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  currentPrice: false,
  dailyHistoryPrice: []
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
        'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x5cf04716ba20127f1e2297addcf4b5035000c9eb&vs_currencies=usd%2Ceth&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false'
      )

      const jsonCurrentPrice = JSON.stringify(
        data['0x5cf04716ba20127f1e2297addcf4b5035000c9eb']
      )
      fs.writeFileSync(path, jsonCurrentPrice)

      commit(
        'setCurrentPrice',
        data['0x5cf04716ba20127f1e2297addcf4b5035000c9eb']
      )
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
        'https://api.coingecko.com/api/v3/coins/nkn/market_chart?vs_currency=usd&days=30&interval=daily'
      )

      const jsonDailyHistoryPrice = JSON.stringify(data.prices)
      fs.writeFileSync(path, jsonDailyHistoryPrice)

      commit('setDailyHistoryPrice', data.prices)
    } else {
      const dailyHistoryPriceJson = fs.readFileSync(path)
      const dailyHistoryPriceObj = JSON.parse(dailyHistoryPriceJson)

      commit('setDailyHistoryPrice', dailyHistoryPriceObj)
    }
  }
}
