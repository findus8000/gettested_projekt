import React, {PureComponent, useEffect, useState} from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle
} from 'recharts';
import {getAllReportsAfterDatesAndGender} from "../api/Controller";



function MaleFemaleChart({testType, specificTestType}){

    const [maleValue, setMaleValue] = useState(0);
    const [femaleValue, setFemaleValue] = useState(0);

    useEffect(() => {
        async function fetchData(){
            const maleResult = await getAllReportsAfterDatesAndGender(testType, '2022-02-01', '2024-02-01', "Male");
            const femaleResult = await getAllReportsAfterDatesAndGender(testType, '2022-02-01', '2024-02-01', "Female");
            const foundTestMale = maleResult.find(test => test.name === specificTestType);
            const foundTestFemale = femaleResult.find(test => test.name === specificTestType);
            setMaleValue(foundTestMale ? foundTestMale.value : 0);
            setFemaleValue(foundTestFemale ? foundTestFemale.value : 0);

        }

        fetchData();

    }, [specificTestType, testType]);

    const data = [
        {
            name: specificTestType,
            male: maleValue,
            female: femaleValue,
            amt: 2400,
        }
    ];

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
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" fill="#87cefa" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="female" fill="#db7093" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default MaleFemaleChart;