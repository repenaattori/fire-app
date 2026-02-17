import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { TodoContext, TodoProvider } from './components/FirestoreController';
import { useContext } from 'react';
import { Text } from 'react-native-paper';

export default function App() {


  return (
    <TodoProvider>
      <View style={styles.container}>
        <TodosView/>
      </View>
    </TodoProvider>
  );
}

function TodosView(){
  const todos = useContext(TodoContext);

  return(
    <View>
    <FlatList
      data={todos}
      renderItem={({item}) => <Text variant='titleMedium'>{item.todoText}</Text>}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
