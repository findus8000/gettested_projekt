import './Statistics.css';
import DatabaseTestReadButton from "../../components/DatabaseTestReadButton";
import TestBarChart from "../../components/TestBarChart";
import React from "react";
import { Link } from 'wouter';

function Statistics() {
    return (
        <div id="statisticspage">
            <Link href="/">Back</Link>
                <select id="testdropdown">
                    <option value="" selected="selected">D-vitamin</option>
                    <option value="" selected="selected">C-vitamin</option>
                    <option value="" selected="selected">Select test</option>
                </select>
            <div id="panels">

                <div id="leftdiv">
                    General<br/>
                    <div id="values">
                        Average:<br/>
                        Mean:<br/>
                        Standardeviation:
                    </div>

                    <div id="barchart"><TestBarChart></TestBarChart></div>
                </div>


                <div id="rightdiv">
                    Specific<br/>
                    <select id="testdropdown">
                        <option value="" selected="selected">Male</option>
                        <option value="" selected="selected">Female</option>
                        <option value="" selected="selected">Select gender</option>
                    </select>

                    <select id="testdropdown">
                        <option value="" selected="selected">69</option>
                        <option value="" selected="selected">420</option>
                        <option value="" selected="selected">Select age</option>
                    </select>
                </div>
            </div>


        </div>

    );
}

export default Statistics;
