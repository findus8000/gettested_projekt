import React, {useState} from "react";
import axios from "axios";
import {type} from "@testing-library/user-event/dist/type";
import {meanFromResultsArr} from "../api/Controller";

const TestButton = () => {
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    const getData = async () => {
        axios.get('http://localhost:8080/api/statistics/testAndGender?gender=Male')
            .then(response => {
                const results = response.data.map(entity => entity.results).filter(r => r);

               // console.log(meanFromResultsArr(results));

            })
            .catch(error => {
                console.log(error)
            });
    }

        return (
            <div>
                <input type="text" value={textFieldValue} onChange={handleChange}/>
                <button onClick={getData}>Send Data</button>
            </div>
        );

}
export default TestButton;