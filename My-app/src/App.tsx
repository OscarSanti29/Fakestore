import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Profile } from "./pages/Account";
import ProductInfo from "./pages/product-details";
import { Navbar } from "./components/Navbar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        {/* Home page */}

        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Home />} />
        <Route path="/products/:id" element={<ProductInfo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
