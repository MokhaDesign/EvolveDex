<template>
<div v-if="!pokemon.Name && !showCards"></div>
  <div v-else>
  <img alt="Pokemon Artwork" :src="''+pokemon.ImageUrl+''">
  <MainCard :pkmn-name="pokemon.Name" :pkmn-can-evolve="pokemon.CanEvolve"></MainCard>
  <div v-if="pokemon.CanEvolve">
  <EvolutionList :pkmn-ev-chain-list="pokemon.EvChain"></EvolutionList>
    <p>Test</p>
  </div>
</div>

    <v-autocomplete
      clearable
      filled
      rounded
      solo
      label="Search Pokémon"
      v-model="select"
      v-model:search="search"
      :items="items"
      :loading="isLoading"
      :menu-props="{ maxHeight: 500 }"
      allow-overflow="false"
      hide-no-data
      hide-details
      hide-selected
      v-on:keyup.enter="inputChanged"
      @touchend="inputChanged"
  ></v-autocomplete>

</template>

<script>
import MainCard from "@/components/MainCard";
import EvolutionList from "@/components/EvolutionList";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    MainCard,
    EvolutionList
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
      }
    },
  },
  methods: {
    ...mapActions(['setPokemonNameAndSpecies', 'setPokemonEvId', 'fetchPokemonEvolutionChain', 'fetchPokemonSpecies', 'setPokemonImage', 'fetchPokemonNames', 'checkPokemonEvolutionChain']),
    async setPokemonAllData(pkmnName) {
      await (this.showCards = false)
      await this.setPokemonNameAndSpecies(pkmnName)
      await this.setPokemonImage(pkmnName)
      await this.setPokemonEvId()
      await this.fetchPokemonEvolutionChain()
      await this.checkPokemonEvolutionChain()
      await console.log(this.pokemon.CanEvolve)
      return (this.showCards = true)
    },
    updatePokemonName(pkmnName) {
      this.emptyArray()
      this.setPokemonAllData(pkmnName)
    },
    querySelections (v) {
      this.isLoading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.pokemonNames.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.isLoading = false
      }, 500)
    },
    inputChanged () {
      this.updatePokemonName((this.select).toLowerCase())
      document.activeElement.blur();
      this.search = null
      this.select = null
    },
    emptyArray() {
      this.items.splice(0,this.items.length)
    }
  },
  computed:{
    ...mapState(['pokemon', 'pokemonNames']),
    ...mapGetters(['getPkmnName', 'getPkmnEvId', 'getCanEvolve', 'getPkmnSpecies', 'getPkmnImage', 'getPkmnEvChain'])
  },
  created() {
  this.fetchPokemonNames()
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
  margin-top: 60px;
}
</style>
