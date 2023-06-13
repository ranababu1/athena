import Link from "next/link";
const Footer = () => {
  return (
    <footer>
      <div className="footer-flexbox">
        <div className="footer-flexleft footer-alink">
          <p>© 2023 Copycrafter. All Rights Reserved.</p>
        </div>
        <div className="footer-flexright footer-alink">
          <Link className="" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="" href="/tos">
            ToS
          </Link>
          <Link className="" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
