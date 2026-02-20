import {  StyleSheet } from 'react-native';
import { TodoProvider } from './components/FirestoreController';
import { useContext } from 'react';
import { IconButton, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext, AuthProvider, logout, signIn, signUp } from './components/FirebaseAuthControl';
import LoginView from './components/LoginView';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodoView from './components/TodoView';
import { NavigationContainer } from '@react-navigation/native';
import AccountView from './components/AccountView';

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
    const {loggedIn} = useContext(AuthContext);    

    if(!loggedIn){
      return  (
        <SafeAreaView style={styles.container}>
          <LoginView/>
        </SafeAreaView>)
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          headerRight: () =>  <IconButton icon={'logout'} iconColor='black' onPress={logout}/>
        }}>
          <Drawer.Screen name='Todos' component={TodoView}/>
          <Drawer.Screen name='Account' component={AccountView}/>
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

