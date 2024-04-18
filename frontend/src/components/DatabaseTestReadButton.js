import React, { useState } from 'react';
import axios from 'axios';

const DatabaseTestReadButton = () => {

    const [data,set] = useState(null);

    const handleClick = () => {
        axios.get('http://localhost:8080/api/reports/getAll')
            .then(response => {
                console.log(response.data)
                const res = response.data.map(entity => entity.results);
                //Initialize an array to hold arrays of valid numbers at each position
                let firstValidIndex = -1;
                for (let i = 0; i < res.length; i++) {
                    if (res[i] && res[i][0].value && res[i][0] && typeof res[i][0].value !== 'undefined') {
                        const num = parseFloat(res[i][0].value.replace('<', '').trim());
                        if (!isNaN(num)) {
                            firstValidIndex = i;
                            break;
                        }
                    }
                }

// Initialize an array to hold arrays of valid numbers from the first valid position onwards
                const validNumbers = Array.from({ length: res[firstValidIndex].length }, () => []);
                // Iterate over each entity's results array
                res.forEach(arr => {
                    // Iterate over each position in the results array
                    arr.forEach((result, i) => {
                        // Extract the value from the result object, parse it to integer, and push it to the respective position in validNumbers array
                        if (result && result.value && typeof result.value !== 'undefined' && arr.length === res[firstValidIndex].length) {
                            const num = parseFloat(result.value.replace('<', '').trim());
                            if (!isNaN(num)) {
                                validNumbers[i].push(num);
                            }
                        }
                    });
                });
                console.log(validNumbers)
                // Calculate the average for each position
                const averages = validNumbers.map(nums => {
                    const sum = nums.reduce((total, num) => total + num, 0);
                    return sum / nums.length;
                });

                console.log(averages);
                set(averages[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <button onClick={handleClick} style={{margin: '10px'}}>Fetch Data</button>
                <p style={{
                    width: '1000px',
                    textAlign: 'center'
                }}>{data}</p>
            </div>
        </div>

    );
};

export default DatabaseTestReadButton;
