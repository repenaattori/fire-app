import { useContext, useState } from "react";
import { addTodo, TodoContext } from "./FirestoreController";
import { MD3LightTheme, Text, TextInput } from "react-native-paper";
import { View } from "react-native";

export default function AddTodoView() {

  const [todo, setTodo] = useState('');

  const todos = useContext(TodoContext);

  function insertTodo() {
    addTodo(todo);
    setTodo('');
  }

  return (
    <View>
      <Text variant='headlineMedium'>Todos ({todos ? todos.length : 0})</Text>
      <TextInput
        label={'New todo'}
        value={todo}
        onChangeText={setTodo}
        right={
          <TextInput.Icon
            icon={'plus-circle'}
            onPress={insertTodo}
            color={MD3LightTheme.colors.primary}
            size={32}
          />
        }
      />
    </View>
  )
}