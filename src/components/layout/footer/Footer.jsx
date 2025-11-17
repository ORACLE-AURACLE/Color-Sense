import styles from "./Foooter.module.css";
import Logo from "../../../../public/asset/logo.png";
import Image from "next/image";

const FooterComponent = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.logo_container}>
                <Image src={Logo} alt="color sense logo" className={styles.footer_logo} />
                <p>See the world through different eyes.</p>
            </div>

            <div className={styles.footer_links}>
                <h3>Links</h3>
                <a href="#features" className={styles.footer_link}>
                    About
                </a>
                <a href="#contact" className={styles.footer_link}>
                    Color Blindness Info
                </a>
                <a href="#about" className={styles.footer_link}>
                    Contact

                </a>
                <a href="#github" className={styles.footer_link}>
                    GitHub
                </a>
            </div>

            <div className={styles.social_links}>
                <h3>Socials</h3>
                <a href="#twitter" className={styles.footer_link}>
                    Twitter
                </a>
                <a href="#discord" className={styles.footer_link}>
                    LinkedIn
                </a>
                <a href="#linkedin" className={styles.footer_link}>
                    GitHub
                </a>
            </div>

            <div className={styles.all_rights_reserved}>
                <p>© 2025 ColorSense — Built for Polkadot Hackathon</p>
            </div>


        </div>
    )
}

export default FooterComponent;