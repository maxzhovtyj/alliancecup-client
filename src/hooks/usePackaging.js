import {useState} from "react";

function UsePackaging(setShowDialog) {
    const [packaging, setPackaging] = useState([{
        type: "", amount: 0,
    }])
    const [packagingErr, setPackagingErr] = useState([{
        type: false, amount: false,
    }])

    const handlePackaging = (event, index) => {
        const values = [...packaging]
        values[index][event.target.name] = event.target.value
        setPackaging(values)

        setShowDialog(true)
    }

    const handleAddPackaging = () => {
        setPackaging([...packaging, {type: "", amount: 0}])
        setPackagingErr([...packagingErr, {type: false, amount: false}])

        setShowDialog(true)
    }

    const handleRemovePackaging = (index) => {
        const values = [...packaging]
        values.splice(index, 1)
        setPackaging(values)

        const valuesErr = [...packagingErr]
        valuesErr.splice(index, 1)
        setPackagingErr(valuesErr)

        setShowDialog(true)
    }

    return {
        packaging,
        setPackaging,
        packagingErr,
        setPackagingErr,
        handlePackaging,
        handleAddPackaging,
        handleRemovePackaging,
    }
}

export default UsePackaging;