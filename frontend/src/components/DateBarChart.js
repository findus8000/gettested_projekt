import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllReportsAfterDatesAndGender } from '../api/Controller';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function DateBarChart() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2022-02-01');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [testName, setTestName] = useState('Food Intolerance (40 items)'); // Default test
    const [gender, setGender] = useState('Select gender');
    const [count, setCount] = useState(0);



    useEffect(() => {
        async function fetchData() {
            const results = await getAllReportsAfterDatesAndGender(testName, startDate, endDate,gender);
            setData(results);
            if (results[0] !== undefined) {
                setCount(results[0].count);
            } else {
                setCount(0); // Set count to a default value if results[0] is undefined
            }
        }
        fetchData();
    }, [testName, startDate, endDate, gender]);



    return (
        <div style={{width: '100%', overflowX: 'hidden'}}>
            <div>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min="2022-02-01"/>
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate}/>
                </label>
            </div>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]}
                          maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 50,
                        }}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0}
                               tick={{fontSize: 12, fill: 'black'}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="value" fill="#82ca9d"/>
                    </BarChart>
                </ResponsiveContainer>
            </ResizableBox>
            <label>
                Amount of results: {count !== 0 ? count : 'No Results'}
            </label>
            <br/>
            <label>
                Select Test:
                <select value={testName} onChange={e => setTestName(e.target.value)}>
                    <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)
                    </option>
                    <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                    <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                    <option value="Testosterone (saliva)">Testosterone (saliva)</option>
                    <option value="Iron Deficiency Basic">Iron Deficiency Basic</option>
                    <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                    <option value="Vitamin D Test">Vitamin D</option>
                </select>
            </label>
            <label>
                <select value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="Select gender">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
        </div>
    )
}

export default DateBarChart;
