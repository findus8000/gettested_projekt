import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {getAllAveragesAfterGender, getAllMediansAfterGender} from '../api/Controller';



function MedianBarChart ({testType}) {
    const [data, set] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllMediansAfterGender(testType);
            set(result);
        }
        fetchData();
    }, [testType]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                    <p className="label" style={{color: "black"}}>{`${label}`}</p>
                    <p className="value" style={{color: "black"}}>{`Average: ${payload[0].value.toFixed(3)}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 80,
                }}>
                <XAxis dataKey="name" angle={-45}  textAnchor="end" interval={2} dx={-5}
                       tick={{fontSize: 10, fill: 'white'}}/>
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default MedianBarChart;
