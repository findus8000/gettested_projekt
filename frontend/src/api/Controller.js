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

function medianFromResultsArr(resultsArr){
    let resLen = 0;
    let counter = 0;
    for (let i = 0; i < resultsArr.length; i++) {
        if(resultsArr[i].length > resLen){
            counter++;
            if (counter > resultsArr.length/4){
                counter = 0;
                resLen = resultsArr[i].length;
            }
        }
    }
    const filteredLists = resultsArr.filter(subList => subList.length === resLen);
    let data = [];
    let names = [];
    for (let i = 0; i < resLen; i++) { data.push([]); }

    for (let i = 0; i < filteredLists.length; i++) {
        for (let j = 0; j < filteredLists[i].length; j++) {
            if (filteredLists[i][j] != null && filteredLists[i][j].value != null){
                filteredLists[i][j].value  = filteredLists[i][j].value.replace('<', '').replace('>', '').trim();
                if (!isNaN(Number(filteredLists[i][j].value))){
                    data[j].push(Number(filteredLists[i][j].value));
                    names[j] = filteredLists[i][j].name;
                }
            }
        }
    }

    let mean = [];
    for (let i = 0; i < data.length; i++) {
        data[i].sort((a, b) => a - b);
        if (data[i].length % 2 === 0){
            mean[i] = { name: names[i], value: (data[i][data[i].length/2]+data[i][data[i].length/2-1])/2 };
        }else {
            mean[i] = { name: names[i], value: data[i][(data[i].length-1)/2] };
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
    return(medians);
   // console.log('Medians for each test result:', medians);
}


async function getAllReportsAfterDatesAndGender(testName, startDate, endDate, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGender`, {
            params: { testName, startDate, endDate, gender }
        });
        //console.log("raw : ", response.data)
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
        const mean = medianFromResultsArr(resCopy);
        //console.log("Median second version: "+mean)

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

async function getAllAveragesAfterGender(query, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/statistics/testAndGender`, {
            params: { query, gender }
        });
        const results = response.data.map(entity => entity.results).filter(r => r);
        console.log("Data from server:", results);

        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr.map(result => {
                const stringValue = result.value ? result.value.toString() : '0';
                return {
                    name: result.name || 'Unnamed',
                    value: parseFloat(stringValue.replace('<', '').trim())
                };
            }).filter(result => !isNaN(result.value))
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
        //console.log(response.data)
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


async function getAveragesByMonthSpecific(testName, specificTest,startDate, endDate, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGender`, {
            params: { testName, startDate, endDate, gender }
        });

        const results = response.data.filter(entity => entity.sent && entity.results && entity.results.length > 0)
            .map(entity => ({
                sent: entity.sent,
                results: entity.results.filter(test => test.name === specificTest)
            }));


        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let avgsByMonth = [];
        for (let i = 0; i < 12; i++) {
            const monthResults = results.filter(entity => {
                const sentDate = new Date(entity.sent);
                return sentDate.getMonth() === i;
            })
                .map(entity => ({
                    sent: entity.sent,
                    results: entity.results.filter(test => test.name === specificTest)
                }));

            const values = monthResults.flatMap(entity =>
                entity.results.map(test => parseFloat(test.value.replace('<', '').trim())).filter(value => value !== undefined && !isNaN(value))
            );

            const count = values.length;

            const sum = values.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            avgsByMonth.push({name: months[i], avg: sum/count});
        }


        return avgsByMonth;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


async function getAllReportsAfterDatesAndGenderAndCountryCode(testName, startDate, endDate, gender, country) {
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGenderAndPhoneCode`, {
            params: { testName, startDate, endDate, gender, country }
        });
        console.log("COUnTRYCODE CONTROLLER : ",(response.data))
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
        console.log('Aggregated Results:', aggregatedResults.length);


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

async function getAllCountries(){
    try {
        const response = await axios.get("http://localhost:8080/api/country/getAll");
        console.log("COUNTRY:", response.data)
        return response.data;
    }catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function getDistrubutionOfSpecificTest(testName, startDate, endDate,  specificTest, interval){
    try {
        const response = await axios.get(`http://localhost:8080/api/reports/byTestIdAndDateRangeAndGender`, {
            params: { testName, startDate, endDate }
        });

        const results = response.data.map(entity => entity.results).filter(r => r);


        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        const aggregatedResults = results.map(arr =>
            arr
                .filter(result => result.name === specificTest)
                .map(result =>
                    result.value !== null && result.value !== undefined
                        ? parseFloat(result.value.replace(/[<>]/g, '').trim())
                        : null
                )
                .filter(value => value !== null && !isNaN(value))
        ).flat();
        //console.log('AGGGG: ', aggregatedResults);
        if (aggregatedResults.length === 0){
            return [];
        }


        const maxTestValue = Math.max(...aggregatedResults);
        let chartData = [];
        let lastUpperRange = 0;

        for (let i = 0; i < maxTestValue; i++) {
            if(i%interval === 0){
                chartData.push({name: "" + i +"=< test <"+(i+interval), amount: 0});
                if (lastUpperRange < (i+interval)){ lastUpperRange = (i+interval)}
            }
        }

        chartData[chartData.length-1].name = chartData[chartData.length-1].name.replace(/<\d+/, '<') + maxTestValue;

        aggregatedResults.forEach(value =>{
            let x = Math.trunc(value / interval);
            if (x > chartData.length-1){
                chartData[chartData.length-1].amount++;
            }else{
                chartData[x].amount++;
            }


        })



        return chartData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


async function getAllMediansAfterGender(query, gender) {
    try {
        const response = await axios.get(`http://localhost:8080/api/statistics/testAndGender`, {
            params: { query, gender }
        });
        const results = response.data.map(entity => entity.results).filter(r => r);
        console.log("Data from server:", results);



        if (results.length === 0) {
            console.log("No results available in data.");
            return [];
        }

        //console.log("medians", medianFromResultsArr(results));

        return medianFromResultsArr(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


export { getAllMediansAfterGender, getDistrubutionOfSpecificTest, getAllCountries, getAllReportsAfterDatesAndGenderAndCountryCode, getAveragesByMonthSpecific, getAllReportsAfterDatesAndGenderRaw, getAllReportsAfterDatesAndGender,  getAllAveragesAfterGender,averageFromResultsArr, medianFromResultsArr };
