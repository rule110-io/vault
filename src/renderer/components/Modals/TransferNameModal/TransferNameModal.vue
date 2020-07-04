<template>
  <div class="modal__wrapper overflow_auto" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal overflow_auto" shadow="mini">
      <h2 class="modal__title">
        {{ $t('transferName') }}
      </h2>
      <p class="modal__descr">
        {{ $t('transferNameDecr') }}
      </p>
      <div class="modal__notice">
        {{ $t('transferNameNotice') }}
      </div>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('name') }}
          <div class="modal__input">
            <Select class="modal__select" type="modal" :items="names" :active-item="selectedName" @update="updateName" />
          </div>
        </label>
        <label class="modal__label">
          {{ $t('recipientPk') }}
          <div class="modal__input">
            <input
              v-model="pk"
              class="modal__controller"
              :type="!pkVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', pkVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePkVisible"
            />
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
          :click="transferName"
          theme="success"
          :disabled="!isPk"
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
      pk: '',
      pkVisible: false,
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
    isPk () {
      return this.pk.length === 64
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
      this.pk = ''
    },
    updateName (name) {
      this.selectedName = name
    },
    togglePkVisible () {
      this.pkVisible = !this.pkVisible
    },
    transferName () {
      const self = this

      const name = this.selectedName
      const wallet = this.activeWallet
      const pk = this.pk

      wallet.transferName(name, pk)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameTransferSuccess',
            color: 'success',
            timeout: true
          })
          self.$emit('toggleTransferWalletNameModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: error,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleTransferWalletNameModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleTransferWalletNameModal', false)
    }
  }
}
</script>
