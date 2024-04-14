import { useEffect } from "react";
import { createContext, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("Token", serverToken);
  };

  let isLoggedIn = !!token;

  console.log("isLoggedIn", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("Token");
  };

  // jwt authentication - to get the currently loggedIn user

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user details");
        setIsLoading(true);
      }
    } catch (error) {
      console.log("There is error: ", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.msg);
        setServices(data.msg);
        // console.log(services);
      }
    } catch (error) {
      console.log("Services frontend error: ", error);
    }
  };

  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
