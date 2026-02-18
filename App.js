import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { addTodo, removeAllTodos, TodoContext, TodoProvider } from './components/FirestoreController';
import { use, useContext, useState } from 'react';
import { Button, MD3LightTheme, PaperProvider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  return (
    <TodoProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <AddTodoView />
          <RemoveView/>
          <TodosView/>
        </SafeAreaView>
      </PaperProvider>
    </TodoProvider>
  );
}

function RemoveView() {

  function remove(){
    Alert.alert('Todolist', 'Remove all todo items?',[
      {text: 'Cancel'},
      {text: 'Ok', onPress: removeAllTodos}
    ]);
  }

  return (
    <Button
      mode='contained'
      onPress={remove}>
      Remove all todos
    </Button>
  )
}

function TodosView() {
  const todos = useContext(TodoContext);

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Text variant='titleMedium'>{item.todoText}</Text>}
      />
    </View>
  )
}

function AddTodoView() {

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10
  },
});
