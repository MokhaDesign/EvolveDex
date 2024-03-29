<template>
  <!--  Pokemon Card  -->
  <v-container id="pokemonCard" class="d-flex fill-height mt-12 px-0">
    <v-row class="justify-center">
      <v-col cols="12" lg="10" md="12" sm="12" xl="6">
        <v-card id="pokemonCardTilt" class="py-3 mainCard">
          <v-row class="justify-center" style="justify-content: center">
            <!-- Pokemon Image  -->
            <v-col class="d-flex pa-0" cols="10" lg="3" md="4" style="justify-content: center; align-items: center;">
              <v-img :lazy-src="pokemon.ImageUrl" :src="pokemon.ImageUrl" alt="Pokemon Artwork" crossorigin="anonymous"
                     max-height="380" max-width="380"
                     style="z-index: 1; justify-content: center;"/>
            </v-col>
            <!-- Pokemon Info  -->
            <v-col cols="12" lg="8" md="8" style="z-index: 2">
              <MainCard :pkmn-can-evolve="pokemon.CanEvolve" :pkmn-ev-length="pokemon.NextEvolutions[0].length"
                        :pkmn-name="pokemon.Name" :pkmn-types="pokemon.Types"></MainCard>
              <div v-if="pokemon.CanEvolve">
                <EvolutionList :pkmn-ev-chain-list="pokemon.NextEvolutions"></EvolutionList>
              </div>
              <p class="cardType">Pokémon</p>
              <p class="cardTypeIcon" v-text="getIcon(pokemon.Types)"/>
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
import {mapState} from "vuex";

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
  computed: {
    ...mapState(['globalConfig']),
  },
  methods: {
    tilt() {
      if (this.globalConfig.isMobile === false) {
        VanillaTilt.init(document.getElementById("pokemonCardTilt"), {
          max: 5,
          speed: 500,
          glare: true,
          "max-glare": 0.25,
          gyroscope: true,
          scale: 1.035,
          perspective: 1000
        })
      }
    },
    getIcon(pkmnType) {
      return getIconFromType(pkmnType)
    },
  },

  mounted() {
    this.tilt()
  },
}
</script>

<style scoped>
.mainCard {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

@media (min-width: 830px) {
  .mainCard {
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }
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
  text-shadow: -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.08), 1px 1px 0.5px rgba(255, 255, 255, 0.05);
}

#pokemonCardTilt {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

@media only screen and (max-width: 600px) {
  .cardType {
    display: none;
  }
}

</style>