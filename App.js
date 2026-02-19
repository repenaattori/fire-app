import { FlatList, StyleSheet, View } from 'react-native';
import { TodoContext, TodoProvider } from './components/FirestoreController';
import { useContext } from 'react';
import {  Button, PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RemoveView from './components/RemoveView';
import AddTodoView from './components/AddTodoView';
import TodoList from './components/TodoList';
import { logout, signIn, signUp } from './components/FirebaseAuthControl';
import { auth } from './components/FirebaseConfig';

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
