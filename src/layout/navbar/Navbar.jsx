"use client";
import { useRef } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Logo from "@/components/asset/logo.png";
import WalletConnect from "@/components/asset/walletconnect.png";
import LoginButton from "@/components/asset/loginbutton.png";
import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import WalletStatus from "@/components/wallet/WalletStatus";
import { useWallet } from "@/contexts/WalletContext";

const NavBarComponent = () => {
    const { isConnected } = useWallet();
    const walletConnectRef = useRef(null);

    const handleButtonClick = () => {
        if (!isConnected && walletConnectRef.current) {
            walletConnectRef.current.open();
        }
    };

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
            {!isConnected && (
              <button
                type="button"
                onClick={handleButtonClick}
                className={styles.login_button_wrapper}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Image
                  src={LoginButton}
                  alt="login button"
                  className={styles.login_button}
                />
              </button>
            )}
            {isConnected ? (
              <WalletStatus />
            ) : (
              <>
                <div className={styles.wallet_connect_wrapper}>
                  <Image
                    src={WalletConnect}
                    alt="wallet connect"
                    className={styles.wallet_connect}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      opacity: 0
                    }}
                  />
                </div>
                {/* Hidden WalletConnectButton for dialog - always rendered when not connected */}
                <div style={{ display: 'none' }}>
                  <WalletConnectButton ref={walletConnectRef} />
                </div>
              </>
            )}
          </div>
        </div>
    )
}

export default NavBarComponent;