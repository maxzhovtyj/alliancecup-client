import {useBurgerContext} from "../../context/BurgerContext";
import {Route, Routes, Navigate} from "react-router-dom";

import PrivateRoute from "../../utils/PrivateRoute";
import AdminRoute from "../../utils/AdminRoute";
import NavbarComponent from "./navbar/navbar.component";
import CartComponent from "./cart/cart.component";
import CategoriesComponent from "./categories/categories.component";
import HomePageComponent from "./homePage/homePage.component";
import ProductsComponent from "./products/products.component";
import DeliveryComponent from "./delivery/delivery.component";
import ContactsComponent from "./contacts/contacts.component";
import ForWholesalersComponent from "./forWholesalers/forWholesalers.component";
import ProductComponent from "./product/product.component";
import UserCabinetComponent from "./userCabinet/userCabinet.component";
import OrderComponent from "./orders/order.component";
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
import AdminNewOrderComponent from "./admin/orders/adminNewOrder.component";
import AdminNewProductComponent from "./admin/products/adminNewProduct.component";
import AdminCategoriesComponent from "./admin/categories/adminCategories.component";
import AdminNewCategory from "./admin/categories/adminNewCategory";
import SuperAdminRoute from "../../utils/SuperAdminRoute";
import PageWasNotFound from "../errorPages/pageWasNotFound";
import PermissionForbidden from "../errorPages/permissionForbidden";
import AdminModeratorsComponent from "./admin/moderators/adminModerators.component";
import AdminNewModeratorComponent from "./admin/moderators/adminNewModerator.component";
import AdminNewFiltrationItemComponent from "./admin/categories/adminNewFiltrationItem.component";
import RestorePasswordComponent from "./restorePassword/restorePassword.component";
import AdminUpdateProductComponent from "./admin/products/adminUpdateProduct.component";
import AdminUpdateCategoryComponent from "./admin/categories/adminUpdateCategory.component";
import AdminUpdateFiltrationItemComponent from "./admin/categories/adminUpdateFiltrationItem.component";
import BurgerMenuComponent from "../burgerMenu/burgerMenu.component";

import classes from './main.module.scss'

function MainComponent() {
    const {showBurger} = useBurgerContext()

    return (
        <div>
            <NavbarComponent/>
            <main className={[classes.mainWrapper, (showBurger) ? classes.activeBurger : ""].join(" ")}>
                <Routes>
                    <Route path={"/"} element={<HomePageComponent/>}/>
                    <Route path={"/categories"} element={<CategoriesComponent/>}/>
                    <Route path={"/products"} element={<ProductsComponent/>}/>
                    <Route path={"/product/:id"} element={<ProductComponent/>}/>
                    <Route path={"/cart"} element={<CartComponent/>}/>
                    <Route path={"/delivery"} element={<DeliveryComponent/>}/>
                    <Route path={"/about-us"} element={<AboutUsComponent/>}/>
                    <Route path={"/contacts"} element={<ContactsComponent/>}/>
                    <Route path={"/for-wholesalers"} element={<ForWholesalersComponent/>}/>
                    <Route path={"/favourites"} element={<FavouritesComponent/>}/>
                    <Route path={"/restore-password"} element={<RestorePasswordComponent/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path={"/user"} element={<UserCabinetComponent/>}>
                            <Route index element={<Navigate to="personal-info" replace/>}/>
                            <Route path={"personal-info"} element={<PersonalInfoComponent/>}/>
                            <Route path={"order-history"} element={<OrderHistoryComponent/>}/>
                            <Route path={"change-password"} element={<ChangePasswordComponent/>}/>
                        </Route>
                        <Route element={<AdminRoute/>}>
                            <Route path={"/user/admin"} element={<AdminComponent/>}>
                                <Route index element={<Navigate to="products" replace/>}/>
                                <Route path={"products"} element={<AdminProductsComponent/>}/>
                                <Route path={"update-product/:id"} element={<AdminUpdateProductComponent/>}/>
                                <Route path={"new-product"} element={<AdminNewProductComponent/>}/>

                                <Route path={"categories"} element={<AdminCategoriesComponent/>}/>
                                <Route path={"new-category"} element={<AdminNewCategory/>}/>
                                <Route path={"update-category/:id"} element={<AdminUpdateCategoryComponent/>}/>
                                <Route path={"new-filtration"} element={<AdminNewFiltrationItemComponent/>}/>
                                <Route path={"update-filtration/:id"} element={<AdminUpdateFiltrationItemComponent/>}/>

                                <Route path={"orders"} element={<AdminOrdersComponent/>}/>
                                <Route path={"orders/:id"} element={<AdminOrderInfoComponent/>}/>
                                <Route path={"new-order"} element={<AdminNewOrderComponent/>}/>

                                <Route path={"supply"} element={<AdminSupplyComponent/>}/>
                                <Route path={"supply/:id"} element={<AdminSupplyProductsComponent/>}/>
                                <Route path={"new-supply"} element={<AdminNewSupplyComponent/>}/>

                                <Route element={<SuperAdminRoute/>}>
                                    <Route path={"moderators"} element={<AdminModeratorsComponent/>}/>
                                    <Route path={"new-moderator"} element={<AdminNewModeratorComponent/>}/>

                                    <Route path={"inventory"} element={<AdminInventoryComponent/>}/>
                                    <Route path={"inventory/:id"} element={<AdminInventoryProductsComponent/>}/>
                                    <Route path={"new-inventory"} element={<AdminNewInventoryComponent/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path={"/cart/order"} element={<OrderComponent/>}/>
                    <Route path={"*"} element={<PageWasNotFound/>}/>
                    <Route path={"/permission-forbidden"} element={<PermissionForbidden/>}/>
                </Routes>
                <BurgerMenuComponent/>
            </main>
        </div>
    );
}

export default MainComponent;
