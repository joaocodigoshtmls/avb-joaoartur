import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar os pokémons:', error);
      });
  }, []);

  // Função para extrair o ID da URL
  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2]; // O penúltimo elemento é o ID
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Pokémons</h1>
      <ul className="space-y-2">
        {pokemons.map((pokemon, index) => {
          const id = getPokemonIdFromUrl(pokemon.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded shadow flex items-center space-x-4"
            >
              <img src={imageUrl} alt={pokemon.name} className="w-12 h-12" />
              <Link
                to={`/detalhes/${pokemon.name}`}
                className="text-blue-600 hover:underline text-lg"
              >
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
