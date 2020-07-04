<template>
  <div class="receive">
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          {{ $t('qrCode') }}
        </h3>
        <p class="settings__descr">
          {{ $t('qrCodeDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button theme="ghost-secondary" @click.native="toggleGenerateQrModal(true)">
          {{ $t('generateQr') }}
        </Button>
      </div>
    </div>
    <GenerateQrModal :open="isGenerateQeModal" :address="activeWallet.address" @toggleGenerateQrModal="toggleGenerateQrModal" />
  </div>
</template>

<style lang="scss">
@import "./Receive";
</style>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/Button/Button.vue'
import GenerateQrModal from '~/components/Modals/GenerateQrModal/GenerateQrModal.vue'

export default {
  components: { Button, GenerateQrModal },
  data: () => {
    return {
      isGenerateQeModal: false
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    })
  },
  mounted () {},
  methods: {
    toggleGenerateQrModal (bool) {
      this.isGenerateQeModal = bool
    }
  }
}
</script>
