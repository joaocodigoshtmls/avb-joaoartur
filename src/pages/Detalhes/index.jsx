import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getTypeColor = (type) => {
  const colors = {
    fire: 'from-red-500 to-orange-400',
    water: 'from-blue-500 to-blue-300',
    grass: 'from-green-500 to-green-300',
    electric: 'from-yellow-400 to-yellow-200',
    bug: 'from-lime-600 to-lime-300',
    normal: 'from-gray-400 to-gray-200',
    ground: 'from-yellow-800 to-yellow-500',
    rock: 'from-gray-600 to-gray-400',
    ghost: 'from-purple-600 to-purple-300',
    psychic: 'from-pink-500 to-pink-300',
    dragon: 'from-indigo-700 to-indigo-400',
    dark: 'from-gray-800 to-gray-600',
    fairy: 'from-pink-300 to-pink-100',
    ice: 'from-blue-200 to-blue-100',
    fighting: 'from-red-700 to-red-500',
    poison: 'from-purple-700 to-purple-400',
    flying: 'from-sky-500 to-sky-300',
    steel: 'from-gray-500 to-gray-300'
  };

  return colors[type] || 'from-gray-200 to-gray-100';
};

const gerarCuriosidades = (pokemon) => {
  const curiosidades = [];
  if (pokemon.height / 10 > 2) curiosidades.push('Este Pokémon é considerado muito alto!');
  if (pokemon.weight / 10 > 100) curiosidades.push('Este Pokémon é extremamente pesado.');
  if (pokemon.base_experience > 200) curiosidades.push('Tem uma experiência base muito alta.');
  if (pokemon.types.length > 1) curiosidades.push('Possui múltiplos tipos, o que o torna versátil.');
  if (pokemon.abilities.some(a => a.is_hidden)) curiosidades.push('Possui uma habilidade oculta rara.');
  if (curiosidades.length === 0) curiosidades.push('Nada de muito fora do comum... mas ainda assim é especial!');
  return curiosidades;
};

const Detalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(pokeData.data);

        const speciesData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const entry = speciesData.data.flavor_text_entries.find(
          (entry) => entry.language.name === 'pt' || entry.language.name === 'en'
        );
        setDescricao(entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Descrição indisponível.');
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Carregando...</p>;
  if (!pokemon) return <p className="p-4">Pokémon não encontrado.</p>;

  const mainType = pokemon.types[0].type.name;
  const bgGradient = getTypeColor(mainType);
  const curiosidades = gerarCuriosidades(pokemon);

  // Fundo temático por tipo (você pode customizar com URLs ou cores diferentes)
  const backgroundImage = `/backgrounds/${mainType}.jpg`; // Salve imagens tipo fire.jpg, water.jpg etc. na pasta public/backgrounds

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-3xl mx-auto bg-black bg-opacity-70 backdrop-blur-md text-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 inline-flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          <span className="text-xl">←</span> Voltar
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 capitalize">{pokemon.name}</h1>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-48 h-48 mb-4 mx-auto"
          />
        </div>

        <p className="italic text-center mb-4 px-4">{descricao}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
          <div>
            <h2 className="font-semibold text-xl mb-2">Informações Básicas</h2>
            <ul className="space-y-1">
              <li><strong>ID:</strong> {pokemon.id}</li>
              <li><strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m</li>
              <li><strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg</li>
              <li><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}</li>
              <li><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</li>
              <li><strong>Experiência base:</strong> {pokemon.base_experience}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">Curiosidades</h2>
            <ul className="list-disc list-inside space-y-1">
              {curiosidades.map((curiosidade, index) => (
                <li key={index}>{curiosidade}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;
