import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import ProductInfo from "./pages/product-details";

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<Home />} />
      <Route path="/products/:id" element={<ProductInfo />} />
    </Routes>
  );
}

export default App;
