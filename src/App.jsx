import { FavoritesProvider } from './contexts/FavoritesContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <FavoritesProvider>
      <Navbar />
      <div className="pt-20">
        <AppRoutes />
      </div>
    </FavoritesProvider>
  );
};

export default App;
