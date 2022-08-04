import styles from './css/layout.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultHeader from "./defaultHeader";
import DefaultFooter from "./defaultFooter";
import {Container, Row} from "react-bootstrap";
import SiteConfig from "../../../lib/common/siteconfig";

/**
 * 默认布局
 * @param props
 * @param children
 * @constructor
 */
export default function DefaultLayout({props,children}: { props:SiteConfig,children: any }) {
    return (
        <>
            <Container>
                <Row>
                    <DefaultHeader props={props}/>
                </Row>
                <Row>
                    <main className={styles.main}>{children}</main>
                </Row>
                <Row>
                    <DefaultFooter props={props}/>
                </Row>
            </Container>
        </>
    )
}
