import classes from "../categories/categories.module.scss";
import CategoriesComponent from "../categories/categories.component";

function HomePageComponent() {
    return (
        <div>
            <div className={classes.categoriesList}>
                <CategoriesComponent/>
            </div>
        </div>
    );
}

export default HomePageComponent;