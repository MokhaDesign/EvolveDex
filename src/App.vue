<template>
  <GradientBackground :pokemon="pokemon.ImageUrl"></GradientBackground>
<v-container class="flex-column align-center" style="display: flex; min-height: 100vh;">
  <v-container class="flex-shrink-1">
    <v-row>
      <v-col id="#searchBar" class=".searchBar" cols="12" sm="6" md="12">
  <!--  Search Bar  -->
    <v-autocomplete
        flat solo
      id="pkmnSearchBar"
      label="Search Pokémon"
      v-model="select"
      v-model:search="search"
      :loading="showProgressBar"
      v-on:update:modelValue="inputChanged"
      :items="items"
      item-text="Name"
      item-value="Handle"
      :menu-props="{ maxHeight: 500 }"
      allow-overflow="false"
      return-object
      hide-details
      hide-selected
      hide-no-data
    >
    </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="showCards" class="flex-grow-1 d-flex flex-column justify-center">

  <v-container class="cardWrapper fill-height">
    <v-row>
      <v-col>
    <PokemonCard :pokemon="pokemon"></PokemonCard>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="fill-height">
    <PokemonEvolutionCard v-if="pokemon.NextEvolutions[0].length > 0" :evolutions="pokemon.NextEvolutions" :evolutions-to-shown="pokemon.EvolutionsToShow"></PokemonEvolutionCard>
  </v-container>

  </v-container>

</v-container>

<BackToTop></BackToTop>

</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import GradientBackground from "@/components/GradientBackground";
import PokemonEvolutionCard from "@/components/PokemonEvolutionCard";
import {mapActions, mapGetters, mapState} from "vuex";
import BackToTop from "@/components/BackToTop";
import { useHead } from '@unhead/vue'


export default {
  name: 'App',
  components: {
    BackToTop,
    PokemonEvolutionCard,
    PokemonCard,
    GradientBackground
  },
  data () { return {
    search: null,
    select: null,
    isLoading: false,
    items: [],
    showCards: false,
    showProgressBar: false}
  },
  watch: {
    search (val) {
      if (val && val.length >= 3) {
        val && val !== this.select && this.querySelections(val)
      } else {
        this.items.splice(0,this.items.length)
      }
    },
  },
  methods: {
    ...mapActions(['fetchPokemonNames', 'setPokemon', 'setPokemonSpeciesEvId', 'cleanEvChain', 'checkPkmnIfEvolve']),
    // Search & Retrieve
    querySelections (v) {
      this.isLoading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.pokemonNames.filter(e => {return (e.Handle || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1}).map(e => {return e.Name})
        this.isLoading = false
      }, 200)
    },
    // Search & Retrieve
    inputChanged () {
      return new Promise((resolve) => {
        this.setPokemon((this.pokemonNames.filter((e) => { return e.Name === this.select }))[0]).then(() => {
          resolve()
        })
          this.showCards = true
      })
      },
  },
  computed:{
    ...mapState(['pokemon', 'pokemonNames']),
    ...mapGetters(['getPkmnName', 'getPkmnEvId', 'getCanEvolve', 'getPkmnSpecies', 'getPkmnImage', 'getPkmnEvChain'])
  },
  created() {
    this.fetchPokemonNames()
    useHead({
      title: 'E•Dex',
      meta: [
        {
          name: 'EvolveDex',
          content: 'An easy peasy **spoiler-free** micro-app to check if a Pokémon has remaining evolutions.',
        },
      ],
    })
  },
  mounted() {
  },
}

</script>

<style>

*
{
  -webkit-transition: all 1.34s ease-in-out;
  -moz-transition:  all 1.34s ease-in-out;
  -ms-transition: all 1.34s ease-in-out;
  -o-transition:  all 1.34s ease-in-out;
  transition: all 1.34s ease-in-out;
}

/* Hide scrollbar for Chrome, Safari and Opera
   Scrollbar Test */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#app {
  font-family: Raleway, Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.v-field {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0,0,0, 0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-left: 1px solid rgba(255,255,255,0.25);
}

.v-list {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 0 0 15px 15px !important;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0,0,0, 0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-left: 1px solid rgba(255,255,255,0.25);
}

.v-list--border {
  display: none;
}

.v-progress-linear {
  height: 50px;
}
.v-field__outline {
  display: none !important;
}

.searchBar {
  padding: 1.2rem;
}

.cardWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
