import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Favoritos from '../pages/Favoritos';
import Detalhes from '../pages/Detalhes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/detalhes/:nome" element={<Detalhes />} />
    </Routes>
  );
};

export default AppRoutes;
