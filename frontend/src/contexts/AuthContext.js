import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup
} from "firebase/auth";

import  { auth, provider } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [signOutSuccess, setSignOutSuccess] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginGoogle() {
    return signInWithPopup(auth, provider)
  }

  function updateUserProfile(user, profile) {
    return updateProfile(user, profile);
  }

  function logout() {
    return signOut(auth)
  }

  function handleSignInSuccess() {
    setSignInSuccess(true);
    setTimeout(function() {
      setSignInSuccess(false);
    }, 3000);
  }

  function handleSignOutSuccess() {
    setSignOutSuccess(true);
    setTimeout(function() {
      setSignOutSuccess(false);
    }, 3000)
  }

  function handleProfileUpdateSuccess() {
    setProfileUpdateSuccess(true)
    setTimeout(function() {
      setProfileUpdateSuccess(false);
    }, 3000)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    error,
    setError,
    login,
    register,
    updateUserProfile,
    logout,
    loginGoogle,
    signInSuccess, 
    handleSignInSuccess,
    handleSignOutSuccess,
    signOutSuccess,
    handleProfileUpdateSuccess,
    profileUpdateSuccess
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}