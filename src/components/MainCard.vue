<template>
  <h1 v-if="pkmnName">{{ (pkmnName) }}</h1>
  <div v-if="pkmnName">
  <span v-if="pkmnCanEvolve">
    <v-divider></v-divider>
    <p class="pa-12 pa-sm-6">{{ capitalised(pkmnName) }} has <strong>{{ pkmnEvLength }} {{ pluralise('evolution') }}</strong></p></span>
    <p v-else class="pa-12 pa-sm-6">{{ capitalised(pkmnName) }} is <strong>Fully Evolved</strong></p>
  </div>
</template>

<script>

export default {
  name: 'MainCard',
  props: {
    pkmnName: String,
    pkmnCanEvolve: Boolean,
    pkmnEvLength: Number
  },
  methods: {
    capitalised(name) {
      if(name) {
        return name[0].toUpperCase() + name.slice(1);
      }},
    pluralise(string) {
      return this.pkmnEvLength > 1 ? (string + 's') : (string)
    }
  }
}

</script>

<style scoped>
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
.v-divider {
  background: rgba(255, 255, 255, 0.01);
  border-radius: 25px;
  box-shadow: 1px 1px 1px rgba(0,0,0, 0.05);
  box-shadow: inset 1px 1px 1px rgba(0,0,0, 0.05);
  border-top: 1px solid rgba(255,255,255,0.25);
  height: 2px;
  max-height: 2px;
}


</style>