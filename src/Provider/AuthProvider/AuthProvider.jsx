import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const googleProvider = new GoogleAuthProvider();
  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = async (email, password, name, imageURL) => {
    setLoading(true);

    console.log(imageURL)

    try {
      // Step 1: Create account
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Step 2: Update Profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageURL,
      });

      setLoading(false);
      return result.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const AuthInfo = {
    user,
    loading,
    GoogleSignIn,
    logIn,
    logOut,
    createUser,
    setLoading,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
