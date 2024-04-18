import { Link } from 'wouter';
import React from "react";
import './Landing.css';

function Landing(){
    return (
        <div id="landingpage">
            <a>Gettested</a><br/>
            <div> <img src="getTested-logo-small.png" alt="Gettested Logo"/> </div>
            <Link href="/statistics">Statistics</Link>
        </div>
    );
}

export default Landing;