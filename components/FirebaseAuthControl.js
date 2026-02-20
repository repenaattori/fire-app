import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, USERS_REF } from "./FirebaseConfig";
import { createContext, useEffect, useState } from "react";
import { doc,  onSnapshot, setDoc, updateDoc } from "firebase/firestore";

export async function signUp(nickname, email, password) {
    try {
        let userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, USERS_REF, userCredentials.user.uid), {
            nickname: nickname,
            email: userCredentials.user.email
        })
        console.log('Success');
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export async function signIn(email, password) {
    try {
        let user = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in');
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        return error;
    }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userdata, setUserData] = useState();

    useEffect(() => {
        let removeLister;
        onAuthStateChanged(auth, user => {
            if(user){
                setLoggedIn(true);
                removeLister = onSnapshot(doc(db, USERS_REF, user.uid), docSnap => 
                    setUserData(docSnap.data())
                )
            }else{
                setLoggedIn(false);
            }           
        });
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, userdata }}>
            {children}
        </AuthContext.Provider>
    )
}

export async function modifyUserData(data){
    try {
        await updateDoc(doc(db, USERS_REF, auth.currentUser.uid), data);
    } catch (error) {
        return error;
    }
}