<template>
<v-list v-for="item in pkmnEvChainList" :key="item.id">
  <p>{{ capitalised(item.species.name) }}</p>
</v-list>
</template>

<script>

export default {
  name: 'EvolutionList',
  props: {
    pkmnEvChainList: [Object]
  },
  methods: {
    capitalised(name) {
      if(name) {
        return name[0].toUpperCase() + name.slice(1);
      }}
  },
}
</script>

<style scoped>

</style>