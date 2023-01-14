import classes from "./adminProduct.module.scss";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AllianceTextField} from "../../../../UI/styles";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminProductPackagingForm({
                                       packaging,
                                       handlePackaging,
                                       packagingErr,
                                       handleAddPackaging,
                                       handleRemovePackaging
                                   }) {
    return (
        <div className={classes.specifications}>
            <div className={classes.specificationsTitle}>
                <p>Пакування</p>
                <IconButton onClick={handleAddPackaging}>
                    <AddIcon/>
                </IconButton>
            </div>
            <div className={classes.specificationsList}>
                {packaging.map((item, index) => {
                    return (
                        <div className={classes.specificationsItem} key={index}>
                            <AllianceTextField
                                label={"Тип"}
                                name={"type"}
                                value={item.type}
                                onChange={(event) => handlePackaging(event, index)}
                                error={packagingErr[index]["type"]}
                            />
                            <AllianceTextField
                                label={"Кількість"}
                                name={"amount"}
                                value={item.amount}
                                onChange={(event) => handlePackaging(event, index)}
                                error={packagingErr[index]["amount"]}
                            />
                            <IconButton
                                onClick={() => handleRemovePackaging(index)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default AdminProductPackagingForm;