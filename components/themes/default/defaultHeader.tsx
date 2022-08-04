import Head from "next/head";
import DefaultNavbar from "./defaultNavbar";
import SiteConfig from "../../../lib/common/siteconfig";

export default function DefaultHeader({props,keyword}: { props: SiteConfig,keyword?:string }) {
    return (
        <>
            <Head>
                <title>{props?.webname} - {props?.webslogen}</title>
                <meta name="keywords" content={props?.keywords}/>
                <meta name="description" content={props?.description}/>
            </Head>
            <header>
                <DefaultNavbar props={props}/>
            </header>
        </>
    )
}