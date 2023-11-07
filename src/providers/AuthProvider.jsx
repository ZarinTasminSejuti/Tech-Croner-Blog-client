import { createContext, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useState } from "react";
import app from "../../firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [nameAndPhoto, setNameAndPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allBlog, setAllBlog] = useState([]);
const [effect, setEffect] = useState(true);
    
  const allBlogUrl = "http://localhost:5000/addBlog";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(allBlogUrl);
      const result = await response.json();
      setAllBlog(result);
      setLoading(false);
    };
    fetchData();
  }, [effect]); // The dependency array with 'apiUrl'

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login authentication
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login authentication
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Update Name after register
  //As per firebase doc user logged in when register complete
  //So updateProfile method need to use to update displayName
  updateProfile(auth.currentUser, nameAndPhoto)
    .then()
    .catch((error) => {
      console.error(error);
    });

  //log out authentication
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userDetails = auth.currentUser;

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("done", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    signIn,
    signInGoogle,
    signUp,
    setNameAndPhoto,
    loading,
    user,
    logOut,
    userDetails,
      allBlog,
      effect,
      setEffect,
  };
console.log(allBlog);
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
