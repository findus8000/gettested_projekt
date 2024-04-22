import React, {useState} from "react";

import axios from "axios";

const TestButton = () => {
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    const getData = async () => {
        axios.get('http://localhost:8080/api/statistics/testAndGender?gender=Male')
            .then(response => {
                console.log(response.data);

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