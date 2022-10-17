import {getUserOrdersActionCreator} from "./userReducer";
import {UserService} from "../../service/UserService";

export const fetchUserOrders = () => {
    return async (dispatch) => {
        await UserService.orders().then(res => {
            dispatch(getUserOrdersActionCreator(res.data))
        })
    }
}
