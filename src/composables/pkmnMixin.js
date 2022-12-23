import {capitalized} from "@/composables/utils";

export function getIconFromType(pkmnType) {
    switch (pkmnType) {
        case 'normal' :
            return 'C'
        case 'fighting':
            return 'F'
        case 'flying':
            return 'v'
        case 'poison':
            return 'o'
        case 'ground':
            return 'a'
        case 'rock':
            return 'k'
        case 'bug':
            return 'b'
        case 'ghost':
            return 'h'
        case 'steel':
            return 'm'
        case 'fire':
            return 'r'
        case 'water':
            return 'W'
        case 'grass':
            return 'g'
        case 'electric':
            return 'l'
        case 'psychic':
            return 'P'
        case 'ice':
            return 'i'
        case 'dragon':
            return 'n'
        case 'dark':
            return 'D'
        case 'fairy':
            return 'Y'
        case 'unknown':
            return 'x'
        case 'shadow':
            return 'z'
        case 'pokeball':
            return 's'
        case 'background':
            return 'Z'
    }
}

export function appendEvolutionModifier(pokemonEvolution) {
    let validModifiersKeys = [];
    [...Object.keys(pokemonEvolution.Modifiers)].forEach((m) => {
            if (pokemonEvolution.Modifiers[m] !== null) {
                validModifiersKeys.push(m)
            }
        }
    )

    let validModifiersValues = [];
    [...validModifiersKeys].forEach((m) => {
        validModifiersValues.push(pokemonEvolution.Modifiers[m])
    })

    let validModifiersStrings = [];
    [...validModifiersKeys].forEach((m, index) => {
        switch (m) {
            case 'MinLevel':
                validModifiersStrings.push(('from Level ' + validModifiersValues[index] + ' ').toString())
                break
            case 'Gender':
                switch (pokemonEvolution.Modifiers.Gender) {
                    case 1:
                        validModifiersStrings.push(('if Female ').toString())
                        break
                    case 2:
                        validModifiersStrings.push(('if Male ').toString())
                        break
                }
                break
            case 'HeldItem':
                validModifiersStrings.push(('while holding ' + capitalized(validModifiersValues[index]).replace(/-/g, ' ') + ' ').toString())
                break
            case 'Item':
                validModifiersStrings.push(('by using a ' + capitalized(validModifiersValues[index].replace(/-/g, ' '))).toString())
                break
            case 'KnownMove':
                validModifiersStrings.push(('if it knows ' + capitalized(validModifiersValues[index]).replace(/-/g, ' ') + ' ').toString())
                break
            case 'KnownMoveType':
                validModifiersStrings.push(('if it knows a ' + capitalized(validModifiersValues[index]) + ' move ').toString())
                break
            case 'MinAffection':
                validModifiersStrings.push(('with ' + validModifiersValues[index] + ' Affection or higher ').toString())
                break
            case 'MinHappiness':
                validModifiersStrings.push(('with ' + validModifiersValues[index] + ' Happiness or higher ').toString())
                break
            case 'MinBeauty':
                validModifiersStrings.push(('with ' + validModifiersValues[index] + ' Beauty or higher ').toString())
                break
            case 'Location':
                validModifiersStrings.push(('at ' + capitalized(validModifiersValues[index].replace(/-/g, ' ')) + ' ').toString())
                break
            case 'NeedsOverworldRain':
                validModifiersStrings.push(' when raining')
                break
            case 'PartySpecies':
                validModifiersStrings.push(('with a ' + capitalized(validModifiersValues[index].name) + ' in the party ').toString())
                break
            case 'PartyType':
                validModifiersStrings.push(('with a ' + capitalized(validModifiersValues[index]) + ' Pokémon in the party ').toString())
                break
            case 'PhysicalStats':
                switch (pokemonEvolution.Modifiers.PhysicalStats) {
                    case 1:
                        validModifiersStrings.push('if Attack > Defense')
                        break
                    case -1:
                        validModifiersStrings.push('if Attack < Defense')
                        break
                    default:
                        validModifiersStrings.push('if Attack and Defense are equal')
                        break
                }
                break
            case 'TimeOfDay':
                validModifiersStrings.push(('at ' + capitalized(validModifiersValues[index]) + ' Time ').toString())
                break
            case 'TradeSpecies':
                validModifiersStrings.push(('by trading with ' + capitalized(validModifiersValues[index].name) + ' ').toString())
                break
            case 'TurnUpsideDown':
                validModifiersStrings.push('by turning the device upside down ')
                break
        }
    })

    return validModifiersStrings
}

export function getTriggerText(pokemonEvolution) {
    switch (pokemonEvolution.Trigger) {
        case 'level-up':
            return ('From level ' + pokemonEvolution.MinLevel)
        case 'trade':
            break
        case 'use-item':
            break
        case 'shed':
            break
        case 'spin':
            break
        case 'tower-of-darkness':
            break
        case 'tower-of-waters':
            break
        case 'three-critical-hits':
            break
        case 'take-damage':
            break
        case 'other':
            break
    }
}