import Head from "next/head";
import DefaultNavbar from "./defaultNavbar";
import SiteConfig from "../../../lib/common/siteconfig";
import Image from "next/image";
import headerStyles from "./css/header.module.css"

export default function DefaultHeader({props, keyword, type}: { props: SiteConfig, keyword?: string, type: string }) {
    return (
        <>
            <Head>
                <title>{props?.webname} - {props?.webslogen}</title>
                <meta name="keywords" content={props?.keywords}/>
                <meta name="description" content={props?.description}/>
            </Head>
            <header>
                <div className={headerStyles.forkMe}>
                    <a href="https://github.com/terwer/node-siyuan">
                        <Image loading="lazy" width="149" height="149"
                               src="https://img1.terwergreen.com/api/public/forkme_right_green.png"
                               className="attachment-full size-full" alt="Fork me on GitHub"
                               data-recalc-dims="1"/>
                    </a>
                </div>
                <DefaultNavbar props={props} type={type}/>
            </header>
        </>
    )
}