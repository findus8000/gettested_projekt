import React, {PureComponent, useEffect, useState} from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import {
    getAllReportsAfterDatesAndGender,
    getAveragesByMonthSpecific,
    getDistrubutionOfSpecificTest
} from "../api/Controller";

function SpecificTestDistrubution({testType, specificTestType}) {
    const [data, setData] = useState([])
    const [interval, setInterval] = useState(10);

    useEffect(() => {
        async function fetchData(){
            const resData = await getDistrubutionOfSpecificTest(testType, '2022-02-01', '2024-02-01', specificTestType, interval);
            console.log("return: ", resData)
            setData(resData);
        }

        fetchData();
    }, [testType, specificTestType, interval]);



        return (
            <div style={{width: '100%', hieght: '100%', overflowX: 'hidden'}}>
                <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45}  textAnchor="end" interval={2} tick={{fontSize: 12, fill: 'white'}}/>
                    <ReferenceLine x="54=< & <57" stroke="white" label="Average" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#558418" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
                    </ResponsiveContainer>

                <div style={{color: 'white'}}>
                    Select group interval:
                    <select value={interval} onChange={e => {setInterval(Number(e.target.value));}} >
                        <option value="10">10</option>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>§
                        <option value="25">25</option>
                        <option value="100">100</option>
                    </select>
                </div>



            </div>
        );

}


export default SpecificTestDistrubution;