import {useState} from "react";

function UseCharacteristics(setShowDialog) {
    const [characteristics, setCharacteristics] = useState([{
        name: "", description: ""
    }])
    const [characteristicsErr, setCharacteristicsErr] = useState([{
        name: false, description: false
    }])

    const handleCharacteristics = (event, index) => {
        const values = [...characteristics]
        values[index][event.target.name] = event.target.value
        setCharacteristics(values)
        setShowDialog(true)
    }

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, {name: "", description: ""}])
        setCharacteristicsErr([...characteristicsErr, {name: false, description: false}])
        setShowDialog(true)
    }

    const handleRemoveCharacteristics = (index) => {
        const values = [...characteristics]
        values.splice(index, 1)
        setCharacteristics(values)

        const valuesErr = [...characteristicsErr]
        valuesErr.splice(index, 1)
        setCharacteristicsErr(valuesErr)

        setShowDialog(true)
    }

    return {
        handleCharacteristics,
        handleRemoveCharacteristics,
        handleAddCharacteristic,
        characteristics,
        setCharacteristics,
        characteristicsErr,
        setCharacteristicsErr
    }
}

export default UseCharacteristics;