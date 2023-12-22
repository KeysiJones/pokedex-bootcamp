import styled from 'styled-components'
import { usePokemon } from '../hook/usePokemon'
import { LoadingSpinner } from '../components/LoadingSpinner'

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
    font-size: 20px;
    color: black;
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
    font-size: 12px;
    border-radius: 2px;
    max-width: 50px;
    color: white;
    background-color: ${(props) => props.backgroundColor};
    padding: 1px 10px;
`

const PokemonList = () => {
    const { pokemonData } = usePokemon()
    console.log({pokemonData})
    if (!pokemonData.length) return <LoadingSpinner />

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
                    pokemonData?.map((pokemon) => (
                        <PokemonCard href={`/pokemons/${pokemon.id}`} key={pokemon.id}>
                            <PokemonImage src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                            <PokemonName>{pokemon.name}</PokemonName>
                            <PokemonTypeWrapper>
                                {
                                    pokemon?.types?.map(({ type }, index) => {
                                        console.log({ type: type.name })

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