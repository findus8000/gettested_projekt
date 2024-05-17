import React, {useEffect, useState} from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {getAllReportsAfterDatesAndGender} from '../api/Controller';
import {ResizableBox} from 'react-resizable';
import 'react-resizable/css/styles.css';

function DateBarChart({chartId}) {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2022-02-01');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [testName, setTestName] = useState('Food Intolerance (40 items)'); // Default test
    const [gender, setGender] = useState('Select gender');
    const [count, setCount] = useState(0);
    const [referenceValue, setReferenceValue] = useState('No value');

    useEffect(() => {
        console.log(`Chart ID: ${chartId}`);
        if (chartId === 'left') {
            setTestNameGlobalLeft = setTestName;
            setTestGenderGlobalLeft = setGender;
        } else if (chartId === 'right') {
            setTestNameGlobalRight = setTestName;
            setTestGenderGlobalRight = setGender;
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            const results = await getAllReportsAfterDatesAndGender(testName, startDate, endDate,gender);
            setData(results);
            if (results[0] !== undefined) {
                setCount(results[0].count);
            } else {
                setCount(0); // Set count to a default value if results[0] is undefined
            }
        }
        fetchData();
    }, [testName, startDate, endDate, gender]);

    useEffect(() => {
        if (testName === "Allergy & Intolerance Test (78 items)" || testName ==="Food Intolerance (80 items)"|| testName ==="Food Intolerance (40 items)" ) {
            setReferenceValue("<b>CLASS 0:</b> No reaction (<span style =\"color: green;\">Green</span>)<br />" +
                "<b>CLASS 1-2:</b> Weak sensitization (<span style=\"color: yellow;\">Yellow</span>)<br />" +
                "<b>ClASS 3-4:</b> Moderate sensitization (<span style =\"color: orange;\">Orange</span>)<br />" +
                "<b>CLASS 5-6:</b> Strong sensitization (<span style =\"color: red;\">Red</span>)<br />" +
                "<b>CLASS 0</b> = <0.35 | <b>CLASS 1-2</b> = (0.35 - 5) | <b>CLASS 3-4</b> = (5 - 50) | <b>CLASS 5-6</b> = (50 - 100)");
            for (let i = 0; i < data.length; i++) {

            }

        }
        else if(testName === "Testosterone (saliva)"){
            setReferenceValue("Testosterone varies with age but standard is<br/>"+
                "<b>Men</b>: 10 - 230,9 pg/ml<br/>" +
                "<b>Women</b>: 10 - 50,2 pg/m")
        }
        else if (testName === "Vitamin D Test"){
            setReferenceValue( "<25 nmol/L Critical deficiency<br/>" +
                "26-75 nmol/L Deficiency<br/>" +
                "76-100 nmol/L Adequate level<br />" +
                "101-200 nmol/L Optimal level<br />" +
                "201-250 nmol/L High level<br />" +
                ">250 nmol/L Potentially toxic level")
        }
        else if(testName=== "Estrogen / Progesterone"){
            setReferenceValue("<b>Ratio progesterone / estrogen</b> <br />" +
                "Follicular phase 4-14<br />" +
                "Luteal phase 10-131<br />" +
                "Postmenopause 2-20<br />" +
                "Men 2-24<br/>" +
                "<b>Progesterone</b> <br />" +
                "Follicular phase 30,3 - 51,3 pg/ml<br />" +
                "Luteal phase 87,3 - 544,3 pg/ml<br />" +
                "Postmenopause 21,0 - 69,0 pg/ml<br />" +
                "Men lower than 58,0 pg/ml<br />" +
                "<b>Estrogen</b> <br />" +
                "Follicular phase 3,1-6,4 pg/ml<br />" +
                "Ovulation phase 4,9-11,9 pg/ml<br />" +
                "Luteal phase 3,6-7,5 pg/ml<br />" +
                "Postmenopause 3,0-7,5 pg/ml<br />" +
                "Men 2,1-4,1 pg/ml<br />")
        }
        else {
            setReferenceValue("")
        }
    }, [testName]);



    return (
        <div style={{width: '100%', overflowX: 'hidden', color: 'white'}}>
            <div>
                <label>
                    Select Test:
                    <select value={testName} onChange={e => setTestName(e.target.value)}>
                        <option value="Allergy & Intolerance Test (78 items)">Allergy & Intolerance Test (78 items)
                        </option>
                        <option value="Food Intolerance (80 items)">Food Intolerance (80 items)</option>
                        <option value="Food Intolerance (40 items)">Food Intolerance (40 items)</option>
                        <option value="Testosterone (saliva)">Testosterone (saliva)</option>
                        <option value="Iron Deficiency Basic">Iron Deficiency Basic</option>
                        <option value="Estrogen / Progesterone">Estrogen / Progesterone</option>
                        <option value="Vitamin D Test">Vitamin D</option>
                    </select>
                </label>
                <label>
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="Select gender">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <br/>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min="2022-02-01"/>
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate}/>
                    {<br/>}
                </label>
                <br/>
                <label dangerouslySetInnerHTML={{__html: referenceValue}}/>
            </div>
            <ResizableBox width="100%" height={300} minConstraints={[300, 200]}
                          maxConstraints={[window.innerWidth, 400]}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 50,
                        }}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0}
                               tick={{fontSize: 12, fill: 'white'}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="value" activeBar={<Rectangle stroke="white"/>}>
                            {data.map((entry, index) => (
                                isMultiTest(testName) ? (
                                    <Cell key={`cell-${index}`} fill={getColorMultiValue(entry.value)}/>
                                ) : (
                                    <Cell key={`cell-${index}`} fill="#82ca9d"/>
                                )
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ResizableBox>
            <label>
                Amount of results: {count !== 0 ? count : 'No Results'}
            </label>
            <br/>
        </div>
    )
}

const getColorMultiValue = (value) => {
    if (value <= 0.35) return 'green'; // CLASS 0
    if (value > 0.35 && value < 5) return 'yellow'; // CLASS 1-2
    if (value >= 5 && value < 50) return 'orange'; // CLASS 3-4
    if (value >= 50 && value <= 100) return 'red'; // CLASS 5-6
    return 'grey'; // Default color if out of range
};
const isMultiTest = (name) => {
    let value = false;
    if (name === "Allergy & Intolerance Test (78 items)" || name ==="Food Intolerance (80 items)"|| name ==="Food Intolerance (40 items)" ) {
    value = true;
    }
    return value;
};

let setTestNameGlobalLeft = null;
let setTestNameGlobalRight = null;

const setTestName = (name, chartId) => {
    if (name !=="No Selection") {
        if (chartId === 'left' && setTestNameGlobalLeft) {
            setTestNameGlobalLeft(name);
        } else if (chartId === 'right' && setTestNameGlobalRight) {
            setTestNameGlobalRight(name);
        }
    }
};

let setTestGenderGlobalLeft = null;
let setTestGenderGlobalRight = null;

const setGender = (gender, chartId) =>{
    if (chartId === 'left' && setTestGenderGlobalLeft) {
        setTestGenderGlobalLeft(gender);
    } else if (chartId === 'right' && setTestGenderGlobalRight) {
        setTestGenderGlobalRight(gender);
    }

}



export { setGender ,setTestName as setTheTestNameOutside , DateBarChart };
