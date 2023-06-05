import Link from "next/link";

const Navigation = () => {
  return (
    <header className="header">
      <div className="z-container">
        <nav className="navbar">
        <Link className="nav-logo" href="/">
        Copy Crafter
              </Link>
      
          <ul className="nav-menu">
          <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/oneliner">
                One liner
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/summarizer">
                Summarizer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
