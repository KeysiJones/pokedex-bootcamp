import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const PokemonContext = createContext();

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const PokemonProvider = ({ children }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const getPokemonById = (id) => pokemonData.find(pokemon => pokemon.id == id)
    const getPokemonDescriptionById = async (id) => await axios.get(`${API_BASE_URL}/pokemon-species/${id}`)

    useEffect(() => {
        const fetchPokemonList = async () => {
            const pokemonNameAndUrl = await axios.get(`${API_BASE_URL}/pokemon`)
            const pokemonDetails = await Promise.all(
                pokemonNameAndUrl.data.results.map(async (pokemonDetails) => {
                    const pokemon = await axios.get(pokemonDetails.url)
                    return pokemon.data
                })
            )
            setPokemonData(pokemonDetails)
        }

        fetchPokemonList()
    }, [])

    return (
        <PokemonContext.Provider value={{ pokemonData, getPokemonById, getPokemonDescriptionById }}>
            {children}
        </PokemonContext.Provider>
    );
}

export { PokemonProvider }

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };