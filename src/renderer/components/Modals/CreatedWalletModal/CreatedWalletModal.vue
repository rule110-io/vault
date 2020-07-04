<template>
  <div class="fragment">
    <Card class="modal">
      <h2 class="modal__title">
        {{ $t('walletCreated') }}
      </h2>
      <p class="modal__descr">
        {{ $t('walletCreatedDescription') }}
      </p>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('publicAddress') }}
          <div class="modal__input">
            <input v-model="wallet.address" readonly="readonly" class="modal__controller" type="text">
            <span
              v-tooltip="{
                content: $t('copyPublicAddress'),
                placement: 'bottom-center',
                offset: 10,
              }"
              class="modal__input-action fe fe-copy"
              @click="copyText(wallet.address), toggleSnack($t('copyWalletAddressSuccess'))"
            />
          </div>
        </label>
        <label class="modal__label">
          {{ $t('privateKey') }}
          <div class="modal__input">
            <input v-model="pk" readonly="readonly" class="modal__controller" type="text">
            <span
              v-tooltip="{
                content: $t('copyPrivateKey'),
                placement: 'bottom-center',
                offset: 10,
              }"
              class="modal__input-action fe fe-copy"
              @click="copyText(pk), toggleSnack($t('copyWalletPkSuccess'))"
            />
          </div>
        </label>
        <label class="modal__label">
          {{ $t('walletPassword') }}
          <div class="modal__input">
            <input
              v-model="password"
              readonly="readonly"
              class="modal__controller"
              :type="!passwordVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', passwordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePasswordVisible"
            />
          </div>
        </label>
      </div>

      <div class="modal__footer">
        <Button theme="success" :click="downloadWallet">
          {{ $t('downloadWallet') }}
        </Button>
      </div>
    </Card>
    <Fragment class="fragment__right" />
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Fragment from '~/assets/icons/modal-fragment.svg'

export default {
  components: { Card, Button, Fragment },
  props: {
    wallet: {
      type: Object,
      default: () => {}
    },
    password: {
      type: String,
      default: ''
    }
  },
  data () {
    return { passwordVisible: false, pk: '' }
  },
  computed: {},
  created () {
    this.pk = this.wallet.getSeed()
  },
  methods: {
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    },
    downloadWallet () {
      const jsonWallet = this.wallet.toJSON()
      const blob = new Blob([jsonWallet], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'wallet.json')
    },
    toggleSnack (text) {
      this.$store.dispatch('snackbar/updateSnack', {
        snack: text,
        color: 'alert',
        timeout: true
      })
    },
    async copyText (text) {
      try {
        await this.$copyText(text)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
