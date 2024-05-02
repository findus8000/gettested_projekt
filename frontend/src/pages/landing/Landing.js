import { Link } from 'wouter';
import React from "react";
import './Landing.css';

function Landing() {
    return (
        <div id="landingpage">
            <div className="content-overlay">
                <div>
                    <img src="getTested-logo-small.png" alt="Gettested Logo"/>
                </div>
                <Link href="/statistics" className="link-button">Statistics</Link>
                <br/>
                <Link href="/basicStatistics" className="link-button">Old Basic Statistics</Link>
                <br/>
                <Link href="/newStatistic" className="link-button">Advanced Statistics</Link>

            </div>
        </div>
    );
}

export default Landing;