import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  transactions: false,
  loading: true,
  latestTx: false,
  avgFee: false
})

export const mutations = {
  setTransactions (state, txObj) {
    state.transactions = txObj
  },
  setLoading (state, bool) {
    state.loading = bool
  },
  setLatestTx (state, tx) {
    state.latestTx = tx
  },
  setAvgFee (state, fee) {
    state.avgFee = fee
  }
}

export const getters = {
  getTransactions (state) {
    return state.transactions
  },
  getLoading (state) {
    return state.loading
  },
  getLatestTx (state) {
    return state.latestTx
  },
  getAvgFee (state) {
    return state.avgFee
  }
}

export const actions = {
  initPusher ({ dispatch }) {
    const address = this.state.wallet.activeWallet.address
    const channel = this._vm.$pusher.subscribe(`address.${address}`)
    const eventNames = ['coinbase-tx', 'delete-name-tx', 'transfer-asset-tx', 'transfer-name-tx', 'register-name-tx']

    eventNames.forEach(event => {
      channel.bind(event, transaction => {
        dispatch('updateTransactions', 1)
      })
    })
  },
  clearPusher () {
    const address = this.state.wallet.activeWallet.address
    this._vm.$pusher.unsubscribe(`address.${address}`)
  },
  async updateTransactions ({ commit }, page) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\transactions.json'
    const address = this.state.wallet.activeWallet.address

    if (online === true) {
      const data = await this.$axios.$get(
        `addresses/${address}/transactions?page=${page}&txType=COINBASE_TYPE,TRANSFER_ASSET_TYPE,REGISTER_NAME_TYPE,TRANSFER_NAME_TYPE,DELETE_NAME_TYPE`
      )

      if (page === 1) {
        commit('setLatestTx', data.data[0])
        const jsonTransactions = JSON.stringify(data)
        fs.writeFileSync(path, jsonTransactions)
      }

      commit('setTransactions', data)
      commit('setLoading', false)
    } else {
      const transactionsJson = fs.readFileSync(path)
      const transactionsObj = JSON.parse(transactionsJson)

      commit('setTransactions', transactionsObj)
      commit('setLoading', false)
    }
  },
  async updateAvgFee ({ commit }) {
    const data = await this.$axios.$get(
      'statistics/avgtxfee'
    )

    commit('setAvgFee', data)
  },
  updateLoading ({ commit }, bool) {
    commit('setLoading', bool)
  }
}
