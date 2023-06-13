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
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/social">
                Social
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link className="nav-link" href="/ppcadcopy">
                Ad Copy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/metadata">
                Meta data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/structureddata">
                Structured data
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
