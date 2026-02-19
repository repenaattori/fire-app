import { StyleSheet, View } from "react-native"
import AddTodoView from "./AddTodoView";
import RemoveView from "./RemoveView";
import TodoList from "./TodoList";
import { TodoContext } from "./FirestoreController";
import { useContext } from "react";

export default function TodoView(){
    const todos = useContext(TodoContext);

    return(
        <View style={styles.container}>
            <AddTodoView/>
            <RemoveView/>
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