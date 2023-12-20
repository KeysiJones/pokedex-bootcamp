import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

function usePokemon () {
    const context = useContext(PokemonContext);
    return context
}

export { usePokemon }