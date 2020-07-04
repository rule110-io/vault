<template>
  <div class="fragment">
    <Card class="modal">
      <h2 class="modal__title">
        {{ $t('createNewWallet') }}
      </h2>
      <p class="modal__descr">
        {{ $t('createNewWalletDescription') }}
      </p>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('choosePassword') }}
          <div class="modal__input">
            <input
              v-model="password"
              class="modal__controller"
              :type="!passwordVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', passwordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePasswordVisible"
            />
          </div>
        </label>
        <label class="modal__label">
          {{ $t('confirmYourPassword') }}
          <div class="modal__input">
            <input
              v-model="passwordConfirm"
              class="modal__controller"
              :type="!passwordConfirmVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', passwordConfirmVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePasswordConfirmVisible"
            />
          </div>
        </label>
        <Checkbox
          class="modal__checkbox"
          name="isReadme"
          :value="isReadme"
          @change="changeIsReadme"
        >
          {{ $t('iHaveBackedUpMyPassword') }}
        </Checkbox>
      </div>

      <div class="modal__footer">
        <Button
          :click="goToImport"
          theme="text"
        >
          {{ $t('alreadyHaveAWallet') }}
        </Button>
        <Button
          :click="createWallet"
          theme="success"
          :disabled="!isReadme || !isPassword"
        >
          {{ $t('createWallet') }}
        </Button>
      </div>
    </Card>
    <Fragment class="fragment__right" />
  </div>
</template>

<script>
import Fragment from '~/assets/icons/modal-fragment.svg'
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Checkbox from '~/components/Controls/Checkbox/Checkbox.vue'
require('~/assets/nkn.min.js')

export default {
  components: { Card, Checkbox, Button, Fragment },
  data () {
    return {
      isReadme: false,
      passwordVisible: false,
      passwordConfirmVisible: false,
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    isPassword () {
      const password = this.password
      const passwordConfirm = this.passwordConfirm

      if (
        password === passwordConfirm &&
        password.length > 1 &&
        passwordConfirm.length > 1
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goToImport () {
      this.$router.push('/importWallet')
    },
    changeIsReadme () {
      this.isReadme = !this.isReadme
    },
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    },
    togglePasswordConfirmVisible () {
      this.passwordConfirmVisible = !this.passwordConfirmVisible
    },
    createWallet () {
      const password = this.password
      try {
        // eslint-disable-next-line no-undef
        const wallet = new nkn.Wallet({ password })
        this.$emit('getWallet', { wallet, password })
      } catch (e) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: this.$options.filters.sdkErrors(e),
          color: 'error',
          timeout: true
        })
      }
    }
  }
}
</script>
