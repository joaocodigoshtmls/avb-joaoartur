import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detalhes = () => {
  const { nome } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error('Erro ao carregar detalhes:', err));
  }, [nome]);

  if (!pokemon) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 capitalize text-center">{pokemon.name}</h1>
      <img
        src={pokemon.sprites?.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="mx-auto w-48 h-48"
      />

      <div className="mt-4">
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        <p><strong>Base XP:</strong> {pokemon.base_experience}</p>
      </div>
    </div>
  );
};

export default Detalhes;
