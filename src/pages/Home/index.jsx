import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        setPokemons(response.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar os pokémons:', error);
      });
  }, []);

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Pokémons</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {pokemons.map((pokemon, index) => {
          const id = getPokemonIdFromUrl(pokemon.url);

          const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          const shinyUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;

          return (
            <ItemCard
              key={index}
              item={{
                id,
                title: pokemon.name,
                description: `Pokémon #${id}`,
                image: normalUrl,
                shinyImage: shinyUrl,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
