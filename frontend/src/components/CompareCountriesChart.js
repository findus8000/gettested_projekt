
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

    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
                    {chartType === 'bar' ? 'Line Chart' : 'Bar Chart'}
                </button>
                {chartType === 'bar'}
                <label>
                    <select id="specificdropdown" value={testName} onChange={e => setTestName(e.target.value)} style={{ width: '200px' }}>
                        <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                        <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                        <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                        <option value="Testosterone (saliva)">Testosterone (saliva)</option>
                        <option value="Iron Deficiency Basic">Iron Deficiency Basic</option>
                        <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                        <option value="Vitamin D Test">Vitamin D</option>
                    </select>
                </label>
                <select  id="specificdropdown" value={country1} onChange={e => {setCountry1(e.target.value);}}>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                    ))}
                </select>
                <select  id="specificdropdown" value={country2} onChange={e => {setCountry2(e.target.value);}}>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                    ))}
                </select>
            </div>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]} maxConstraints={[window.innerWidth, 400]}>
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


