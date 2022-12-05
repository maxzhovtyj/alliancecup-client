import React from 'react';
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../UI/styles";
import {TextMaskCustom} from "../../../utils/TextMask";
import {FormControl, MenuItem} from "@mui/material";
import AutoCompleteSelect from "../../../UI/autoCompleteSelect/autoCompleteSelect";

import orderClasses from "./order.module.scss"

function OrderInfo({
                       orderInfo,
                       handleOrderInfo,
                       errors,
                       deliveryTypes,
                       paymentTypes,
                       isNovaPoshta,
                       isInTown,
                       setAddress,
                       selectCities,
                       selectDepartments,
                   }) {
    return (
        <div>
            <div className={orderClasses.orderPersonalInfo}>
                <div className={orderClasses.orderLFM}>
                    <AllianceTextField
                        className={orderClasses.orderField}
                        name={"lastName"}
                        required
                        label="Призвіще"
                        value={orderInfo.lastName}
                        onChange={handleOrderInfo}
                        error={errors.lastName}
                    />
                    <AllianceTextField
                        className={orderClasses.orderField}
                        name={"firstName"}
                        required
                        label="Ім'я"
                        value={orderInfo.firstName}
                        onChange={handleOrderInfo}
                        error={errors.firstName}
                    />
                    <AllianceTextField
                        className={orderClasses.orderField}
                        name={"middleName"}
                        required
                        label="По батькові"
                        value={orderInfo.middleName}
                        onChange={handleOrderInfo}
                        error={errors.middleName}
                    />
                </div>
                <div className={orderClasses.orderContactInfo}>
                    <AllianceTextField
                        required
                        name="phone"
                        id="phone"
                        label="Номер телефону"
                        InputProps={{
                            inputComponent: TextMaskCustom
                        }}
                        value={orderInfo.phone}
                        onChange={handleOrderInfo}
                        error={errors.phone}
                    />
                    <AllianceTextField
                        name={"email"}
                        required
                        label="Email"
                        value={orderInfo.email}
                        onChange={handleOrderInfo}
                        error={errors.email}
                    />
                </div>
            </div>
            <FormControl className={orderClasses.deliveryForm} fullWidth>
                <AllianceInputLabel
                    error={errors.deliveryTypeTitle}
                    id="demo-simple-select-label"
                >
                    Доставка
                </AllianceInputLabel>
                <AllianceSelect
                    required
                    name={"deliveryTypeTitle"}
                    labelId="delivery"
                    id="delivery-id"
                    label="Доставка"
                    value={orderInfo.deliveryTypeTitle}
                    onChange={handleOrderInfo}
                    error={errors.deliveryTypeTitle}
                >
                    {
                        deliveryTypes?.map(item => <MenuItem value={item?.delivery_type_title}
                                                             key={item.id}>{item?.delivery_type_title}</MenuItem>)
                    }
                </AllianceSelect>
            </FormControl>
            {
                isNovaPoshta
                    ?
                    <div className={orderClasses.novaPoshtaDelivery}>
                        <AutoCompleteSelect
                            label={"Місто"}
                            width={300}
                            options={selectCities.cities}
                            onChange={selectCities.handleCities}
                            value={selectCities.city}
                            setValue={selectCities.handleSetCityValue}
                            getOptionLabel={option => option.Description}
                            error={errors.novaPoshtaCity}
                        />
                        <AutoCompleteSelect
                            label={"Відділення"}
                            width={300}
                            options={selectDepartments.departments}
                            value={selectDepartments.department}
                            setValue={selectDepartments.handleSetDepartmentValue}
                            getOptionLabel={option => option.Description}
                            error={errors.novaPoshtaDepartment}
                        />
                    </div>
                    : ""
            }
            {
                isInTown
                    ?
                    <div>
                        <AllianceTextField
                            name={"address"}
                            label={"Адреса"}
                            sx={{marginBottom: "1rem", width: "80%"}}
                            onChange={event => setAddress(event.target.value)}
                            error={errors.deliveryAddress}
                        />
                    </div>
                    : ""
            }
            <FormControl className={orderClasses.deliveryForm} fullWidth>
                <AllianceInputLabel error={errors.paymentTypeTitle} id="payment-label-id">
                    Спосіб оплати
                </AllianceInputLabel>
                <AllianceSelect
                    name={"paymentTypeTitle"}
                    labelId="payment"
                    id="payment-id"
                    label="Спосіб оплати"
                    value={orderInfo.paymentTypeTitle}
                    onChange={handleOrderInfo}
                    error={errors.paymentTypeTitle}
                >
                    {
                        paymentTypes?.map(item =>
                            <MenuItem value={item.payment_type_title} key={item.id}>
                                {item.payment_type_title}
                            </MenuItem>)
                    }
                </AllianceSelect>
            </FormControl>
            <AllianceTextField
                name={"comment"}
                fullWidth
                id="outlined-multiline-static"
                label="Коментар"
                multiline
                rows={4}
                defaultValue=""
                onChange={handleOrderInfo}
            />
        </div>
    );
}

export default OrderInfo;