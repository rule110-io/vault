<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">
        {{ $t('receive') }} NKN
      </h2>
      <p class="modal__descr">
        {{ $t('qrUsageDescr') }}
      </p>
      <vueQr class="modal__qr" :value="address" :size="250" />
      <div class="modal__notice">
        {{ address }} <span
          v-tooltip="{
            content: $t('copyPublicAddress'),
            placement: 'bottom-center',
            offset: 10,
          }"
          class="wallet-panel__copy fe fe-copy"
          @click="$copyText('copyPublicAddress'), toggleSnack($t('copyWalletAddressSuccess'))"
        />
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('close') }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import vueQr from 'qrcode.vue'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Card, Button, vueQr },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    isOpen () {
      return this.open
    }
  },
  methods: {
    closeModal () {
      this.$emit('toggleGenerateQrModal', false)
    },
    toggleSnack (text) {
      this.$store.dispatch('snackbar/updateSnack', {
        snack: text,
        color: 'alert',
        timeout: true
      })
    }
  }
}
</script>
