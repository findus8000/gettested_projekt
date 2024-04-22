import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllReportsAfterGender } from '../api/Controller';


function TestBarChart () {
    const [data, set] = useState([]);
    const [param, setParam] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const result = await getAllReportsAfterGender(param);
            set(result);
        }
        fetchData();
    }, [param]);

    const sendDataToChart = async () => {
        setParam(textFieldValue);
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
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} dx={-5}
                       tick={{fontSize: 12, fill: 'black'}}/>
                <YAxis/>
                <Tooltip/>
                <Legend verticalAlign="top"/>
                <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
            </BarChart>
            <input type="text" value={textFieldValue} onChange={handleChange}/>
            <button onClick={sendDataToChart}>Send Data</button>
        </ResponsiveContainer>
    );
}

export default TestBarChart;
