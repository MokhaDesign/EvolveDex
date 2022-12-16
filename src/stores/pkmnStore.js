import { createStore } from 'vuex'
import { capitalized } from '@/composables/utils'

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
                    ImageUrl: null,
                    EvChain: [null]
                },
            pokemonEvolutions: [{
                Name: null,
                ImageUrl: null,
                MinLevel: null,
                Trigger: null,
                Item: null,
            }],
            pokemonNames: [{
                Name: null,
                Handle: null,
                Id: null
            }]
        }
    },
    getters: { // getters
        getPkmnName: state => state.pokemon.Name,
        getPkmnEvId: state => state.pokemon.EvId,
        getCanEvolve: state => state.pokemon.CanEvolve,
        getPkmnSpecies: state => state.pokemon.Species,
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
        SET_POKEMON_IMAGE(state, pokemonImageUrl) {
            state.pokemon.ImageUrl = pokemonImageUrl
        },
        SET_POKEMON_EVCHAIN(state, pokemonEvChain) {
            state.pokemon.EvChain = pokemonEvChain
        },
        SET_POKEMON_EVOLUTIONS(state, pokemonEvolutions) {
            state.pokemonEvolutions = pokemonEvolutions
        }
    },
    actions: { // called via dispatch('actionName', payload)
        // setPokemonNameAndSpecies({ commit }, pokemonName) {
        //     return (
        //         commit('SET_POKEMON_NAME', pokemonName),
        //         (P.getPokemonSpeciesByName(pokemonName).then(function(response) { return (
        //             commit('SET_POKEMON_SPECIES', response),
        //             commit('SET_POKEMON_COLOUR', response.color.name)) }))
        //     )
        // },
        // setPokemonImage({ commit }, pkmnName) {
        //     return (
        //         (P.getPokemonByName(pkmnName).then(function(response) {
        //             return commit('SET_POKEMON_IMAGE', response.sprites.other["official-artwork"].front_default)
        //         }))
        //     )
        // },
        // setPokemonEvId ({ commit, state }) {
        //             let chainLocal, evIdLocal;
        //             chainLocal = state.pokemon.Species.evolution_chain.url
        //             evIdLocal = chainLocal.substring(nthIndex(chainLocal, '/', 6) + 1).slice(0, -1)
        //             return commit('SET_POKEMON_EVID', evIdLocal)
        // },
        // fetchPokemonEvolutionChain ({ commit, state }) {
        //     if(state.pokemon.EvId) {
        //         (P.getEvolutionChainById(state.pokemon.EvId)
        //             .then(function (response) {
        //             state.pokemon.EvChain = [];
        //             [...response.chain.evolves_to].forEach(element => {
        //                 state.pokemon.EvChain.push(element)})
        //             console.log(state.pokemon.EvChain)
        //             return commit('SET_POKEMON_EVCHAIN', state.pokemon.EvChain)
        //         }))
        //     }
        // },
        fetchPokemonNames ({ state }) {
            const interval = {
                offset: 0,
                limit: 904,
            }
            state.pokemonNames = []
            // Name, Handle (for Search Bar), Id
            return new Promise((resolve) => {
                P.getPokemonsList(interval).then((response) => {
                    [...response.results].forEach(element => {
                        let p
                        p = {Name: capitalized((element.name).replace('-', ' ')), Handle: element.name, Id: element.url.split('/')[6]}
                        state.pokemonNames.push(p);
                        resolve()
                    })
                })
            })
        },
        setPokemon ({ commit, state, dispatch }, pkmnObj) {
            // We already have Name and Id (for Image)
            commit('SET_POKEMON_NAME', pkmnObj.name)
            commit('SET_POKEMON_IMAGE', ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ pkmnObj.Id +'.png'))
            // Get Species & EvChain
            dispatch('setPokemonSpeciesEvId', pkmnObj)
                .then(() => {P.getEvolutionChainById(state.pokemon.EvId)
                    .then((response) => {commit('SET_POKEMON_EVCHAIN', response)})
                    .then(() => dispatch('cleanEvChain'))
                    .then(() => console.log(state.pokemonEvolutions))
                })
            },
        setPokemonSpeciesEvId ({ commit }, pkmnObj) {
            return new Promise((resolve) => {
                P.getPokemonSpeciesByName(pkmnObj.Handle).then((response) => {
                    commit('SET_POKEMON_SPECIES', response)
                    commit('SET_POKEMON_EVID', (response.evolution_chain.url).split('/')[6])
                    resolve()
                })
            })
        },
        cleanEvChain ({ commit, state, dispatch }) {
            return new Promise((resolve) => {
                commit('SET_POKEMON_EVOLUTIONS', [])
                // let evChain = []
                console.log(state.pokemon.EvChain.chain)
                let evData = state.pokemon.EvChain.chain

                state.pokemonEvolutions.push({
                    Name: evData.species.name,
                    Stage: 1
                })

                do {
                    let nmrEv = evData.evolves_to.length;

                    if(nmrEv > 0) {
                        [...evData.evolves_to].forEach(element => {
                            dispatch('checkPkmnEvolutionStage', evData).then((response) =>
                            state.pokemonEvolutions.push({
                                Name: element.species.name,
                                Trigger: !element.evolution_details[0].trigger ? null : element.evolution_details[0].trigger.name,
                                MinLevel: !element ? 1 : element.evolution_details[0].min_level,
                                Item: !element.evolution_details[0].item ? null : element.evolution_details[0].item.name,
                                Stage: response
                            })
                            )
                        })
                    }

                    evData = evData.evolves_to[0]

                    // eslint-disable-next-line no-prototype-builtins
                } while (!!evData && evData.hasOwnProperty('evolves_to'))

                resolve()
            })
        },
        checkPkmnEvolutionStage ( { state }, evData) {
            if (evData === state.pokemon.EvChain.chain) {
                return 2
            } else if ((state.pokemon.EvChain.chain.evolves_to.indexOf(evData) > -1)) {
                return 3
            }
        }
    }
        // checkPokemonEvolutionChain ({ commit, state }) {
        //     if (state.pokemon.EvChain[0] != null) {
        //         [...state.pokemon.EvChain].forEach(element => {
        //             if (element.species.name.toString() === state.pokemon.Name.toString()) {
        //                 // Check if there is further evolution
        //                 if (element.evolves_to != null) {
        //                     [...element.evolves_to].forEach(element => {
        //                         console.log("Next evolution: " + element.species.name.toString())
        //                         return commit('SET_POKEMON_CANEVOLVE', true)
        //                     })
        //                 } else {
        //                     console.log("Else" + element.species.name)
        //                     return commit('SET_POKEMON_CANEVOLVE', false)
        //                 }
        //             } else {
        //                 // Check if there is further evolution
        //                 return [...element.evolves_to].forEach(element => {
        //                     if (element.species.name.toString() !== state.pokemon.Name.toString()) {
        //                         console.log("Inside")
        //                         return commit('SET_POKEMON_CANEVOLVE', true)
        //                     } else {
        //                         console.log("Current Stage: " + element.species.name.toString())
        //                         return commit('SET_POKEMON_CANEVOLVE', false)
        //                     }
        //                 })
        //             }
        //         })
        //         console.log("Here we are")
        //         return commit('SET_POKEMON_CANEVOLVE', true)
        //     } else {
        //         console.log("Base Pokemon, doesn't evolve")
        //         return commit('SET_POKEMON_CANEVOLVE', false) }
        // },
})