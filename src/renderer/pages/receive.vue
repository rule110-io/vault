<template>
  <div>
    <div class="text__title">
      {{ $t('receive') }}
    </div>
    <h2 class="title_color_dark title__page">
      {{ $t('getNknTokens') }}
    </h2>
    <Receive />
  </div>
</template>

<script>
import Receive from '~/components/Receive/Receive.vue'

export default {
  layout: 'dashboard',
  components: { Receive },
  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
