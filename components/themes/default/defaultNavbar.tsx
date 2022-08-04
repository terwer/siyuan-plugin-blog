import {Button, Container, Nav, Navbar, NavDropdown, Form} from "react-bootstrap";
import navbarStyles from "./css/navbar.module.css"
import clsx from "clsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faFileText, faFile, faBook, faPieChart, faDownload} from '@fortawesome/free-solid-svg-icons'
import SiteConfig from "../../../lib/common/siteconfig";

export default function DefaultNavbar({props}: { props: SiteConfig }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">{props.webname}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/"><FontAwesomeIcon icon={faHome}/>&nbsp;Home</Nav.Link>
                        <Nav.Link href="#"><FontAwesomeIcon icon={faFileText}/>&nbsp;Link</Nav.Link>

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                <FontAwesomeIcon icon={faFile}/>&nbsp;Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <FontAwesomeIcon icon={faBook}/>&nbsp;Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                <FontAwesomeIcon icon={faPieChart}/>&nbsp;Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                <FontAwesomeIcon icon={faDownload}/>&nbsp;Separated link
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