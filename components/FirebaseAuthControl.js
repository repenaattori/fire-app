import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, USERS_REF } from "./FirebaseConfig";
import { createContext, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

export async function signUp(nickname, email, password){
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

export async function signIn(email, password){
    try {
        let user = await signInWithEmailAndPassword(auth,email,password);
        console.log('**'+user);
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export async function logout(){
    try {
        await signOut(auth);        
    } catch (error) {
        return error;
    }
}

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{ 
        onAuthStateChanged(auth, user => user ? setLoggedIn(true) : setLoggedIn(false));
    },[]);

    return(
        <AuthContext.Provider value={loggedIn}>
            {children}
        </AuthContext.Provider>
    )
}