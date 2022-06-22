import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';

function Company() {
    const host = 'http://localhost:8081'
    let [code, setCode] = useState('');
    let [name, setName] = useState('');
    let [ceoname, setCeoname] = useState('');
    let [turnover, setTurnover] = useState('');
    let [website, setWebsite] = useState('');
    let [enlist, setEnlist] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value)
        setCode(event.target.type);
        // console.log(code)
    }
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

        let url = host+"/api/v1.0/market/company/register"
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        axios.post(url, reqData,axiosConfig)
            .then(result => {
                console.log(result.data)
            })
            .catch(error =>
                console.log(error)
            );
    }

    return (
        <Form>
            <center>Create Company</center>
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>Code</td>
                        <td><Form.Control type="text" onChange={(event) => { setCode(event.target.value); }} placeholder="Enter code" /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><Form.Control type="text" onChange={(event) => { setName(event.target.value); }} placeholder="Enter name" /></td>
                    </tr>
                    <tr>
                        <td>CEO</td>
                        <td><Form.Control type="text" onChange={(event) => { setCeoname(event.target.value); }} placeholder="Enter ceo name" /></td>
                    </tr>
                    <tr>
                        <td>Turnover</td>
                        <td><Form.Control type="text" onChange={(event) => { setTurnover(event.target.value); }} placeholder="Enter Turnover" /></td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td><Form.Control type="text" onChange={(event) => { setWebsite(event.target.value); }} placeholder="Enter website" /></td>
                    </tr>
                    <tr>
                        <td>Enlistment</td>
                        <td><Form.Control type="text" onChange={(event) => { setEnlist(event.target.value); }} placeholder="Enter enlistment" /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><Button variant="primary" onClick={submitForm}>
                            Submit
                        </Button></td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    )
}

export default Company