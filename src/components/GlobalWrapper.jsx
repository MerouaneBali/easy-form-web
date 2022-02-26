import { useRouter } from "next/router";
import { useEffect } from "react";
import api from "../utils/api";

function GlobalWrapper({ children }) {
  const router = useRouter();

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
  }, []);

  return <>{children}</>;
}

export default GlobalWrapper;
