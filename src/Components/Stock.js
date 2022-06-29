import React, { useState, useEffect } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';
import config from './config';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Stock() {

    const host = config.host
    let [code, setCode] = useState('');
    let [price, setPrice] = useState('');
    let [codeList, setCodeList] = useState([]);

    useEffect(() => {

        // setResult(apiData.data.latestPrice)
        // setLoader(false)

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

    const submitForm = () => {
        var reqData = {
            companyCode: code,
            price: price
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
        };
        let url = host + `/api/v1.0/market/stock/add/${code}`;

        console.log(reqData)
        console.log(url)

        axios.post(url, reqData, axiosConfig)
            .then(result => {
                console.log(result.data)
                if (result.data && result.data.status == "OK") {
                    NotificationManager.success("Success")
                    setCode('')
                    setPrice('')
                } else {
                    if (result.data && result.data.message) {
                        NotificationManager.error(result.data.message)
                    } else {
                        NotificationManager.error("Something went wrong")
                    }
                }
            })
            .catch(error => {
                console.log(error)
                NotificationManager.error('Error');
            }
            );
    }

    return (
        <Form>
            <h1>Create Stock</h1>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>Code</td>
                        {/* <td><Form.Control type="text" onChange={(event) => { setCode(event.target.value); }} placeholder="Enter code" /></td> */}
                        <td>
                            <Form.Select aria-label="Default select example" onChange={(event) => { setCode(event.target.value); }}>
                                <option>Select company</option>
                                {
                                    codeList.map((detail, index) => {
                                        return <option value={detail.code}>{detail.name} - ({detail.code})</option>
                                    })
                                }
                            </Form.Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td><Form.Control type="number" onChange={(event) => { setPrice(event.target.value); }} placeholder="Enter price (in Rupees)" value={price}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><Button variant="primary" onClick={submitForm}>
                            Submit
                        </Button></td>
                    </tr>
                </tbody>
            </Table>
            <NotificationContainer />
        </Form>
    )
}

export default Stock