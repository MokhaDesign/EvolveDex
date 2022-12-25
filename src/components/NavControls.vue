<template>
  <!--Desktop & Width more than 600-->
  <v-container v-if="globalConfig.isMobile === false && window.width >= 960"
               id="sideNav">
    <BottomNav></BottomNav>
  </v-container>
  <BackToTop v-if="globalConfig.isMobile === false && window.width >= 960"></BackToTop>


  <!--Mobile or Width less than 600-->
  <v-bottom-navigation v-if="globalConfig.isMobile || window.width < 960"
                       id="bottomNav">
    <BottomNav></BottomNav>
  </v-bottom-navigation>
</template>

<script>
import {mapState} from "vuex";
import BackToTop from "@/components/BackToTop";
import BottomNav from "@/components/BottomNav";

export default {
  name: "NavControls",
  components: {
    BottomNav,
    BackToTop
  },
  computed: {
    ...mapState(['globalConfig']),
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
        scrollY: 0,
      },
    }
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    handleScroll() {
      this.window.scrollY = window.scrollY;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll();
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
#bottomNav {
  transition: all .33s ease-in-out !important;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 10px 10px 25px 0px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(7px);
}

#sideNav {
  transition: all .33s ease-in-out !important;
  /*border: 1px solid rgba(255, 255, 255, 0.15);*/
  /*box-shadow: 10px 10px 25px 0px rgba(0, 0, 0, 0.15);*/
  /*background: rgba(255, 255, 255, 0.15) !important;*/
  transform: translate3d(0, -50%, 0);
  /*backdrop-filter: blur(7px);*/

  position: fixed;
  right: 20px;
  top: 50%;
  border-radius: 25px 0 0 25px;
  padding: 0;
  max-width: fit-content;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: stretch;
}

</style>