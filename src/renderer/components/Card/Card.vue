<template>
  <div
    class="card"
    :class="[padding ? `card_padding_${padding}` : null, hover ? 'card_hover' : null, shadow ? `card_shadow_${shadow}` : null]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './Card.scss';
</style>

<script>
export default {
  components: {},
  props: {
    padding: {
      type: String,
      default: 'normal'
    },
    shadow: {
      type: String,
      default: ''
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
