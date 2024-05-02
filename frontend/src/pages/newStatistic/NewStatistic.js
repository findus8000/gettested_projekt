import './NewStatistic.css';
import DateBarChart from "../../components/NewBarChart";
import React from "react";
import { Link } from 'wouter';
import NewBarChart from "../../components/NewBarChart";

function NewStatistic() {
    return (
        <div id="statisticspage">
            <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>
            <div id="selectorContainer">
                <select className="selectDropdown" id="testTypeDropdown">
                    <option value="No Selection">Select Test</option>
                    <option value="D-vitamin">D-vitamin</option>
                    <option value="C-vitamin">C-vitamin</option>
                </select>
                <select className="selectDropdown" id="seasonDropdown">
                    <option value="No Selection">Select Season</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                </select>
                <select className="selectDropdown" id="genderDropdown">
                    <option value="No Selection">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div id="panels">
                <div id="leftdiv">
                    <p id="bold">General</p>   <br/>
                    <div id="values">
                        Average:<br/>
                        Mean:<br/>
                    </div>
                    <div id="barchart"><NewBarChart></NewBarChart></div>
                </div>
                <div id="rightdiv">
                    <p id="bold">Specific</p>  <br/>
                    <div id="values">
                        Average:<br/>
                        Mean:<br/>
                    </div>
                    <div id="barchart"><NewBarChart></NewBarChart></div>
                </div>
            </div>
        </div>
    );
}

export default NewStatistic;

