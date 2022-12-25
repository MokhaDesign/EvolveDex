<template>
  <v-col class="inlineGrid pt-0 px-sm-0" cols="12" style="justify-content: center;" xl="8">
    <v-container id="pokemonEvolutionCard" class="pt-0 px-sm-0">
      <v-row style="justify-content:center">
        <v-col v-for="item in evolutions[0]" :key="item.Id" :class="showCard(item) ? '' : 'd-none'"
               :lg="evolutionsToShown.length <= 3 ? (12/evolutionsToShown.length) : 4"
               :md="evolutionsToShown.length <= 3 ? (12/evolutionsToShown.length) : 6"
               :sm="evolutionsToShown.length <= 3 ? (12/evolutionsToShown.length) : 4"
               class="inlineGrid"
               cols="12"
               style="transition: max-width 0s linear !important;">
          <v-container v-resize="rearrangeCards" class="py-3 pkmnEvoCard pkmnEvoCardTilt">

            <!-- Pokemon Name  -->
            <v-row class="justify-center">
              <h1 v-if="item.Name" style="text-transform: capitalize;" v-on:click="forwardPokemon(item.Name)"
                  v-text="' ' + item.Name.split('-').join(' ')"/>
            </v-row>

            <!-- Pokemon Image  -->
            <v-row class="justify-center">
              <v-divider :class="isAtBreakpoint ? 'd-none' : ''"></v-divider>
              <v-col style="display: flex; justify-content: center; align-items: center;">
                <v-img :lazy-src="item.ImageUrl" :src="item.ImageUrl" alt="Pokemon Artwork"
                       crossorigin="anonymous"
                       max-height="256" max-width="256"
                       min-height="128" min-width="128"
                       style="z-index: 1; justify-content: center;"/>
              </v-col>
            </v-row>

            <!-- Pokemon Info  -->
            <v-row class="justify-center" style="justify-content: center; margin-bottom: 1.2rem;">
              <v-divider></v-divider>
              <h1 v-for="type in item.Types" v-bind:key="type" class="pokemonTypes" style="text-align: start"
                  v-text="getIcon(type)"/>
              <v-divider></v-divider>
              <v-col class="pt-0 pb-4" cols="12" lg="12" md="12" style="z-index: 2">
                <p><span style="text-transform: capitalize" v-text="item.Trigger.replace(/-/g, ' ')"/> <span
                    class="modifiers" v-text="' · ' + this.makeModifierDescription(item)"/></p>
                <p class="cardType">Evolution</p>
              </v-col>
            </v-row>

          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import VanillaTilt from "vanilla-tilt";
import {appendEvolutionModifier, getIconFromType} from "@/composables/pkmnMixin";
import {capitaliseFirst} from "@/composables/utils"
import {mapActions, mapState} from "vuex";

export default {
  name: "PokemonEvolutionCard",
  props: {
    evolutions: [Object],
    evolutionsToShown: [Object],
  },
  mixins: ['getIconFromType', 'appendEvolutionModifiers', 'capitaliseFirst'],
  data() {
    return {
      isAtBreakpoint: false,
    }
  },
  computed: {
    ...mapState(['pokemonNames', 'globalConfig']),
  },
  methods: {
    ...mapActions(['setPokemon', 'setShowCards', 'setEvolutionsToShown']),
    tilt() {
      if (this.globalConfig.isMobile === false) {
        const cards = document.getElementsByClassName("pkmnEvoCardTilt");
        [...cards].forEach(card => {
          VanillaTilt.init(card, {
            max: 5,
            speed: 500,
            glare: true,
            "max-glare": 0.25,
            gyroscope: true,
            reverse: true,
            scale: 1.035,
            perspective: 1000
          })
        })
      }
    },
    showCard(e) {
      return this.evolutionsToShown.some((v) => {
        return v === this.evolutions[0].indexOf(e)
      })
    },
    getIcon(pkmnType) {
      return getIconFromType(pkmnType)
    },
    appendModifiers(pokemonEvolution) {
      return appendEvolutionModifier(pokemonEvolution)
    },
    makeModifierDescription(pkmnModifiers) {
      let string
      string = (this.appendModifiers(pkmnModifiers)).toString().replace(/,/g, ' ')
      return capitaliseFirst(string)
    },
    forwardPokemon(pkmnName) {
      return new Promise((resolve) => {
        this.$nextTick(() =>
            document.getElementById('goTop').scrollIntoView({behavior: 'smooth'})
        )
        this.setPokemon((this.pokemonNames.filter(e => e.Handle === pkmnName))[0]).then(() => {
          let setEvoToShow = [null]
          this.setEvolutionsToShown(setEvoToShow)
          resolve()
        })
      })
    },
    rearrangeCards() {
      this.updatedAtBreakpoint()
      if (this.globalConfig.isMobile === false) {
        let cards = document.querySelectorAll('.pkmnEvoCardTilt');
        if (window.innerWidth <= 580) {
          [...cards].forEach((card) => {
            card.classList.add('mobileCards')
          })
        } else {
          [...cards].forEach((card) => {
            card.classList.remove('mobileCards')
          })
        }
      } else {
        let cards = document.querySelectorAll('.pkmnEvoCardTilt');
        [...cards].forEach((card) => {
          card.classList.add('mobileCards')
        })
      }
    },
    updatedAtBreakpoint() {
      this.isAtBreakpoint = (window.innerWidth <= 580 || this.globalConfig.isMobile)
    }
  },
  mounted() {
    this.tilt()
  },
}
</script>

<style scoped>

.pkmnEvoCard {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

@media (min-width: 830px) {
  .pkmnEvoCard {
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0);
    transform: translateZ(0);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
  }
}

.cardType {
  pointer-events: none;
  font-family: Montserrat, Railway, Arial, sans-serif;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  font-size: 2.0rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.01) !important;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.08), 1px 1px 0.5px rgba(255, 255, 255, 0.05);
}

@media (max-width: 960px) {
  .cardType {
    font-size: 1.4rem;
  }
}

.inlineGrid {
  display: inline-grid;
}

.pkmnEvoCardWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
}

.v-divider {
  background: rgba(255, 255, 255, 0.01);
  border-radius: 25px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  height: 2px;
  max-height: 2px;
}

h1 {
  text-align: start;
  cursor: pointer;
}

@media only screen and (max-width: 960px) {
  h1 {
    padding: 0 1.2rem;
  }
}

p {
  padding-top: 1.2rem;
  font-family: Montserrat, Railway, Arial, sans-serif;
}

@media only screen and (max-width: 600px) {
  .cardType {
    display: none;
  }
}

.pokemonTypes {
  pointer-events: none;
  font-family: Essentiarum;
  font-weight: normal;
  font-display: block;
}

.mobileCards {
  display: flex;
  flex-flow: row wrap;
  flex-direction: column;
  align-items: center;
}


</style>