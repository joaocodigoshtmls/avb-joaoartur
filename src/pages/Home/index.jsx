import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';

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

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pokemons.map((pokemon, index) => {
        const id = getPokemonIdFromUrl(pokemon.url);
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
          <ItemCard
            key={index}
            item={{
              id,
              title: pokemon.name,
              description: `Pokémon #${id}`,
              image: imageUrl
            }}
          />
        );
      })}
    </div>
  );
};

export default Home;
