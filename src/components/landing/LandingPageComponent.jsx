"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWallet } from "@/contexts/WalletContext";
import styles from "./LandingPageComponent.module.css";
import WalletConnect from "../../../public/asset/walletconnect.png";
import TrySimulator from "../../../public/asset/trysimulator.png";
import normal from "../../../public/asset/normal.png";
import deuteranopia from "../../../public/asset/deuteranopia.png";
import protanopia from "../../../public/asset/protanopia.png";
import tritanopia from "../../../public/asset/tritanopia.png";
import Simulator from "../../../public/asset/simulator.png";
import MicroLearning from "../../../public/asset/microlearning.png";
import Checker from "../../../public/asset/checker.png";
import Demarcator from "../../../public/asset/demarcator.png";
import PolkadotWalletConnectInfoImage from "../../../public/asset/polkadotwalletcollectinfoimage.png";
import CurvyWalletConnect from "../../../public/asset/curvywalletconnect.png";
import ConnectWalletCard from "../../../public/asset/connectwallertcard.png";
import LearnAndEarn from "../../../public/asset/learnandcontribute.png";
import EarnColorTokens from "../../../public/asset/earncolortokens.png";
import ClaimYourImpact from "../../../public/asset/claimimpact.png";
import Image from "next/image";
import NavBarComponent from "../../layout/navbar/Navbar";
import WalletConnectButton from "../wallet/WalletConnectButton";
import Claimyourtoken from "../../../public/asset/claimyourtokenbtn.png";
import SimulatorUpload from "../../../public/asset/uploadimage.png";
import UplaodImageButton from "../../../public/asset/uploadbtn.png";
import WhiteCurvyWalletConnect from "../../../public/asset/whitecurvywalletconnect.png";
import FooterComponent from "../../layout/footer/Footer";
import StartLearning from "../../../public/asset/startlearningbtn.png";

const LandingPageComponent = () => {
  const router = useRouter();
  const { isConnected } = useWallet();
  const walletConnectRef = useRef(null);

  // Redirect to app if already connected
  useEffect(() => {
    if (isConnected) {
      router.push("/app");
    }
  }, [isConnected, router]);
  return (
    <>
      <div className="landing-page-body">
        <NavBarComponent />

        <div className={styles.hero_section}>
          <div className="hero-text text-center">
            <h1 className={styles.hero_title}>
              See the world through differrent eyes.
            </h1>
            <div className={styles.hero_subtext_container}>
              <p className={styles.hero_title_sub_text}>
                ColorSense helps people and designers understand color blindness
                and build a more inclusive digital world.
              </p>
            </div>
            <div className={styles.hero_auth_button_container}>
              <div
                className={styles.hero_auth_button}
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  className={styles.hero_auth_button}
                  style={{ position: "relative" }}
                  onClick={() => {
                    if (isConnected) {
                      router.push("/app");
                    } else {
                      // Show wallet connect if not connected
                      walletConnectRef.current?.open();
                    }
                  }}
                >
                  <Image
                    src={WalletConnect}
                    alt="Connect Wallet"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </button>
                <WalletConnectButton
                  ref={walletConnectRef}
                  className={"bg-blue-500"}
                  asImageButton={true}
                  onConnectSuccess={() => {
                    // Small delay to ensure wallet state is saved
                    setTimeout(() => {
                      router.push("/app");
                    }, 500);
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
              <button
                onClick={() => {
                  if (isConnected) {
                    router.push("/app/");
                  } else {
                    // Show wallet connect if not connected
                    walletConnectRef.current?.open();
                  }
                }}
                className={styles.hero_auth_button}
              >
                <Image src={TrySimulator} alt="Try Simulator" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.about_section}>
          <div className={styles.about_section_hero_text}>
            <h1>Over 300 million people experience color blindness.</h1>
          </div>
          <div className={styles.about_section_sub_text}>
            <p>
              Yet most interfaces are built for those who see full color. We're
              changing that starting with empathy, education, and simple tools
              that anyone can use.
            </p>
          </div>

          <div className={styles.about_section_image_comparison}>
            <div className={styles.image_comparison_item}>
              <Image
                src={normal}
                alt="normal vision"
                className={styles.image_comparison_image}
              />
            </div>
            <div className={styles.image_comparison_item}>
              <Image
                src={deuteranopia}
                alt="deuteranopia vision"
                className={styles.image_comparison_image}
              />
            </div>
            <div className={styles.image_comparison_item}>
              <Image
                src={protanopia}
                alt="protanopia vision"
                className={styles.image_comparison_image}
              />
            </div>
            <div className={styles.image_comparison_item}>
              <Image
                src={tritanopia}
                alt="tritanopia vision"
                className={styles.image_comparison_image}
              />
            </div>
          </div>
        </div>

        <div className={styles.features_section}>
          <h1 className={styles.features_section_hero_text}>
            Learn, simulate, and design for everyone.
          </h1>

          <div className={styles.features_section_feature_items_contianer}>
            <div className={styles.feature_item_first_pair}>
              <Image
                src={MicroLearning}
                alt="micro learning"
                className={styles.feature_item_image}
              />
              <Image
                src={Simulator}
                alt="simulator"
                className={styles.feature_item_image}
              />
            </div>
            <div className={styles.feature_item_second_pair}>
              <Image
                src={Checker}
                alt="checker"
                className={styles.feature_item_image_checker}
              />
            </div>
            <div className={styles.demarcator}>
              <Image
                src={Demarcator}
                alt="demarcator"
                className={styles.demarcator_image}
              />
            </div>
          </div>
        </div>
        <div className={styles.polkadot_inclusive_conatainer}>
          <div>
            <h1>Powering inclusive design with Polkadot</h1>
            <div className={styles.polkadot_inclusive_sub_text}>
              <p>
                Your wallet isn't just a login — it's your identity as an
                inclusive contributor. Connect seamlessly and start earning
                recognition on the blockchain.
              </p>
            </div>
            <div className={styles.polkadot_inclusive_image_container}>
              <Image
                src={PolkadotWalletConnectInfoImage}
                alt="little complete guide"
                className={styles.polkadot_inclusive_image}
              />
            </div>
            <div
              className={styles.polkadot_inclusive_wallet_connect_btn_container}
            >
              <div
                className={styles.polkadot_inclusive_wallet_connect_btn}
                style={{ position: "relative" }}
              >
                <Image
                  src={CurvyWalletConnect}
                  alt="Connect Wallet"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <WalletConnectButton
                  asImageButton={true}
                  onConnectSuccess={() => {
                    setTimeout(() => {
                      router.push("/app");
                    }, 500);
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                  }}
                />
              </div>
            </div>
            <p className={styles.polkadot_inclusive_conatainer_final_text}>
              Today they recognize your effort. Tomorrow, they unlock future
              collaboration.
            </p>
          </div>
        </div>

        <div className={styles.contribute_and_earn_section}>
          <div className={styles.contribute_and_earn_container}>
            <h1>Contribute & Earn</h1>
            <p>
              Four simple steps to start contributing and earning recognition
              for your accessibility work
            </p>
          </div>

          <div className={styles.contribute_and_earn_steps_container}>
            <div className={styles.contribute_and_earn_step_item}>
              <Image src={ConnectWalletCard} alt="connect wallet" />
            </div>
            <div className={styles.contribute_and_earn_step_item}>
              <Image src={LearnAndEarn} alt="learn and contribute" />
            </div>
            <div className={styles.contribute_and_earn_step_item}>
              <Image src={EarnColorTokens} alt="earn color tokens" />
            </div>
            <div className={styles.contribute_and_earn_step_item}>
              <Image src={ClaimYourImpact} alt="claim your impact" />
            </div>
          </div>

          <div className={styles.contribute_and_earn_final_image_container}>
            <Image
              src={Claimyourtoken}
              alt="claim your token"
              className={styles.claim_your_token_btn}
            />
            <p className="">
              Color Tokens reflect your contribution — educational progress,
              accessibility reports, and simulator insights.
            </p>
          </div>
        </div>

        <div className={styles.upload_image_section}>
          <div className={styles.upload_image_container}>
            <h1>Experience the world in every shade.</h1>
            <p>
              Drag the slider to see how colors shift across different vision
              types. Understanding starts with seeing the difference
            </p>

            <div className={styles.upload_image_simulator_container}>
              <Image
                src={SimulatorUpload}
                alt="simulator"
                className={styles.upload_image_simulator}
              />
            </div>
          </div>
          <div className={styles.upload_image_button_container}>
            <Image
              src={UplaodImageButton}
              alt="upload image button"
              className={styles.upload_image_button}
            />
            <button className={styles.upload_image_learn_more_button}>
              <select>
                <option>Normal Vision</option>
                <option>Deuteranopia</option>
                <option>Protanopia</option>
                <option>Tritanopia</option>
              </select>
            </button>
          </div>
        </div>

        <div className={styles.pre_footer}>
          <h1>Design for everyone. Start today.</h1>
          <p>
            Create, learn, and earn recognition for making design accessible to
            all.
          </p>
          <div className={styles.pre_footer_button_container}>
            <div
              className={styles.pre_footer_wallet_connect_button}
              style={{ position: "relative" }}
            >
              <Image
                src={WhiteCurvyWalletConnect}
                alt="Connect Wallet"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <WalletConnectButton
                asImageButton={true}
                onConnectSuccess={() => {
                  setTimeout(() => {
                    router.push("/app");
                  }, 500);
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                }}
              />
            </div>
            <button
              onClick={() => {
                if (isConnected) {
                  router.push("/app");
                } else {
                  // Show wallet connect if not connected
                  walletConnectRef.current?.open();
                }
              }}
              className={styles.pre_footer_start_learning_button}
            >
              <Image src={StartLearning} alt="start learning button" />
            </button>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

export default LandingPageComponent;
