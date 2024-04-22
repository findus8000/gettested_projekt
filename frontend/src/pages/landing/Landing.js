import { Link } from 'wouter';
import React from "react";
import './Landing.css';
import TestButton from "../../components/TestButton";

function Landing(){
    return (
        <div id="landingpage">
            <a>Gettested</a><br/>
            <div> <img src="getTested-logo-small.png" alt="Gettested Logo"/> </div>
            <Link href="/statistics">Statistics</Link>
            <br/>
            <Link href="/basicStatistics">Old Basic Statistics</Link>
            <TestButton></TestButton>
        </div>
    );
}

export default Landing;