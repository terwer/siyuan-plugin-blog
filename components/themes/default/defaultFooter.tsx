import styles from "./css/layout.module.css";
import Image from "next/image";
import footerStyles from "./css/footer.module.css"

export default function DefaultFooter() {
    return (
        <>
            <footer className={footerStyles.footer}>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={footerStyles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
                  </span>
                </a>
            </footer>
        </>
    )
}