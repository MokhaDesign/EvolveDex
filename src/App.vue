<template>

  <img alt="Vue logo" :src="''+pokemon.ImageUrl+''">
  <HasEvolution :pkmn-name="pokemon.Name" :pkmn-can-evolve="pokemon.CanEvolve"></HasEvolution>

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
import HasEvolution from "@/components/HasEvolution";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    HasEvolution
  },
  data () { return {
    search: null,
    select: null,
    isLoading: false,
    items: []}
  },
  watch: {
    search (val) {
      if (val.length > 3) {
        val && val !== this.select && this.querySelections(val)
      }
    },
  },
  methods: {
    ...mapActions(['setPokemonNameAndSpecies', 'setPokemonEvId', 'fetchPokemonEvolutionChain', 'fetchPokemonSpecies', 'setPokemonImage', "fetchPokemonNames", "capitalise"]),
    setPokemonAllData(pkmnName) {
      this.setPokemonNameAndSpecies(pkmnName)
          .then(() => this.setPokemonEvId())
          .then(() => this.fetchPokemonEvolutionChain())
          .then(() => this.setPokemonImage())
    },
    updatePokemonName(pkmnName) {
      this.setPokemonAllData(pkmnName)
      this.emptyArray()
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
      this.search = null
      this.select = null
      document.activeElement.blur();
    },
    emptyArray() {
      this.items.splice(0,this.items.length)
    }
  },
  computed:{
    ...mapState(['pokemon', 'pokemonNames']),
    ...mapGetters(['getPkmnName', 'getPkmnEvId', 'getCanEvolve', 'getPkmnSpecies', 'getPkmnImage'])
  },
  created() {
    this.fetchPokemonNames()
  },
  mounted() {
  this.setPokemonAllData('bulbasaur')
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
