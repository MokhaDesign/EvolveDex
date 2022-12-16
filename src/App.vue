<template>
<!--  <div class="gradient-wrap" id="gradient-background">-->
<!--<div v-if="!showCards"></div>-->
<!--  <div v-else>-->
<!--  <img alt="Pokemon Artwork" :src="pokemon.ImageUrl" crossorigin="anonymous"/>-->
<!--  <MainCard :pkmn-name="pokemon.Name" :pkmn-can-evolve="pokemon.CanEvolve"></MainCard>-->
<!--  <div v-if="pokemon.CanEvolve">-->
<!--  <EvolutionList :pkmn-ev-chain-list="pokemon.EvChain"></EvolutionList>-->
<!--  </div></div>-->


    <v-autocomplete
      clearable
      filled
      rounded
      solo
      label="Search Pokémon"
      v-model="select"
      v-model:search="search"
      :items="items"
      item-text="Name"
      item-value="Handle"
      :loading="isLoading"
      :menu-props="{ maxHeight: 500 }"
      allow-overflow="false"
      return-object
      hide-no-data
      hide-details
      hide-selected
  ></v-autocomplete>
<!--  </div>-->
</template>

<script>
// import MainCard from "@/components/MainCard";
// import EvolutionList from "@/components/EvolutionList";
import {mapActions, mapGetters, mapState} from "vuex";
// import Grade from "grade-js";

export default {
  name: 'App',
  components: {
    // MainCard,
    // EvolutionList
  },
  data () { return {
    search: null,
    select: null,
    isLoading: false,
    items: [],
    showCards: false}
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
    ...mapActions([
      // 'setPokemonNameAndSpecies', 'setPokemonEvId', 'fetchPokemonEvolutionChain', 'setPokemonImage',
      'fetchPokemonNames', 'setPokemon', 'setPokemonSpeciesEvId', 'cleanEvChain', 'checkPkmnIfEvolve'
      // 'checkPokemonEvolutionChain'
    ]),
    // startUpGrade() {
    //       setTimeout(() => {Grade(document.querySelectorAll(".gradient-wrap"));}, 5000)
    // },
    // async setPokemonAllData(pkmnName) {
    //     this.showCards = false
    //     this.setPokemonNameAndSpecies(pkmnName)
    //         .then(() => this.setPokemonImage(pkmnName))
    //         .then(() => this.setPokemonEvId())
    //         .then(() => this.fetchPokemonEvolutionChain())
    //         .then(() => this.checkPokemonEvolutionChain())
    //         .then(() => console.log(this.getCanEvolve))
    //         .then(() => this.showCards = true)
    //         .then(() => this.startUpGrade())
    // },
    // updatePokemonName(pkmnName) {
    //   this.emptyArray()
    //   this.setPokemonAllData(pkmnName)
    // },
    querySelections (v) {
      this.isLoading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.pokemonNames.filter(e => {return (e.Handle || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1}).map(e => {return e.Name})
        this.isLoading = false
      }, 200)
    },
    // async inputChanged () {
    //   try {
    //     await this.updatePokemonName((this.select).toLowerCase())
    //   } finally {
    //     document.activeElement.blur()
    //     this.search = null
    //     this.select = null
    //   }
    // },
    // emptyArray() {
    //   this.items.splice(0,this.items.length)
    // }
  },
  computed:{
    ...mapState(['pokemon', 'pokemonNames']),
    ...mapGetters(['getPkmnName', 'getPkmnEvId', 'getCanEvolve', 'getPkmnSpecies', 'getPkmnImage', 'getPkmnEvChain'])
  },
  created() {
    // this.emptyArray()
    this.fetchPokemonNames()
        .then(() => console.log(this.pokemonNames[4]))
        .then(() => this.setPokemon(this.pokemonNames[4]))
        // 132 Eevee; 4 Charmeleon; 144 Articuno; 43 Oddish; 438 Mime Jr; 280 Kirlia; 757 Salandit
  },
  mounted() {

  }
}

</script>

<style>
#app {
  font-family: Montserrat, Raleway, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#gradient-background {
  height: calc(100vh - 6.4rem);
  overflow: auto;
  width: auto;
  margin: 3.2rem;
}

</style>
