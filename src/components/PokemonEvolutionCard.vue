<template>
  <v-col class="pt-0" cols="8" lg="12" md="7" sm="12" style="display: inline-grid;" xl="8">
    <v-container id="pokemonEvolutionCard" class="pt-0">
      <v-row style="justify-content:center">
        <v-col v-for="item in evolutions[0]" :key="item.Id" :class="showCard(item) ? '' : 'd-none' "
               cols="4" lg="4" sm="6" style="display: inline-grid;">
          <v-container class="py-3 pkmnEvoCard pkmnEvoCardTilt">
            <v-row class="justify-center">
              <h1 v-if="item.Name" style="text-transform: capitalize;" v-on:click="inputChanged(item.Name)"
                  v-text="' ' + item.Name"/>
            </v-row>
            <v-row class="justify-center">
              <v-divider></v-divider>
              <!-- Pokemon Image  -->
              <v-col style="display: flex; justify-content: center; align-items: center;">
                <v-img :lazy-src="item.ImageUrl" :src="item.ImageUrl" alt="Pokemon Artwork"
                       crossorigin="anonymous" max-height="237.5" max-width="237.5" style="z-index: 1; justify-content: center;"/>
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
import {getIconFromType, appendEvolutionModifier} from "@/composables/pkmnMixin";
import {capitaliseFirst} from "@/composables/utils"
import {mapState, mapActions} from "vuex";

export default {
  name: "PokemonEvolutionCard",
  props: {
    evolutions: [Object],
    evolutionsToShown: [Object],
  },
  mixins: ['getIconFromType', 'appendEvolutionModifiers', 'capitaliseFirst'],
  computed: {
    ...mapState(['pokemonNames']),
  },
  methods: {
    ...mapActions(['setPokemon', 'setShowCards']),
    tilt() {
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
      });
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
    inputChanged(pkmnName) {
      return new Promise((resolve) => {
        this.$nextTick(() =>
            document.getElementById('goTop').scrollIntoView({behavior: 'smooth'})
        )
        this.setPokemon((this.pokemonNames.filter(e => e.Handle === pkmnName))[0]).then(() => {
          resolve()
        })
      })
    },
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
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

.cardType {
  pointer-events: none;
  font-family: Montserrat, Railway, Arial, sans-serif;
  position: absolute;
  bottom: 0;
  right: 0%;
  width: 100%;
  font-size: 2.0rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.01) !important;
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.08), 1px 1px 0.5px rgba(255, 255, 255, 0.05);
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

@media only screen and (max-width: 960px) {
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


</style>