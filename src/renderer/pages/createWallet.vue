<template>
  <CreateWalletModal v-if="!wallet" @getWallet="getWallet" />
  <CreatedWalletModal v-else :wallet="wallet" :password="password" />
</template>

<script>
import CreateWalletModal from '~/components/Modals/CreateWalletModal/CreateWalletModal.vue'
import CreatedWalletModal from '~/components/Modals/CreatedWalletModal/CreatedWalletModal.vue'

export default {
  layout: 'login',
  components: { CreateWalletModal, CreatedWalletModal },
  data () {
    return {
      wallet: false
    }
  },
  methods: {
    getWallet (wallet) {
      this.wallet = wallet.wallet
      this.password = wallet.password
    }
  }
}
</script>
