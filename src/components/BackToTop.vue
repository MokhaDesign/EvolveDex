<template>
  <v-btn
      id="backToTop"
      v-scroll="onScroll"
      class="go-top" color="primary" icon="mdi-arrow-up" @click="onClick"></v-btn>
</template>

<script>
export default {
  name: "BackToTop",
  methods: {
    onScroll() {
      if (window.scrollY >= 200) {
        document.getElementById('backToTop').style.setProperty('opacity', 1);
      } else {
        document.getElementById('backToTop').style.setProperty('opacity', 0);
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
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.go-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1900;
}

.go-top a, .go-top a:visited {
  text-decoration: none;
  border: 0 none;
  display: block;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  color: rgba(33, 33, 33, 0.75);
  text-transform: uppercase;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.go-top a i, .go-top a:visited i {
  font-size: 18px;
  line-height: inherit;
}

.go-top a:hover, .go-top a:focus {
  border: 0.2rem solid #333;
  color: #333;
}
</style>