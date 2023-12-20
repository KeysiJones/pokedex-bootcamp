import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PokemonProvider } from './contexts/PokemonContext'
import PokemonList from './routes/pokemonList'
import PokemonDetails from './routes/pokemonDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />
  },
  {
    path: "/pokemons/:pokemonId",
    element: <PokemonDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  </React.StrictMode>,
)
