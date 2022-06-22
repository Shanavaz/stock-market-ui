import React, { useState, useEffect } from 'react'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios';

import apiData from './stocklist.json';

function StockList() {

    let [loader, setLoader] = useState(true);
    let [result, setResult] = useState([]);
    let [compName, setCompName] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');

    // useEffect(() => {


    //     let url = ''
    //     axios.get(url)
    //         .then(result => {
    //             console.log(result.data)
    //             setLoader(true)
    //             setResult(result.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setLoader(false)
    //         });
    // });

    const handleSubmit = () => {
        let url = `/api/v1.0/market/stock/get/${compName}/${startDate}/${endDate}`
        console.log(url)
        setLoader(false)
        setResult(apiData)
    }

    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <th>Company Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    <tr>
                        <td><input type="text" onChange={(event) => { setCompName(event.target.value); }} placeholder="Enter Company Name" /></td>
                        <td><input type="date" onChange={(event) => { setStartDate(event.target.value); }} /></td>
                        <td><input type="date" onChange={(event) => { setEndDate(event.target.value); }} /></td>
                        <td><button onClick={handleSubmit}>Submit</button></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            {loader == true ? <p>No Stocks to display</p> :
                <React.Fragment>

                    <h5 style={{ "textAlign": "left", "marginLeft": "20px" }}>General Details</h5>
                    <table style={{ "textAlign": "left", "marginLeft": "20px" }}>
                        <tbody>
                            <tr style={{ "borderWidth": "1px" }}>
                                <th style={{ "borderWidth": "1px" }}>Company Name</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.companyName}</td>
                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Maximum</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.max}</td>
                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Average</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.avg}</td>
                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Minimum</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.min}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <center><h3>Stock Details</h3></center>
                    <Table bordered striped hover style={{ "textAlign": "left", "marginLeft": "20px", "margin": "20px" }}>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <th>Price</th>
                            </tr>
                            {
                                apiData.data.stocks.map((detail, key) => {
                                    return <tr key={key}>
                                        <td>{detail.date}</td>
                                        <td>{detail.price}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default StockList