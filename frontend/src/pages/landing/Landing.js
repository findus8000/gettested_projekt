import { Link } from 'wouter';
import React from "react";
import './Landing.css';

function Landing() {
    return (
        <div id="landingpage">
            <div className="content-overlay">
                <div style={{backgroundColor:"#414141FF", borderBottom: "5px solid #000"}}>
                    <img src="getTested-logo-small.png" alt="Gettested Logo"/>
                </div>
                <Link href="/statistics" className="link-button">Averages</Link>
                <br/>
                <Link href="/basicStatistics" className="link-button">Specific Test Average</Link>
                <br/>
                <Link href="/newStatistic" className="link-button">Compare Averages</Link>

            </div>
        </div>
    );
}

export default Landing;