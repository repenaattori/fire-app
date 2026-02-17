import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, TODO_REF } from "./FirebaseConfig";

export const TodoContext = createContext();

export function TodoProvider({children}){

    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, TODO_REF), orderBy('todoText'));
        onSnapshot(q, qSnapshot => 
            setTodos(
                qSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
            )
        )
    }, [])

    return(
        <TodoContext.Provider value={todos}>
            {children}
        </TodoContext.Provider>
    );
}