import { Link } from 'wouter';
import React from "react";
import './Landing.css';

function Landing(){
    return (
        <div id="landingpage">
            <a>Gettested</a><br/>
            <Link href="/statistics">Statistics</Link>
        </div>
    );
}

export default Landing;