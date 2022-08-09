import "tailwindcss/dist/base.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginRegister from "./components/Auth/UserLoginRegister/LoginRegister.jsx";
import Sidebar from "components/AppAdminDashboard/sidebar/Sidebar.jsx";
import Topnav from "components/AppAdminDashboard/topnav/TopNav.jsx";
import DRoutes from "components/AppAdminDashboard/Routes.jsx";
import ForgetPassword from "components/Auth/ForgetPassword/ForgetPassword.jsx";
import PasswordReset from "components/Auth/PasswordReset/index.jsx";
import Home from "pages/company/CompanyHome.jsx";
import Logout from "pages/company/Logout.jsx";
import UserProfile from "pages/company/UserProfile.jsx";
import Connect from "pages/company/Connect.jsx";
import Rapport from "pages/company/Rapport.jsx";
import Product from "pages/Product.jsx";
import ListMarchandiseur from "components/marchandiseur/ListMarchandiseur.js";
import EditMarchandiseur from "components/marchandiseur/EditMarchandiseur.js";
import ListTache from "components/tache/ListTache.js";
import EditTache from "components/tache/EditTache.js";
import EditProducts from "components/products/EditProducts.jsx";
import MapTache from "components/tache/MapTache.js";

export default function App(props) {


  const user = localStorage.getItem("token");

  
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
			<Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      {user && <Route path="/home/Product" element={<Product />} /> }
      {user && <Route path="/home/tache" element={<ListTache />} /> }
      {user && <Route path="/home/tache/:addressT" element={<ListTache />} /> }
      {user && <Route path="/tache/edit/:id" element={<EditTache />} /> }
      {user && <Route path="/home/tache/MapTache" element={<MapTache />} /> }

      {user && <Route path="/home/ListMarchandiseur" element={<ListMarchandiseur />} /> }
      {user && <Route path="/ListMarchandiseur/edit/:id" element={<EditMarchandiseur />} /> }
      
      {user && <Route path="/EditProducts/edit/:id" element={<EditProducts />} />}


      {user && <Route path="/home" element={<Home />} />}
      {user && <Route path="/logout" element={<Logout />} />}
      {user && <Route path="/Connect" element={<Connect />} /> }
      {user && <Route path="/profile" element={<UserProfile />} /> }
      {user && <Route path="/home/rapport" element={<Rapport />} /> }

      {user && (
        <Route
          path="/*"
          element={
            <div
              className="layout">
              <Sidebar {...props}/>
              <div className="layout__content">
                <Topnav />
                <div className="layout__content-main">
                  <DRoutes />
                </div>
              </div>
            </div>
          }
        />
      )}

    </Routes>
  );
}
