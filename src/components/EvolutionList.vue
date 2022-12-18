<template>
<v-container>
  <v-btn-toggle  v-model="evoSelected" v-on:update:modelValue="evoBtnClicked" id="evoBtnWrapper" selected-class="evoBtnSelected" borderless multiple>
  <v-btn  v-for="item in pkmnEvChainList[0]" :key="item.Name" rounded="pill" style="text-transform: capitalize" variant="plain">
    <p>{{ (item.Trigger).replace('-', ' ') }}</p>
  </v-btn>
  </v-btn-toggle>
</v-container>
</template>

<script>

export default {
  name: 'EvolutionList',
  props: {
    pkmnEvChainList: [Object]
  },
  data() {
    return {
      evoSelected: []
    }
  },
  methods: {
    evoBtnClicked() {
      console.log(this.evoSelected)
    }
  },
  updated() {
    this.evoSelected = []
  }
}
</script>

<style scoped>
.v-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.v-btn-toggle {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 1.2rem;
  background-color: transparent;
}

.v-btn {
  margin: 0.2rem;
  text-transform: none;
  letter-spacing: normal;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 15px;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-left: 1px solid rgba(255,255,255,0.25);
  border-right: 1px solid rgba(255,255,255,0);
  border-bottom: 1px solid rgba(255,255,255,0);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  box-shadow: 1px 1px 2.5px rgba(0,0,0, 0.25);
}

.v-btn-group {
  height: auto;
}

.evoBtnSelected {
  opacity: 1;
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: inset 2px 2px 1px rgba(0,0,0, 0.25);
}

p {
  font-family: Montserrat, Railway, Arial, sans-serif;
}
</style>