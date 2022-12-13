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
                    EvChain: [null]
                },
            pokemonEvolutions: [{
                EvolutionName: null,
                EvolutionImageUrl: null,
                EvolutionTrigger: null,
            }],
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
        getPkmnEvChain: state => state.pokemon.EvChain
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
        },
        SET_POKEMON_EVCHAIN(state, pokemonEvChain) {
            state.pokemon.EvChain = pokemonEvChain
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
        setPokemonImage({ commit }, pkmnName) {
            return (
                (P.getPokemonByName(pkmnName).then(function(response) {
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
                (P.getEvolutionChainById(state.pokemon.EvId)
                    .then(function (response) {
                    state.pokemon.EvChain = [];
                    [...response.chain.evolves_to].forEach(element => {
                        state.pokemon.EvChain.push(element)})
                    console.log(state.pokemon.EvChain)
                    return commit('SET_POKEMON_EVCHAIN', state.pokemon.EvChain)
                }))
            }
        },
        fetchPokemonNames ( { state } ) {
            const interval = {
                offset: 0,
                limit: 904,
            }
            return (P.getPokemonsList(interval).then(function(response) {
                [...response.results].forEach(element => {
                    state.pokemonNames.push(capitalized(element.name));})
            }))
        },
        checkPokemonEvolutionChain ({ commit, state }) {
            if (state.pokemon.EvChain[0] != null) {
                [...state.pokemon.EvChain].forEach(element => {
                    if (element.species.name.toString() === state.pokemon.Name.toString()) {
                        // Check if there is further evolution
                        if (element.evolves_to != null) {
                            [...element.evolves_to].forEach(element => {
                                console.log("Next evolution: " + element.species.name.toString())
                                return commit('SET_POKEMON_CANEVOLVE', true)
                            })
                        } else {
                            console.log("Else" + element.species.name)
                            return commit('SET_POKEMON_CANEVOLVE', false)
                        }
                    } else {
                        // Check if there is further evolution
                        return [...element.evolves_to].forEach(element => {
                            if (element.species.name.toString() !== state.pokemon.Name.toString()) {
                                console.log("Inside")
                                return commit('SET_POKEMON_CANEVOLVE', true)
                            } else {
                                console.log("Current Stage: " + element.species.name.toString())
                                return commit('SET_POKEMON_CANEVOLVE', false)
                            }
                        })
                        // if (element.species.name.toString() === state.pokemon.Name.toString()) {
                        //     return commit('SET_POKEMON_CANEVOLVE', false)
                        // }
                    }
                })
                // console.log("Here we are")
                // return commit('SET_POKEMON_CANEVOLVE', true)
            } else {
                console.log("Base Pokemon, doesn't evolve")
                return commit('SET_POKEMON_CANEVOLVE', false) }
        },
    }
})