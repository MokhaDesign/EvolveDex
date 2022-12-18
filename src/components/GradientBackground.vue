<template>
<div id="gradientBackground"><PokeballBackground :has-pokemon="hasPokemon"></PokeballBackground></div>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import {pSBC} from "@/composables/utils";
import PokeballBackground from "@/components/PokeballBackground";

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
  },
  watch: {
    pokemon(newPokemon){
      this.updateBackground(newPokemon)
      this.hasPokemon = true
    },
  },
  methods: {
    atComputedCheck () {
      if (this.pokemon) {
        this.updateBackground(this.pokemon)
      }
    },

    // Vibrant
    updateBackground (newPokemon) {
      return new Promise((resolve) => {
          Vibrant.from(newPokemon).getPalette()
              .then((newPalette) => {
                let darkBG = pSBC(-0.5, newPalette.DarkMuted.hex)
                let lightBG = pSBC(-0.5, newPalette.LightMuted.hex)
                let titleTextColor = newPalette.DarkMuted.titleTextColor
                let bodyTextColor = newPalette.DarkMuted.bodyTextColor
                let g = document.getElementById('gradientBackground')
                let r = document.getElementById('pokemonCard')
                g.style.setProperty('--darkBgColor', darkBG)
                g.style.setProperty('--lightBgColor', lightBG)
                r.style.setProperty('--titleTextColor', titleTextColor)
                r.style.setProperty('--bodyTextColor', bodyTextColor)
              }).then(() => { resolve() })
      })
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

#gradientBackground {
  --darkBgColor: #333;
  --lightBgColor: #1d1b17;

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
</style>