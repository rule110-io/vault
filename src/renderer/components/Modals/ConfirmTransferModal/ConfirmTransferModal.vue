<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">
        {{ $t('transferConfirm') }}
      </h2>
      <p class="modal__descr">
        {{ $t('transferConfirmDescr') }}
      </p>
      <div class="modal__notice">
        {{ $t('to') }}: {{ address }}
      </div>
      <div class="modal__notice">
        {{ $t('amount') }}: {{ amount }} NKN
      </div>
      <div class="modal__notice">
        {{ $t('fee') }}: {{ fee }} NKN
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="transfer"
          theme="success"
        >
          {{ $t('transfer') }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Card, Button },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ''
    },
    fee: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    }),
    isOpen () {
      return this.open
    }
  },
  methods: {
    transfer () {
      const self = this

      const wallet = this.activeWallet
      const address = this.address
      const amount = this.amount
      const fee = this.fee

      wallet.transferTo(address, amount, { fee })
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletTransferSuccess',
            color: 'success',
            timeout: true
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: error,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleTransferConfirmModal', false)
    }
  }
}
</script>
