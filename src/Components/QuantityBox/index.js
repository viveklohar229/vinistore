import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa6";
const QuantityBox = (props) => {

    const [inputVal, setInputVal] = useState(1);
    const minus = () => {
        if (inputVal !== 1 && inputVal > 0) {
            setInputVal(inputVal - 1);
        }
    }
    const plus = () => {
        setInputVal(inputVal + 1);
    }

    useEffect(() => {
        // props.quantity(inputVal)
        if (typeof props.quantity === 'function') {
            props.quantity(inputVal);
        }
    }, [inputVal])



    return (

        <div className="quantityDrop d-flex align-items-center">
            <Button onClick={minus}><FaMinus /></Button>
            <input type="text" value={inputVal} />
            <Button onClick={plus}><FaPlus /></Button>
        </div>

    )
}

export default QuantityBox;