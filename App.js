import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { TodoContext, TodoProvider } from './components/FirestoreController';
import { useContext } from 'react';
import {  Button, IconButton, PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RemoveView from './components/RemoveView';
import AddTodoView from './components/AddTodoView';
import TodoList from './components/TodoList';
import { AuthContext, AuthProvider, logout, signIn, signUp } from './components/FirebaseAuthControl';
import { auth } from './components/FirebaseConfig';
import LoginView from './components/LoginView';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodoView from './components/TodoView';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  
  return (
    <AuthProvider>
      <TodoProvider>
        <PaperProvider>
          <MainView/>
        </PaperProvider>
      </TodoProvider>
    </AuthProvider>
  );
}

function MainView(){
    const loggedIn = useContext(AuthContext);    

    if(!loggedIn){
      return  (
        <SafeAreaView style={styles.container}>
          <LoginView/>
        </SafeAreaView>)
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          headerRight: () =>  <Pressable onPress={logout}><Text>{auth?.currentUser?.email}</Text></Pressable>
        }}>
          <Drawer.Screen name='Todos' component={TodoView}/>
        </Drawer.Navigator>
      </NavigationContainer>

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

