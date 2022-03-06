import Link from "next/link";

function Navigation() {
  return (
    <nav id="Navigation">
      <ul>
        {/* <li>Home</li> */}
        <li>
          <Link href="/documentation">Docs</Link>
        </li>
        {/* <li>About</li> */}
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/tos">TOS</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          {/* <Link href="/authentication" passHref>
          <button type="submit" className="button--primary">
            Authenticate
          </button>
        </Link> */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/authentication">
            <button type="submit" className="button--primary">
              Authenticate
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
