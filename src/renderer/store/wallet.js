import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  activeWallet: false,
  walletInfo: false,
  savedWallets: false
})

export const mutations = {
  setActiveWallet (state, activeWalletObj) {
    state.activeWallet = activeWalletObj
  },
  setWalletInfo (state, walletInfoObj) {
    state.walletInfo = walletInfoObj
  },
  setSavedWallets (state, savedWalletsObj) {
    state.savedWallets = savedWalletsObj
  }
}

export const getters = {
  getActiveWallet (state) {
    return state.activeWallet
  },
  getWalletInfo (state) {
    return state.walletInfo
  },
  getSavedWallets (state) {
    return state.savedWallets
  }
}

export const actions = {
  updateActiveWallet ({ commit }, wallet) {
    commit('setActiveWallet', wallet)
  },
  updateSavedWallets ({ commit }, payload) {
    const { wallet, walletName, securityPassword } = payload
    const path = app.getPath('userData') + '\\savedWallets.json'
    const walletObj = { address: wallet.account.address, pk: wallet.account.key.seed, walletName, securityPassword }

    try {
      const savedWallets = fs.readFileSync(path)
      const savedWalletsObj = JSON.parse(savedWallets)

      if (savedWalletsObj) {
        // check if already exists
        const isNameFree = savedWalletsObj.filter(wallet => wallet.walletName === walletName).length

        if (!isNameFree) {
          savedWalletsObj.push(walletObj)
          commit('setSavedWallets', savedWalletsObj)
          fs.writeFileSync(path, JSON.stringify(savedWalletsObj))
        }
      }
    } catch (err) {
      commit('setSavedWallets', [walletObj])
      fs.writeFileSync(path, JSON.stringify([walletObj]))
    }
  },
  deleteSavedWallet ({ commit }, name) {
    const path = app.getPath('userData') + '\\savedWallets.json'
    const savedWallets = fs.readFileSync(path)
    const savedWalletsObj = JSON.parse(savedWallets).filter(wallet => wallet.walletName !== name)
    commit('setSavedWallets', savedWalletsObj)
    fs.writeFileSync(path, JSON.stringify(savedWalletsObj))
  },
  async initSavedWallets ({ commit }) {
    const path = app.getPath('userData') + '\\savedWallets.json'
    try {
      const savedWallets = fs.readFileSync(path)
      const savedWalletsObj = JSON.parse(savedWallets)

      if (savedWalletsObj) {
        commit('setSavedWallets', savedWalletsObj)
      }
    } catch (err) {
      commit('setSavedWallets', false)
    }
  },
  async updateWalletInfo ({ commit }, address) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\walletInfo.json'

    if (online === true) {
      const data = await this.$axios.$get(
        `addresses/${address}`
      )

      data.balance = data.balance / 100000000
      const jsonWalletInfo = JSON.stringify(data)
      fs.writeFileSync(path, jsonWalletInfo)

      commit('setWalletInfo', data)
    } else {
      const walletInfoJson = fs.readFileSync(path)
      const walletInfoObj = JSON.parse(walletInfoJson)
      commit('setWalletInfo', walletInfoObj)
    }
  }
}
