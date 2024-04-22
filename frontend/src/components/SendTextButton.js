import React, {useState} from "react";
import {setPost} from "./Controller";
import DateBarChart from "./DateBarChart";

const SendTextButton = () => {
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    const sendDataToChart = async () => {
        const encodedValue = encodeURIComponent(textFieldValue);
        console.log(encodedValue)
        setPost(encodedValue);
    };

    return (
        <div>
            <input type="text" value={textFieldValue} onChange={handleChange}/>
            <button onClick={sendDataToChart}>Send Data</button>
        </div>
    );
}
export default SendTextButton;