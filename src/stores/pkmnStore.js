import Vue from 'vue'
import Vuex from 'vuex'

const Pokedex = require('pokeapi-js-wrapper')
const options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5000
}
const P = new Pokedex.Pokedex(options)

import {nthIndex} from "@/composables/utils";

Vue.use(Vuex)


export default new Vuex.Store({

}