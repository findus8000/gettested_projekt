import './Statistics.css';

import React, {useEffect, useState} from "react";
import { Link } from 'wouter';
import OldTestBarChart from "../../components/OldTestBarChart";
import DateBarChart from "../../components/DateBarChart";
import {getAllReportsAfterDatesAndGender, getAllReportsAfterGender, meanFromResultsArr} from "../../api/Controller";
import {type} from "@testing-library/user-event/dist/type";
import MaleFemaleChart from "../../components/MaleFemaleChart";
import GenderDistrubutionChart from "../../components/GenderDistrubutionChart";
import AverageByMonthChart from "../../components/AverageByMonthChart";

function Statistics() {
    const [testType, setTestType] = useState('Food Intolerance (80 items)');
    const [testNames, setTestNames] = useState([{name: "Select test"}]);
    const [currentTest, setCurrentTest] = useState('');




    useEffect(() => {
        async function fetchData() {

            const result = await getAllReportsAfterDatesAndGender(testType, '2022-02-01', '2024-02-01');
            setTestNames(result);
            if (result.length > 0) {
                setCurrentTest(result[0].name);
            }
        }
        fetchData();
    }, [testType]);


    return (
        <div id="statisticspage">
            <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>

            <div id={"testSelector"}>
                <select className="selectDropdown" id="testdropdown" value={testType} onChange={e => {setTestType(e.target.value);}} >
                    <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                    <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                    <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                    <option value="Vitamin D Test">Vitamin D Test</option>
                </select>
            </div>



            <div id="panels">

                <div id="leftdiv">

                    <div id="barchart"><OldTestBarChart testType={testType}></OldTestBarChart></div>
                    <div id="piechart"><GenderDistrubutionChart testType={testType}></GenderDistrubutionChart></div>


                </div>


                <div id="rightdiv">


                    <select className="selectDropdown" id="specificdropdown" value={currentTest} onChange={e => {setCurrentTest(e.target.value);}}>
                        {testNames.map((test, index) => (
                            <option key={index} value={test.name}>{test.name}</option>
                        ))}
                    </select>


                    <MaleFemaleChart testType={testType} specificTestType={currentTest}></MaleFemaleChart>
                    <AverageByMonthChart testType={testType} specificTestType={currentTest}></AverageByMonthChart>
                </div>
            </div>


        </div>

    );
}

export default Statistics;
