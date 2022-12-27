<template>
  <v-spacer></v-spacer>
  <div id="showAllBottomBtn"
       v-ripple
       class="bottomNavBtn v-btn v-btn--stacked v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
       value="showAll"
       v-on:click="showAllEvo"
       v-on:mouseenter="fakeHover('showAllBottomBtn', true, false)"
       v-on:mouseleave="fakeHover('showAllBottomBtn', false, false)"
       v-on:touchend="fakeHover('showAllBottomBtn', false, true)"
       v-on:touchstart="fakeHover('showAllBottomBtn', true, true)"
  >
    <v-icon :icon="globalConfig.showAllEvo ? 'mdi-eye' : 'mdi-eye-off'"></v-icon>

    <span v-if="globalConfig.isMobile || window.width < 960">Evos</span>
    <v-tooltip
        v-if="window.width >= 960"
        activator="parent"
        location="start">
      <span v-text="globalConfig.showAllEvo ? 'Always Show Evolutions' : 'Always Hide Evolutions'"/>
    </v-tooltip>
  </div>
  <v-spacer></v-spacer>
  <div id="clearPkmnBottomBtn"
       v-ripple
       :class="pokemon.Name != null ? '' : 'v-btn--disabled'"
       class="bottomNavBtn v-btn v-btn--stacked v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
       value="clear"
       v-on:click="clearPkmn"
       v-on:mouseenter="fakeHover('clearPkmnBottomBtn', true, false)"
       v-on:mouseleave="fakeHover('clearPkmnBottomBtn', false, false)"
       v-on:touchend="fakeHover('clearPkmnBottomBtn', false, true)"
       v-on:touchstart="fakeHover('clearPkmnBottomBtn', true, true)"
  >
    <v-icon>mdi-close-thick</v-icon>

    <span v-if="globalConfig.isMobile || window.width < 960">Clear</span>
    <v-tooltip
        v-if="window.width >= 960"
        activator="parent"
        location="start">
      <span v-text="'Clear Selection'"/>
    </v-tooltip>
  </div>
  <v-spacer></v-spacer>

  <div id="searchBottomBtn"
       v-ripple
       class="bottomNavBtn v-btn v-btn--stacked v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
       value="search"
       v-on:click="focusSearch"
       v-on:mouseenter="fakeHover('searchBottomBtn', true, false)"
       v-on:mouseleave="fakeHover('searchBottomBtn', false, false)"
       v-on:touchend="fakeHover('searchBottomBtn', false, true)"
       v-on:touchstart="fakeHover('searchBottomBtn', true, true)">
    <v-icon>mdi-magnify</v-icon>

    <span v-if="globalConfig.isMobile || window.width < 960">Search</span>
    <v-tooltip
        v-if="window.width >= 960"
        activator="parent"
        location="start">
      <span v-text="'Search Pokémon'"/>
    </v-tooltip>
  </div>
  <v-spacer></v-spacer>

  <div id="shareBottomBtn"
       v-ripple
       class="bottomNavBtn v-btn v-btn--stacked v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
       value="share"
       v-on:click="copyToClipboard"
       v-on:mouseenter="fakeHover('shareBottomBtn', true, false)"
       v-on:mouseleave="fakeHover('shareBottomBtn', false, false)"
       v-on:touchend="fakeHover('shareBottomBtn', false, true)"
       v-on:touchstart="fakeHover('shareBottomBtn', true, true)">
    <v-icon>mdi-link-variant</v-icon>

    <span v-if="globalConfig.isMobile || window.width < 960">Share</span>
    <v-tooltip
        v-if="window.width >= 960"
        activator="parent"
        location="start">
      <span v-text="'Copy to Clipboard'"/>
    </v-tooltip>
  </div>
  <v-spacer></v-spacer>

  <div v-if="globalConfig.isMobile || window.width < 960"
       id="toTopBottomBtn"
       v-ripple
       class="bottomNavBtn v-btn--disabled v-btn v-btn--stacked v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
       value="toTop"
       v-on:click="toTop"
       v-on:mouseenter="fakeHover('toTopBottomBtn', true, false)"
       v-on:mouseleave="fakeHover('toTopBottomBtn', false, false)"
       v-on:touchend="fakeHover('toTopBottomBtn', false, true)"
       v-on:touchstart="fakeHover('toTopBottomBtn', true, true)">
    <v-icon>mdi-arrow-up</v-icon>

    To Top
  </div>
  <v-spacer></v-spacer>

  <VSnackbar v-model="snackbar.show"
             :timeout="snackbar.timeout"
  ><p v-text="snackbar.text"/></VSnackbar>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "BottomNav",
  computed: {
    ...mapState(['pokemon', 'globalConfig']),
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
        scrollY: 0,
      },
      snackbar: {
        timeout: 1000,
        show: false,
        text: 'snackbar text',
      },
    }
  },
  methods: {
    ...mapActions(['setPokemonNull', 'setShowAllEvolutions']),
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    handleScroll() {
      if (document.getElementById('toTopBottomBtn')) {
        this.window.scrollY = window.scrollY;
        if (window.scrollY >= 100) {
          document.getElementById('toTopBottomBtn').classList.remove('v-btn--disabled')
        } else {
          document.getElementById('toTopBottomBtn').classList.add('v-btn--disabled')
        }
      }
    },
    focusSearch() {
      this.$nextTick(() => {
        document.getElementById('pkmnSearchBar').click()
      })
    },
    toTop() {
      this.$nextTick(() =>
          document.getElementById('goTop').scrollIntoView({behavior: 'smooth'})
      );
    },
    clearPkmn() {
      this.setPokemonNull()
      this.activateSnackbar('Cleared selected Pokémon')
    },
    fakeHover(id, hover, touch) {
      if (hover) {
        document.getElementById(id).classList.add('fakeHover')
      } else {
        if (touch) {
          setTimeout(() => {
            document.getElementById(id).classList.remove('fakeHover')
          }, 250)
        } else {
          document.getElementById(id).classList.remove('fakeHover')
        }
      }
    },
    showAllEvo() {
      if (this.globalConfig.showAllEvo) {
        this.setShowAllEvolutions(false)
        this.activateSnackbar('Evolutions will be Hidden')
      } else {
        this.setShowAllEvolutions(true)
        this.activateSnackbar('Evolutions will be Shown')
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(window.location.href).then(() => {
      this.activateSnackbar('Copied to Clipboard')
      })
    },
    activateSnackbar(text) {
      this.snackbar.text = text
      this.snackbar.show = true
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
.v-btn {
  text-transform: none;
}

.bottomNavBtn {
  background-color: rgba(255, 255, 255, 0.0);
  border-radius: 25px;
  cursor: pointer;
}

@media (min-width: 960px) {
  .bottomNavBtn {
    max-width: 48px !important;
    min-width: 48px !important;
    max-height: 48px !important;
    min-height: 48px !important;
    margin: 10px 0;
  }

  .v-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: opacity 0.2s ease-in-out;
  }
}

.fakeHover {
  border-radius: 25px !important;
  background-color: rgba(255, 255, 255, 0.15);
}


</style>