import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { AuthContext, logout } from "../firebase/FirebaseAuthControl";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginView from "./LoginView";
import { NavigationContainer } from "@react-navigation/native";
import TodoView from "./TodoView";
import AccountView from "./AccountView";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const Drawer = createDrawerNavigator();

export default function Navigation(){
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
          headerRight: () =>  
            <IconButton icon={'logout'} iconColor='black' onPress={logout}/>
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
