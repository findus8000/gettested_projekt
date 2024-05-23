import './SpecificStat.css';
import React, {useEffect, useState} from "react";
import { Link } from 'wouter';
import OldTestBarChart from "../../components/OldTestBarChart";
import {getAllReportsAfterDatesAndGender, getAllAveragesAfterGender, medianFromResultsArr} from "../../api/Controller";
import MaleFemaleChart from "../../components/MaleFemaleChart";
import GenderDistrubutionChart from "../../components/GenderDistrubutionChart";
import AverageByMonthChart from "../../components/AverageByMonthChart";
import SpecificTestDistrubution from "../../components/SpecificTestDistrubution";
import '../../components/SelectLayout.css';
import SelectLayout from "../../components/SelectLayout";
import MedianBarChart from "../../components/MedianBarChart";

function SpecificStat() {
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
        <div id="outer-container">

            <SelectLayout></SelectLayout>

            <div id="page-wrap">
            <div id="statisticspage">

                <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>



                <div id={"testSelector"}>
                    <select style={{fontSize: "18px",padding: "10px" ,backgroundColor: "#555", borderRadius: "5px", border: "none", color: "white"}}
                            value={testType} onChange={e => {setTestType(e.target.value);}} >
                        <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                        <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                        <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                        <option value="Vitamin D Test">Vitamin D Test</option>
                        <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                    </select>
                </div>



                <div id="panels">

                    <div id="leftdiv">
                        <div style={{marginTop:"31px", fontSize: "20px"}}>Averages for {testType} test</div>
                        <div id="barchart"><OldTestBarChart testType={testType}></OldTestBarChart></div>
                        <div style={{marginTop:"31px", fontSize: "20px"}}>Medians for {testType} test</div>
                        <div><MedianBarChart testType={testType}></MedianBarChart></div>
                        <div>Percent of male & female tests</div>
                        <div id="piechart"><GenderDistrubutionChart testType={testType}></GenderDistrubutionChart></div>
                    </div>


                    <div id="rightdiv">


                        <select className="selectDropdown" id="specificdropdown" value={currentTest} onChange={e => {setCurrentTest(e.target.value);}}>
                            {testNames.map((test, index) => (
                                <option key={index} value={test.name}>{test.name}</option>
                            ))}
                        </select>

                        <div style={{marginTop:"10px"}}>Male & Female average for {currentTest} test</div>
                        <MaleFemaleChart testType={testType} specificTestType={currentTest}></MaleFemaleChart>
                        <div style={{marginTop:"10px"}}>Averages by month for {currentTest} test</div>
                        <AverageByMonthChart testType={testType} specificTestType={currentTest}></AverageByMonthChart>
                        <div style={{marginTop:"10px"}}>Distribution of {currentTest} test</div>
                        <SpecificTestDistrubution testType={testType} specificTestType={currentTest}></SpecificTestDistrubution>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default SpecificStat;
