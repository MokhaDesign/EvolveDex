<template>
  <v-app-bar v-scroll="onScroll" flat>
    <v-container id="searchBar" class="pa-6">
      <v-row class="d-flex flex-row align-center">
        <v-col class="flex-grow-0"><h1 id="#homeIcon"><span v-text="getIcon('pokeball')"/></h1></v-col>
        <v-col class=".searchBar pa-0 ma-0" cols="2" lg="2" md="10" sm="10">
          <!--  Search Bar  -->
          <v-autocomplete
              id="pkmnSearchBar"
              v-model="select"
              v-model:search="search"
              :items="items"
              :loading="showProgressBar"
              :menu-props="{ maxHeight: 500 }"
              allow-overflow="false"
              density="compact"
              hide-details
              hide-no-data
              hide-selected
              item-text="Name"
              item-value="Handle"
              label="Search Pokémon"
              return-object
              v-on:update:modelValue="inputChanged"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {getIconFromType} from "@/composables/pkmnMixin";

export default {
  name: "SearchBar",
  props: {
    pkmnNamesDb: Array
  },
  data() {
    return {
      search: null,
      select: null,
      items: [],
      showCards: false,
      showProgressBar: false
    }
  },
  watch: {
    search(val) {
      if (val && val.length >= 3) {
        val && val !== this.select && this.querySelections(val)
      } else {
        this.items.splice(0, this.items.length)
      }
    }
  }, computed: {
    ...mapState(['pokemon', 'pokemonNames', 'globals']),
  },
  methods: {
    ...mapActions(['fetchPokemonNames', 'setPokemon', 'setShowCards']),
    // Search & Retrieve
    querySelections(v) {
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.pokemonNames.filter(e => {
          return (e.Handle || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        }).map(e => {
          return e.Name
        })
      }, 200)
    },
    // Search & Retrieve
    inputChanged() {
      return new Promise((resolve) => {
        this.$nextTick(() =>
            document.getElementById('goTop').scrollIntoView({behavior: 'smooth'})
        )
        this.setPokemon((this.pokemonNames.filter((e) => {
          return e.Name === this.select
        }))[0]).then(() => {
          this.select = null
          resolve()
        })
        this.setShowCards(true)
      })
    },
    getIcon(icon) {
      return getIconFromType(icon);
    },
    onScroll() {
      if (window.scrollY >= 50) {
        let navbar = document.querySelector('.v-app-bar')
        let sysbar = document.querySelector('.v-system-bar')
        if (navbar.style.getPropertyValue('border-bottom') === '0px solid rgba(255, 255, 255, 0.15)') {
          sysbar.style.setProperty('box-shadow', '0px 0px 25px 0px rgba(0, 0, 0, 0.5)')
          navbar.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.15)')
          navbar.style.setProperty('box-shadow', '0px 10px 25px 0px rgba(0, 0, 0, 0.15)')
          navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.15)')
        }
      } else {
        let navbar = document.querySelector('.v-app-bar')
        let sysbar = document.querySelector('.v-system-bar')
        sysbar.style.setProperty('box-shadow', '0px 0px 25px 0px rgba(0, 0, 0, 0)')
        navbar.style.setProperty('border-bottom', '0px solid rgba(255, 255, 255, 0.15)')
        navbar.style.setProperty('box-shadow', '0px 10px 25px 0px rgba(0, 0, 0, 0)')
        navbar.style.setProperty('background', 'rgba(255, 255, 255, 0)')
      }
    }
  }
}
</script>

<style scoped>
.v-app-bar {
  background: transparent;
  color: #FFF;
  backdrop-filter: blur(7px);
  border-bottom: 0px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0);
  transition: all .33s ease-in-out;
}

.v-divider {
  margin: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

h1 {
  font-family: Montserrat, Railway, Arial, sans-serif;
  font-weight: 700;
  color: #FFF;
  line-height: 1rem;

}

h1 > span {
  font-family: Essentiarum;
  font-weight: normal;
  font-display: block;
}
</style>