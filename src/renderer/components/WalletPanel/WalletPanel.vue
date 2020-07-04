<template>
  <aside class="wallet-panel">
    <div class="wallet-panel__top">
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">
            {{ $t('names') }}/{{ $t('address') }}
          </div>
          <h3 v-if="name.length > 0" class="wallet-panel__name">
            {{ name.join(', ') }}
          </h3>
          <div class="text__heading wallet-panel__address">
            {{ address }} <span
              v-tooltip="{
                content: $t('copyPublicAddress'),
                placement: 'bottom-center',
                offset: 10,
              }"
              class="wallet-panel__copy fe fe-copy"
              @click="copyText(address), toggleSnack($t('copyWalletAddressSuccess'))"
            />
          </div>
        </div>
      </div>
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">
            {{ $t('currentBalance') }}
          </div>
          <h3>
            {{ balance | commaNumber }}
            <span class="wallet-panel__symbol">NKN</span>
          </h3>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">
            {{ $t('marketValue') }} ({{ selectedCurrency }})
          </div>
          <h3>{{ currencyBalance }}</h3>
        </div>
      </div>
    </div>
    <div class="wallet-panel__bot">
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">
            NKN {{ $t('price') }} ({{ selectedCurrency }})
          </div>
          <h4>{{ currencyPrice }}</h4>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">
            {{ $t('last7Days') }}
          </div>
          <h4
            class="wallet-panel__change"
            :class="weeklyChange > 0 ? 'wallet-panel__change_positive' : 'wallet-panel__change_negative'"
          >
            <PriceArrow class="wallet-panel__change-icon" />
            {{ weeklyChange }}%
          </h4>
        </div>
      </div>
      <PriceChart />
    </div>
  </aside>
</template>

<style lang="scss">
@import "./WalletPanel";
</style>

<script>
import { mapGetters } from 'vuex'
import PriceArrow from '~/assets/icons/priceArrow.svg'
import PriceChart from '~/components/Charts/PriceChart.vue'

export default {
  components: { PriceArrow, PriceChart },
  data: () => {
    return {
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      price: 'price/getCurrentPrice',
      exchangeRates: 'currency/getExchangeRates',
      selectedCurrency: 'settings/getSelectedCurrency'
    }),
    address () {
      if (this.walletInfo !== false) {
        return this.walletInfo.address
      } else {
        return this.activeWallet.address
      }
    },
    balance () {
      if (this.walletInfo !== false) {
        return parseFloat(this.walletInfo.balance).toFixed(3) || 0
      } else {
        return 0
      }
    },
    name () {
      return this.walletInfo.name || []
    },
    currencyPrice () {
      return (this.price.prices[0].price * this.exchangeRates[this.selectedCurrency]).toFixed(6) || 0
    },
    currencyBalance () {
      return (this.balance * this.currencyPrice).toFixed(2)
    },
    weeklyChange () {
      return (this.price.prices[0].percent_change_7d).toFixed(2) || 0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
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
