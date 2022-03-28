import eterna from "../images/eterna.png";
const Footer = () => {
  return (
    <div id="footer">
      <div className="logo-contianer">
        <img src={eterna} alt="" className="mb-4" />
        <p>
          Eterna's the first exchange to distribute a % of its cashflow to its
          token stakers. We combine the best features of centralized (CEXs) and
          decentralized exchanges (DEXs).
        </p>
        <p className="copy-right">All rights reserved. © 2022, Eterna</p>
      </div>
      <div className="footer-col">
        <p className="footer-title">Company</p>
        <a href="/">
          Eterna OÜ
          <br />
          Tina 18
          <br />
          10126 Tallinn
          <br />
          Estonia
        </a>
      </div>
      <div className="footer-col">
        <p className="footer-title">Legal</p>
        <a href="/listing-application/">Listing Application</a>
        <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
      </div>
      <div className="footer-col">
        <p className="footer-title">Support</p>
        <a href="mailto:support@eterna.exchange">Contact</a>
      </div>
      <div className="footer-col socials">
        <p className="footer-title">Community</p>
        <div className="footer_menu_2">
          <a href="https://twitter.com/Eterna_Hybrid" target="_blank">
            <img
              src="https://eterna.exchange/wp-content/themes/codetheme-child/img/fi1.png"
              alt=""
            />
          </a>
          <a href="https://t.me/eterna_hybrid" target="_blank">
            <img
              src="https://eterna.exchange/wp-content/themes/codetheme-child/img/fi2.png"
              alt=""
            />
          </a>
          <a href="#" target="_blank">
            <img
              src="https://eterna.exchange/wp-content/themes/codetheme-child/img/fi3.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
