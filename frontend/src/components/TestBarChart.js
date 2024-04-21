import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllReports } from '../api/Controller';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function TestBarChart() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2021-01-01');
    const [endDate, setEndDate] = useState('2021-12-31');
    const [testName, setTestName] = useState('Allergy & Intolerance Test (78 items)'); // Default test

    useEffect(() => {
        async function fetchData() {
            const results = await getAllReports(testName, startDate, endDate);
            setData(results);
        }
        fetchData();
    }, [testName, startDate, endDate]);

    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <div>
                <label>
                    Select Test:
                    <select value={testName} onChange={e => setTestName(e.target.value)}>
                        <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                        <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                    </select>
                </label>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
            </div>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]} maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 50,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 12, fill: 'black' }}/>
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </ResizableBox>
        </div>
    );
}

export default TestBarChart;
