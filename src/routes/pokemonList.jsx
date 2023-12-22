import styled from 'styled-components'
import { usePokemon } from '../hook/usePokemon'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useEffect, useState } from 'react'

export const PokemonListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    margin: 50px auto;
    max-width: 1300px;
`

export const PokemonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const PokemonName = styled.p`
    font-size: 25px;
    color: black;
    text-transform: capitalize;
    margin-bottom: 10px;
`

export const PokemonCard = styled.a`
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    max-width: 500px;
`

export const PokemonImage = styled.img`
    max-width: 300px;
    background-color: #00000014;
    border-radius: 5px;
`

const PokemonTypeWrapper = styled.div`
    display: flex;
    column-gap: 4px;
`

const PokemonTypeBox = styled.div`
    font-size: 15px;
    border-radius: 10px;
    text-transform: capitalize;
    max-width: 50px;
    color: white;
    background-color: ${(props) => props.backgroundColor};
    padding: 2px 20px;
`

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([])
    const { getPokemonList } = usePokemon()

    useEffect(() => {
        const fetchPokemonList = async () => {
            const pokemonData = await getPokemonList()
            setPokemonList(pokemonData)
        }

        fetchPokemonList()
    }, [ getPokemonList ])

    if (!pokemonList.length) return <LoadingSpinner />

    const COLOR_MAP = {
        'grass': 'green',
        'fire': 'red',
        'poison': 'purple',
        'bug': 'red',
        'ground': 'yellow',
        'fairy': 'orange',
        'flying': 'pink',
        'normal': 'blue',
        'electric': 'cornflowerblue'
    }

    return (
        <PokemonListWrapper>
            <PokemonContainer>
                {
                    pokemonList?.map((pokemon) => (
                        <PokemonCard href={`/pokemons/${pokemon.id}`} key={pokemon.id}>
                            <PokemonImage src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                            <PokemonName>{pokemon.name}</PokemonName>
                            <PokemonTypeWrapper>
                                {
                                    pokemon?.types?.map(({ type }, index) => {
                                        return (
                                            <PokemonTypeBox key={index} backgroundColor={COLOR_MAP[type.name] || 'grey'}>
                                                {type.name}
                                            </PokemonTypeBox>
                                    )})
                                }
                                <PokemonTypeBox>
                                </PokemonTypeBox>
                            </PokemonTypeWrapper>
                        </PokemonCard>
                    ))
                }
            </PokemonContainer>
        </PokemonListWrapper>
    )
}

export default PokemonList