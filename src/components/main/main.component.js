import React from 'react';
import NavbarComponent from "./navbar/navbar.component";

import classes from './main.module.scss'
import {Route, Routes} from "react-router-dom";
import CartComponent from "./cart/cart.component";
import CategoriesComponent from "./categories/categories.component";
import HomePageComponent from "./homePage/homePage.component";
import ProductsComponent from "./categories/products/products.component";
import DeliveryComponent from "./delivery/delivery.component";
import ContactsComponent from "./contacts/contacts.component";
import ForWholesalersComponent from "./forWholesalers/forWholesalers.component";
import ProductComponent from "./product/product.component";
import UserCabinetComponent from "./userCabinet/userCabinet.component";
import PrivateRoute from "../../utils/PrivateRoute";
import OrderComponent from "./cart/order.component";
import AdminRoute from "../../utils/AdminRoute";
import AdminComponent from "./admin/admin.component";
import FavouritesComponent from "./favourites/favourites.component";
import AboutUsComponent from "./aboutUs/aboutUs.component";
import PersonalInfoComponent from "./userCabinet/components/personalInfo/personalInfo.component";
import OrderHistoryComponent from "./userCabinet/components/orderHistory/orderHistory.component";
import ChangePasswordComponent from "./userCabinet/components/changePassword/changePassword.component";

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
                    <Route element={<PrivateRoute/>}>
                        <Route path={"/user"} element={<UserCabinetComponent/>}>
                            <Route path={"personal-info"} element={<PersonalInfoComponent/>}/>
                            <Route path={"order-history"} element={<OrderHistoryComponent/>}/>
                            <Route path={"change-password"} element={<ChangePasswordComponent/>}/>
                        </Route>
                        <Route element={<AdminRoute/>}>
                            <Route path={"/user/admin"} element={<AdminComponent/>}/>
                        </Route>
                    </Route>
                    <Route path={"/cart/order"} element={<OrderComponent/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default MainComponent;