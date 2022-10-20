import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserOrders} from "../../../../../redux/userRedux/userFetch";
import OrderItem from "./orderItem/orderItem";

function OrderHistoryComponent() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.user.orders)

    useEffect(() => {
        dispatch(fetchUserOrders())
    }, [dispatch])
    return (
        <div>
            <p>Історія замовлень</p>
            <div>
                {
                    orders?.length
                        ? orders.map(item => <OrderItem key={item.info.id} order={item}/>)
                        : <p>У вас поки що немає замовлень</p>
                }
            </div>
        </div>
    );
}

export default OrderHistoryComponent;