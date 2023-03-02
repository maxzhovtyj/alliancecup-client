import {useEffect, useState} from 'react';
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsToInventory} from "../../../../redux/adminRedux/adminFetch";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

import {AllianceTextField} from "../../../../UI/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import {UserService} from "../../../../service/UserService";
import {AdminService} from "../../../../service/AdminService";

import classes from './inventory.module.scss'

function AdminNewInventoryComponent() {
    const snackbar = useSnackbarContext()

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.products)

    const [disabledBtn, setDisabledBtn] = useState(false)

    const [inventory, setInventory] = useState([])
    const [inventorySum, setInventorySum] = useState(0)

    const handleInventoryState = (event, index) => {
        let values = [...inventory]

        if (event.target.name === "realAmount") {
            const productPrice = values[index]["productPrice"]
            const realAmount = parseInt(event.target.value)
            const currentAmount = values[index]["currentAmount"]
            const difference = realAmount - currentAmount

            values[index][event.target.name] = Number(realAmount) || 0
            values[index]["realAmountPrice"] = parseFloat((realAmount * productPrice).toFixed(2)) || 0
            values[index]["difference"] = difference || 0
            values[index]["differencePrice"] = difference * productPrice || 0
        }

        setInventory(values)
        setShowDialog(true)
    }

    useEffect(() => {
        setInventorySum(countInventorySum(inventory))
    }, [inventory])

    useEffect(() => {
        dispatch(fetchProductsToInventory())
    }, [dispatch])

    useEffect(() => {
        setInventory(products.map(item => ({
            ...item,
            realAmount: item.realAmount || 0,
            realAmountPrice: item.realAmountPrice || 0,
            difference: item.difference || 0,
            differencePrice: item.differencePrice || 0
        })))
    }, [products])

    const doInventory = () => {
        setDisabledBtn(true)
        AdminService.doInventory(inventory).then(res => {
            if (res?.status === 201 || res?.status === 200) {
                snackbar.setMessage("Товари успішно проінвентаризовано")
                snackbar.handleClick()
                setShowDialog(false)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
            setDisabledBtn(false)
        })
    }

    const saveInventory = () => {
        setDisabledBtn(true)
        AdminService.saveInventoryProducts(inventory).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Інвентаризацію збережено")
                snackbar.handleClick()
                setShowDialog(false)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
            setDisabledBtn(false)
        })
    }

    const countInventorySum = (values) => {
        let sum = 0
        for (let i = 0; i < values.length; i++) {
            if (values[i].differencePrice !== "") {
                sum += values[i].differencePrice
            }
        }

        return parseFloat(sum.toFixed(2))
    }

    return (
        <div>
            <RouterDialog
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />

            <p>Нова інвентаризація</p>

            <TableContainer component={AlliancePaper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Товар</TableCell>
                            <TableCell align={"center"}>Ціна</TableCell>
                            <TableCell align={"center"}>Ост. перевірка</TableCell>
                            <TableCell align={"center"}>Початк. залишок</TableCell>
                            <TableCell align={"center"}>Надходження</TableCell>
                            <TableCell align={"center"}>Витрати</TableCell>
                            <TableCell align={"center"}>Списання</TableCell>
                            <TableCell align={"center"}>Списання, грн</TableCell>
                            <TableCell align={"center"}>План. залишок</TableCell>
                            <TableCell align={"center"}>Факт. залишок</TableCell>
                            <TableCell align={"center"}>Факт. залишок, грн</TableCell>
                            <TableCell align={"center"}>Різниця</TableCell>
                            <TableCell align={"center"}>Різниця, грн</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (inventory && inventory.length !== 0)
                                    ?
                                    inventory.map((row, index) => (
                                        <TableRow
                                            key={row.productId}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.productId}</TableCell>
                                            <TableCell align={"center"}>{row.title}</TableCell>
                                            <TableCell align={"center"}>{row.productPrice}</TableCell>
                                            <TableCell align={"center"}>
                                                {row.lastInventory ? UserService.truncTimestamp(row.lastInventory) : "---"}
                                            </TableCell>
                                            <TableCell align={"center"}>{row.initialAmount || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.currentSupply}</TableCell>
                                            <TableCell align={"center"}>{row.currentSpend}</TableCell>
                                            <TableCell align={"center"}>{row.currentWriteOff}</TableCell>
                                            <TableCell align={"center"}>{row.writeOffPrice}</TableCell>
                                            <TableCell align={"center"}>{row.currentAmount}</TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField
                                                    name={"realAmount"}
                                                    value={row.realAmount}
                                                    onChange={event => handleInventoryState(event, index)}
                                                />
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField
                                                    name={"realAmountPrice"}
                                                    value={inventory[index].realAmountPrice}
                                                    onChange={event => handleInventoryState(event, index)}

                                                />
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField
                                                    name={"difference"}
                                                    value={inventory[index]?.difference}
                                                    onChange={event => handleInventoryState(event, index)}
                                                />
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField
                                                    name={"differencePrice"}
                                                    value={inventory[index]?.differencePrice}
                                                    onChange={event => handleInventoryState(event, index)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="center">Немає товарів</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.inventoryBottomWrapper}>
                <div>
                    <span className={classes.inventorySumTitle}>Всього:</span>
                    <span className={classes.inventorySum}
                          style={inventorySum >= 0 ? {color: "green"} : {color: "red"}}
                    >
                        {inventorySum} ₴
                    </span>
                </div>

                <div className={classes.newInventoryButtons}>
                    <AllianceButton onClick={saveInventory} mb={"2rem"} disabled={disabledBtn}>
                        Зберегти інвентаризацію
                    </AllianceButton>

                    <AllianceButton onClick={doInventory} mb={"2rem"} disabled={disabledBtn}>
                        Провести інвентаризацію
                    </AllianceButton>
                </div>
            </div>
        </div>
    );
}

export default AdminNewInventoryComponent;
