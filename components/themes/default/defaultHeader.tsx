import Head from "next/head";
import DefaultNavbar from "./defaultNavbar";
import SiteConfig from "../../../lib/common/siteconfig";
import Image from "next/image";
import headerStyles from "./css/header.module.css"

export default function DefaultHeader({props,keyword}: { props: SiteConfig,keyword?:string }) {
    return (
        <>
            <Head>
                <title>{props?.webname} - {props?.webslogen}</title>
                <meta name="keywords" content={props?.keywords}/>
                <meta name="description" content={props?.description}/>
            </Head>
            <header>
                <div className={headerStyles.forkMe}>
                    <a href="https://github.com/you">
                        <Image loading="lazy" width="149" height="149"
                               src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png?resize=149%2C149"
                               className="attachment-full size-full" alt="Fork me on GitHub"
                               data-recalc-dims="1"/>
                    </a>
                </div>
                <DefaultNavbar props={props}/>
            </header>
        </>
    )
}