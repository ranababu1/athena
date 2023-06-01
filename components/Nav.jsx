import Link from "next/link";

const Navigation = () => {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link" href="/">
          Home
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
  );
};

export default Navigation;
