import React, { useState } from 'react';
import axios from 'axios';

const DatabaseTestReadButton = () => {

    const [data,set] = useState(null);

    const handleClick = () => {
        axios.get('http://localhost:8080/api/getAllPatientGenders')
            .then(response => {
                console.log(response.data); // Log the response from the backend
                const names = response.data.map(entity => entity.name);
                set(names.join(", "));
                // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error if necessary
            });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <button onClick={handleClick} style={{margin: '10px'}}>Fetch Data</button>
                <p style={{
                    width: '1000px',
                    textAlign: 'center'
                }}>{data}</p>
            </div>
        </div>

    );
};

export default DatabaseTestReadButton;
