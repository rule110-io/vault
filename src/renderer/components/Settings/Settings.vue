<template>
  <div class="settings">
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          {{ $t('preferredCurrency') }}
        </h3>
        <p class="settings__descr">
          {{ $t('currencyChoiceDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Select :items="availableCurrencies" :active-item="selectedCurrency" @update="updateCurrency" />
      </div>
    </div>
    <div v-if="savedWallets.length" class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          {{ $t('manageWallets') }}
        </h3>
        <p class="settings__descr">
          {{ $t('manageWalletsDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button class="settings__right-item" theme="ghost-secondary" @click.native="toggleManageWalletsModal(true)">
          {{ $t('manage') }}
        </Button>
      </div>
    </div>
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          NKN {{ $t('nameRegistration') }}
        </h3>
        <p class="settings__descr">
          {{ $t('walletNameRegistrationDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button class="settings__right-item" theme="ghost-secondary" @click.native="toggleRegisterWalletNameModal(true)">
          {{ $t('registerName') }}
        </Button>
      </div>
    </div>
    <div v-if="walletName.length > 0" class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          NKN {{ $t('nameTransfer') }}
        </h3>
        <p class="settings__descr">
          {{ $t('walletNameTransferDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button class="settings__right-item" theme="ghost-secondary" @click.native="toggleTransferWalletNameModal(true)">
          {{ $t('transfer') }}
        </Button>
      </div>
    </div>
    <div v-if="walletName.length > 0" class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">
          NKN {{ $t('nameDeletion') }}
        </h3>
        <p class="settings__descr">
          {{ $t('walletNameDeletionDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button class="settings__right-item" theme="ghost-secondary" @click.native="toggleDeleteWalletNameModal(true)">
          {{ $t('delete') }}
        </Button>
      </div>
    </div>
    <div class="settings__item settings__item_last">
      <div class="settings__left">
        <h3 class="title_color_dark">
          {{ $t('backup') }}
        </h3>
        <p class="settings__descr">
          {{ $t('backupDescr') }}
        </p>
      </div>
      <div class="settings__right">
        <Button class="settings__right-item" theme="ghost-secondary" :click="downloadWallet">
          {{ $t('download') }}
        </Button>
      </div>
    </div>

    <ManageWalletsModal :open="isManageWalletsModal" @toggleManageWalletsModal="toggleManageWalletsModal" />
    <RegisterNameModal :open="isRegisterWalletNameModal" @toggleRegisterWalletNameModal="toggleRegisterWalletNameModal" />
    <DeleteNameModal :open="isDeleteWalletNameModal" @toggleDeleteWalletNameModal="toggleDeleteWalletNameModal" />
    <TransferNameModal :open="isTransferNameModal" @toggleTransferWalletNameModal="toggleTransferWalletNameModal" />
  </div>
</template>

<style lang="scss">
@import "./Settings";
</style>

<script>
import FileSaver from 'file-saver'

import { mapGetters } from 'vuex'

import Button from '~/components/Button/Button.vue'
import RegisterNameModal from '~/components/Modals/RegisterNameModal/RegisterNameModal.vue'
import DeleteNameModal from '~/components/Modals/DeleteNameModal/DeleteNameModal.vue'
import TransferNameModal from '~/components/Modals/TransferNameModal/TransferNameModal.vue'
import ManageWalletsModal from '~/components/Modals/ManageWalletsModal/ManageWalletsModal.vue'
import Select from '~/components/Controls/Select/Select.vue'

export default {
  components: { Button, RegisterNameModal, Select, DeleteNameModal, TransferNameModal, ManageWalletsModal },
  data () {
    return {
      isRegisterWalletNameModal: false,
      isDeleteWalletNameModal: false,
      isTransferNameModal: false,
      isManageWalletsModal: false
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      availableCurrencies: 'currency/getAvailableCurrencies',
      selectedCurrency: 'settings/getSelectedCurrency',
      savedWallets: 'wallet/getSavedWallets'
    }),
    walletName () {
      return this.walletInfo.name || []
    }
  },
  methods: {
    updateCurrency (currency) {
      this.$store.dispatch('settings/setCurrency', currency)
    },
    toggleRegisterWalletNameModal (bool) {
      this.isRegisterWalletNameModal = bool
    },
    toggleDeleteWalletNameModal (bool) {
      this.isDeleteWalletNameModal = bool
    },
    toggleTransferWalletNameModal (bool) {
      this.isTransferNameModal = bool
    },
    toggleManageWalletsModal (bool) {
      this.isManageWalletsModal = bool
    },
    downloadWallet () {
      const jsonWallet = this.activeWallet.toJSON()
      const blob = new Blob([jsonWallet], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'wallet.json')
    }
  }
}
</script>
