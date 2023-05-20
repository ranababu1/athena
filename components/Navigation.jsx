import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Home
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" href="/writer">
                Writer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/oneliner">
                Oneliner
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
