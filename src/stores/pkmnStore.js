import { createStore } from 'vuex'
import {capitalized, nthIndex} from '@/composables/utils'

const Pokedex = require('pokeapi-js-wrapper')
const options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5000
}
const P = new Pokedex.Pokedex(options)

// Create a new store instance.
export default createStore({
    state() { // variables
        return {
            pokemon:
                {
                    Name: null,
                    EvId: null,
                    CanEvolve: null,
                    Species: null,
                    Colour: null,
                    ImageUrl: null,
                },
            pokemonNames: [null]
        }
    },
    getters: { // getters
        getPkmnName: state => state.pokemon.Name,
        getPkmnEvId: state => state.pokemon.EvId,
        getCanEvolve: state => state.pokemon.CanEvolve,
        getPkmnSpecies: state => state.pokemon.Species,
        getPkmnColour: state => state.pokemon.Colour,
        getPkmnImage: state => state.pokemon.ImageUrl,
    },
    mutations: { // called via commit('MUTATION_NAME', payload); Should not contain any logic of whether to mutate the data or not
        SET_POKEMON_NAME(state, pokemonName) {
            state.pokemon.Name = pokemonName
        },
        SET_POKEMON_EVID(state, pokemonEvId) {
            state.pokemon.EvId = pokemonEvId
        },
        SET_POKEMON_CANEVOLVE(state, pokemonCanEvolve) {
            state.pokemon.CanEvolve = pokemonCanEvolve
        },
        SET_POKEMON_SPECIES(state, pokemonSpecies) {
            state.pokemon.Species = pokemonSpecies
        },
        SET_POKEMON_COLOUR(state, pokemonColour) {
            state.pokemon.Colour = pokemonColour
        },
        SET_POKEMON_IMAGE(state, pokemonImageUrl) {
            state.pokemon.ImageUrl = pokemonImageUrl
        }
    },
    actions: { // called via dispatch('actionName', payload)
        setPokemonNameAndSpecies({ commit }, pokemonName) {
            return (
                commit('SET_POKEMON_NAME', pokemonName),
                (P.getPokemonSpeciesByName(pokemonName).then(function(response) { return (
                    commit('SET_POKEMON_SPECIES', response),
                    commit('SET_POKEMON_COLOUR', response.color.name)) }))
            )
        },
        setPokemonImage({ commit, state }) {
            return (
                (P.getPokemonByName(state.pokemon.Name).then(function(response) {
                    return commit('SET_POKEMON_IMAGE', response.sprites.other["official-artwork"].front_default)
                }))
            )
        },
        fetchPokemonSpecies({commit, state }) {
            (P.getPokemonSpeciesByName(state.pokemon.Name).then(function(response) { return commit('SET_POKEMON_SPECIES', response) }))
        },
        setPokemonEvId ({ commit, state }) {
                    let chainLocal, evIdLocal;
                    chainLocal = state.pokemon.Species.evolution_chain.url
                    evIdLocal = chainLocal.substring(nthIndex(chainLocal, '/', 6) + 1).slice(0, -1)
                    return commit('SET_POKEMON_EVID', evIdLocal)
        },
        fetchPokemonEvolutionChain ({ commit, state }) {
            if(state.pokemon.EvId) {
                (P.getEvolutionChainById(state.pokemon.EvId).then(function (response) {
                    console.log(response)
                    let arrBool;
                    arrBool = [];
                    const even = (element) => element === true;
                        if (response.chain.evolves_to.length) {
                            if (response.chain.evolves_to[0].evolves_to.length) {
                                if(response.chain.evolves_to[0].evolves_to[0].evolves_to.length) {
                                    console.log("here")
                                    arrBool.push(!response.chain.evolves_to[0].evolves_to[0].isEmpty)
                                }
                                console.log("there")
                                arrBool.push(!response.chain.evolves_to[0].isEmpty)
                            }
                            arrBool.push(!response.chain.isEmpty)
                            console.log(arrBool)
                            return commit('SET_POKEMON_CANEVOLVE', arrBool.some(even))
                    } else  {
                        arrBool.push(false)
                        console.log(arrBool)
                        return commit('SET_POKEMON_CANEVOLVE', arrBool.some(even))
                    }
                }))
            }
        },
        fetchPokemonNames ( {state} ) {
            const interval = {
                offset: 0,
                limit: 904,
            }
            return (P.getPokemonsList(interval).then(function(response) {
                [...response.results].forEach(element => {
                    state.pokemonNames.push(capitalized(element.name));})
            }))
        }
    }
})