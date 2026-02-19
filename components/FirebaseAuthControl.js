import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export async function signUp(nickname, email, password){
    try {
        let user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
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