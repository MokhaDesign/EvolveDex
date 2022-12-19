<template>
<v-container>
  <v-row>
    <v-col>
  <v-btn-toggle  v-model="evoSelected" v-on:update:modelValue="evoBtnClicked" id="evoBtnWrapper" selected-class="evoBtnSelected" borderless multiple>
  <v-btn  v-for="item in pkmnEvChainList[0]" :key="item.Name" rounded="pill" style="text-transform: capitalize" variant="plain">
    <p>{{ (item.Trigger).replace('-', ' ') }}</p>
  </v-btn>
  </v-btn-toggle>
  <v-divider></v-divider>
  <v-btn-toggle selected-class="evoBtnSelected" borderless multiple class="pt-4">
      <v-btn id="showAllBtn" :class="pkmnEvChainList[0].length >= 2 ? '' : 'd-none'" block rounded="pill" style="text-transform: capitalize" variant="plain" @click="selectAll()"><p>Toggle all</p></v-btn>
      <v-btn block rounded="pill" style="text-transform: capitalize" variant="plain"><p>Show evolution tree</p></v-btn>
  </v-btn-toggle>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'EvolutionList',
  props: {
    pkmnEvChainList: [Object]
  },
  data() {
    return {
      evoSelected: [],
      showAll: false,
      fromBtn: true,
    }
  },
  watch: {
    evoSelected(newValue, oldValue) {
      const allBtnSwitch = newValue.length % this.pkmnEvChainList[0].length;

      const clickBtn = () => {
        this.fromBtn = false
        document.getElementById('showAllBtn').click()
      }

      switch (allBtnSwitch) {
        case 0:
          newValue.length === this.pkmnEvChainList[0].length ? clickBtn() : ''
          this.fromBtn = true
              break
        case newValue.length:
          oldValue.length === this.pkmnEvChainList[0].length ? clickBtn() : ''
          this.fromBtn = true
              break
        default:
          this.fromBtn = true
          break
      }
    }
  },
  methods: {
    ...mapActions(['setEvolutionsToShown']),
    evoBtnClicked() {
      this.setEvolutionsToShown(this.evoSelected)
    },
    selectAll() {
      if(!this.fromBtn) { return }
      else {
        if (!this.showAll) {
          [...this.pkmnEvChainList[0]].forEach((e, i) => (
              this.evoSelected.push(i),
                  this.setEvolutionsToShown(this.evoSelected),
                  this.showAll = true
          ))
        } else {
          this.evoSelected = [],
              this.setEvolutionsToShown(this.evoSelected),
              this.showAll = false
        }}
      }
  },
  updated() {
    this.evoSelected = []
    this.showAll = false
    this.setEvolutionsToShown(this.evoSelected)
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

.v-divider {
  background: rgba(255, 255, 255, 0.01);
  border-radius: 25px;
  box-shadow: 1px 1px 1px rgba(0,0,0, 0.05);
  box-shadow: inset 1px 1px 1px rgba(0,0,0, 0.05);
  border-top: 1px solid rgba(255,255,255,0.25);
  height: 2px;
  max-height: 2px;
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