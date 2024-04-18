import axios from "axios";

async function getAllReports (){
    try {
        const response = await axios.get('http://localhost:8080/api/statistics/test');
        const res = response.data.map(entity => entity.results);
        console.log(res);
        let firstValidIndex = -1;
        let secoundValidIndex=-1;
        let thirdValidIndex=-1;
        for (let i = 0; i < res.length; i++) {
            if (res[i] && res[i][0].value && res[i][0] && typeof res[i][0].value !== 'undefined') {
                const num = parseFloat(res[i][0].value.replace('<', '').trim());
                if (!isNaN(num)) {
                    if (firstValidIndex===-1) firstValidIndex = i;
                    else if (secoundValidIndex===-1)secoundValidIndex=i;
                    else {
                        thirdValidIndex=i;
                        break;
                    }
                }
            }
        }
        if (secoundValidIndex===thirdValidIndex&&secoundValidIndex!==firstValidIndex) firstValidIndex=secoundValidIndex;
        //Initialize an array to hold arrays of valid numbers at each position
        const valuesArray = new Array(res[firstValidIndex].length).fill([]).map(() => []);
        const namesArray = new Array(res[firstValidIndex].length).fill([]).map(() => []);

// Iterate over each entity's results array
        res.forEach(arr => {
            // Iterate over each position in the results array
            arr.forEach((result, i) => {
                // Extract the value and name from the result object
                if (result && result.value && typeof result.value !== 'undefined' && arr.length === res[firstValidIndex].length) {
                    const num = parseFloat(result.value.replace('<', '').trim()); // Parse as float instead of integer
                    if (!isNaN(num)) { // Check if parsing was successful
                        valuesArray[i].push(num);
                        namesArray[i].push(result.name || ''); // Push the name
                    }
                }
            });
        });

// Calculate the average for each position while retaining the names
        const averages = valuesArray.map((values, index) => {
            const sum = values.reduce((total, num) => total + num, 0);
            const average = sum / values.length;
            const name = namesArray[index][0]; // Concatenate names if multiple
            return { value: average, name };
        });

// Create the chart data
        const chartData = averages.map((average, index) => ({
            name: average.name || `Bar ${index + 1}`, // Use the provided name, or a default name if not available
            value: average.value,
            amt: 2000
        }));
        return chartData;  // Example of how you might structure the return data
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export {
    getAllReports
};