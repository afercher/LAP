import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/navbar";
import { Cart } from "./pages/cart/cart";
import { Home } from "./pages/shop/home";
import {Register} from "./pages/register/register.jsx";
import {Login} from "./pages/login/login.jsx";
import { AppProvider } from "./hooks/appContext";
import {Checkout} from "./pages/checkout/checkout.jsx";
import {ProtectedRoute} from "./components/protectedRoute.jsx"; // << hier importieren

function App() {
    return (
        <Router>
            <AppProvider>
                <div className="App">
                    <Navbar />
                    <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/checkout"
                                element={
                                    <ProtectedRoute>
                                        <Checkout />
                                    </ProtectedRoute>
                                }
                            />
                    </Routes>
                </div>
            </AppProvider>
        </Router>
    );
}

export default App;
