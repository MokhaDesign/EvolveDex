<template>
  <div id="goTop"></div>
  <v-app>
    <v-system-bar id="appBar">
      <p v-text="pokemon.Name ? pokemon.Name : 'EvoDex'" />
      <v-spacer></v-spacer>
      <v-icon
        :icon="
          pokemon.CanEvolve
            ? 'mdi-checkbox-marked-circle-outline'
            : 'mdi-checkbox-blank-circle-outline'
        "
        class="ml-2"
      ></v-icon>
      <v-icon
        :icon="
          pokemon.EvolutionsToShow[0] === null ||
          pokemon.EvolutionsToShow.length === 0
            ? 'mdi-eye-off'
            : 'mdi-eye'
        "
        class="ml-2"
      ></v-icon>
      <v-icon class="ml-2" icon="mdi-graph-outline"></v-icon>
    </v-system-bar>

    <GradientBackground :pokemon="pokemon.ImageUrl"></GradientBackground>
    <SearchBar :pkmn-names-db="pokemonNames"></SearchBar>

    <v-container
      class="flex-column align-center"
      style="display: flex; min-height: 100vh"
    >
      <v-container
        v-if="globalConfig.showCards"
        class="flex-grow-1 d-flex flex-column justify-center"
      >
        <v-container class="cardWrapper fill-height">
          <v-row>
            <v-col>
              <PokemonCard :pokemon="pokemon"></PokemonCard>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="fill-height px-0">
          <PokemonEvolutionCard
            v-if="pokemon.NextEvolutions[0].length > 0"
            :evolutions="pokemon.NextEvolutions"
            :evolutions-to-shown="pokemon.EvolutionsToShow"
          ></PokemonEvolutionCard>
        </v-container>
      </v-container>
    </v-container>
    <NavControls></NavControls>
  </v-app>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import GradientBackground from "@/components/GradientBackground";
import PokemonEvolutionCard from "@/components/PokemonEvolutionCard";
import SearchBar from "@/components/SearchBar";

import { mapActions, mapState } from "vuex";
import NavControls from "@/components/NavControls";

export default {
  name: "App",
  components: {
    NavControls,
    SearchBar,
    PokemonEvolutionCard,
    PokemonCard,
    GradientBackground,
  },
  methods: {
    ...mapActions([
      "fetchPokemonNames",
      "setIsMobile",
      "setPokemon",
      "setShowCards",
    ]),
    pokemonFromUrl() {
      const nameFromUrl = window.location.pathname.split("/")[1].toLowerCase();
      const pkmnFromUrl = this.pokemonNames.filter(
        (e) => e.Handle === nameFromUrl
      )[0];
      if (pkmnFromUrl) {
        this.setPokemon(pkmnFromUrl).then(this.setShowCards(true));
      }
    },
  },
  computed: {
    ...mapState(["pokemon", "pokemonNames", "globalConfig"]),
  },
  data() {
    return {
      title: this.pokemon ? this.pokemon.Name + " | E•Dex" : "E•Dex",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "EvolveDex",
          content:
              "An easy peasy **spoiler-free** micro-app to check if a Pokémon has remaining evolutions.",
        },
      ],
    };
  },
  created() {
    this.fetchPokemonNames().then(this.pokemonFromUrl);
  },
  mounted() {
    this.setIsMobile();
  },
};
</script>

<style>
* {
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}

/* Hide scrollbar for Chrome, Safari and Opera
   Scrollbar Test */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#app {
  font-family: Raleway, Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.v-application {
  display: flex;
  background: none;
  color: #fff;
}

.v-field {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  border: 0.1px solid rgba(255, 255, 255, 0.25);
}

@media (min-width: 830px) {
  .v-field {
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0);
    transform: translateZ(0);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }
}

.v-menu .v-overlay__content {
  border-radius: 25px;
}

/* When Using * Transition settings*/
.v-overlay__content {
  -webkit-transition: all 0s ease-in-out;
  transition: all 0s ease-in-out;
}

.v-menu {
  top: 50%;
  left: 50%;
  -webkit-transition: all 0s ease-in-out;
  transition: all 0s ease-in-out;
}

.v-list {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 25px !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  transition: all 0s ease-in-out;

  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  transform: translateZ(0);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}

.v-autocomplete__mask {
  background-color: transparent;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
}

.v-list--border {
  display: none;
}

.v-progress-linear {
  height: 50px;
}

.v-field__outline {
  display: none !important;
}

.cardWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-tooltip > .v-overlay__content {
  font-family: Montserrat, Railway, Arial, sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.v-snackbar__wrapper {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(7px);
  min-height: 40px;
/* TODO: Solution for iPad */
  bottom: 3.6rem;
}

.v-snackbar__content {
  font-family: Montserrat, Railway, Arial, sans-serif;
  line-height: 0px;
  font-size: 0.875rem;
  text-align: center;
}
</style>
