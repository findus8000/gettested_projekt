import './StatisticsDate.css';
import DatabaseTestReadButton from "../../components/DatabaseTestReadButton";
import DateBarChart from "../../components/DateBarChart";
import React from "react";
import { Link } from 'wouter';

function StatisticsDate() {
    return (
        <div id="statisticspage">
            <Link href="/">Back</Link>
            <div id="selectorContainer">
                <select className="selectDropdown" id="testTypeDropdown">
                    <option value="D-vitamin">D-vitamin</option>
                    <option value="C-vitamin">C-vitamin</option>
                    <option disabled>Select test</option>
                </select>
                <select className="selectDropdown" id="seasonDropdown">
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                </select>
                <select className="selectDropdown" id="genderDropdown">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option disabled>Select gender</option>
                </select>
            </div>
            <div id="panels">
                <div id="leftdiv">
                    General<br/>
                    <div id="values">
                        Average:<br/>
                        Mean:<br/>
                        Standardeviation:
                    </div>
                    <div id="barchart"><DateBarChart></DateBarChart></div>
                </div>
                <div id="rightdiv">
                    Specific<br/>
                </div>
            </div>
        </div>
    );
}

export default StatisticsDate;
