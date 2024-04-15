import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isJWTTokenValid } from "./auth";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { loginToggle } from "@/store/slices/loginSlice";

export const useLogout = () => {
  const IDLE_TIMEOUT = 30000;
  const IDLE_TIMEOUT_CHECK_INTERVAL = 1000;
  const [lastActive, setLastActive] = useState(Date.now());
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const handleActivity = () => {
      setLastActive(Date.now());
    };

    document.addEventListener("click", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      document.removeEventListener("click", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActive;

      if (idleTime > IDLE_TIMEOUT) {
        setIsLoggedOut(true);
        // Извършете логика за разлогване
      }
    }, IDLE_TIMEOUT_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [lastActive]);

  return {
    isLoggedOut,
  };
};




const VALIDATE_ACCESS_TOKEN_TIMER: number = 15 * 60 * 1000;

export const useValidateAccessToken = () => {  
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value)
  const dispatchIsLoggedIn = useAppDispatch()
  const navigate = useNavigate();

  
  const checkIsLogin = async () => {
    const isValid = await isJWTTokenValid();
      if (isValid) {
        if (!isLoggedIn) {
          dispatchIsLoggedIn(loginToggle())
        }
        if (location.pathname == "/login") {
          navigate("/");
        }
      }
      else {
        if (location.pathname != "/login") {
          navigate("/login");
        }
      } 
  }

  checkIsLogin()

  useEffect(() => {
    const interval = setInterval(checkIsLogin, VALIDATE_ACCESS_TOKEN_TIMER);

    return () => clearInterval(interval);
  });
};