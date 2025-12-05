import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const user = true;
  const AuthInfo = { user };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
