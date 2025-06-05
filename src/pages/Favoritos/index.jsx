import { useFavorites } from '../../contexts/FavoritesContext';
import ItemCard from '../../components/ItemCard';

const Favoritos = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Pokémons Favoritados</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum Pokémon foi favoritado ainda.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((pokemon) => (
            <ItemCard key={pokemon.id} item={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
