import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
class BootstrapNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar bg="dark" variant="dark" expand="lg" >
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Navbar.Brand href="/"><h1>StockSonic</h1></Navbar.Brand>
                                <Nav className="ml-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <NavDropdown title="Stock" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/stock/create">Create</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/stock/list">List</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Company" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/company/create">Create</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/company/list">List</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}
export default BootstrapNavbar;