import React from 'react';
import {useParams} from "react-router-dom";

function AdminOrderInfoComponent(props) {
    const {id} = useParams()

    return (
        <div>Order id: {id}</div>
    );
}

export default AdminOrderInfoComponent;