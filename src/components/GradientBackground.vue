<template>
<div id="gradientBackground"><PokeballBackground :has-pokemon="hasPokemon"></PokeballBackground></div>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import {pSBC} from "@/composables/utils";
import PokeballBackground from "@/components/PokeballBackground";
import {mapActions, mapState} from "vuex";

export default {
  name: "GradientBackground",
  components: {
    PokeballBackground
  },
  props: {
    pokemon: String,
  },
  data() {
    return {
      hasPokemon: false
    }
  },  computed:{
    ...mapState(['globals']),
  },
  watch: {
    pokemon(newPokemon, oldPokemon){
      if(newPokemon !== oldPokemon) {
        this.updateBackground(newPokemon)
        this.hasPokemon = true
      }
    },
  },
  methods: {
    ...mapActions(['setCssColors', 'updateElementsColors']),
    atComputedCheck () {
      if (this.pokemon) {
        this.updateBackground(this.pokemon)
      }
    },
    // Vibrant
    updateBackground (newPokemon) {
      if (this.pokemon) {
      return new Promise((resolve) => {
          Vibrant.from(newPokemon).getPalette()
              .then((newPalette) => {
                let darkBG = pSBC(-0.5, newPalette.DarkMuted.hex)
                let lightBG = pSBC(-0.5, newPalette.LightMuted.hex)
                let appBG = pSBC(-0.2, newPalette.LightMuted.hex)
                let navBG = newPalette.LightMuted.hex
                let titleTextColor = newPalette.DarkMuted.titleTextColor
                let bodyTextColor = newPalette.DarkMuted.bodyTextColor
                this.setCssColors(
                    {
                      titleTextColor: titleTextColor,
                      bodyTextColor: bodyTextColor,
                      darkBgColor: darkBG,
                      lightBgColor: lightBG,
                      appBarColor: appBG,
                      navBarColor: navBG})
              })
              .then(() => { this.updateElementsColors((['gradientBackground', 'pokemonCard', 'pokemonEvolutionCard', 'appBar'])) })
              .then(() => { resolve() })
      })
    }
    }
  },
  mounted() {
    // Do not reset to default colours if a Pokemon is still being shown
    this.atComputedCheck()
  },
}
</script>

<style>
#pokemonCard {
  --titleTextColor: #FFF;
  --bodyTextColor: #FFF;
}

#pokemonEvolutionCard {
  --titleTextColor: #FFF;
  --bodyTextColor: #FFF;
}

#appBar {
  --appBarColor: #eeeeee;
  background-color: var(--appBarColor);
}

.v-system-bar {
  box-shadow: 0px 0px 0px 0px #000;
  transition: box-shadow .33s ease-in-out;
}

#gradientBackground {
  --darkBgColor: #2e251c;
  --lightBgColor: #9d9b99;

  width: 200%;
  height: 200%;
  position: fixed;
  z-index: -1;
  pointer-events: none;
  background-color: var(--darkBgColor);
  background-attachment: fixed !important;
  background: -moz-linear-gradient(0deg, var(--darkBgColor) 0%, var(--lightBgColor) 100%);
  background: -webkit-linear-gradient(0deg, var(--darkBgColor) 0%, var(--lightBgColor) 100%);
  background: linear-gradient(0deg, var(--darkBgColor) 0%, var(--lightBgColor) 100%);
  transition: background 15s ease;

}

#pokemonCard * > h1 {
  color: var(--titleTextColor);
}
#pokemonCard * > p {
  color: var(--bodyTextColor);
}

#pokemonEvolutionCard * > h1 {
  color: var(--titleTextColor);
}

#pokemonEvolutionCard * > p {
  color: var(--bodyTextColor);
}
</style>