<template>
  <div class="fragment">
    <Card class="modal">
      <h2 class="modal__title">
        {{ $t('openWallet') }}
      </h2>

      <div class="modal-switch">
        <div v-if="savedWallets.length"
             :class="['modal-switch__button', currentView === 'saved' ? 'modal-switch__button_active' : null]"
             @click="switchView('saved')"
        >
          {{ $t('savedWallets') }}
        </div>
        <div
          :class="['modal-switch__button', currentView === 'pk' ? 'modal-switch__button_active' : null]"
          @click="switchView('pk')"
        >
          {{ $t('privateKey') }}
        </div>
        <div
          :class="['modal-switch__button', currentView === 'json' ? 'modal-switch__button_active' : null]"
          @click="switchView('json')"
        >
          {{ $t('walletFile') }}
        </div>
      </div>

      <template v-if="currentView === 'saved'">
        <div class="modal__body">
          <label class="modal__label">
            {{ $t('selectSavedWallet') }}
            <span
              v-tooltip="{
                content: $t('selectSavedWalletInfo'),
                placement: 'top-center',
                offset: 5
              }"
              class="modal__info fe fe-info"
            />
            <div class="modal__input">
              <Select :items="savedWalletsNames" :active-item="selectedWallet" type="modal" @update="updateSelectedWallet" />
            </div>
          </label>
          <label class="modal__label">
            {{ $t('enterSecurityPassword') }}
            <span
              v-tooltip="{
                content: $t('securityPasswordInfo'),
                placement: 'top-center',
                offset: 5
              }"
              class="modal__info fe fe-info"
            />
            <div class="modal__input">
              <input
                v-model="securityPasswordConfirm"
                class="modal__controller"
                :type="!securityPasswordConfirmVisible ? 'password' : 'text'"
              >
              <span
                :class="['modal__input-action', securityPasswordConfirmVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
                @click="toggleSecurityPasswordConfirmVisible"
              />
            </div>
          </label>
        </div>
      </template>

      <template v-if="currentView === 'pk'">
        <div class="modal__body modal__body_flex">
          <label class="modal__label">
            {{ $t('enterYourPrivateKey') }}
            <span
              v-tooltip="{
                content: $t('secretSeedInfo'),
                placement: 'top-center',
                offset: 5
              }"
              class="modal__info fe fe-info"
            />
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
          <template v-if="isSave">
            <label class="modal__label  modal__label_half">
              {{ $t('createWalletName') }}
              <span
                v-tooltip="{
                  content: $t('walletNameInfo'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="modal__info fe fe-info"
              />
              <div class="modal__input">
                <input
                  v-model="walletName"
                  class="modal__controller"
                  type="text"
                >
              </div>
            </label>
            <label class="modal__label  modal__label_half">
              {{ $t('createSecurityPassword') }}
              <span
                v-tooltip="{
                  content: $t('createSecurityPasswordInfo'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="modal__info fe fe-info"
              />
              <div class="modal__input">
                <input
                  v-model="securityPassword"
                  class="modal__controller"
                  :type="!securityPasswordVisible ? 'password' : 'text'"
                >
                <span
                  :class="['modal__input-action', securityPasswordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
                  @click="toggleSecurityPasswordVisible"
                />
              </div>
            </label>
          </template>
        </div>
      </template>

      <template v-if="currentView === 'json'">
        <div class="modal__body modal__body_flex">
          <label class="modal__label">
            <div class="modal__input">
              <input
                class="modal__file"
                accept=".json"
                type="file"
                @change="uploadWallet"
              >
              <div class="modal__file-wrapper">
                <div class="modal__file-content">
                  <WalletIcon class="modal__file-icon" />
                  <div class="modal__file-title"><span v-if="!walletFileName"> {{ $t('dndYourWalletFile') }}</span> <span v-if="isWalletFile && walletFileName">{{ $t('walletFileUploadSuccess') }}</span> <span v-if="!isWalletFile && walletFileName">{{ $t('walletFileUploadFail') }}</span></div>
                  <p v-if="!walletFileName" class="modal__file-descr">{{ $t('or') }} <span class="modal__file-descr_accent">{{ $t('browseFiles') }}</span></p>
                  <p v-else class="modal__file-descr_accent">{{ walletFileName }}</p>
                </div>
              </div>
            </div>
          </label>
          <label class="modal__label">
            {{ $t('enterWalletFilePassword') }}
            <span
              v-tooltip="{
                content: $t('walletFilePasswordInfo'),
                placement: 'top-center',
                offset: 5
              }"
              class="modal__info fe fe-info"
            />
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
          <template v-if="isSave">
            <label class="modal__label  modal__label_half">
              {{ $t('createWalletName') }}
              <span
                v-tooltip="{
                  content: $t('walletNameInfo'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="modal__info fe fe-info"
              />
              <div class="modal__input">
                <input
                  v-model="walletName"
                  class="modal__controller"
                  type="text"
                >
              </div>
            </label>
            <label class="modal__label modal__label_half">
              {{ $t('createSecurityPassword') }}
              <span
                v-tooltip="{
                  content: $t('createSecurityPasswordInfo'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="modal__info fe fe-info"
              />
              <div class="modal__input">
                <input
                  v-model="securityPassword"
                  class="modal__controller"
                  :type="!securityPasswordVisible ? 'password' : 'text'"
                >
                <span
                  :class="['modal__input-action', securityPasswordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
                  @click="toggleSecurityPasswordVisible"
                />
              </div>
            </label>
          </template>
        </div>
      </template>

      <div class="modal__footer modal__footer_end">
        <div>
          <Checkbox
            v-if="currentView !== 'saved'"
            class="modal__checkbox_footer"
            name="isSave"
            :value="isSave"
            @change="changeIsSave"
          >
            {{ $t('saveMyWallet') }}
          </Checkbox>
        </div>

        <div class="modal__footer-controls">
          <Button
            :click="goToCreate"
            theme="text"
          >
            {{ $t('dontHaveAWallet') }}
          </Button>
          <Button
            v-if="currentView ==='pk'"
            :click="unlockWalletFromPk"
            theme="secondary"
            :disabled="!isPk || !isSecurityPassword || !isWalletName"
            icon="unlock"
          >
            {{ $t('unlock') }}
          </Button>
          <Button
            v-else-if="currentView ==='json'"
            :click="unlockWalletFromJson"
            theme="secondary"
            :disabled="!isWalletFile || !isPassword || !isSecurityPassword || !isWalletName"
            icon="unlock"
          >
            {{ $t('unlock') }}
          </Button>
          <Button
            v-else
            :click="unlockWalletFromPk"
            theme="secondary"
            :disabled="!isSecurityPasswordConfirm"
            icon="unlock"
          >
            {{ $t('unlock') }}
          </Button>
        </div>
      </div>
    </Card>
    <Fragment class="fragment__right" />
  </div>
</template>

<script>
import fs from 'fs'
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Select from '~/components/Controls/Select/Select.vue'
import Checkbox from '~/components/Controls/Checkbox/Checkbox.vue'
import WalletIcon from '~/assets/icons/wallet.svg'
import Fragment from '~/assets/icons/modal-fragment.svg'

require('~/assets/nkn.min.js')

export default {
  components: { Card, Button, WalletIcon, Fragment, Select, Checkbox },
  data () {
    return {
      currentView: 'pk',
      pkVisible: false,
      pk: '',
      walletFile: false,
      walletFileName: false,
      passwordVisible: false,
      password: '',
      securityPassword: '',
      securityPasswordVisible: false,
      selectedWallet: '',
      securityPasswordConfirm: '',
      securityPasswordConfirmVisible: false,
      walletName: '',
      isSave: true
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
    isPk () {
      const pk = this.pk.trim()
      return pk.length === 64
    },
    isWalletFile () {
      const wallet = this.walletFile
      return wallet.hasOwnProperty('Address')
    },
    isPassword () {
      const password = this.password
      return password.length > 1
    },
    isSecurityPassword () {
      const isSave = this.isSave
      const securityPassword = this.securityPassword

      return isSave ? securityPassword.length > 0 : true
    },
    isSecurityPasswordConfirm () {
      const securityPassword = this.securityPasswordConfirm
      const selectedWallet = this.selectedWallet
      const walletPassword = this.savedWallets.filter(wallet => wallet.walletName === selectedWallet)[0].securityPassword
      return walletPassword === securityPassword
    },
    isWalletName () {
      const isSave = this.isSave
      const walletName = this.walletName
      return isSave ? walletName.length > 0 : true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.savedWallets.length) {
        this.currentView = 'saved'
        this.selectedWallet = this.savedWallets[0].walletName
      }
    },
    changeIsSave () {
      this.isSave = !this.isSave
    },
    updateSelectedWallet (wallet) {
      this.selectedWallet = wallet
    },
    updateName (name) {
      this.selectedName = name
    },
    goToCreate () {
      this.$router.push('/createWallet')
    },
    clearData () {
      this.pk = ''
      this.walletFile = false
      this.walletFileName = false
      this.password = ''
      this.securityPassword = ''
      this.walletName = ''
      this.securityPasswordConfirm = ''
    },
    switchView (val) {
      this.currentView = val
      this.clearData()
    },
    togglePkVisible () {
      this.pkVisible = !this.pkVisible
    },
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    },
    toggleSecurityPasswordVisible () {
      this.securityPasswordVisible = !this.securityPasswordVisible
    },
    toggleSecurityPasswordConfirmVisible () {
      this.securityPasswordConfirmVisible = !this.securityPasswordConfirmVisible
    },
    uploadWallet (file) {
      if (file.target.files.length < 1) {
        return
      }
      const walletFilePath = file.target.files[0].path
      const walletFileName = file.target.files[0].name

      let walletJson = fs.readFileSync(walletFilePath)
      walletJson = JSON.parse(walletJson)

      this.walletFileName = walletFileName
      this.walletFile = walletJson
    },
    unlockWalletFromPk () {
      const currentView = this.currentView
      const password = 'nknx-password'
      const securityPassword = this.securityPassword

      const walletName = currentView !== 'saved' ? this.walletName : this.selectedWallet
      const seed = currentView !== 'saved' ? this.pk : this.savedWallets.filter(wallet => wallet.walletName === walletName)[0].pk

      let wallet = null

      try {
        // eslint-disable-next-line no-undef
        wallet = new nkn.Wallet({ seed, password })
        this.logIn(wallet, walletName, securityPassword)
      } catch (e) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: this.$options.filters.sdkErrors(e),
          color: 'error',
          timeout: true
        })
      }
    },
    unlockWalletFromJson () {
      const walletJson = JSON.stringify(this.walletFile)
      const password = this.password
      const walletName = this.walletName
      const securityPassword = this.securityPassword

      let wallet = null
      try {
        // eslint-disable-next-line no-undef
        wallet = nkn.Wallet.fromJSON(walletJson, { password })

        this.logIn(wallet, walletName, securityPassword)
      } catch (e) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: this.$options.filters.sdkErrors(e),
          color: 'error',
          timeout: true
        })
      }
    },
    logIn (wallet, walletName, securityPassword) {
      const currentView = this.currentView !== 'saved'
      const isSave = this.isSave

      const isWalletName = this.savedWallets ? this.savedWallets.filter(x => x.walletName === walletName).length : false
      const isWalletSeed = this.savedWallets ? this.savedWallets.filter(x => x.pk === wallet.account.key.seed).length : false

      if (isWalletName && currentView && isSave) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'savedWalletNameDuplicate',
          color: 'error',
          timeout: true
        })
      } else if (isWalletSeed && currentView && isSave) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'savedWalletSeedDuplicate',
          color: 'error',
          timeout: true
        })
      } else {
        if (isSave) {
          this.$store.dispatch('wallet/updateSavedWallets', { wallet, walletName, securityPassword })
        }

        this.$store.dispatch('wallet/updateActiveWallet', wallet)
        this.$store.dispatch('wallet/updateWalletInfo', wallet.address)
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
