import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db, TODO_REF, USERS_REF } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const TodoContext = createContext();

export function TodoProvider({ children }) {

    const [todos, setTodos] = useState([]);

    useEffect(() => {

        let unsubscribe;
        onAuthStateChanged(auth, user => {
            if (user) {
                unsubscribe = onSnapshot(collection(db, USERS_REF, user.uid, TODO_REF ), qSnapshot =>
                    setTodos(
                        qSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    )
                )
            }else{
                if(unsubscribe){
                    unsubscribe();
                }
                unsubscribe = null;
                setTodos([]);
            }
        });
    }, [])

    return (
        <TodoContext.Provider value={todos}>
            {children}
        </TodoContext.Provider>
    );
}


export async function addTodo(todoText) {
    try {
        let uid = auth?.currentUser?.uid;
        if (todoText.trim() != '' && uid) {
            await addDoc(collection(db, USERS_REF, uid, TODO_REF), 
                { done: false, todoText });
        }
    } catch (error) {
        return error;
    }
}

export async function removeTodo(id) {
    try {
        deleteDoc(doc(db, USERS_REF, auth.currentUser.uid, TODO_REF, id));
    } catch (error) {
        return error;
    }   
}

export async function removeAllTodos() {
    try {
        let docs = await getDocs(
            collection(db, USERS_REF, auth.currentUser.uid, TODO_REF)
        );
        for (const doc of docs) {
            const error = await removeTodo(doc.id);
            if(error){
                return error;
            }       
        }
    } catch (error) {
        return error;        
    }
}

export async function updateTodo(id, data) {
    try {
        await updateDoc(doc(db, USERS_REF, auth.currentUser.uid, TODO_REF, id), data);
    } catch (error) {
        return error;
    }
}