import Head from "next/head";
import DefaultNavbar from "./defaultNavbar";

export default function DefaultHeader() {
    return (
        <>
            <Head>
                <title>Default layout</title>
            </Head>
            <header>
                <DefaultNavbar/>
            </header>
        </>
    )
}