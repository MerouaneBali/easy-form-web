import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../state/actionCreators";

// import "../css/components/Header.css";

function Header() {
  const headerTitle = useSelector(({ headerTitle }) => headerTitle);

  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.instance.get("/profile");

        setEmail(res.data.email);
      } catch (error) {
        // alert("An error accured");
      }
    })();
  }, []);

  return (
    <div id="header">
      <h3>{headerTitle}</h3>
      <div id="header__pfp">
        <p>{email}</p>
        <p>
          <Link href="/dashboard/profile" passHref>
            <span>{email[0]}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Header;
