import {useState} from 'react';
import {AllianceTextField} from "../../../../UI/styles";

import classes from './supply.module.scss'
import {
    FormControl,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {SupplyService} from "../../../../service/SupplyService";
import AutoCompleteSelect from "../../../../UI/autoCompleteSelect/autoCompleteSelect";
import {ProductService} from "../../../../service/ProductService";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import AllianceSnackbar from "../../../../UI/snackbar";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import {DateTimePicker} from "@mui/x-date-pickers";

function AdminNewSupplyComponent() {
    const snackbar = useSnackbar()

    const [productsOptions, setProductsOptions] = useState([])

    const [supplyInfo, setSupplyInfo] = useState({
        supplier: '', comment: '', supplyTime: new Date(),
    })
    const [supplyInfoErr, setSupplyInfoErr] = useState({
        supplier: false,
    })

    const [paymentInfo, setPaymentInfo] = useState([
        {paymentType: "", paymentSum: 0},
    ])
    const [paymentErr, setPaymentErr] = useState([{
        paymentType: false, paymentSum: false,
    }])

    const [products, setProducts] = useState([
        {
            productId: null,
            packaging: "",
            amount: 0,
            priceForUnit: 0,
            sumWithoutTax: 0,
            tax: 0,
            totalSum: 0,
        },
    ])
    const [productsErr, setProductsErr] = useState([
        {
            productId: false,
            packaging: false,
            amount: false,
            priceForUnit: false,
            tax: false,
        },
    ])

    const handleSupplyInfo = (event) => {
        setSupplyInfo({...supplyInfo, [event.target.name]: event.target.value})
    }

    const handlePaymentInfo = (index, event) => {
        const values = [...paymentInfo]
        if (event.target.name === "paymentSum") {
            values[index][event.target.name] = parseFloat(event.target.value) || 0
        } else values[index][event.target.name] = event.target.value
        setPaymentInfo(values)
    }

    const handleAddPayment = () => {
        setPaymentInfo([...paymentInfo, {paymentType: "", paymentSum: 0}])
        setPaymentErr([...paymentErr, {paymentType: false, paymentSum: false}])
    }

    const handleRemovePayment = (index) => {
        const values = [...paymentInfo]
        values.splice(index, 1)
        setPaymentInfo(values)

        const valuesErr = [...paymentErr]
        valuesErr.splice(index, 1)
        setPaymentErr(valuesErr)
    }

    const handleProduct = (index, event) => {
        const values = [...products]
        if (event.target.name === "amount") {
            values[index][event.target.name] = parseFloat(event.target.value) || 0
        } else if (event.target.name === "priceForUnit") {
            values[index][event.target.name] = parseFloat(event.target.value) || 0
        } else if (event.target.name === "tax") {
            values[index][event.target.name] = parseFloat(event.target.value) || 0
        } else values[index][event.target.name] = event.target.value
        setProducts(values)
    }

    const handleAddProduct = () => {
        setProducts([...products, {
            productId: null,
            packaging: "",
            amount: 0,
            priceForUnit: 0,
            sumWithoutTax: 0,
            tax: 0,
            totalSum: 0,
        }])

        setProductsErr([...productsErr, {
            productId: false,
            packaging: false,
            amount: false,
            priceForUnit: false,
            tax: false,
        }])
    }

    const handleRemoveProduct = (index) => {
        const values = [...products]
        values.splice(index, 1)
        setProducts(values)

        const valuesErr = [...productsErr]
        valuesErr.splice(index, 1)
        setProductsErr(valuesErr)
    }

    const handlePriceWithoutTax = (price, index) => {
        const precise = HandleMoney(price)
        products[index]["sumWithoutTax"] = precise
        return precise
    }

    const handleTotalSum = (sum, tax, index) => {
        const precise = HandleMoney((sum * (tax / 100)) + sum)
        products[index]["totalSum"] = precise
        return precise
    }

    const handleProductsOptions = (event) => {
        ProductService.search(event.target.value).then(res => {
            if (res.data) {
                setProductsOptions(res.data)
            }
        })
    }

    const handleSetProductIdValue = (index, newValue) => {
        if (newValue?.id) {
            const values = [...products]
            values[index]["product"] = newValue
            values[index]["productId"] = newValue.id
            setProducts(values)
        } else {
            const values = [...products]
            values[index]["product"] = null
            values[index]["productId"] = null
            setProducts(values)
        }
    }

    const validate = (reqBody) => {
        let tmp = {}

        tmp.info = {
            supplier: !reqBody.info.supplier,
            supplyTime: !reqBody.info.supplyTime,
        }

        let paymentTotal = 0
        for (const paymentElement of reqBody.payment) {
            paymentTotal += paymentElement.paymentSum
        }

        let productsTotalSum = 0
        for (const productElement of reqBody.products) {
            productsTotalSum += productElement.totalSum
        }

        tmp.payment = [
            ...reqBody.payment.map(item => {
                return {
                    paymentType: !item.paymentType,
                    paymentSum: !(item.paymentSum && paymentTotal === productsTotalSum)
                }
            })
        ]

        tmp.products = [
            ...reqBody.products.map(item => {
                return {
                    productId: !item.productId,
                    packaging: !item.packaging,
                    amount: !item.amount,
                    priceForUnit: !item.priceForUnit,
                    tax: !(item.tax >= 0 && item.tax <= 100),
                }
            })
        ]


        setSupplyInfoErr({
            ...tmp.info
        })

        setPaymentErr([
            ...tmp.payment
        ])

        setProductsErr([
            ...tmp.products
        ])

        const infoValidate = (Object.values(tmp.info).every(value => value === false))
        const paymentValidate = tmp.payment
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)
        const productsValidate = tmp.products
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)

        return infoValidate && paymentValidate && productsValidate
    }

    // TODO wrong supply time parsing on server
    const createNewSupply = () => {
        const reqBody = {
            info: supplyInfo,
            payment: paymentInfo,
            products: products,
        }

        if (!validate(reqBody)) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        SupplyService.newSupply(reqBody).then(res => {
            snackbar.setMessage(res?.message)
            snackbar.handleClick()
        })

        setProductsOptions([])
        setSupplyInfo({
            supplier: '', comment: '',
        })
        setPaymentInfo([
            {paymentType: "", paymentSum: 0},
        ])
        setProducts([
            {
                productId: null,
                packaging: "",
                amount: 0,
                priceForUnit: 0,
                sumWithoutTax: 0,
                tax: 0,
                totalSum: 0,
            },
        ])
    }

    function HandleMoney(price) {
        return Number(parseFloat(String(price)).toPrecision(15))
    }

    // TODO Errors handling
    // TODO Fields validation
    return (
        <div>
            <div className={classes.supplyInfoWrapper}>
                <p className={classes.pageTitle}>
                    Нове постачання
                </p>

                <FormControl>
                    <div className={classes.supplyInfoItem}>
                        <div className={classes.supplyInfoTitle}>
                            <p>Час постачання</p>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                validationError={supplyInfoErr.supplyTime}
                                value={supplyInfo.supplyTime}
                                onChange={(newValue) => {
                                    setSupplyInfo({...supplyInfo, "supplyTime": newValue.toDate()})
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={classes.supplyInfoItem}>
                        <div className={classes.supplyInfoTitle}>
                            <p>Постачальник</p>
                        </div>
                        <AllianceTextField
                            name={"supplier"}
                            value={supplyInfo.supplier}
                            onChange={handleSupplyInfo}
                            error={supplyInfoErr.supplier}
                        />
                    </div>

                    <div className={classes.supplyInfoItem}>
                        <div className={classes.paymentTitle}>
                            <div className={classes.paymentTitleWrapper}>
                                <p>Оплата</p>
                                <IconButton onClick={handleAddPayment}>
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        </div>
                        <div className={classes.paymentFieldsWrapper}>
                            {paymentInfo.map((item, index) =>
                                <div className={classes.paymentInfo} key={index}>
                                    <AllianceTextField
                                        label={"Рахунок"}
                                        name={"paymentType"}
                                        value={item.paymentType}
                                        onChange={event => handlePaymentInfo(index, event)}
                                        error={paymentErr[index]["paymentType"]}
                                    />
                                    <AllianceTextField
                                        label={"Сума"}
                                        name={"paymentSum"}
                                        value={item.paymentSum}
                                        onChange={event => handlePaymentInfo(index, event)}
                                        error={paymentErr[index]["paymentSum"]}
                                    />
                                    <IconButton
                                        className={classes.removeBtn}
                                        onClick={() => handleRemovePayment(index)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.supplyInfoItem}>
                        <div className={classes.supplyInfoTitle}>
                            <p>Коментарій</p>
                        </div>
                        <AllianceTextField
                            name={"comment"}
                            fullWidth
                            id="outlined-multiline-static"
                            multiline
                            rows={2}
                            defaultValue=""
                            onChange={handleSupplyInfo}
                        />
                    </div>
                </FormControl>
            </div>

            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Товар</TableCell>
                            <TableCell align="left">Фасування</TableCell>
                            <TableCell align="left">Кількість</TableCell>
                            <TableCell align="left">Ціна за одиницю</TableCell>
                            <TableCell align="left">Сума без податку</TableCell>
                            <TableCell align="left">Податок</TableCell>
                            <TableCell align="left">Заг. сума</TableCell>
                            <TableCell align="left"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                products.map((item, index) =>
                                    <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell width={400}>
                                            <AutoCompleteSelect
                                                options={productsOptions}
                                                onChange={handleProductsOptions}
                                                setValue={(event, newValue) => handleSetProductIdValue(index, newValue)}
                                                getOptionLabel={option => option.productTitle}
                                                noOptionsText={"Товарів не знайдено"}
                                                IsOptionEqualToValue={(option, value) => option.productTitle === value.productTitle}
                                                error={productsErr[index]["productId"]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"packaging"}
                                                value={item.packaging}
                                                onChange={event => handleProduct(index, event)}
                                                error={productsErr[index]["packaging"]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"amount"}
                                                value={item.amount}
                                                onChange={event => handleProduct(index, event)}
                                                error={productsErr[index]["amount"]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"priceForUnit"}
                                                value={item.priceForUnit}
                                                onChange={event => handleProduct(index, event)}
                                                error={productsErr[index]["priceForUnit"]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"sumWithoutTax"}
                                                value={handlePriceWithoutTax(item.amount * item.priceForUnit, index)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"tax"}
                                                value={item.tax}
                                                onChange={event => handleProduct(index, event)}
                                                error={productsErr[index]["tax"]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                name={"totalSum"}
                                                value={handleTotalSum(item.sumWithoutTax, item.tax, index)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleRemoveProduct(index)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>)
                            }
                        </>
                        <TableRow>
                            <TableCell>
                                <AllianceButton variant={"text"} onClick={handleAddProduct}>
                                    Додати товар
                                </AllianceButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <AllianceButton onClick={createNewSupply} mt={"2rem"} mb={"2rem"}>
                Створити
            </AllianceButton>
            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminNewSupplyComponent;