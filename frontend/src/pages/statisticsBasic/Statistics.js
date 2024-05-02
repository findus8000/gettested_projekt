import './Statistics.css';

import React, {useEffect, useState} from "react";
import { Link } from 'wouter';
import OldTestBarChart from "../../components/OldTestBarChart";
import DateBarChart from "../../components/DateBarChart";
import {getAllReportsAfterDatesAndGender, getAllReportsAfterGender, meanFromResultsArr} from "../../api/Controller";
import {type} from "@testing-library/user-event/dist/type";
import MaleFemaleChart from "../../components/MaleFemaleChart";
import GenderDistrubutionChart from "../../components/GenderDistrubutionChart";

function Statistics() {
    const [testType, setTestType] = useState('Food Intolerance (80 items)');
    const [testNames, setTestNames] = useState([{name: "Select test"}]);
    const [currentTest, setCurrentTest] = useState('');
    const [currentTestAvg, setCurrentTestAvg] = useState(0);



    useEffect(() => {
        async function fetchData() {

            const result = await getAllReportsAfterDatesAndGender(testType, '2022-02-01', '2024-02-01');
            setTestNames(result);
        }
        fetchData();
    }, [testType]);

    useEffect(() => {
       const foundTest = testNames.find(test => test.name === currentTest);
        setCurrentTestAvg(foundTest ? foundTest.value : 0);

    }, [currentTest]);


    return (
        <div id="statisticspage">
            <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>
                <select id="testdropdown" value={testType} onChange={e => setTestType(e.target.value)}>
                    <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                    <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                    <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                </select>
            <div id="panels">

                <div id="leftdiv">
                    General<br/>
                    <div id="piechart"><GenderDistrubutionChart testType={testType}></GenderDistrubutionChart></div>
                    <div id="barchart"><OldTestBarChart testType={testType}></OldTestBarChart></div>

                </div>


                <div id="rightdiv">
                    Specific<br/>

                    <select id="testdropdown" value={currentTest} onChange={e => setCurrentTest(e.target.value)}>
                        {testNames.map((test, index) => (
                            <option key={index} value={test.name}>{test.name}</option>
                        ))}
                    </select>

                    <div id="values">
                        Average: {currentTestAvg}<br/>
                    </div>
                    <MaleFemaleChart testType={testType} specificTestType={currentTest}></MaleFemaleChart>
                </div>
            </div>


        </div>

    );
}

export default Statistics;
