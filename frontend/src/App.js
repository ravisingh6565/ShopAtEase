import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./components/SignUp";
import { CardProvider } from "./components/ContextReducer";
import SellerPage from "./screens/SellerPage";
import SellerLogin from "./screens/SellerLogin";
import SellerSignup from "./screens/SellerSignup";
import ShopItems from "./screens/ShopItems";
import CreateProduct from "./screens/CreateProduct";
import MyCart from "./screens/MyCart";
import MyOrder from "./screens/MyOrder";
import PlaceOrder from "./screens/PlaceOrder";
import Admin from "./screens/Admin";
import PaymentSuccess from "./screens/PaymentSuccess";
import About from "./screens/About";
import FAQ from "./screens/FAQ";

function App() {

  return (
    <CardProvider>
    <div className="App">
      <header className="App-header">
      
        <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/seller-page" element={<SellerPage />} />
            <Route exact path="/create-product" element={<CreateProduct />} />
            <Route exact path="/seller-signup" element={<SellerSignup />} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/shop-items" element={<ShopItems/>} />
            <Route exact path="/my-cart" element={<MyCart/>} />
            <Route exact path="/my-orders" element={<MyOrder/>} />
            <Route exact path="/place-order" element={<PlaceOrder/>} />
            <Route exact path="/admin" element={<Admin/>} />
            <Route exact path="/paymentsuccess" element={<PaymentSuccess/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/FAQ" element={<FAQ/>} />
          </Routes>
        </div>
        </Router>
      </header>
    </div>
    </CardProvider>
  );
}

export default App;
