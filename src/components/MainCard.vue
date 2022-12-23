<template class="pb-0">
  <v-row>
    <v-col>
      <h1 v-if="pkmnName">{{ (pkmnName) }}</h1>
    </v-col>
    <v-col>
      <h1 class="pokemonTypes px-2" style="text-align: end">
        <span v-for="type in pkmnTypes" v-bind:key="type" v-text="getIcon(type)"/>
      </h1>
    </v-col>
  </v-row>
  <div v-if="pkmnName">
    <v-divider></v-divider>
  <p v-if="pkmnCanEvolve" style="padding-top: 1.2rem">
    <span>{{ capitalised(pkmnName) }} has <strong>{{ pkmnEvLength }} {{
        pluralise('evolution')
      }}</strong></span></p>
    <p v-else style="padding-top: 1.2rem">{{ capitalised(pkmnName) }} is <strong>Fully Evolved</strong></p>
  </div>
</template>

<script>
import {getIconFromType} from "@/composables/pkmnMixin";
import {mapState} from "vuex";

export default {
  name: 'MainCard',
  props: {
    pkmnName: String,
    pkmnCanEvolve: Boolean,
    pkmnEvLength: Number,
    pkmnTypes: Array
  },
  mixins: ['getIconFromType'],
  computed: {
    ...mapState(['globalConfig'])
  },
  methods: {
    capitalised(name) {
      if (name) {
        return name[0].toUpperCase() + name.slice(1);
      }
    },
    pluralise(string) {
      return this.pkmnEvLength > 1 ? (string + 's') : (string)
    },
    getIcon(pkmnType) {
      return getIconFromType(pkmnType)
    }
  },
  setup() {
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
  font-family: Montserrat, Railway, Arial, sans-serif;
}

.v-divider {
  background: rgba(255, 255, 255, 0.01);
  border-radius: 25px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  height: 2px;
  max-height: 2px;
}

.pokemonTypes {
  pointer-events: none;
  font-family: Essentiarum;
  font-weight: normal;
  font-display: block;
}

</style>