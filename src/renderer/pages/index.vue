<template>
  <div>
    <Welcome />
  </div>
</template>

<script>
import Welcome from '~/components/Welcome/Welcome.vue'

export default {
  layout: 'login',
  components: { Welcome },
  data () {
    return {}
  },
  methods: {}
}
</script>
