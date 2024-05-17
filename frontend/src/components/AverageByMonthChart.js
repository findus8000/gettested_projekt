import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import {getAllReportsAfterDatesAndGenderAndCountryCode, getAveragesByMonthSpecific} from "../api/Controller";
/*
const data = [
    {
        name: 'January',
        uv: 4000,
    },
    {
        name: 'February',
        uv: 3000,
    },
    {
        name: 'March',
        uv: 2000,
    },
    {
        name: 'April',
        uv: 2780,
    },
    {
        name: 'May',
        uv: 1890,
    },
    {
        name: 'June',
        uv: 2390,
    },
    {
        name: 'July',
        uv: 3490,
    },
    {
        name: 'August',
        uv: 3490,
    },
    {
        name: 'September',
        uv: 3490,
    },
    {
        name: 'October',
        uv: 3490,
    },
    {
        name: 'November',
        uv: 3490,
    },
    {
        name: 'December',
        avg: 3490,
    },
];
*/
function AverageByMonthChart({testType, specificTestType}){
    const [data, setData] = useState()

    useEffect( () => {

        async function fetchData(){
            const data = await getAveragesByMonthSpecific(testType, specificTestType,'2022-02-01', '2024-02-01');
            setData(data)
            const testcountrycode = await getAllReportsAfterDatesAndGenderAndCountryCode(testType, '2022-02-01', '2024-02-01', "All", "Germany");
            //console.log("Months: ", data)
        }

        fetchData();
    }, [testType, specificTestType]);

        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{fontSize: 10, fill: 'white'}} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avg" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        );

}

export default AverageByMonthChart;