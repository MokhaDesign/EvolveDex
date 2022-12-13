<template>
  <h1>Does {{ capitalised(pkmnName) }} evolve any further?</h1>
  <p v-if="pkmnCanEvolve">Yes, {{ capitalised(pkmnName) }} has room to grow!</p>
  <p v-else>No, {{ capitalised(pkmnName) }} is good just the way it is!</p>
</template>

<script>

export default {
  name: 'MainCard',
  props: {
    pkmnName: String,
    pkmnCanEvolve: Boolean
  },
  methods: {
    capitalised(name) {
      if(name) {
        return name[0].toUpperCase() + name.slice(1);
      }}
  }
}

</script>

<style scoped>

</style>