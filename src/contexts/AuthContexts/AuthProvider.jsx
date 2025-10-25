import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Create user (Sign up)
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in user with email and password
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Check if user is admin
      if (email === import.meta.env.VITE_ADMIN_EMAIL) {
        setRole("admin");
      } else {
        setRole("user");
      }
      return userCredential;
    } catch (error) {
      console.error("Error signing in user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      // Check if user is admin
      if (email === import.meta.env.VITE_ADMIN_EMAIL) {
        setRole("admin");
      } else {
        setRole("user");
      }
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setRole(null);
    } catch (error) {
      console.error("Error signing out user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recruiter quick login
  const recruiterLogin = async () => {
    // Removed the development-only restriction and using hardcoded credentials for testing
    try {
      const email = "admin@bookbug.com";
      const password = "Admin123!";
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setRole("admin");
        return userCredential;
      } else {
        throw new Error("Admin credentials not configured");
      }
    } catch (error) {
      console.error("Error with recruiter login:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        // Check if user is admin
        if (currentUser) {
          if (currentUser.email === import.meta.env.VITE_ADMIN_EMAIL) {
            setRole("admin");
          } else {
            setRole("user");
          }
        } else {
          setRole(null);
        }
        setLoading(false); 
      },
      (error) => {
        console.error("Auth state change error:", error);
        setLoading(false); 
      }
    );

    return () => unsubscribe(); 
  }, []);

  const authInfo = {
    loading,
    user,
    role,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    recruiterLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;