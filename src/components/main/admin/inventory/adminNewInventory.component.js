import React, {useEffect, useState} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsToInventory} from "../../../../redux/adminRedux/adminFetch";
import {AllianceTextField, muiTextBtnTheme} from "../../../../UI/styles";
import {ThemeProvider} from "@mui/material/styles";

import classes from './inventory.module.scss'

function AdminNewInventoryComponent() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.products)

    const [inventory, setInventory] = useState([])
    const [inventorySum, setInventorySum] = useState(0)

    const handleInventoryState = (event, index) => {
        let values = [...inventory]

        if (event.target.name === "realAmount") {
            const productPrice = values[index]["productPrice"]
            const realAmount = event.target.value
            const currentAmount = values[index]["currentAmount"]
            const difference = realAmount - currentAmount

            values[index][event.target.name] = Number(realAmount) || 0
            values[index]["realAmountPrice"] = realAmount * productPrice
            values[index]["difference"] = difference
            values[index]["differencePrice"] = difference * productPrice
        }

        setInventory(values)
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
            realAmount: 0,
            realAmountPrice: 0,
            difference: 0,
            differencePrice: 0
        })))
    }, [products])

    const doInventory = () => {
        console.log(inventory)
    }

    // TODO sum counting
    const countInventorySum = (values) => {
        let sum = 0
        for (let i = 0; i < values.length; i++) {
            sum += values[i].differencePrice
        }

        return sum
    }

    return (
        <div>
            <p>Нова інвентаризація</p>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
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
                        {
                            (inventory)
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
                                            {row.lastInventory?.split(/T|Z/).join(" ") || "---"}
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
                                :
                                <TableRow>
                                    <TableCell align="left">Немає товарів</TableCell>
                                </TableRow>
                        }
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
                <ThemeProvider theme={muiTextBtnTheme}>
                    <div style={{display: "flex", justifyContent: "left", marginBottom: "2rem"}}>
                        <Button
                            variant={"outlined"}
                            color="alliance"
                            onClick={doInventory}
                        >
                            Провести інвентаризацію
                        </Button>
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default AdminNewInventoryComponent;