<template>
  <div>
    <div class="text__title">
      {{ $t('overview') }}
    </div>
    <h2 class="title_color_dark title__page">
      {{ $t('myWallet') }}
    </h2>
    <Transactions />
  </div>
</template>

<script>
import Transactions from '~/components/Transactions/Transactions.vue'

export default {
  layout: 'dashboard',
  components: { Transactions },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
