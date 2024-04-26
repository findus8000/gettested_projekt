import { Link } from 'wouter';
import React from "react";
import './Landing.css';
import TestButton from "../../components/TestButton";
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
            </div>
        </div>
    );
}

export default Landing;
