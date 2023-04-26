import React, { useState } from "react";
import styles from "./Layout.module.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../component/header/Header";
import Sidebar from "../component/sidebar/Sidebar";
import Dashboard from "../pages/dashboard/Dashboard";
import Brand from "../pages/brand/Brand";
import Category from "../pages/category/Category";
import User from "../pages/user/User";
import Profile from "../pages/user/profile/Profile";
import Product from "../pages/product/Product";
import ProductDetail from "../modules/products/productDetail/ProductDetail";
import UpdateBrand from "../pages/brand/update/UpdateBrand";
import UpdateCategory from "../pages/category/update/UpdateCategory";
import UpdateUser from "../pages/user/update/UpdateUser";
import UpdateProduct from "../pages/product/update/UpdateProduct";
import CreateBrand from "../pages/brand/create/CreateBrand";
import CreateCategory from "../pages/category/create/CreateCategory";
import CreateUser from "../pages/user/create/CreateUser";
import CreateProduct from "../pages/product/create/CreateProduct";
import Aggrement from "../pages/aggrement/Aggrement";
import CreateAggrement from "../pages/aggrement/create/CreateAggrement";
import UpdateAggrement from "../pages/aggrement/update/UpdateAggrement";
import checkRole from "../helpers/checkRole";
import CreateSupplier from "../pages/supplier/create/CreateSupplier";
import UpdateSupplier from "../pages/supplier/update/UpdateSupplier";
import Supplier from "../pages/supplier/Supplier";
import UpdateCustomer from "../pages/customer/update/UpdateCustomer";
import CreateCustomer from "../pages/customer/create/CreateCustomer";
import Customer from "../pages/customer/Customer";
import UpdatePromotion from "../pages/promotion/update/UpdatePromotion";
import CreatePromotion from "../pages/promotion/create/CreatePromotion";
import Promotion from "../pages/promotion/Promotion";
import UpdateSupport from "../pages/support/update/UpdateSupport";
import CreateSupport from "../pages/support/create/CreateSupport";
import Support from "../pages/support/Support";
import UpdateImport from "../pages/import/update/UpdateProduct";
import Import from "../pages/import/Import";
import CreateImport from "../pages/import/create/CreateImport";


export default function Layout() {
  // const renderRoutes = (routes) => {
  //   routes.map((route) => (
  //     <Route key={route.path} path={route.path} element={route.element} />
  //   ));
  // };

  const [expand, setExpand] = useState(true);
  const [slideNav, setSlideNav] = useState(false);

  const handleClickSlide = () => {
    setExpand(true);
    setSlideNav(!slideNav);
  };

  const handleClickExpand = () => {
    setExpand(!expand);
  };

  const currentRole = checkRole(
    JSON.parse(localStorage.getItem("currentUser")).role_id
  );

  return (
    <div className={styles.app}>
      <Header
        onClickSlide={handleClickSlide}
        onClickExpand={handleClickExpand}
        statusExpand={expand}
      />
      <div
        style={{
          width: expand ? "260px" : "70px",
          transform: slideNav ? "translateX(100%)" : "none",
        }}
        className={styles.sidebar}
      >
        <Sidebar statusExpand={expand} type={currentRole} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/brands">
              <Route path="update">
                <Route path=":brandID" element={<UpdateBrand />} />
              </Route>
              <Route path="create" element={<CreateBrand />} />
              <Route path="view" element={<Brand />} />
            </Route>
            <Route path="/suppliers">
              <Route path="update">
                <Route path=":supplierID" element={<UpdateSupplier />} />
              </Route>
              <Route path="create" element={<CreateSupplier />} />
              <Route path="view" element={<Supplier />} />
            </Route>
            <Route path="/categories">
              <Route path="update">
                <Route path=":cateId" element={<UpdateCategory />} />
              </Route>
              <Route path="create" element={<CreateCategory />} />
              <Route path="view" element={<Category />} />
            </Route>
            <Route path="/supports">
              <Route path="update">
                <Route path=":supportId" element={<UpdateSupport />} />
              </Route>
              <Route path="create" element={<CreateSupport />} />
              <Route path="view" element={<Support />} />
            </Route>
            <Route path="/promotions">
              <Route path="update">
                <Route path=":promotionId" element={<UpdatePromotion />} />
              </Route>
              <Route path="create" element={<CreatePromotion />} />
              <Route path="view" element={<Promotion />} />
            </Route>
            <Route path="/users">
              <Route path="profile" element={<Profile />} />
              <Route path="update">
                <Route path=":username" element={<UpdateUser />} />
              </Route>
              <Route path="view" element={<User />} />
              <Route path="create" element={<CreateUser />} />
            </Route>
            <Route path="/customers">
              <Route path="profile" element={<Profile />} />
              <Route path="update">
                <Route path=":username" element={<UpdateCustomer />} />
              </Route>
              <Route path="view" element={<Customer />} />
              <Route path="create" element={<CreateCustomer />} />
            </Route>
            <Route path="/imports">
              <Route path="profile" element={<Profile />} />
              <Route path="update">
                <Route path=":importtId" element={<UpdateImport />} />
              </Route>
              <Route path="view" element={<Import />} />
              <Route path="create" element={<CreateImport />} />
            </Route>
            <Route path="/products">
              <Route path=":productId/*" element={<ProductDetail />}></Route>
              <Route path="update">
                <Route path=":productId" element={<UpdateProduct />} />
              </Route>
              <Route path="view" element={<Product />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
            <Route path="/aggrements">
              <Route path="update">
                <Route path=":aggrementId" element={<UpdateAggrement />} />
              </Route>
              <Route path="create" element={<CreateAggrement />} />
              <Route path="view" element={<Aggrement />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          {/* <Outlet /> */}
        </div>
        {/* Footer */}
        <section className={styles.footer}>
          <span>Copyright &copy; ABC-Enterprise.com 2022</span>
          <span>
            All Right Reserved by{" "}
            <a
              href="https://www.facebook.com/GreenwichVietnam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Greenwich Vietnam
            </a>{" "}
            from FPT Group.
          </span>
        </section>
      </div>
    </div>
  );
}
