import { useState, useEffect, createContext, useContext } from "react";
import auth from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const restPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUserEmail = email => {
    return updateEmail(auth.currentUser, email);
  };
  const updateUserPassword = password => {
    return updatePassword(auth.currentUser, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signUp,
        logout,
        login,
        restPassword,
        updateUserEmail,
        updateUserPassword
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
