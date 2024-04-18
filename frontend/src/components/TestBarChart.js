import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllReports } from '../api/Controller';


function TestBarChart () {
    const [data, set] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllReports();
            set(result);
        }
        fetchData();
    }, []);

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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} dx={-5} tick={{ fontSize: 12, fill: 'black' }}/>
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top"/>
                <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
           </ResponsiveContainer>
    );
}

export default TestBarChart;
