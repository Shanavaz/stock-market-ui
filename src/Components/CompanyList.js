import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios';

import apiData from './companylist.json';

export class CompanyList extends Component {

    constructor(props) {
        super(props);

        // Initializing the state 
        this.state = {
            color: 'lightgreen',
            loader: false,
            result: []
        };
    }
    componentDidMount() {
        console.log(apiData)
        console.log(apiData.data.latestPrice)

        let url = "/api/v1.0/market/company/getall"

        axios.get(url)
            .then(result => {
                this.setState({
                    result: result.data,
                    loader: true
                })
                console.log(result.data)
            }
            )
            .catch(error => {
                this.setState({
                    loader: false
                })
                console.log(error)
            }
            );
    }

    render() {
        return (
            <Form>
                <center>Lsit of Companies</center>
                <Table bordered striped hover>
                    <tbody>
                        <tr>
                            <th>Price</th>
                            <th>Company Name</th>
                        </tr>
                        {
                            apiData.data.latestPrice.map((detail) => {
                                return <tr>
                                    <td>{detail.price}</td>
                                    <td>{detail.companyName}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Form>
        )
    }
}

export default CompanyList