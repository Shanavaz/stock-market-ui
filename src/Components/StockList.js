import React, { useState, useEffect } from 'react'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios';

import apiData from './stocklist.json';
import config from './config';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function StockList() {

    const host = config.host
    let [loader, setLoader] = useState(true);
    let [result, setResult] = useState([]);
    let [compName, setCompName] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    let [codeList, setCodeList] = useState([]);

    useEffect(() => {


        let url = host + '/api/v1.0/market/company/fetchall'
        axios.get(url)
            .then(response => {
                console.log(response)
                setCodeList(response.data.data.companyList)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    const handleSubmit = () => {

        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setMinutes(start.getMinutes() + 30)
        start.setHours(start.getHours() + 5)
        end.setMinutes(end.getMinutes() + 30)
        end.setHours(end.getHours() + 5)


        const isoStart = start.toISOString();
        const isoEnd = end.toISOString();

        console.log(isoStart)
        console.log(isoEnd)

        let url = `${host}/api/v1.0/market/stock/get/${compName}/${isoStart}/${isoEnd}`
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response)
                if (response.data && response.data.status == "OK") {
                    NotificationManager.success("Success")
                    setResult(response.data)
                    setLoader(false)
                } else {
                    if (response.data && response.data.message) {
                        NotificationManager.error(response.data.message)
                    } else {
                        NotificationManager.error("Something went wrong")
                    }
                }
            })
            .catch(error => {
                console.log(error)
                setLoader(true)
                NotificationManager.error("Error")
            });
        // setLoader(false)
        // setResult(apiData)
    }

    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <th>Company Code</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    <tr>
                        {/* <td><input type="text" onChange={(event) => { setCompName(event.target.value); }} placeholder="Enter Company Code" /></td> */}
                        <td>
                            <select onChange={(event) => { setCompName(event.target.value); }}>
                                <option>Select company</option>
                                {
                                    codeList.map((detail, index) => {
                                        return <option value={detail.code}>{detail.name} - ({detail.code})</option>
                                    })
                                }
                            </select>
                        </td>
                        <td><input type="datetime-local" onChange={(event) => { setStartDate(event.target.value); }} /></td>
                        <td><input type="datetime-local" onChange={(event) => { setEndDate(event.target.value); }} /></td>
                        <td><button onClick={handleSubmit}>Submit</button></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            {loader == false && result.data != undefined && result.data != null ?
                <React.Fragment>

                    <h5 style={{ "textAlign": "left", "marginLeft": "20px" }}>General Details</h5>
                    <table style={{ "textAlign": "left", "marginLeft": "20px" }}>
                        <tbody>
                            <tr style={{ "borderWidth": "1px" }}>
                                <th style={{ "borderWidth": "1px" }}>Company Name</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.companyName != undefined || result.data.companyName != null ? result.data.companyName : ''}</td>                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Maximum Price (in Rupees)</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.max}</td>
                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Average Price (in Rupees)</th>
                                <td style={{ "borderWidth": "1px" }}>{result.data.avg}</td>
                            </tr>
                            <tr>
                                <th style={{ "borderWidth": "1px" }}>Minimum Price (in Rupees)</th>
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
                                <th>Stock Price (in Rupees)</th>
                            </tr>
                            {
                                result.data.stocks.map((detail, key) => {
                                    return <tr key={key}>
                                        <td>{detail.date}</td>
                                        <td>{detail.price}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </React.Fragment> :
                <p>No Stocks to display</p>
            }
            <NotificationContainer />
        </React.Fragment>
    )
}

export default StockList