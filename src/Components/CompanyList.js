import React, { useState, useEffect } from 'react'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios';

import apiData from './companylist.json';
import companyInfo from './companyInfo.json';

function CompanyList() {

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
        
        let url = '/api/v1.0/market/company/getall'
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
    });


    const fetchCompanyDetail = (event) => {
        console.log(event.target.textContent)

        // setCompanyLoader(false)
        // setCompanyDetail(companyInfo.data)

        let companycode = event.target.textContent
        let url = '/api/v1.0/market/company/info/'+companycode
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


    return (
        <Form>
            {companyLoader == false ? <>
                <h5 style={{ "textAlign": "left", "marginLeft": "20px" }}>Company Details</h5>
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
                            <th style={{ "borderWidth": "1px" }}>TurnOver</th>
                            <td style={{ "borderWidth": "1px" }}>{companyDetail.turnover}</td>
                        </tr>
                    </tbody>
                </table></> : <></>}
            <center>Lsit of Companies</center>
            <Table bordered striped hover>
                <tbody>
                    <tr>
                        <th>Price</th>
                        <th>Company Name</th>
                    </tr>
                    {loader == false ?
                        <>
                            {
                                result.map((detail) => {
                                    return <tr>
                                        <td>{detail.price}</td>
                                        <td onClick={fetchCompanyDetail}>{detail.companyName}</td>
                                    </tr>
                                })
                            }
                        </>
                        :
                        <p>No companies to load</p>}
                </tbody>
            </Table>
        </Form>
    )
}

export default CompanyList