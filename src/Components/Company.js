import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';
import config from './config';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Company() {
    const host = config.host
    let [code, setCode] = useState('');
    let [name, setName] = useState('');
    let [ceoname, setCeoname] = useState('');
    let [turnover, setTurnover] = useState('');
    let [website, setWebsite] = useState('');
    let [enlist, setEnlist] = useState('');

    const submitForm = () => {
        var reqData = {
            code,
            name,
            ceo: ceoname,
            turnover,
            website,
            enlistment: enlist
        }

        console.log(reqData)

        let url = host + "/api/v1.0/market/company/register"
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(url, reqData, axiosConfig)
            .then(result => {
                console.log(result.data)
                if (result.data && result.data.status == "OK") {
                    NotificationManager.success("Success")
                    setCode('')
                    setName('')
                    setCeoname('')
                    setTurnover('')
                    setWebsite('')
                    setEnlist('')
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
            <h1>Create Company</h1>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>Code</td>
                        <td><Form.Control type="text" onChange={(event) => { setCode(event.target.value); }} placeholder="Enter code" value={code} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><Form.Control type="text" onChange={(event) => { setName(event.target.value); }} placeholder="Enter name" value={name} /></td>
                    </tr>
                    <tr>
                        <td>CEO</td>
                        <td><Form.Control type="text" onChange={(event) => { setCeoname(event.target.value); }} placeholder="Enter ceo name" value={ceoname} /></td>
                    </tr>
                    <tr>
                        <td>Turnover</td>
                        <td><Form.Control type="number" onChange={(event) => { setTurnover(event.target.value); }} placeholder="Enter Turnover (in Crore Rupees)" value={turnover} /></td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td><Form.Control type="text" onChange={(event) => { setWebsite(event.target.value); }} placeholder="Enter website" value={website} /></td>
                    </tr>
                    <tr>
                        <td>Enlistment</td>
                        <td><Form.Control type="text" onChange={(event) => { setEnlist(event.target.value); }} placeholder="Enter enlistment" value={enlist} /></td>
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

export default Company