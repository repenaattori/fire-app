import { StyleSheet, View } from "react-native"
import { TodoContext } from "../firebase/FirestoreController";
import { useContext } from "react";
import TodoList from "../components/TodoList";
import RemoveTodos from "../components/RemoveTodos";
import TodoForm from "../components/TodoForm";

export default function TodoView(){
    const todos = useContext(TodoContext);

    return(
        <View style={styles.container}>
            <TodoForm/>
            <RemoveTodos/>
            <TodoList todos={todos}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10
  },
});