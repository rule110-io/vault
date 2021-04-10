<template>
  <div>
    <div class="text__title">
      {{ $t('transactions') }}
    </div>
    <h2 class="title_color_dark title__page">
      {{ $t('sendTokens') }}
    </h2>
    <Transfer />
  </div>
</template>

<script>
import Transfer from '~/components/Transfer/Transfer.vue'

export default {
  components: { Transfer },
  layout: 'dashboard',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
