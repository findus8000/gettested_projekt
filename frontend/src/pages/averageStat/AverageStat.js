import React, { useState } from "react";
import { Link } from 'wouter';
import SelectLayout from "../../components/SelectLayout";
import { DateBarChart, setTheTestNameOutside, setGender } from "../../components/DateBarChart"; // Make sure the import paths are correct

function AverageStat() {
    const handleTestNameChange = (e) => {
        const selectedTest = e.target.value;
        setTheTestNameOutside(selectedTest, "left");
        setTheTestNameOutside(selectedTest, "right");
    };

    const handleGenderChange = (e) => {
        const selectedTest = e.target.value;
        setGender(selectedTest, "left");
        setGender(selectedTest, "right");
    };

    return (
        <div id="outer-container">
            <SelectLayout />
            <div id="page-wrap">
                <div id="statisticspage">
                    <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>
                    <div id="selectorContainer">
                        <select className="selectDropdown" id="testTypeDropdown" onChange={handleTestNameChange}>
                            <option value="No Selection">Select Test</option>
                            <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)</option>
                            <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                            <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                            <option value="Testosterone (saliva)">Testosterone (saliva)</option>
                            <option value="Iron Deficiency Basic">Iron Deficiency Basic</option>
                            <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                            <option value="Vitamin D Test">Vitamin D</option>
                        </select>
                        <select className="selectDropdown" id="seasonDropdown">
                            <option value="No Selection">Select Season</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                        </select>
                        <select className="selectDropdown" id="genderDropdown" onChange={handleGenderChange}>
                            <option value="No Selection">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div id="panels">
                        <div id="leftdiv">
                            <p id="bold">General Left</p>
                            <div><DateBarChart chartId="left" /></div>
                        </div>
                        <div id="rightdiv">
                            <p id="bold">General Right</p>
                            <div><DateBarChart chartId="right" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AverageStat;