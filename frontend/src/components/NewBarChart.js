
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getAllReportsAfterDatesAndGender } from '../api/Controller';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function NewBarChart() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2022-02-01');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [testName, setTestName] = useState('Food Intolerance (40 items)');
    const [gender, setGender] = useState('all');
    const [count, setCount] = useState(0);
    const [chartType, setChartType] = useState('bar'); // 'bar' eller 'line'

    useEffect(() => {
        async function fetchData() {
            const maleResults = await getAllReportsAfterDatesAndGender(testName, startDate, endDate, 'Male');
            const femaleResults = await getAllReportsAfterDatesAndGender(testName, startDate, endDate, 'Female');
            // Kombinera data
            const combinedData = maleResults.map(male => {
                const female = femaleResults.find(f => f.name === male.name) || { value: 0 };
                return { name: male.name, maleValue: male.value, femaleValue: female.value };
            });
            setData(combinedData);
            setCount(combinedData.reduce((acc, item) => acc + item.maleValue + item.femaleValue, 0));
        }
        fetchData();
    }, [testName, startDate, endDate, gender]);

    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
                    Switch to {chartType === 'bar' ? 'Line Chart' : 'Bar Chart'}
                </button>
                {chartType === 'bar' && (
                    <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: '200px' }}>
                        <option value="all">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                )}
                <label>
                    Select Test:
                    <select value={testName} onChange={e => setTestName(e.target.value)} style={{ width: '200px' }}>
                        <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                        <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                        <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                        <option value="Testosterone (saliva)">Testosterone (saliva)</option>
                        <option value="Iron Deficiency Basic">Iron Deficiency Basic</option>
                        <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                        <option value="Vitamin D Test">Vitamin D</option>
                    </select>
                </label>
            </div>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]} maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 12, fill: 'black' }}/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend verticalAlign="top"/>
                            <Bar dataKey="maleValue" fill="#0000FF" name="Male"/>
                            <Bar dataKey="femaleValue" fill="#FF0000" name="Female"/>
                        </BarChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="maleValue" stroke="#0000FF" name="Male"/>
                            <Line type="monotone" dataKey="femaleValue" stroke="#FF0000" name="Female"/>
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </ResizableBox>
            <label>
                Amount of results: {count !== 0 ? count : 'No Results'}
            </label>
        </div>
    );
}

export default NewBarChart;


