<template>
  <img alt="Vue logo" :src="''+pokemon.ImageUrl+''">
  <HasEvolution :pkmn-name="pokemon.Name" :pkmn-can-evolve="pokemon.CanEvolve"></HasEvolution>
  <v-btn elevation="5"></v-btn>
</template>

<script>
import HasEvolution from "@/components/HasEvolution";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    HasEvolution
  },
  methods: {
    ...mapActions(['setPokemonNameAndSpecies', 'setPokemonEvId', 'fetchPokemonEvolutionChain', 'fetchPokemonSpecies', 'setPokemonImage']),
    setPokemonAllData(pkmnName) {
      this.setPokemonNameAndSpecies(pkmnName)
          .then(() => this.setPokemonEvId())
          .then(() => this.fetchPokemonEvolutionChain())
          .then(() => this.setPokemonImage())
    },
    updatePokemonName(pkmnName) {
      this.setPokemonAllData(pkmnName)
    }
  },
  computed:{
    ...mapState(['pokemon']),
    ...mapGetters(['getPkmnName', 'getPkmnEvId', 'getCanEvolve', 'getPkmnSpecies', 'getPkmnImage'])
  },
  mounted() {
  this.updatePokemonName('Raticate')
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
