import axios from "axios";

//Helper functions
function averageFromResultsArr(resultsArr){
    let resLen = resultsArr[0].length;
    let sum = new Array(resLen).fill(0);
    let count = new Array(resLen).fill(0);

    for (let i = 0; i < resultsArr.length; i++) {
        for (let j = 0; j < resultsArr[i].length; j++) {
            resultsArr[i][j].value  = resultsArr[i][j].value.replace('<', '').trim()
            resultsArr[i][j].value = resultsArr[i][j].value.replace('>', '').trim()
            if (!isNaN(Number(resultsArr[i][j].value))){
                sum[j] += Number(resultsArr[i][j].value);
                count[j]++;
            }
        }
    }

    let avg = new Array(resLen);
    for (let i = 0; i < resLen; i++) {
        avg[i] = sum[i]/count[i];
    }

    return avg;
}

function meanFromResultsArr(resultsArr){
    let resLen = 0;
    for (let i = 0; i < resultsArr.length; i++) {if(resultsArr[i].length > resLen){resLen = resultsArr[i].length;}}
    let data = []
    for (let i = 0; i < resLen; i++) { data.push([]); }


    for (let i = 0; i < resultsArr.length; i++) {
        for (let j = 0; j < resultsArr[i].length; j++) {
            if (resultsArr[i][j] != null && resultsArr[i][j].value != null){
                resultsArr[i][j].value  = resultsArr[i][j].value.replace('<', '').replace('>', '').trim();
                if (!isNaN(Number(resultsArr[i][j].value))){
                    data[j].push(Number(resultsArr[i][j].value));
                }
            }
        }
    }

    let mean = [];
    for (let i = 0; i < data.length; i++) {
        data[i].sort((a, b) => a - b);
        if (data[i].length % 2 === 0){
            mean[i] = (data[i][data[i].length/2]+data[i][data[i].length/2-1])/2;
        }else {
            mean[i] = data[i][(data[i].length-1)/2];
        }
    }

    return mean;
}



function medianComplicated(resultArr){

    const mediansByTestName = {};

    resultArr.forEach((resultArr) => {
        resultArr.forEach((result) => {
            const {name, value} = result;

            // Initialize an array for the test result name if it doesn't exist
            if (!mediansByTestName[name]) {
                mediansByTestName[name] = [];
            }
            // Push the value to the array for the test result name
            mediansByTestName[name].push(value);
        });
    });

    const medians = {};

    Object.entries(mediansByTestName).forEach(([name, values]) => {
        const sortedValues = values.sort((a, b) => a - b);

        let median;

        if (sortedValues.length === 0) {
            median = null; // Handle case where there are no valid numeric values
        } else if (sortedValues.length % 2 === 0) {
            // Even number of values
            const midIndex1 = sortedValues.length / 2 - 1;
            const midIndex2 = midIndex1 + 1;
            median = (sortedValues[midIndex1] + sortedValues[midIndex2]) / 2;
        } else {
            // Odd number of values
            const midIndex = Math.floor(sortedValues.length / 2);
            median = sortedValues[midIndex];
        }

        medians[name] = median;
    });

    console.log('Medians for each test result:', medians);
}


async function getAllReportsAfterDatesAndGender(testName, startDate, endDate, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGender`, {
            params: { testName, startDate, endDate, gender }
        });
        console.log(response.data)
        const results = response.data.map(entity => entity.results).filter(r => r);

        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr.map(result => ({
                name: result.name || 'Unknown',
                value: result.value !== null && result.value !== undefined
                    ? parseFloat(result.value.replace(/[<>]/g, '').trim())
                    : null
            })).filter(result => result !== null &&  !isNaN(result.value))
        );
        //console.log('Aggregated Results:', aggregatedResults);

        medianComplicated(aggregatedResults);

        const resCopy =  response.data.map(entity => entity.results).filter(r => r);
        const mean = meanFromResultsArr(resCopy);
        console.log("Median second version: "+mean)

        return aggregatedResults.reduce((acc, curr) => {
            curr.forEach(item => {
                const existing = acc.find(a => a.name === item.name);
                if (existing) {
                    if (item.value!=null){
                        existing.value += item.value;
                        existing.count++;
                    }
                } else {
                    acc.push({ ...item, count: 1 });
                }
            });
            return acc;
        }, []).map(item => ({
            name: item.name,
            value: item.value / item.count,
            amt: 2000,
            count: item.count
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
async function getAllReportsAfterGender(query,gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/statistics/testAndGender`, {
            params: { query, gender }
        });
        const results = response.data.map(entity => entity.results).filter(r => r);
        //console.log("Data from server:", results);

        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr.map(result => ({
                name: result.name || 'Unnamed',
                value: parseFloat(result.value.replace('<', '').trim())
            })).filter(result => !isNaN(result.value))
        );


        return aggregatedResults.reduce((acc, curr) => {
            curr.forEach(item => {
                const existing = acc.find(a => a.name === item.name);
                if (existing) {
                    existing.value += item.value;
                    existing.count++;
                } else {
                    acc.push({ ...item, count: 1 });
                }
            });
            return acc;
        }, []).map(item => ({
            name: item.name,
            value: item.value / item.count,
            amt: 2000
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function getAllReportsAfterDatesAndGenderRaw(testName, startDate, endDate, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGender`, {
            params: { testName, startDate, endDate, gender }
        });
        console.log(response.data)
        const results = response.data.map(entity => entity.results).filter(r => r);

        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr.map(result => ({
                name: result.name || 'Unknown',
                value: result.value !== null && result.value !== undefined
                    ? parseFloat(result.value.replace(/[<>]/g, '').trim())
                    : null
            })).filter(result => result !== null &&  !isNaN(result.value))
        );



        return aggregatedResults;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

export { getAllReportsAfterDatesAndGenderRaw, getAllReportsAfterDatesAndGender,  getAllReportsAfterGender,averageFromResultsArr, meanFromResultsArr };
