import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === item.id);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition hover:shadow-xl">
      {/* Imagem do Pokémon */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 mb-4"
        />
      )}

      {/* Nome do Pokémon */}
      <h2 className="text-xl font-bold capitalize mb-1 text-gray-800">
        {item.title}
      </h2>

      {/* Descrição */}
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

      {/* Link para ver detalhes */}
      <Link
        to={`/detalhes/${item.title}`}
        className="text-blue-600 font-medium hover:underline mb-2"
      >
        Ver detalhes
      </Link>

      {/* Botão de favorito com contraste e clareza */}
      <button
        onClick={() => toggleFavorite(item)}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 tracking-wide ${
          isFavorite
            ? 'bg-red-600 text-gray hover:bg-red-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
      </button>
    </div>
  );
};

export default ItemCard;
