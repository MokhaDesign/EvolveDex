<template>
  <v-btn
      id="backToTop"
      v-scroll="onScroll"
      class="go-top"
      color="primary" fab icon="mdi-arrow-up" @click="onClick">
    <v-icon>mdi-arrow-up</v-icon>
    <v-tooltip
        id="goTopTooltip"
        activator="parent"
        location="start">
      <span v-text="'Back to Top'"/>
    </v-tooltip>
  </v-btn>
</template>

<script>
export default {
  name: "BackToTop",
  methods: {
    onScroll() {
      if (window.scrollY >= 200) {
        document.getElementById('backToTop').style.setProperty('opacity', 1);
        document.getElementById('goTopTooltip').style.setProperty('opacity', 1);
      } else {
        document.getElementById('backToTop').style.setProperty('opacity', 0);
        document.getElementById('goTopTooltip').style.setProperty('opacity', 0);
      }
    },
    onClick() {
      this.$nextTick(() =>
          document.getElementById('goTop').scrollIntoView({behavior: 'smooth'})
      );
    },
  }
}
</script>

<style scoped>
/*#backToTop, */
.v-btn {
  background-color: rgba(255, 255, 255, 0.1) !important;
  opacity: 0;
  border-radius: 25px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

@media (min-width: 960px) {
  .v-btn {
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0);
    transform: translateZ(0);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }
}

.go-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1900;
}


</style>