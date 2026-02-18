import { FlatList, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({todos}){
    return(
        <View>
            <FlatList
                data={todos}
                renderItem={({item}) => <TodoItem todoItem={item}/>}
            />
        </View>
    )
}