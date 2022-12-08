import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider
      value={{
        profilePic:
          "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
