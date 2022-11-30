<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HasEvolution :pkmn-name="pkmnName"></HasEvolution>
  <p>{{ pkmnEvId }}</p>
</template>

<script>
import HasEvolution from "@/components/HasEvolution";

export default {
  name: 'App',
  components: {
    HasEvolution
  },
  created() {
    class Pkmn {
      pkmnName = 'bulbasaur';
      pkmnEvId = 1;
    }

    let PkmnLocal;
    PkmnLocal = new Pkmn('charmender',4);
  },
  data() {
    return {
      pkmnName: PkmnLocal.pkmnName,
      pkmnEvId: PkmnLocal.pkmnEvId,
    }
  },
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
