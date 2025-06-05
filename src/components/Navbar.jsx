import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-8 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">PokéApp</h1>

        <div className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:underline hover:text-yellow-300 transition">
            🏠 Home
          </Link>
          <Link to="/favoritos" className="hover:underline hover:text-yellow-300 transition">
            ⭐ Favoritos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
