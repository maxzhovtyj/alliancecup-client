import classes from "../components/main/product/product.module.scss";

export function OrderInfo() {
    return (
        <div className={classes.orderInfo}>
            <p>Доставка</p>
            <ul>
                <li>Самовивіз</li>
                <li>Доставка Новою Поштою</li>
                <li>Доставка по м. Рівне</li>
            </ul>

            <p>Оплата</p>
            <ul>
                <li>Готівкою при отриманні</li>
                <li>Приват 24</li>
                <li>Монобанк</li>
            </ul>
        </div>
    );
}
