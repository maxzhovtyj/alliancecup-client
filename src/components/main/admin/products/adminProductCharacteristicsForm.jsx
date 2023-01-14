import React from 'react';
import classes from "./adminProduct.module.scss";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AllianceTextField} from "../../../../UI/styles";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminProductCharacteristicsForm({
                                             characteristics,
                                             handleCharacteristics,
                                             handleAddCharacteristic,
                                             characteristicsErr,
                                             handleRemoveCharacteristics
                                         }) {
    return (
        <div className={classes.specifications}>
            <div className={classes.specificationsTitle}>
                <p>Характеристики</p>
                <IconButton onClick={handleAddCharacteristic}>
                    <AddIcon/>
                </IconButton>
            </div>
            <div className={classes.specificationsList}>
                {characteristics.map((item, index) => {
                    return (
                        <div className={classes.specificationsItem} key={index}>
                            <AllianceTextField
                                label={"Назва"}
                                name={"name"}
                                value={item.name}
                                onChange={(event) => handleCharacteristics(event, index)}
                                error={characteristicsErr[index]["name"]}
                            />
                            <AllianceTextField
                                label={"Опис"}
                                name={"description"}
                                value={item.description}
                                onChange={(event) => handleCharacteristics(event, index)}
                                error={characteristicsErr[index]["description"]}
                            />
                            <IconButton
                                onClick={() => handleRemoveCharacteristics(index)}
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

export default AdminProductCharacteristicsForm;