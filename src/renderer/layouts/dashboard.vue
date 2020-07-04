<template>
  <div class="layout-dashboard">
    <Topbar />
    <div class="layout-dashboard__wrapper">
      <Sidebar />
      <nuxt class="layout-dashboard__content" />
      <WalletPanel />
      <Snackbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import WalletPanel from '~/components/WalletPanel/WalletPanel.vue'
import Topbar from '~/components/Topbar/Topbar.vue'

export default {
  components: { Snackbar, Sidebar, WalletPanel, Topbar },
  data: () => {
    return {
      updateInterval: 30000
    }
  },
  computed: {
    ...mapGetters({
      online: 'online/getOnline',
      activeWallet: 'wallet/getActiveWallet',
      latestTx: 'transactions/getLatestTx',
      isNewVersion: 'version/getIsNewVersion'
    })
  },
  watch: {
    online () {
      if (this.online === false) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'offlineModeAlert',
          color: 'alert',
          timeout: false
        })

        this.updateWalletInfo()
        this.$store.dispatch('price/updateCurrentPrice')
        this.$store.dispatch('price/updateDailyHistoryPrice')
        this.$store.dispatch('settings/init')
        this.$store.dispatch('currency/init')
        this.$store.dispatch('transactions/updateLoading', true)
        this.$store.dispatch('transactions/updateTransactions', 1)
      } else {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'onlineModeAlert',
          color: 'success',
          timeout: true
        })
      }
    },
    latestTx (newVal, oldVal) {
      if (this.online === true && oldVal !== false && newVal !== undefined && oldVal !== undefined) {
        if (oldVal.id !== newVal.id) {
          const recipientWallet = this.latestTx.recipientWallet
          const type = recipientWallet === this.activeWallet.address ? 'Recieved' : 'Sent'
          this.$store.dispatch('snackbar/updateSnack', {
            snack: `success${type}NewTx`,
            color: 'success',
            timeout: true
          })
        }
      }
    }
  },
  created () {
    this.$store.dispatch('online/updateOnline')
    this.$store.dispatch('transactions/updateAvgFee')
    this.$store.dispatch('transactions/updateLoading', true)
    this.$store.dispatch('transactions/updateTransactions', 1)
    this.$store.dispatch('transactions/initPusher')
  },
  destroyed () {
  },
  mounted () {
    this.newVersionAlert()
  },
  methods: {
    newVersionAlert () {
      if (this.isNewVersion) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: `newVersionAlert`,
          color: 'alert',
          timeout: false
        })
      }
    },
    updateTransactions () {
      this.$store.dispatch('transactions/updateLoading', false)
      this.$store.dispatch('transactions/updateTransactions', 1)
    },
    updateWalletInfo () {
      this.$store.dispatch('wallet/updateWalletInfo', this.activeWallet.address)
    }
  }
}
</script>
