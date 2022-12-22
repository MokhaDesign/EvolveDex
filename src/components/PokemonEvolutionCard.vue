<template>
  <v-col cols="6" md="8" sm="12" style="display: inline-grid;" class="pt-0">
  <v-container id="pokemonEvolutionCard" class="pt-0" >
  <v-row style="justify-content:center" >
      <v-col style="display: inline-grid;" v-for="item in evolutions[0]" :class="showCard(item) ? '' : 'd-none' " :key="item.Id" cols="4" lg="4" sm="6">
        <v-container class="py-3 pkmnEvoCard pkmnEvoCardTilt">
          <v-row class="justify-center">
              <h1 style="text-transform: capitalize;" v-if="item.Name" v-text="' ' + item.Name" />
          </v-row>
            <v-row class="justify-center">
            <v-divider></v-divider>
               <!-- Pokemon Image  -->
            <v-col style="display: flex; justify-content: center; align-items: center;">
              <v-img style="z-index: 1; justify-content: center;" max-height="237.5" max-width="237.5" alt="Pokemon Artwork" :src="item.ImageUrl" :lazy-src="item.ImageUrl"  crossorigin="anonymous"/>
            </v-col>
          </v-row>
            <!-- Pokemon Info  -->
          <v-row class="justify-center"  style="justify-content: center; margin-bottom: 1.2rem;">
            <v-divider></v-divider>
            <h1 class="pokemonTypes" v-for="type in item.Types" v-bind:key="type" v-text="getIcon(type)" style="text-align: start"/>
            <v-divider></v-divider>
            <v-col cols="12" md="12" lg="12" style="z-index: 2" class="pt-0">
              <p><span style="text-transform: capitalize" v-text="item.Trigger.replace(/-/g, ' ')" /> <span class="modifiers" v-text="' · ' + this.makeModifierDescription(item)" /></p>
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

export default {
  name: "PokemonEvolutionCard",
  props: {
    evolutions: [Object],
    evolutionsToShown: [Object],
  },
  mixins: ['getIconFromType', 'appendEvolutionModifiers', 'capitaliseFirst'],
  methods: {
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
      })});
    },
    showCard(e) {
      return this.evolutionsToShown.some((v) => {return v === this.evolutions[0].indexOf(e)})
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
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0,0,0, 0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-left: 1px solid rgba(255,255,255,0.25);
}

.pkmnEvoCard:after {
  content: 'evolution';
  font-family: Montserrat, Railway, Arial, sans-serif;
  position: absolute;
  bottom: 0;
  right: 0%;
  width: 100%;
  font-size: 2.0rem;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.01);
  text-shadow: -0.5px -0.5px 0.5px rgba(0,0,0, 0.05), 1px 1px 0.5px rgba(255,255,255,0.05);
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
  box-shadow: 1px 1px 1px rgba(0,0,0, 0.05);
  box-shadow: inset 1px 1px 1px rgba(0,0,0, 0.05);
  border-top: 1px solid rgba(255,255,255,0.25);
  height: 2px;
  max-height: 2px;
}

h1 {
  text-align: start;
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

@media only screen and (max-width: 1904px) {
  .pkmnEvoCard:after {
    font-size: 0.6rem;
  }
}

@media only screen and (max-width: 960px) {
  .pkmnEvoCard:after {
    display: none;
  }
}

.pokemonTypes {
  font-family: Essentiarum;
  font-weight: normal;
  font-display: block;
}


</style>