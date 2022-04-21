import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Cart } from './components/Cart';
import { Success } from './components/Success';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
