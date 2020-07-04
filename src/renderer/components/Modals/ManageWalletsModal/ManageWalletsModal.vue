<template>
  <div class="modal__wrapper overflow_auto" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal overflow_auto" shadow="mini">
      <h2 class="modal__title">
        {{ $t('deleteSavedWallet') }}
      </h2>
      <p class="modal__descr">
        {{ $t('deleteSavedWalletDescr') }}
      </p>
      <div class="modal__notice">
        {{ $t('deleteSavedWalletNotice') }}
      </div>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('selectSavedWallet') }}
          <div class="modal__input">
            <Select :items="savedWalletsNames" :active-item="selectedWallet" type="modal" @update="updateSelectedWallet" />
          </div>
        </label>
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="deleteWallet"
          theme="error"
        >
          {{ $t('delete') }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Select from '~/components/Controls/Select/Select.vue'

export default {
  components: { Card, Button, Select },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedWallet: ''
    }
  },
  computed: {
    ...mapGetters({
      savedWallets: 'wallet/getSavedWallets'
    }),
    savedWalletsNames () {
      const savedWallets = this.savedWallets
      return savedWallets.length ? savedWallets.map(wallet => wallet.walletName) : []
    },
    isOpen () {
      return this.open
    }
  },
  watch: {
    isOpen () {
      if (this.isOpen === true) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.selectedWallet = this.savedWallets[0].walletName
    },
    updateSelectedWallet (wallet) {
      this.selectedWallet = wallet
    },
    deleteWallet () {
      this.$store.dispatch('wallet/deleteSavedWallet', this.selectedWallet)
      this.$store.dispatch('snackbar/updateSnack', {
        snack: 'savedWalletDeleteSuccess',
        color: 'success',
        timeout: true
      })
      this.$emit('toggleManageWalletsModal', false)
    },
    closeModal () {
      this.$emit('toggleManageWalletsModal', false)
    }
  }
}
</script>
