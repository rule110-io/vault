<template>
  <content-loader
    :height="37"
    :width="778"
    :speed="1"
    primary-color="#f3f3f3"
    secondary-color="#ecebeb"
  >
    <circle cx="24" cy="22.85" r="10" />
    <rect
      x="43.98"
      y="20"
      rx="0"
      ry="0"
      width="323.42"
      height="5"
    />
    <rect
      x="388.7"
      y="20"
      rx="0"
      ry="0"
      width="217.86"
      height="5"
    />
    <rect
      x="625.7"
      y="20"
      rx="0"
      ry="0"
      width="137.25"
      height="5"
    />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader },
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
