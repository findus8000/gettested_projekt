import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllReports } from '../api/Controller';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function TestBarChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllReports();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <div style={{ width: '100vw', overflowX: 'hidden' }}>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]} maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 50,  // Increased bottom margin to accommodate angled labels
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
