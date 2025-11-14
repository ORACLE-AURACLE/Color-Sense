import styles from "./Navbar.module.css";
import Image from "next/image";
import Logo from "../../asset/logo.png";
import WalletConnect from "../../asset/walletconnect.png";
import LoginButton from "../../asset/loginbutton.png";

const NavBarComponent = () => {
    return (
        <div className={styles.navbar}>
          <div className="logo-image">
            <Image src={Logo} alt="color sense logo" className={styles.logo} />
          </div>

          <div className={styles.navbar_links}>
            <a href="#features" className={styles.navbar_link}>
              Home
            </a>
            <a href="#about" className={styles.navbar_link}>
              About
            </a>
            <a href="#contact" className={styles.navbar_link}>
              Color Blindness Info
            </a>
          </div>

          <div className={styles.auth_buttons}>
            <Image
              src={LoginButton}
              alt="login button"
              className={styles.login_button}
            />
            <Image
              src={WalletConnect}
              alt="wallet connect"
              className={styles.wallet_connect}
            />
          </div>
        </div>

    )
}

export default NavBarComponent;