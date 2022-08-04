import {Button, Container, Nav, Navbar, NavDropdown, Form} from "react-bootstrap";
import navbarStyles from "./css/navbar.module.css"
import clsx from "clsx";

export default function DefaultNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Nav.Item>
                    <Form className={clsx("d-flex", navbarStyles.sFormGroup)}>
                        <Form.Control
                            type="text"
                            id="s"
                            aria-describedby="q"
                        />
                        <Form.Text id="q"/>
                        <Button>Search</Button>
                    </Form>
                </Nav.Item>
            </Container>
        </Navbar>
    )
}