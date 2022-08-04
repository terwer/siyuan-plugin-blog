import styles from './css/layout.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultHeader from "./defaultHeader";
import DefaultFooter from "./defaultFooter";
import {Col, Container, Row} from "react-bootstrap";

/**
 * 默认布局
 * @param children
 * @constructor
 */
export default function DefaultLayout({children}: { children: any }) {
    return (
        <>
            <Container>
                <Row>
                    <DefaultHeader/>
                </Row>
                <Row>
                    <main className={styles.main}>{children}</main>
                </Row>
                <Row>
                    <DefaultFooter/>
                </Row>
            </Container>
        </>
    )
}
