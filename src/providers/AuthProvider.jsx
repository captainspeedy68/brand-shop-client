import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import auth from '../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';

export const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email, password);
    };
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("on auth state changed", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        createUser,
        loading, loginUser, googleSignIn, logout
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;