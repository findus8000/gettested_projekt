import './CompareStat.css';
import DateBarChart from "../../components/NewBarChart";
import React from "react";
import { Link } from 'wouter';
import NewBarChart from "../../components/NewBarChart";
import CompareCountriesChart from "../../components/CompareCountriesChart";
import SelectLayout from "../../components/SelectLayout";

function CompareStat() {
    return (
        <div id="outer-container">

            <SelectLayout></SelectLayout>

            <div id="page-wrap">
                <div id="statisticspage">
                    <Link href="/"><img id="linkback" src="getTested-logo-small.png" alt="Gettested Logo"/></Link>
                    <div id="panels">
                        <div id="leftdiv">
                            <p id="bold">Compare male & female averages</p>   <br/>
                            <div id="barchart"><NewBarChart></NewBarChart></div>
                        </div>
                        <div id="rightdiv">
                            <p id="bold">Compare countries averages</p>  <br/>

                            <div id="barchart"><CompareCountriesChart></CompareCountriesChart></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompareStat;

