import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import navbarStyles from "./css/navbar.module.css"
import clsx from "clsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faDownload, faFile, faFileText, faHome, faPieChart} from '@fortawesome/free-solid-svg-icons'
import SiteConfig from "../../../lib/common/siteconfig";
import {useState} from "react";
import Image from "next/image";

export default function DefaultNavbar({props, keyword}: { props: SiteConfig, keyword?: string }) {

    let [value, setValue] = useState("")

    const handleSearch = (e: any) => {
        e.preventDefault()
        window.location.href = "/s/" + value
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <Image src="/terwer.svg" width="283" height="64" title={props.webname} alt={props.webname}/>
                </Navbar.Brand>
                {
                    false &&
                    <div>
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
                    </div>
                }

                <Nav.Item>
                    <Form onSubmit={(e) => handleSearch(e)} className={clsx("d-flex", navbarStyles.sFormGroup)}>
                        <Form.Control
                            type="text"
                            value={value}
                            placeholder="请输入关键词"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button type="submit">
                            搜索
                        </Button>
                    </Form>
                </Nav.Item>
            </Container>
        </Navbar>
    )
}