import {nthIndex} from "@/composables/utils";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export function getEvolutionChainFromEvId (pkmnEvId) {
    console.log("Evolution Id: " + pkmnEvId);

    let chain;
    let bEvolvesFurther;

    bEvolvesFurther = P.getEvolutionChainById(pkmnEvId).then(function(localChainId) {chain = localChainId; return (chain.chain.evolves_to.length > 0);});

    return {bEvolvesFurther}
}

export function getP () {
    return P;
}

export async function getPkmnEvIdFromName (pkmnName)
{
     let pkmnEvId = P.getPokemonSpeciesByName(pkmnName).then(function (pkmnSpecies) {
        let evIdDirty;
        let purge;
        evIdDirty = pkmnSpecies.evolution_chain.url;
        purge = nthIndex(evIdDirty, '/', 6);
        return (evIdDirty.substring(purge + 1).slice(0, -1));
    })

    console.log(pkmnEvId);

    return pkmnEvId;

}
