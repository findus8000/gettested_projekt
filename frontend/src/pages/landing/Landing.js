import { Link } from 'wouter';
import React from "react";
import './Landing.css';
import TestButton from "../../components/TestButton";
function Landing() {
    return (
        <div id="landingpage">
            <div className="content-overlay">
                <a href="#!">Get tested</a><br/>
                <div>
                    <img src="getTested-logo-small.png" alt="Gettested Logo"/>
                </div>
                <Link href="/statistics" className="link-button">Statistics</Link>
                <br/>
                <Link href="/basicStatistics" className="link-button">Old Basic Statistics</Link>
                <TestButton/>
            </div>
        </div>
    );
}

export default Landing;
