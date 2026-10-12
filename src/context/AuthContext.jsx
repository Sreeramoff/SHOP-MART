import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("novaUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("novaToken") || null;
  });


  // =========================
  // REGISTER
  // =========================

  const register = (name, email, password) => {

    const savedUser = localStorage.getItem(
      "novaRegisteredUser"
    );

    if (savedUser) {

      const existingUser = JSON.parse(savedUser);

      if (existingUser.email === email) {

        return {
          success: false,
          message: "An account with this email already exists.",
        };

      }
    }

    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "novaRegisteredUser",
      JSON.stringify(newUser)
    );

    return {
      success: true,
    };
  };


  // =========================
  // SIGN IN
  // =========================

  const signIn = (email, password) => {

    const savedUser = localStorage.getItem(
      "novaRegisteredUser"
    );

    if (!savedUser) {

      return {
        success: false,
        message: "No account found. Please register first.",
      };

    }

    const registeredUser = JSON.parse(savedUser);


    // Check email
    if (registeredUser.email !== email) {

      return {
        success: false,
        message: "Incorrect email or password.",
      };

    }


    // Check password
    if (registeredUser.password !== password) {

      return {
        success: false,
        message: "Incorrect email or password.",
      };

    }


    // =========================
    // CREATE TOKEN
    // =========================

    const newToken =
      "nova_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .substring(2);


    // Save token
    localStorage.setItem(
      "novaToken",
      newToken
    );

    // Save user
    localStorage.setItem(
      "novaUser",
      JSON.stringify(registeredUser)
    );


    // Update React state
    setToken(newToken);
    setUser(registeredUser);


    return {
      success: true,
      token: newToken,
    };
  };


  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("novaUser");
    localStorage.removeItem("novaToken");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}