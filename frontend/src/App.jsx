import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Cart from "./pages/Cart";
import { Toaster } from "sonner";

function App() {
  return (
    <Layout>
      <Toaster richColors closeButton />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
