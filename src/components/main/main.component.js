import React from 'react';
import NavbarComponent from "./navbar/navbar.component";

import classes from './main.module.scss'
import {Route, Routes, Navigate} from "react-router-dom";
import CartComponent from "./cart/cart.component";
import CategoriesComponent from "./categories/categories.component";
import HomePageComponent from "./homePage/homePage.component";
import ProductsComponent from "./categories/products/products.component";
import DeliveryComponent from "./delivery/delivery.component";
import ContactsComponent from "./contacts/contacts.component";
import ForWholesalersComponent from "./forWholesalers/forWholesalers.component";
import ProductComponent from "./product/product.component";
import UserCabinetComponent from "./userCabinet/userCabinet.component";
// import PrivateRoute from "../../utils/PrivateRoute"; // TODO invalid navigation
import OrderComponent from "./cart/order.component";
// import AdminRoute from "../../utils/AdminRoute"; // TODO invalid navigation
import AdminComponent from "./admin/admin.component";
import FavouritesComponent from "./favourites/favourites.component";
import AboutUsComponent from "./aboutUs/aboutUs.component";
import PersonalInfoComponent from "./userCabinet/components/personalInfo/personalInfo.component";
import OrderHistoryComponent from "./userCabinet/components/orderHistory/orderHistory.component";
import ChangePasswordComponent from "./userCabinet/components/changePassword/changePassword.component";
import AdminProductsComponent from "./admin/products/adminProducts.component";
import AdminSupplyComponent from "./admin/supply/adminSupply.component";
import AdminNewSupplyComponent from "./admin/supply/adminNewSupply.component";
import AdminInventoryComponent from "./admin/inventory/adminInventory.component";
import AdminInventoryProductsComponent from "./admin/inventory/adminInventoryProducts.component";
import AdminSupplyProductsComponent from "./admin/supply/adminSupplyProducts.component";
import AdminNewInventoryComponent from "./admin/inventory/adminNewInventory.component";
import AdminOrdersComponent from "./admin/orders/adminOrders.component";
import AdminOrderInfoComponent from "./admin/orders/adminOrderInfo.component";

function MainComponent() {
    return (
        <div>
            <NavbarComponent/>
            <div className={classes.mainWrapper}>
                <Routes>
                    <Route path={"/"} element={<HomePageComponent/>}/>
                    <Route path={"/categories"} element={<CategoriesComponent/>}/>
                    <Route path={"/categories/:id"} element={<ProductsComponent/>}/>
                    <Route path={"/product/:id"} element={<ProductComponent/>}/>
                    <Route path={"/cart"} element={<CartComponent/>}/>
                    <Route path={"/delivery"} element={<DeliveryComponent/>}/>
                    <Route path={"/about-us"} element={<AboutUsComponent/>}/>
                    <Route path={"/contacts"} element={<ContactsComponent/>}/>
                    <Route path={"/for-wholesalers"} element={<ForWholesalersComponent/>}/>
                    <Route path={"/favourites"} element={<FavouritesComponent/>}/>
                    {/*<Route element={<PrivateRoute/>}>*/}
                        <Route path={"/user"} element={<UserCabinetComponent/>}>
                            <Route index element={<Navigate to="personal-info" replace />} />
                            <Route path={"personal-info"} element={<PersonalInfoComponent/>}/>
                            <Route path={"order-history"} element={<OrderHistoryComponent/>}/>
                            <Route path={"change-password"} element={<ChangePasswordComponent/>}/>
                        </Route>
                        {/*<Route element={<AdminRoute/>}>*/}
                            <Route path={"/user/admin"} element={<AdminComponent/>}>
                                <Route index element={<Navigate to="products" replace />} />
                                <Route path={"products"} element={<AdminProductsComponent/>}/>
                                <Route path={"orders"} element={<AdminOrdersComponent/>}/>
                                <Route path={"orders/:id"} element={<AdminOrderInfoComponent/>}/>
                                <Route path={"supply"} element={<AdminSupplyComponent/>}/>
                                <Route path={"supply/:id"} element={<AdminSupplyProductsComponent/>}/>
                                <Route path={"new-supply"} element={<AdminNewSupplyComponent/>}/>
                                <Route path={"inventory"} element={<AdminInventoryComponent/>}/>
                                <Route path={"inventory/:id"} element={<AdminInventoryProductsComponent/>}/>
                                <Route path={"new-inventory"} element={<AdminNewInventoryComponent/>}/>

                            </Route>
                        {/*</Route>*/}
                    {/*</Route>*/}
                    <Route path={"/cart/order"} element={<OrderComponent/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default MainComponent;