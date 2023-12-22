import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePokemon } from '../hook/usePokemon'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'

const PokemonDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PokemonName = styled.p`
    font-size: 32px;
    font-weight: 800;
    color: white;
    text-transform: capitalize;
`

const PokemonDetailsContainer = styled.div`
    background-color: #919eab;
    padding: 30px;
    border-radius: 30px;
    display: flex;
`

const PokemonImageWrapper = styled.div`
    max-width: 400px;

    img {
        width: 100%;
    }
`
const PokemonDescriptionWrapper = styled.div`
    display: flex;
    row-gap: 10px;
    flex-direction: column;
    max-width: 300px;
    margin-top: 90px;
`

const PokemonDescription = styled.p`
    font-size: 24px;
    margin: 0;
    font-weight: 400;
`

const LinkWrapper = styled.div`
    margin-top: 30px;
    padding: 16px 24px;
    border-radius: 40px;
    background-color: cornflowerblue;

    a {
        color: white;
        font-size: 1.5rem;
    }
`
const PokemonInfo = styled.p`
    color: white;
    font-size: 20px;
`
const PokemonInfoWrapper = styled.div`
    display: flex;
    column-gap: 5px;
`

function PokemonDetails () {
    const { pokemonId } = useParams()
    const { getPokemonById, getPokemonDescriptionById } = usePokemon()
    const [pokemon, setPokemon] = useState({})
    const [pokemonDescription, setPokemonDescription] = useState({})

    useEffect(() => {
        const fetchPokemonData = async () => {
            const pokemon = await getPokemonById(pokemonId)
            const pokemonDescription = await getPokemonDescriptionById(pokemonId)
            setPokemon(pokemon)
            setPokemonDescription(pokemonDescription.data.flavor_text_entries[11].flavor_text)
        }

        fetchPokemonData()
    }, [getPokemonById, pokemonId, getPokemonDescriptionById])

    if (!pokemon?.name) return <LoadingSpinner />

    return (
        <PokemonDetailsWrapper>
            <PokemonDetailsContainer>
                <PokemonImageWrapper>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
                </PokemonImageWrapper>
                <PokemonDescriptionWrapper>
                    <PokemonName>{pokemon?.name}</PokemonName>
                    <PokemonDescription>{pokemonDescription}</PokemonDescription>
                    <PokemonInfoWrapper>
                        <PokemonInfo>Altura: {pokemon?.height} CM</PokemonInfo>
                        <PokemonInfo>Peso: {pokemon?.weight} KG</PokemonInfo>
                    </PokemonInfoWrapper>
                </PokemonDescriptionWrapper>
            </PokemonDetailsContainer>
            <LinkWrapper>
                <Link to='/'>Voltar à pagina inicial</Link>
            </LinkWrapper>
        </PokemonDetailsWrapper>
    )
}

export default PokemonDetails