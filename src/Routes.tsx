import { Routes, Route } from "react-router-dom";
import Layout from "./components/core/Layout";
import Home from "./components/core/Home";
import Shop from "./components/core/Shop";
import SignIn from "./components/core/SignIn";
import SignUp from "./components/core/SignUp";
import Dashboard from "./components/admin/Dashboard";
import AuthProvider from "./components/admin/AuthProvider";
import RequireAuth from "./components/admin/RequireAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";
import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";
import Product from "./components/core/Product";
import Cart from "./components/core/Cart";
import Success from "./components/core/Success";
import Orders from "./components/admin/Orders";

const RenderRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='signIn' element={<SignIn />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='product/:productId' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='paysuccess' element={<Success />} />
          <Route
            path='user/dashboard'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='admin/dashboard'
            element={
              <RequireAdminAuth>
                <AdminDashboard />
              </RequireAdminAuth>
            }
          />
          <Route
            path='create/category'
            element={
              <RequireAdminAuth>
                <AddCategory />
              </RequireAdminAuth>
            }
          />
          <Route
            path='create/product'
            element={
              <RequireAdminAuth>
                <AddProduct />
              </RequireAdminAuth>
            }
          />
          <Route
            path='admin/orders'
            element={
              <RequireAdminAuth>
                <Orders />
              </RequireAdminAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default RenderRoutes;
