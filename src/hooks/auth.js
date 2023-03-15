import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isLoggedIn, isLoggedInSet] = useState(false);
  const [isReady, isReadySet] = useState(false);

  const getToken = Cookies.get("token");

  const setReady = () => isReadySet(true);

  useEffect(() => {
    if (getToken) {
      isLoggedInSet(true);
    }
    setTimeout(setReady, 1000);

    return () => clearTimeout(setReady);
  }, [getToken])

  return { isLoggedIn, isLoggedInSet, isReady };

}