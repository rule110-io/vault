<template>
  <div class="topbar">
    <div />
    <div class="topbar__controls">
      <div class="topbar__button topbar__button_min fe fe-minimize-2" @click="min" />
      <!-- <div class="topbar__button topbar__button_max fe fe-maximize-2" @click="max" /> -->
      <div class="topbar__button topbar__button_close fe fe-x" @click="close" />
    </div>
  </div>
</template>

<style lang="scss">
@import "./Topbar";
</style>

<script>
import { remote } from 'electron'

export default {
  components: { },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {
    min () {
      const BrowserWindow = remote.BrowserWindow
      const window = BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    max () {
      const BrowserWindow = remote.BrowserWindow
      const window = BrowserWindow.getFocusedWindow()
      window.maximize()
    },
    close () {
      const BrowserWindow = remote.BrowserWindow
      const window = BrowserWindow.getFocusedWindow()
      window.close()
    }
  }
}
</script>
