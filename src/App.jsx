import { useContext, useState } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./pages/Root";
import Products, { getAllProducts } from "./pages/Public/Products/Products";
import About from "./pages/Public/About";
import Contact from "./pages/Public/Contact";
import Register from "./pages/Public/Register";
import Login from "./pages/Public/Login";
import Profile from "./pages/Private/Profile";
import RequireAuth from "./utils/RequireAuth";
import AuthContext from "./context/AuthContext";
import AutoLogin from "./utils/AutoLogin";
import ProductPage, {
  loader as productLoader,
} from "./pages/Public/Products/Product";
import ErrorPage from "./pages/ErrorElement/ErrorElement";
import PasswordReset from "./pages/Public/PasswordReset";
import ForgotPassword from "./pages/Public/ForgotPassword";

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route element={<AutoLogin />}>
          <Route errorElement={<ErrorPage />}>
            <Route index loader={getAllProducts} element={<Products />} />
            <Route
              path="/products/:productId"
              element={<ProductPage />}
              loader={productLoader}
            />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path='purchase' element={<PurchasePage />} />
            <Route path='password-reset' element={<PasswordReset/>}/>
            <Route path='forgot-password/:id' element={<ForgotPassword/>}/>
            <Route element={<RequireAuth user={user} />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path='*' element={<div>Not Found 404</div>} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
