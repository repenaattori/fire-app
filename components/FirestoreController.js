import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, TODO_REF, USERS_REF } from "./FirebaseConfig";
import { AuthContext } from "./FirebaseAuthControl";
import { onAuthStateChanged } from "firebase/auth";

export const TodoContext = createContext();

export function TodoProvider({ children }) {

    const [todos, setTodos] = useState([]);

    useEffect(() => {

        let removeListener;
        onAuthStateChanged(auth, user => {
            if (user) {
                removeListener = onSnapshot(collection(db, USERS_REF, user.uid, TODO_REF ), qSnapshot =>
                    setTodos(
                        qSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    )
                )
            }else if(removeListener){
                removeListener();
                removeListener = null;
            }
        })

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
            await addDoc(collection(db, USERS_REF, uid, TODO_REF), { done: false, todoText });
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export function removeTodo(id) {
    deleteDoc(doc(db, USERS_REF, auth.currentUser.uid, TODO_REF, id))
        .catch(error => console.log(error.message));
}

export function removeAllTodos() {
    getDocs(collection(db, USERS_REF, auth.currentUser.uid, TODO_REF))
        .then(docs => docs.forEach(doc => removeTodo(doc.id)))
        .catch(error => console.log(error.message));
}

export function updateTodo(id, data) {
    updateDoc(doc(db, USERS_REF, auth.currentUser.uid, TODO_REF, id), data)
        .catch(error => console.log(error.message));
}