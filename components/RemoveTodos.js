import { Alert } from "react-native";
import { removeAllTodos } from "../firebase/FirestoreController";
import { Button } from "react-native-paper";

export default function RemoveTodos() {

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
