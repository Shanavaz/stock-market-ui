import React, { useState, useEffect } from 'react'
import { Form, Table, Button } from 'react-bootstrap'
import axios from 'axios';
import { TrashFill } from "react-bootstrap-icons";

import apiData from './companylist.json';
import companyInfo from './companyInfo.json';
import config from './config';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function CompanyList() {

    const host = config.host

    let [loader, setLoader] = useState(true);
    let [companyLoader, setCompanyLoader] = useState(true);
    let [result, setResult] = useState([]);
    let [companyDetail, setCompanyDetail] = useState([]);
    // let [compName, setCompName] = useState('');
    // let [startDate, setStartDate] = useState('');
    // let [endDate, setEndDate] = useState('');

    useEffect(() => {

        // setResult(apiData.data.latestPrice)
        // setLoader(false)

        let url = host + '/api/v1.0/market/company/getall'
        axios.get(url)
            .then(response => {
                console.log(result)
                setResult(response.data.data.latestPrice)
                setLoader(false)
            })
            .catch(error => {
                console.log(error)
                setLoader(false)
            });
    }, []);


    const fetchCompanyDetail = (event) => {
        console.log(event.target.textContent)

        // setCompanyLoader(false)
        // setCompanyDetail(companyInfo.data)
        let companycode = event.target.textContent
        let url = `${host}/api/v1.0/market/company/info/${companycode}`;
        axios.get(url)
            .then(response => {
                console.log(response)
                setCompanyDetail(response.data.data)
                setCompanyLoader(false)
            })
            .catch(error => {
                console.log(error)
                setLoader(false)
            });
    }

    const deleteCompany = (name, index) => {
        console.log(name, index)

        let url = `${host}/api/v1.0/market/company/delete/${name}`;
        axios.delete(url)
            .then(response => {
                console.log(response)
                setResult(result => result.splice(index, 1))
                if (response.data && response.data.status == "OK") {
                    NotificationManager.success(response.data.message)
                } else {
                    if (response.data && response.data.message) {
                        NotificationManager.error(response.data.message)
                    } else {
                        NotificationManager.error("Something went wrong")
                    }
                }
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
                NotificationManager.error('Error');
            });
    }


    return (
        <Form>
            <NotificationContainer />
            <h5 style={{ "textAlign": "left", "marginLeft": "20px" }}>Company Details</h5>
            <h6 style={{ "textAlign": "left", "marginLeft": "20px" }}>(Click on any company name to show the details)</h6>
            {companyLoader == false ?
                <table style={{ "textAlign": "left", "marginLeft": "20px" }}>
                    <tbody>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Name</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.name}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>CEO</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.ceo}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Code</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.code}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Website</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.website}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Enlistment</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.enlistment}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Latest Stock Price</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.latestStockPrice}</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>TurnOver (in Rupees)</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.turnover}</td>
                        </tr>
                    </tbody>
                </table> :
                <table style={{ "textAlign": "left", "marginLeft": "20px" }}>
                    <tbody>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Name</th>
                            <td style={{ "borderWidth": "1px" }}>(Click Below to populate)</td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>CEO</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Code</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Website</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Enlistment</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>Latest Stock Price</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                        <tr style={{ "borderWidth": "1px" }}>
                            <th style={{ "borderWidth": "1px" }}>TurnOver (in Rupees)</th>
                            <td style={{ "borderWidth": "1px" }}></td>
                        </tr>
                    </tbody>
                </table>}
            <h3>List of Companies</h3>
            {loader == false ?
                <Table bordered striped hover>
                    <tbody>
                        <tr>
                            <th>Price (in Rupees)</th>
                            <th>Company Name</th>
                            <th>Option</th>
                        </tr>
                        {
                            result.map((detail, index) => {
                                return <tr key={index}>
                                    <td>{detail.price}</td>
                                    <td style={{ "cursor": "pointer" }} onClick={fetchCompanyDetail}>{detail.companyCode}</td>
                                    <td style={{ "cursor": "no-drop" }}><TrashFill style={{ "cursor": "pointer" }} onClick={() => { deleteCompany(detail.companyCode, index) }} /> </td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table> : <p>No companies to load</p>}
        </Form>
    )
}

export default CompanyList