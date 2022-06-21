import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';

function Stock() {

    let [code, setCode] = useState('');
    let [price, setPrice] = useState('');
    let [compCode, setCompCode] = useState('');

    const submitForm = () => {
        var reqData = {
            code,
            price
        }

        let url = "/api/v1.0/market/stock/add/"+compCode

        console.log(reqData)
        console.log(url)

        axios.post(url, reqData)
            .then(result => {
                this.setState({
                    customer: result.data,
                })
                console.log(result.data)
            }
            )
            .catch(error =>
                console.log(error)
            );
    }

    return (
        <Form>
            <center>Create Stock</center>
            <input type="text" onChange={(event)=>{setCompCode(event.target.value);}} placeholder="Enter Company code" />
            <Table bordered hover>
                <tbody>
                    <tr>
                        <td>Code</td>
                        <td><Form.Control type="text" onChange={(event)=>{setCode(event.target.value);}} placeholder="Enter code" /></td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td><Form.Control type="text" onChange={(event)=>{setPrice(event.target.value);}} placeholder="Enter price" /></td>
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

export default Stock