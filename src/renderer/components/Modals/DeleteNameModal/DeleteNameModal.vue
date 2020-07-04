<template>
  <div class="modal__wrapper overflow_auto" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal overflow_auto" shadow="mini">
      <h2 class="modal__title">
        {{ $t('deleteName') }}
      </h2>
      <p class="modal__descr">
        {{ $t('deleteNameDescr') }}
      </p>
      <div class="modal__notice">
        {{ $t('deleteNameNotice') }}
      </div>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('name') }}
          <div class="modal__input">
            <Select class="modal__select" type="modal" :items="names" :active-item="selectedName" @update="updateName" />
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
          :click="deleteName"
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
      selectedName: '',
      names: []
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo'

    }),
    isOpen () {
      return this.open
    },
    walletName () {
      return this.walletInfo.name || []
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
      this.names = this.walletInfo.name
      this.selectedName = this.walletInfo.name[0]
    },
    updateName (name) {
      this.selectedName = name
    },
    deleteName () {
      const self = this

      const wallet = this.activeWallet
      const name = this.selectedName

      wallet.deleteName(name)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameDeleteSuccess',
            color: 'success',
            timeout: true
          })
          self.$emit('toggleDeleteWalletNameModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameDelError' + error,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleDeleteWalletNameModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleDeleteWalletNameModal', false)
    }
  }
}
</script>
