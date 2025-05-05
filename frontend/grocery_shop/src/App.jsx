import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AddItems from "./pages/AddItems";
import Cart from "./pages/Cart";
import Cereals from "./pages/Cereals";
import Spices from "./pages/Spices";
import Beverages from "./pages/Beverages";
import ManageProducts from "./pages/ManageProducts";
import Home from "./pages/Home"; // Import the new Home component
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/Payment";
import ThankYou from "./pages/Thankyou";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Public Home Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Dashboard Route */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/payment" element={<PaymentPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/category/cereals" element={<Cereals />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/category/spices" element={<Spices />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/category/beverages" element={<Beverages />} />
        </Route>

        {/* Admin Dashboard Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/add-items" element={<AddItems />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/orders" element={<Orders />} />
</Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/manage-products" element={<ManageProducts />} />
        </Route>
        {/* <Route path="/manage-inventory" element={<ManageInventory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;