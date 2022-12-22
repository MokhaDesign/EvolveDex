<template>
  <!--  Pokemon Card  -->
  <v-container class="d-flex mb-6 fill-height" id="pokemonCard">
    <v-row class="justify-center">
      <v-col cols="8" lg="6" md="10" sm="10">
        <v-card class="py-3 mainCard" id="pokemonCardTilt">
          <v-row class="justify-center"  style="justify-content: center">
             <!-- Pokemon Image  -->
            <v-col cols="10" md="4" lg="3" style="display: flex; justify-content: center; align-items: center;">
              <v-img style="z-index: 1; justify-content: center;" max-height="475" max-width="475" alt="Pokemon Artwork" :src="pokemon.ImageUrl" :lazy-src="pokemon.ImageUrl" crossorigin="anonymous"/>
            </v-col>
          <!-- Pokemon Info  -->
            <v-col cols="12" md="8" lg="8" style="z-index: 2">
              <MainCard :pkmn-name="pokemon.Name" :pkmn-can-evolve="pokemon.CanEvolve" :pkmn-ev-length="pokemon.NextEvolutions[0].length" :pkmn-types="pokemon.Types"></MainCard>
              <div v-if="pokemon.CanEvolve">
                <EvolutionList :pkmn-ev-chain-list="pokemon.NextEvolutions"></EvolutionList>
              </div>
              <p class="cardType">Pokémon</p>
              <p class="cardTypeIcon" v-text="getIcon(pokemon.Types)" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import EvolutionList from "@/components/EvolutionList";
import VanillaTilt from 'vanilla-tilt';
import {getIconFromType} from "@/composables/pkmnMixin";

export default {
  name: 'PokemonCard',
  components: {
    MainCard,
    EvolutionList
  },
  props: {
    pokemon: [Object]
  },
  mixins: ['getIconFromType'],
  methods: {
    tilt() {
      VanillaTilt.init(document.getElementById("pokemonCardTilt"), {
        max: 5,
        speed: 500,
        glare: true,
        "max-glare": 0.25,
        gyroscope: true,
        scale: 1.035,
        perspective: 1000
      });
    },
    getIcon(pkmnType) {
      return getIconFromType(pkmnType)
    },
  },
  mounted() {
    this.tilt()
  },
  updated() {
    console.log(this.getIcon(this.pokemon.Types))
  }
}
</script>

<style scoped>
.mainCard {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0,0,0, 0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-left: 1px solid rgba(255,255,255,0.25);
}

.cardType {
  pointer-events: none;
  font-family: Montserrat, Railway, Arial, sans-serif;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: -1.2rem;
  font-size: 2.4rem;
  text-transform: uppercase;
  text-align: end;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.01) !important;
  text-shadow: -0.5px -0.5px 0.5px rgba(0,0,0, 0.08), 1px 1px 0.5px rgba(255,255,255,0.05);
}

#pokemonCardTilt {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

@media only screen and (max-width: 960px) {
  .cardType {
    display: none;
  }
}

</style>