import React, {PureComponent, useEffect, useState} from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {
    getAllReportsAfterDatesAndGender,
    getAllReportsAfterDatesAndGenderRaw,
    getAllReportsAfterGender
} from "../api/Controller";



const COLORS = ['#87cefa', '#db7093', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

function GenderDistrubutionChart({testType}) {
    const [maleTests, setMaleTests] = useState(0);
    const [femaleTests, setFemaleTests] = useState(0);

    useEffect(() => {
        async function fetchData(){
            const maleResult = await getAllReportsAfterDatesAndGenderRaw(testType, '2022-02-01', '2024-02-01', "Male");
            const femaleResult = await getAllReportsAfterDatesAndGenderRaw(testType, '2022-02-01', '2024-02-01', "Female");
            setMaleTests(maleResult.length);
            setFemaleTests(femaleResult.length);
            //console.log("M: ", maleResult)
            //console.log("F:", femaleResult)
        }

        fetchData();

    }, [testType]);

    const data = [
        { name: 'Male', value: maleTests },
        { name: 'Female', value: femaleTests },
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${data[index].name + ": "+(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

        return (

                <PieChart width={250} height={250}>
                    <Pie
                        data={data}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>

        );
}


export default GenderDistrubutionChart;
