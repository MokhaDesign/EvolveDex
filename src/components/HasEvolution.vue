<template>
  <h1>{{ pkmnName }}</h1>
</template>

<script>
export default {
  name: 'HasEvolution',
  props: {
    pkmnName: String
  },
  methods: {
    getName() {
      let pkmn
      pkmn = this.pkmnName;
      return pkmn
    },
  },
  created() {
    let pkmnLocal;
    pkmnLocal = this.getName();

    console.log(pkmnLocal)
}
}






</script>

<style scoped>

</style>