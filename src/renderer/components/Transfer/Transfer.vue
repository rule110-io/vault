<template>
  <div class="transfer">
    <ConfirmTransferModal
      :open="isTransferConfirmModal"
      :fee="fee !== '' ? parseFloat(fee) : 0"
      :address="address"
      :amount="parseFloat(amount)"
      @toggleTransferConfirmModal="toggleTransferConfirmModal"
    />

    <div class="transfer__controls">
      <label class="modal__label transfer__amount">
        {{ $t("amount") }}
        <span
          v-tooltip="{
            content: $t('sendAmountTooltip'),
            placement: 'top-center',
            offset: 5
          }"
          class="transfer__info fe fe-info"
        />
        <div class="modal__input modal__input_nkn">
          <input
            v-model="amount"
            class="modal__controller"
            :class="
              !isAmount && isAmountChange ? 'modal__controller_error' : null
            "
            type="number"
            @keydown="numFilter"
          >
        </div>
      </label>
      <TxIcon class="transfer__icon" />
      <label class="modal__label transfer__address">
        {{ $t("toWalletAddress") }}
        <span
          v-tooltip="{
            content: $t('toWalletAddressTooltip'),
            placement: 'top-center',
            offset: 5
          }"
          class="transfer__info fe fe-info"
        />
        <div class="modal__input">
          <input
            v-model.trim="address"
            class="modal__controller"
            :class="
              !isAddress && isAddressChange ? 'modal__controller_error' : null
            "
            type="text"
          >
        </div>
      </label>
    </div>

    <div class="transfer__controls">
      <label class="modal__label transfer__amount">
        {{ $t("networkFees") }}
        <span
          v-tooltip="{
            content: $t('networkFeesTooltip'),
            placement: 'top-center',
            offset: 5
          }"
          class="transfer__info fe fe-info"
        />
        <Select
          type="modal"
          :items="feesTypes"
          :active-item="activeFeesType"
          @update="updateFeesType"
        />
      </label>

      <label class="modal__label transfer__fee">
        <div class="modal__input modal__input_nkn">
          <input
            v-model="fee"
            class="modal__controller"
            :class="!isFee && isFeeChange ? 'modal__controller_error' : null"
            type="number"
            @keydown="numFilter"
          >
        </div>
      </label>
    </div>
    <div class="modal__footer">
      <Button
        theme="success"
        :disabled="!isOk"
        @click.native="isOk ? toggleTransferConfirmModal(true) : false"
      >
        {{ $t("send") }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Transfer";
</style>

<script>
import { mapGetters } from 'vuex'

import Select from '~/components/Controls/Select/Select.vue'
import Button from '~/components/Button/Button.vue'
import ConfirmTransferModal from '~/components/Modals/ConfirmTransferModal/ConfirmTransferModal.vue'
import TxIcon from '~/assets/icons/transactions.svg'

export default {
  components: { Button, ConfirmTransferModal, TxIcon, Select },
  data () {
    return {
      isTransferConfirmModal: false,
      feesTypes: ['high', 'standard', 'low', 'minimal', 'custom'],
      amount: '',
      address: '',
      fee: 0.5,
      highFee: 0,
      standardFee: 0,
      lowFee: 0,
      minimalFee: 0
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      avgFee: 'transactions/getAvgFee'
    }),
    walletName () {
      return this.walletInfo.name || ''
    },
    isAddress () {
      const address = this.address
      const regexp = /^((^NKN([A-Za-z0-9]){33}){1})$/
      return regexp.test(address)
    },
    isAddressChange () {
      return this.address.length > 0
    },
    isAmount () {
      return (
        this.amount > 0 &&
        this.amount < parseFloat(this.walletInfo.balance) &&
        this.checkNumLimit(this.amount)
      )
    },
    isAmountChange () {
      return this.amount !== ''
    },
    isFee () {
      return (
        this.fee >= 0 &&
        parseFloat(this.walletInfo.balance) >=
          Number(this.fee) + Number(this.amount) &&
        this.checkNumLimit(this.fee)
      )
    },
    isFeeChange () {
      return this.fee !== 0.5
    },
    isOk () {
      return (
        this.isAmount === true && this.isAddress === true && this.isFee === true
      )
    },
    activeFeesType () {
      const fee = this.fee
      return fee === this.highFee
        ? 'high'
        : fee === this.standardFee
          ? 'standard'
          : fee === this.lowFee
            ? 'low'
            : fee === this.minimalFee
              ? 'minimal'
              : 'custom'
    }
  },
  created () {
    this.calcFees()
  },
  methods: {
    numFilter (e) {
      // prevent: "e", "=", "-"
      if ([69, 187, 189].includes(e.keyCode)) {
        e.preventDefault()
      }
    },
    calcFees () {
      const avgFee = this.avgFee
      this.fee = this.toMinimalValue(avgFee)
      this.highFee = this.toMinimalValue(avgFee * 4)
      this.standardFee = this.toMinimalValue(avgFee)
      this.lowFee = this.toMinimalValue(avgFee / 2)
      this.minimalFee = this.toMinimalValue(0.00000001)
    },
    toMinimalValue (fee) {
      return parseFloat(fee).toFixed(8)
    },
    checkNumLimit (x) {
      const limit = x.toString().includes('.')
        ? x
          .toString()
          .split('.')
          .pop().length
        : 0
      if (limit > 8) {
        return false
      } else {
        return true
      }
    },
    updateFeesType (type) {
      switch (type) {
      case 'high':
        this.fee = this.highFee
        break
      case 'standard':
        this.fee = this.standardFee
        break
      case 'low':
        this.fee = this.lowFee
        break
      case 'minimal':
        this.fee = this.minimalFee
        break
      case 'custom':
        this.fee = ''
      }
    },
    toggleTransferConfirmModal (bool) {
      this.isTransferConfirmModal = bool
    }
  }
}
</script>
