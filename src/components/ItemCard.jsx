import { useFavorites } from '../contexts/FavoritesContext';

const ItemCard = ({ item }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === item.id);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">{item.title}</h2>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <button
        onClick={() => toggleFavorite(item)}
        className={`px-4 py-2 rounded font-semibold transition ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {isFavorite ? 'Remover dos Favoritos ❤️' : 'Adicionar aos Favoritos 🤍'}
      </button>
    </div>
  );
};

export default ItemCard;
