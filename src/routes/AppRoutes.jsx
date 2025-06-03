import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/index';
import Favoritos from '../pages/Favoritos/index';
import Detalhes from '../pages/Detalhes/index';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
