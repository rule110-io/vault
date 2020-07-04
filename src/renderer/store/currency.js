import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  selectedCurrency: 'USD',
  availableCurrencies: ['USD'],
  exchangeRates: { 'rates': { 'USD': 1 }, 'base': 'USD', 'date': '2019-01-01' }
})

export const mutations = {
  setSelectedCurrency (state, currencyObj) {
    state.selectedCurrency = currencyObj
  },
  setAvailableCurrencies (state, availableCurrencyObj) {
    state.availableCurrencies = availableCurrencyObj
  },
  setExchangeRates (state, exchangeRateObj) {
    state.exchangeRates = exchangeRateObj
  }
}

export const getters = {
  getSelectedCurrency (state) {
    return state.selectedCurrency
  },
  getExchangeRates (state) {
    return state.exchangeRates
  },
  getAvailableCurrencies (state) {
    return state.availableCurrencies
  }
}

export const actions = {
  async init ({ commit }) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\exchangeRates.json'
    const currencies = []

    if (online === true) {
      const data = await this.$axios.$get(
        'https://api.exchangeratesapi.io/latest?base=USD'
      )

      for (const rate in data.rates) {
        currencies.push(rate)
      }

      currencies.sort((a, b) => {
        return a.localeCompare(b)
      })

      const exchangeRates = JSON.stringify(data)
      fs.writeFileSync(path, exchangeRates)

      commit('setAvailableCurrencies', currencies)
      commit('setExchangeRates', data.rates)
    } else {
      try {
        const exchangeRates = fs.readFileSync(path)
        const currentExchangeRatesObj = JSON.parse(exchangeRates)

        for (const rate in currentExchangeRatesObj.rates) {
          currencies.push(rate)
        }

        commit('setAvailableCurrencies', currencies)
        commit('setExchangeRates', currentExchangeRatesObj.rates)
      } catch (err) {

      }
    }
  },
  setCurrency ({ commit }, currency) {
    commit('setSelectedCurrency', currency)
  }

}
