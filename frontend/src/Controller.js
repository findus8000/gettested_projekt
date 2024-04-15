import axios from "axios";

async function getCountries (){
    try {
        const response = await axios.get('http://localhost:8080/api/reports/getAll');
        const results = response.data.map(entity => entity.results);
        console.log(results[0][0].name);
        return [{name: results[0][0].name, value: results[0][0].value, amt: 2000}];  // Example of how you might structure the return data
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export {
    getCountries
};