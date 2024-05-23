
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
    test,
    getAllCountries,
    getAllReportsAfterDatesAndGender,
    getAllReportsAfterDatesAndGenderAndCountryCode
} from '../api/Controller';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import axios from "axios";

function CompareCountriesChart() {
    const [data, setData] = useState([]);
    const [testName, setTestName] = useState('Food Intolerance (40 items)');

    const [countCountry1, setCountCountry1] = useState(0);
    const [countCountry2, setCountCountry2] = useState(0);
    const [chartType, setChartType] = useState('bar');
    const [countries, setCountries] = useState([]);
    const [country1, setCountry1] = useState("Sweden");
    const [country2, setCountry2] = useState("Norway");
    const [referenceValue, setReferenceValue] = useState('No value');



    const startDate= '2022-02-01';
    const endDate = new Date().toISOString().split('T')[0];

    //test("Food Intolerance (40 items)", startDate, endDate, "All", "United Kingdom");

    useEffect(() => {
        async function fetchData() {
            const country1Results = await getAllReportsAfterDatesAndGenderAndCountryCode(testName, startDate, endDate, 'All', country1);
            const country2Results = await getAllReportsAfterDatesAndGenderAndCountryCode(testName, startDate, endDate, 'All', country2);

            const combinedData = country1Results.map(country1 => {
                const country2 = country2Results.find(c2 => c2.name === country1.name) || { value: 0 };
                return { name: country1.name, country1Value: country1.value, country2Value: country2.value };
            });
            setData(combinedData);

            if (country1Results[0] !== undefined ){
                setCountCountry1(country1Results[0].count)
            }else {
                setCountCountry1(0);
            }
            if (country2Results[0] !== undefined){
                setCountCountry2(country2Results[0].count)
            }else {
                setCountCountry2(0);
            }
            const countries = await getAllCountries();
            setCountries(countries);

        }
        fetchData();
    }, [testName, country1, country2]);

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
            <div>
                <p>
                    <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
                        {chartType === 'bar' ? 'Switch to Line Chart' : 'Switch to Bar Chart'}
                    </button>
                    {chartType === 'bar'}
                </p>
                <label>
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
                <select  value={country1} onChange={e => {setCountry1(e.target.value);}}>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                    ))}
                </select>
                <select value={country2} onChange={e => {setCountry2(e.target.value);}}>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                    ))}
                </select>
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
                            <Bar dataKey="country1Value" fill="#3df500" name={country1}/>
                            <Bar dataKey="country2Value" fill="#a277c6" name={country2}/>
                        </BarChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="country1Value" stroke="#3df500" name={country1}/>
                            <Line type="monotone" dataKey="country2Value" stroke="#a277c6" name={country2}/>
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </ResizableBox>
            <label>
                Amount of results: <span style={{ color: '#3df500' }}>{country1}: {countCountry1 !== 0 ? countCountry1 : 'No Results'} </span>
                <span style={{ color: '#a277c6' }}> {country2}: {countCountry2 !== 0 ? countCountry2 : 'No Results'}</span>
            </label>
        </div>
    );
}

export default CompareCountriesChart;


