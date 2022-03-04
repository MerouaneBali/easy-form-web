import React, { useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBook,
  faProjectDiagram,
  faCog,
  faAward,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const route = useRouter();

  const pathname = route.asPath.split("/dashboard").join("");

  const menuRef = useRef();

  return (
    <nav id="menu" ref={menuRef}>
      <ul>
        <li id="menu__logo">
          <Logo />
          <h3>easy forms</h3>
        </li>
        <li className={/^\/overview/.test(pathname) ? "active-link" : ""}>
          <Link href="/dashboard/overview" passHref>
            <p onClick={() => console.log("hello")}>
              <FontAwesomeIcon icon={faChartPie} /> overview
            </p>
          </Link>
        </li>
        <li className={/^\/documentation/.test(pathname) ? "active-link" : ""}>
          <Link href="/dashboard/documentation" passHref>
            <p>
              <FontAwesomeIcon icon={faBook} /> documentation
            </p>
          </Link>
        </li>
        <li className={/^\/projects/.test(pathname) ? "active-link" : ""}>
          <Link href="/dashboard/projects" passHref>
            <p>
              <FontAwesomeIcon icon={faProjectDiagram} /> projects
            </p>
          </Link>
        </li>
        <li className={/^\/settings/.test(pathname) ? "active-link" : ""}>
          <Link href="/dashboard/settings" passHref>
            <p>
              <FontAwesomeIcon icon={faCog} /> settings
            </p>
          </Link>
        </li>
        <li className={/^\/subscriptions/.test(pathname) ? "active-link" : ""}>
          <Link href="/dashboard/subscriptions" passHref>
            <p>
              <FontAwesomeIcon icon={faAward} />
              subscriptions
            </p>
          </Link>
        </li>
      </ul>
      <button
        type="button"
        id="menu__expand"
        onClick={() => menuRef.current.classList.toggle("menu--expand")}
      >
        <FontAwesomeIcon icon={faChevronRight} className="icon__light" />
      </button>
    </nav>
  );
}

export default Menu;
