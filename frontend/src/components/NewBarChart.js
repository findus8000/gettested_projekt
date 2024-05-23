
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
    const [countMale, setCountMale] = useState(0);
    const [countFemale, setCountFemale] = useState(0);
    const [chartType, setChartType] = useState('bar'); // 'bar' eller 'line'
    const [referenceValue, setReferenceValue] = useState('No value');

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
            if (maleResults[0] !== undefined ){
                setCountMale(maleResults[0].count)
            }
            if (femaleResults[0] !== undefined){
                setCountFemale(femaleResults[0].count)
            }
            //setCount(combinedData.reduce((acc, item) => acc + item.maleValue + item.femaleValue, 0));
        }
        fetchData();
    }, [testName, startDate, endDate, gender]);

    //Testosterone Detailed: Normal values Men
    // Men 21-30 years 47,2-136,2 pg/ml
    // Men 31-40 years 46,8-106,8 pg/ml
    // Men 41-50 years 36,5-82,7 pg/ml
    // Men 51-60 years 19,1-89,0 pg/ml
    // Men 61-75 years 12,2-68,6 pg/ml
    // Normal values Women
    // Women 21-30 years 7,9-50,4 pg/ml
    // Women 31-40 years 7,0-44,8 pg/ml
    // Women 41-50 years 7,0-39,4 pg/ml
    // Women 51-60 years 7,0-29,8 pg/ml
    // Women 61-75 years 7,0-29,3 pg/ml
    useEffect(() => {
        if (testName === "Allergy & Intolerance Test (78 items)" || testName ==="Food Intolerance (80 items)"|| testName ==="Food Intolerance (40 items)" ) {
            setReferenceValue("<b>CLASS 0:</b> No reaction (Green)<br />" +
                "<b>CLASS 1-2:</b> Weak sensitization (Yellow)<br />" +
                "<b>ClASS 3-4:</b> Moderate sensitization (Orange)<br />" +
                "<b>CLASS 5-6:</b> Strong sensitization (Red)<br />" +
                "<b>CLASS 0</b> = <0.35 | <b>CLASS 1-2</b> = (0.35 - 5) | <b>CLASS 3-4</b> = (5 - 50) | <b>CLASS 5-6</b> = (50 - 100)");
        }
        else if(testName === "Testosterone (saliva)"){
                setReferenceValue("Testosterone varies with age but standard is<br/>"+
                    "<b>Men</b>: 10 - 230,9 pg/ml<br/>" +
                    "<b>Women</b>: 10 - 50,2 pg/m")
        }
        else if (testName === "Vitamin D Test"){
            setReferenceValue( "<25 nmol/L Critical deficiency<br/>" +
                "26-75 nmol/L Deficiency<br/>" +
                "76-100 nmol/L Adequate level<br />" +
                "101-200 nmol/L Optimal level<br />" +
                "201-250 nmol/L High level<br />" +
                ">250 nmol/L Potentially toxic level")
        }
        else if(testName=== "Estrogen / Progesterone"){
            setReferenceValue("<b>Ratio progesterone / estrogen</b> <br />" +
                "Follicular phase 4-14<br />" +
                "Luteal phase 10-131<br />" +
                "Postmenopause 2-20<br />" +
                "Men 2-24<br/>" +
                "<b>Progesterone</b> <br />" +
                "Follicular phase 30,3 - 51,3 pg/ml<br />" +
                "Luteal phase 87,3 - 544,3 pg/ml<br />" +
                "Postmenopause 21,0 - 69,0 pg/ml<br />" +
                "Men lower than 58,0 pg/ml<br />" +
                "<b>Estrogen</b> <br />" +
                "Follicular phase 3,1-6,4 pg/ml<br />" +
                "Ovulation phase 4,9-11,9 pg/ml<br />" +
                "Luteal phase 3,6-7,5 pg/ml<br />" +
                "Postmenopause 3,0-7,5 pg/ml<br />" +
                "Men 2,1-4,1 pg/ml<br />")
        }
    }, [testName]);

    return (
        <div style={{ width: '100%', marginBottom: "10px" }}>
            <div style={{ marginBottom: '10px'}}>
                <p>
                    <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
                        Switch to {chartType === 'bar' ? 'Line Chart' : 'Bar Chart'}
                    </button>
                </p>

                <label>
                    <select value={testName} onChange={e => setTestName(e.target.value)} style={{width: '200px'}}>
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
                <p dangerouslySetInnerHTML={{__html: referenceValue}}/>
            </div>
            <ResizableBox width="100%" height={400} minConstraints={[300, 200]} maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 12, fill: 'white' }}/>
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
                Amount of results <span style={{ color: '#0000FF' }}>Male: {countMale !== 0 ? countMale : 'No Results'} </span>
                <span style={{ color: '#FF0000' }}> Female: {countFemale !== 0 ? countFemale : 'No Results'}</span>
            </label>
        </div>
    );
}

export default NewBarChart;


