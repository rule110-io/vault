<template>
  <div class="transactions">
    <div class="table__wrapper">
      <div class="table__top">
        <h3 class="title_color_dark">
          {{ $t('transactionsHistory') }}
        </h3>
        <a href="https://nscan.io/" target="_blank" class="text__link" @click="openExplorer">{{ $t('blockchainExplorer') }}</a>
      </div>
    </div>
    <table>
      <thead v-if="!loading">
        <th>
          {{ $t('dateTime') }}
        </th>
        <th>
          {{ $t('type') }}
        </th>
        <th>
          {{ $t('addressTable') }}
        </th>
        <th class="text_align_right">
          {{ $t('amount') }}
        </th>
      </thead>
      <template v-if="loading">
        <tr v-for="(headingLoader, index) in loaders" :key="index" class="table__row_loader">
          <td class="table__item_loader" colspan="4">
            <TableRowLoader />
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>{{ $moment(tx.created_at + "Z").format('YYYY-MM-DD HH:mm') }}</td>
          <td><span v-if="address === tx.payload.recipientWallet">{{ $t('recieved') }}</span> <span v-else>{{ $t('sent') }}</span></td>
          <td>
            <span v-if="tx.payload.payloadType === 'REGISTER_NAME_TYPE'">{{ $t('nameRegistration') }}</span>
            <span v-else-if="tx.payload.payloadType === 'DELETE_NAME_TYPE'">{{ $t('nameDeletion') }}</span>
            <span v-else-if="tx.payload.payloadType === 'TRANSFER_NAME_TYPE'">{{ $t('nameTransfer') }}</span>
            <span v-else-if="address === tx.payload.recipientWallet && tx.payload.senderWallet === 'NKNaaaaaaaaaaaaaaaaaaaaaaaaaaaeJ6gxa'">{{ $t('miningReward') }}</span>
            <span v-else-if="address === tx.payload.recipientWallet">{{ tx.payload.senderWallet }}</span> <span v-else>{{ tx.payload.recipientWallet }}</span>
          </td>
          <td class="text_align_right" :class="address === tx.payload.recipientWallet ? 'table__item_positive' : 'table__item_negative'">
            <span v-if="tx.payload.registrantWallet === null">{{ tx.payload.amount | nknValue | commaNumber }}</span>
            <span v-else-if="tx.payload.payloadType === 'REGISTER_NAME_TYPE'">{{ tx.payload.registration_fee | nknValue | commaNumber }}</span>
            <span v-else-if="tx.payload.payloadType === 'DELETE_NAME_TYPE'">0 </span>
            <span v-else-if="tx.payload.payloadType === 'TRANSFER_NAME_TYPE'">0</span>
            <a :href="`https://nscan.io/transactions/${tx.hash}`" target="_blank" class="text__link" @click="openExplorer" />
          </td>
        </tr>
      </template>
    </table>
    <div v-if="isTransactions" class="page-navigation">
      <div
        class="page-navigation__info"
      >
        {{ $t('pagShowing') }} {{ from }} {{ $t('pagTo') }} {{ to }} {{ $t('pagOf') }} {{ totalTransactionsCount }} {{ $t('pagTransactions') }}
      </div>
      <div class="page-navigation__pagination">
        <Pagination :page="prevPage" type="prev" @click.native="getAddressTransactions(prevPage)" />
        <Pagination :page="nextPage" type="next" @click.native="getAddressTransactions(nextPage)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Transactions";
</style>

<script>
import { shell } from 'electron'

import { mapGetters } from 'vuex'

import Pagination from '~/components/Pagination/Pagination.vue'
import TableRowLoader from '~/components/Loaders/TableRowLoader.vue'

export default {
  components: { Pagination, TableRowLoader },
  data () {
    return {
      nextPage: null,
      prevPage: null,
      isTransactions: false,
      currentPage: 1,
      from: 0,
      to: 0,
      loaders: 11,
      offlineTxPath: '',
      transactions: []
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      online: 'online/getOnline',
      newTransactions: 'transactions/getTransactions',
      loading: 'transactions/getLoading',
      latestTx: 'transactions/getLatestTx'

    }),
    totalTransactionsCount () {
      return this.walletInfo.count_transactions || 0
    },
    address () {
      if (this.walletInfo !== false) {
        return this.walletInfo.address
      } else {
        return this.activeWallet.address
      }
    }
  },
  watch: {
    loading () {
      if (this.loading === true) {
        this.nextPage = null
        this.prevPage = null
      } else {
        this.parseTransactionsData(this.newTransactions)
        this.updateWalletInfo()
      }
    },
    latestTx (newVal, oldVal) {
      if (this.online === true && oldVal !== false && newVal !== undefined && oldVal !== undefined) {
        if (oldVal.id !== newVal.id) {
          this.parseTransactionsData(this.newTransactions)
          this.updateWalletInfo()
        }
      }
    }
  },
  created () {
    this.$store.dispatch('online/updateOnline')
    this.$store.dispatch('price/updateCurrentPrice')
    this.updateWalletInfo()
  },
  mounted () {
    this.parseTransactionsData(this.newTransactions)
  },
  methods: {
    updateWalletInfo () {
      this.$store.dispatch('wallet/updateWalletInfo', this.activeWallet.address)
    },
    getAddressTransactions (page) {
      this.$store.dispatch('transactions/updateLoading', true)
      this.$store.dispatch('transactions/updateTransactions', page)
    },
    openExplorer () {
      event.preventDefault()
      const link = event.target.href
      shell.openExternal(link)
    },
    parseTransactionsData (response) {
      const {
        data,
        current_page: currentPage,
        prev_page_url: prevPage,
        next_page_url: nextPage,
        from,
        to
      } = response
      this.transactions = data
      this.from = from
      this.to = to
      this.currentPage = currentPage
      this.prevPage = prevPage != null && this.online ? this.currentPage - 1 : null
      this.nextPage = nextPage != null && this.online ? this.currentPage + 1 : null

      if (data !== undefined) {
        if (data.length > 0) {
          this.isTransactions = true
        } else {
          this.isTransactions = false
        }
      } else {
        this.isTransactions = false
      }
    }
  }
}
</script>
