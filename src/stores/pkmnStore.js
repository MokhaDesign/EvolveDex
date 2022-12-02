import { createStore } from 'vuex'
import {nthIndex} from '@/composables/utils'

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
                    let chain, evIdLocal;
                    chain = state.pokemon.Species.evolution_chain.url
                    evIdLocal = chain.substring(nthIndex(chain, '/', 6) + 1).slice(0, -1)
                    return commit('SET_POKEMON_EVID', evIdLocal)
        },
        fetchPokemonEvolutionChain ({ commit, state }) {
            if(state.pokemon.EvId) {
                (P.getEvolutionChainById(state.pokemon.EvId).then(function (response) {
                    return commit('SET_POKEMON_CANEVOLVE', (response.chain.evolves_to.length > 0))
                }))
            }
        },
        fetchPokemonNames ( {state} ) {
            return (P.getPokemonsList(0, 10).then(function(response) {
                [...response.results].forEach(element => {
                    state.pokemonNames.push(element.name);})
            }))
        }
    }
})