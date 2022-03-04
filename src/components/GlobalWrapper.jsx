import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../state/actionCreators";

function GlobalWrapper({ children }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const { headerTitleAction } = bindActionCreators(actionCreators, dispatch);

  // Handle Protected Routes
  useEffect(() => {
    (async () => {

      const pathname = router.asPath;

      const protectedRoutes = [/^\/dashboard/];

      const isPathnameProtected = protectedRoutes.filter((route) =>
        route.test(pathname)
      ).length;

      if (isPathnameProtected) {
        try {
          const res = await api.isUserLoggedIn();

          if (!res) {
            router.push("/authentication");
          }
        } catch (error) {
          router.push("/error");
        }
      }
    })();
  }, [router]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { headerTitleAction });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}

export default GlobalWrapper;
