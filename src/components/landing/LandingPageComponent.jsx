import styles from "./LandingPageComponent.module.css";
import WalletConnect from "../asset/walletconnect.png";
import TrySimulator from "../asset/trysimulator.png";
import normal from "../asset/normal.png";
import deuteranopia from "../asset/deuteranopia.png";
import protanopia from "../asset/protanopia.png";
import tritanopia from "../asset/tritanopia.png";
import Simulator from "../asset/simulator.png";
import MicroLearning from "../asset/microlearning.png";
import Checker from "../asset/checker.png";
import Demarcator from "../asset/demarcator.png";
import PolkadotWalletConnectInfoImage from "../asset/polkadotwalletcollectinfoimage.png";
import CurvyWalletConnect from "../asset/curvywalletconnect.png";
import ConnectWalletCard from "../asset/connectwallertcard.png";
import LearnAndEarn from "../asset/learnandcontribute.png";
import EarnColorTokens from "../asset/earncolortokens.png";
import ClaimYourImpact from "../asset/claimimpact.png";
import Image from "next/image";
import NavBarComponent from "../../layout/navbar/Navbar";
import Claimyourtoken from "../asset/claimyourtokenbtn.png";
import SimulatorUpload from "../asset/uploadimage.png";
import UplaodImageButton from "../asset/uploadbtn.png";
import WhiteCurvyWalletConnect from "../asset/whitecurvywalletconnect.png";
import FooterComponent from "../../layout/footer/Footer";
import StartLearning from "../asset/startlearningbtn.png";

const LandingPageComponent = () => {
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
              <Image src={WalletConnect} className={styles.hero_auth_button} />
              <Image src={TrySimulator} className={styles.hero_auth_button} />
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
              <Image
                src={CurvyWalletConnect}
                alt="curvy-wallet-connect-button"
                className={styles.polkadot_inclusive_wallet_connect_btn}
              />
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
            <button className={styles.
              upload_image_learn_more_button}>
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
          <p>Create, learn, and earn recognition for making design accessible to all.</p>
          <div className={styles.pre_footer_button_container}>
            <Image
              src={WhiteCurvyWalletConnect}
              alt="white curvy wallet connect"
              className={styles.pre_footer_wallet_connect_button}
            />
            <Image
              src={StartLearning}
              alt="start learning button"
              className={styles.pre_footer_start_learning_button}
            />
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

export default LandingPageComponent;
