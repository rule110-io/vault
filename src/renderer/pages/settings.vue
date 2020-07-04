<template>
  <div>
    <div class="text__title">
      {{ $t('general') }}
    </div>
    <h2 class="title_color_dark title__page">
      {{ $t('settings') }}
    </h2>
    <Settings />
  </div>
</template>

<script>
import Settings from '~/components/Settings/Settings.vue'

export default {
  layout: 'dashboard',
  components: { Settings },
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
