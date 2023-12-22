import { createContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const PokemonContext = createContext();

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const PokemonProvider = ({ children }) => {
    const getPokemonById = async (id) => await axios.get(`${API_BASE_URL}/pokemon/${id}`)
    const getPokemonDescriptionById = async (id) => await axios.get(`${API_BASE_URL}/pokemon-species/${id}`)
    const getPokemonList = async () => {
        const pokemonNameAndUrl = await axios.get(`${API_BASE_URL}/pokemon`)
        const pokemonDetails = await Promise.all(
            pokemonNameAndUrl.data.results.map(async (pokemonDetails) => {
                const pokemon = await axios.get(pokemonDetails.url)
                return pokemon.data
            })
        )
        console.log('TO CHAMANDO A API MEU', pokemonDetails)
        return pokemonDetails
    }

    return (
        <PokemonContext.Provider value={{ getPokemonList, getPokemonById, getPokemonDescriptionById }}>
            {children}
        </PokemonContext.Provider>
    );
}

export { PokemonProvider }

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };