import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

const API_BASE_URL = 'https://bootcamp-fullture-pokedex-api.onrender.com/pokemons'

const PokemonProvider = ({ children }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const getPokemonById = async (id) => await axios.get(`${API_BASE_URL}/${id}`)
    const getPokemonDescriptionById = async (id) => await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(API_BASE_URL)
            setPokemonData(response.data)
        }

        fetchData()
    }, [])

    return (
        <PokemonContext.Provider value={{ pokemonData, getPokemonById, getPokemonDescriptionById }}>
            {children}
        </PokemonContext.Provider>
    );
}

export { PokemonProvider }