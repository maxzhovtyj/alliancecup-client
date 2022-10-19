import classes from "../categories/categories.module.scss";
import CategoriesComponent from "../categories/categories.component";

function HomePageComponent() {
    return (
        <div>
            <p>Тут потрібно додати щось круте</p>
            <div className={classes.categoriesList}>
                <CategoriesComponent/>
            </div>
            <p>Тут можна додати акційні товари</p>
        </div>
    );
}

export default HomePageComponent;