<template>
  <div>
    <div class="welcome">
      <div class="welcome__content">
        <div class="welcome__left">
          <back class="welcome__back" />
          <h2 class="title_color_light">
            {{ $t('welcomeHeading') }}
          </h2>
          <p class="welcome__descr">
            {{ $t('welcomeDescription') }}
          </p>
          <div class="welcome__controls">
            <Button
              class="welcome__btn"
              type="router"
              url="createWallet"
              theme="success"
            >
              {{ $t('createWallet') }}
            </Button>
            <Button class="welcome__btn" type="router" url="importWallet" theme="ghost">
              {{ $t('openWallet') }}
            </Button>
          </div>
        </div>
        <share class="welcome__share" />
      </div>
      <div class="welcome__disclaimer">
        <Fragment class="welcome__disclaimer-fragment" />
        <p class="welcome__disclaimer-text">
          {{ $t('welcomeDisclaimer') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Welcome.scss";
</style>

<script>
import Back from '~/assets/icons/logo-back.svg'
import Share from '~/assets/icons/share.svg'
import Fragment from '~/assets/icons/welcome-fragment.svg'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Back, Share, Button, Fragment },
  data () {
    return {}
  },
  methods: {}
}
</script>
