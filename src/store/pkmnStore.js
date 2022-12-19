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
                    Handle: null,
                    Id: null,
                    Types: [],
                    EvId: null,
                    CanEvolve: null,
                    Species: null,
                    ImageUrl: null,
                    EvChain: [null],
                    NextEvolutions: [{
                        Name: null,
                        Types: [],
                        ImageUrl: null,
                        MinLevel: null,
                        Trigger: null,
                        Item: null,
                        Gender: null,
                        HeldItem: null,
                        KnownMove: null,
                        KnownMoveType: null,
                        Location: null,
                        MinAffection: null,
                        MinBeauty: null,
                        MinHappiness: null,
                        NeedsOverworldRain: null,
                        PartySpecies: null,
                        PartyType: null,
                        PhysicalStats: null,
                        TimeOfDay: null,
                        TradeSpecies: null,
                        TurnUpsideDown: null,
                    }],
                    EvolutionsToShow: []
                },
            pokemonEvolutions: [{
                Name: null,
                Types: [],
                ImageUrl: null,
                MinLevel: null,
                Trigger: null,
                Item: null,
                Gender: null,
                HeldItem: null,
                KnownMove: null,
                KnownMoveType: null,
                Location: null,
                MinAffection: null,
                MinBeauty: null,
                MinHappiness: null,
                NeedsOverworldRain: null,
                PartySpecies: null,
                PartyType: null,
                PhysicalStats: null,
                TimeOfDay: null,
                TradeSpecies: null,
                TurnUpsideDown: null,
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
        },
        SET_POKEMON_HANDLE(state, pokemonHandle) {
            state.pokemon.Handle = pokemonHandle
        },
        SET_POKEMON_ID(state, pokemonId) {
            state.pokemon.Id = pokemonId
        },
        SET_EVOLUTIONS_TO_SHOW(state, pokemonEvolutionsToShow) {
            state.pokemon.EvolutionsToShow = pokemonEvolutionsToShow
        }
    },
    actions: { // called via dispatch('actionName', payload)
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
            return new Promise((resolve) => { // We already have Name and Id (for Image)
            commit('SET_POKEMON_NAME', pkmnObj.Name)
            commit('SET_POKEMON_IMAGE', ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ pkmnObj.Id +'.png'))
            commit('SET_POKEMON_ID', pkmnObj.Id)
            commit('SET_POKEMON_HANDLE', pkmnObj.Handle)
            // Get Species & EvChain
            dispatch('setPokemonSpeciesEvId', pkmnObj)
                .then(() => {P.getEvolutionChainById(state.pokemon.EvId)
                    .then((response) => {commit('SET_POKEMON_EVCHAIN', response)})
                    .then(() => dispatch('cleanEvChain'))
                    .then(() => console.log(state.pokemonEvolutions))
                    .then(() => dispatch('checkPkmnIfEvolve'))
                    .then(() => console.log(state.pokemon))
                    .then(() => resolve())
                })
            })},
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
                console.log(state.pokemon.EvChain.chain)
                let evData = state.pokemon.EvChain.chain
                // Base Stage
                state.pokemonEvolutions.push({
                    Name: evData.species.name,
                    ImageUrl: ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ evData.species.url.split('/')[6] +'.png'),
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
                                Stage: response,
                                ImageUrl: ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ element.species.url.split('/')[6] +'.png'),
                                Gender: element.evolution_details[0].gender,
                                HeldItem: !element.evolution_details[0].held_item ? null : element.evolution_details[0].held_item.name,
                                KnownMove: !element.evolution_details[0].known_move ? null : element.evolution_details[0].known_move.name,
                                KnownMoveType: !element.evolution_details[0].known_move_type ? null : element.evolution_details[0].known_move_type.name,
                                Location: !element.evolution_details[0].location ? null : element.evolution_details[0].location.name,
                                MinAffection: !element.evolution_details[0].min_affection ? null : element.evolution_details[0].min_affection,
                                MinBeauty: !element.evolution_details[0].min_beauty ? null : element.evolution_details[0].min_beauty,
                                MinHappiness: !element.evolution_details[0].min_happiness ? null : element.evolution_details[0].min_happiness,
                                NeedsOverworldRain: !element.evolution_details[0].needs_overworld_rain ? null : element.evolution_details[0].needs_overworld_rain,
                                PartySpecies: !element.evolution_details[0].party_species ? null : element.evolution_details[0].party_species,
                                PartyType: !element.evolution_details[0].party_type ? null : element.evolution_details[0].party_type,
                                PhysicalStats: !element.evolution_details[0].relative_physical_stats ? null : element.evolution_details[0].relative_physical_stats,
                                TimeOfDay: !element.evolution_details[0].time_of_day ? null : element.evolution_details[0].time_of_day,
                                TradeSpecies: !element.evolution_details[0].trade_species ? null : element.evolution_details[0].trade_species,
                                TurnUpsideDown: !element.evolution_details[0].turn_upside_down ? null : element.evolution_details[0].turn_upside_down,
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
                // First Evolution Stage
                return 2
            } else if ((state.pokemon.EvChain.chain.evolves_to.indexOf(evData) > -1)) {
                // Second Evolution Stage
                return 3
            }
        },
        checkPkmnIfEvolve ({ state, commit }) {
            return new Promise((resolve) => {
                [...state.pokemonEvolutions].forEach(element => {
                    if (element.Name === state.pokemon.Handle) {
                        resolve(state.pokemon.NextEvolutions = [], state.pokemon.NextEvolutions.push(state.pokemonEvolutions.filter((e) => e.Stage === element.Stage+1)), commit('SET_POKEMON_CANEVOLVE', (state.pokemon.NextEvolutions[0].length != 0)))
                    }
                })
            })
        },
        setEvolutionsToShown ( { commit }, pokemonEvolutionsToShow ) {
            return (commit('SET_EVOLUTIONS_TO_SHOW', pokemonEvolutionsToShow))
        }
    }
})