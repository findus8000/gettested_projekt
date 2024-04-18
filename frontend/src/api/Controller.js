import axios from "axios";

async function getAllReports (){
    try {
        const response = await axios.get('http://localhost:8080/api/reports/getAll');
        const results = response.data.map(entity => entity.results);
        console.log(results[0][40]);
        let arr = [];
        for (let i = 0; i < 40; i++) {
            arr.push({name: results[0][i].name, value: results[0][i].value, amt: 2000});
        }
        return arr;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export {
    getAllReports
};