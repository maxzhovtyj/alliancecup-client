import {useSnackbarContext} from "../../../../context/SnackbarContext";
import {useState} from "react";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import useOrder from "../../../../hooks/useOrder";

import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AllianceTextField} from "../../../../UI/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoCompleteSelect from "../../../../UI/autoCompleteSelect/autoCompleteSelect";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import OrderInfo from "../../orders/orderInfo";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import {ProductService} from "../../../../service/ProductService";
import {OrderService} from "../../../../service/OrderService";
import {ShoppingService} from "../../../../service/ShoppingService";

import classes from './adminOrder.module.scss'

function AdminNewOrderComponent() {
    const snackbar = useSnackbarContext()

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const [disabled, setDisabled] = useState(false)
    const [productsOptions, setProductsOptions] = useState([])
    const [products, setProducts] = useState([
        {
            id: null,
            product: null,
            quantity: 0,
            price: 0,
            priceForQuantity: 0,
        }
    ])
    const [productsErr, setProductsErr] = useState([
        {
            id: false,
            product: false,
            quantity: false,
            price: false,
            priceForQuantity: false,
        }
    ])

    const [deliveryTypes,
        paymentTypes,
        handleOrderInfo,
        handleCities,
        handleSetCityValue,
        handleSetDepartmentValue,
        orderInfo,
        isNovaPoshta,
        isInTown,
        cities,
        city,
        departments,
        department] = useOrder(setShowDialog)

    const [address, setAddress] = useState(null)

    const [errors, setErrors] = useState({
        lastName: false,
        firstName: false,
        middleName: false,
        phone: false,
        email: false,
        deliveryTypeTitle: false,
        paymentTypeTitle: false,
        novaPoshtaCity: false,
        novaPoshtaDepartment: false,
        deliveryAddress: false
    })

    const handleSetProductIdValue = (index, newValue) => {
        let values = [...products]
        if (newValue?.id) {
            values[index]["id"] = newValue.id
            values[index]["product"] = newValue
            values[index]["price"] = newValue.price
            values[index]["priceForQuantity"] = newValue.price * values[index]["quantity"]
            setProducts(values)
        } else {
            values[index]["id"] = null
            values[index]["product"] = null
            values[index]["price"] = 0
            values[index]["priceForQuantity"] = 0
            setProducts(values)
        }
        setProductsOptions([])
        setShowDialog(true)
    }

    const handleProductsOptions = (event) => {
        ProductService.search(event.target.value).then(res => {
            if (res.data) {
                setProductsOptions(res.data)
            }
        })
        setShowDialog(true)
    }

    const handleProduct = (event, index) => {
        let values = [...products]
        const quantity = parseFloat(event.target.value) || 0
        values[index][event.target.name] = quantity
        values[index]["priceForQuantity"] = quantity * values[index]["price"]
        setProducts(values)
        setShowDialog(true)
    }

    const handleRemoveProduct = (index) => {
        const values = [...products]
        values.splice(index, 1)
        setProducts(values)

        const valuesErr = [...productsErr]
        valuesErr.splice(index, 1)
        setProductsErr(valuesErr)
        setShowDialog(true)
    }

    const handleAddProduct = () => {
        setProducts([...products, {
            id: null,
            product: null,
            quantity: 0,
            price: 0,
            priceForQuantity: 0,
        }])

        setProductsErr([...productsErr, {
            id: false,
            product: false,
            quantity: false,
            price: false,
            priceForQuantity: false,
        }])
        setShowDialog(true)
    }

    const validateProducts = () => {
        let tmp = [
            ...products.map(item => {
                return {
                    id: !item.id,
                    product: !item.product,
                    quantity: !item.quantity,
                    price: !item.price,
                    priceForQuantity: !item.priceForQuantity,
                }
            })
        ]

        setProductsErr([
            ...tmp
        ])

        return tmp
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)
    }

    function makeOrder() {
        if (!validateProducts()) {
            snackbar.handleClick()
            snackbar.setMessage("Ви не заповнили потрібні поля")
            return;
        }

        if (!OrderService.validate(orderInfo, isNovaPoshta, city, department, isInTown, address, setErrors)) {
            snackbar.handleClick()
            snackbar.setMessage("Ви не заповнили потрібні поля")
            return;
        }

        const makeOrderForm = {
            order: {
                userLastname: orderInfo.lastName,
                userFirstname: orderInfo.firstName,
                userMiddleName: orderInfo.middleName,
                userPhoneNumber: orderInfo.phone,
                userEmail: orderInfo.email,
                deliveryTypeTitle: orderInfo.deliveryTypeTitle,
                paymentTypeTitle: orderInfo.paymentTypeTitle,
                delivery: {}
            }
        }

        if (isNovaPoshta) {
            if (city === "" || department === "") {
                snackbar.handleClick()
                snackbar.setMessage("Ви не заповнили усі поля")
                return
            }

            makeOrderForm.order.delivery["Місто"] = city.Description
            makeOrderForm.order.delivery["Відділення"] = department.Description
        }

        if (isInTown) {
            if (address === "") {
                snackbar.handleClick()
                snackbar.setMessage("Ви не заповнили усі поля")
                return
            }

            makeOrderForm.order.delivery["Адреса"] = address
        }

        makeOrderForm.products = products

        setDisabled(true)
        ShoppingService.newOrder(makeOrderForm, true)
            .then((res) => {
                if (res?.status === 200 || res?.status === 201) {
                    setDisabled(true)
                    snackbar.setMessage("Замовлення успішно створено")
                    snackbar.handleClick()
                } else {
                    snackbar.setMessage(res?.message)
                    snackbar.handleClick()
                }
                setDisabled(false)
            })
    }

    // noinspection JSValidateTypes
    return (
        <div>
            <RouterDialog
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />
            <p className={classes.pageTitle}>Нове замовлення</p>
            <div className={classes.newOrderInfoWrapper}>
                <OrderInfo
                    orderInfo={orderInfo}
                    handleOrderInfo={handleOrderInfo}
                    errors={errors}
                    deliveryTypes={deliveryTypes}
                    paymentTypes={paymentTypes}
                    isNovaPoshta={isNovaPoshta}
                    isInTown={isInTown}
                    setAddress={setAddress}
                    selectCities={{cities, handleCities, city, handleSetCityValue}}
                    selectDepartments={{departments, department, handleSetDepartmentValue}}
                />
            </div>
            <AllianceButton
                onClick={handleAddProduct}
                mb={"2rem"}
                mt={"2rem"}
                align={"left"}
            >
                Додати товар
            </AllianceButton>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Товар</TableCell>
                            <TableCell align={"center"}>Ціна</TableCell>
                            <TableCell align={"center"}>Кількість</TableCell>
                            <TableCell align={"center"}>Сума</TableCell>
                            <TableCell align={"center"}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (products)
                                ?
                                products.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.product?.id}</TableCell>
                                        <TableCell align={"center"}>
                                            <AutoCompleteSelect
                                                options={productsOptions}
                                                onChange={handleProductsOptions}
                                                setValue={(event, newValue) => handleSetProductIdValue(index, newValue)}
                                                getOptionLabel={option => option.productTitle}
                                                noOptionsText={"Товарів не знайдено"}
                                                IsOptionEqualToValue={() => true}
                                                error={productsErr[index].product && productsErr[index].id}
                                            />
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {row.product?.price || 0} грн
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <AllianceTextField
                                                name={"quantity"}
                                                value={row.quantity}
                                                onChange={(event) => handleProduct(event, index)}
                                                error={productsErr[index].quantity}
                                            />
                                        </TableCell>
                                        <TableCell align={"center"}>{row.priceForQuantity}</TableCell>
                                        <TableCell align={"center"}>
                                            <IconButton onClick={() => handleRemoveProduct(index)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : " "
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <AllianceButton disabled={disabled} onClick={makeOrder} mb={"1rem"}>
                Виконати замовлення
            </AllianceButton>
        </div>
    );
}

export default AdminNewOrderComponent;
