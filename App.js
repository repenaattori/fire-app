import { FlatList, StyleSheet, View } from 'react-native';
import { TodoContext, TodoProvider } from './components/FirestoreController';
import { useContext } from 'react';
import {  PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RemoveView from './components/RemoveView';
import AddTodoView from './components/AddTodoView';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';

export default function App() {

  return (
    <TodoProvider>
      <PaperProvider>
        <MainView/>
      </PaperProvider>
    </TodoProvider>
  );
}

function MainView(){

    const todos = useContext(TodoContext);    

    return (
        <SafeAreaView style={styles.container}>
          <AddTodoView/>
          <RemoveView/>
          <TodoList todos={todos}/>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10
  },
});
