import { SectionList, View } from "react-native";
import TodoItem from "./TodoItem";
import { Text } from "react-native-paper";

export default function TodoList({todos}){

    const unchecked = todos.filter(t => !t.done);
    const checked = todos.filter(t => t.done);

    const DATA = [
        {title: `Unchecked (${unchecked.length})`, data: unchecked},
        {title: `Checked (${checked.length})`, data: checked},
    ]

    return(
        <View>
            <SectionList
                sections={DATA}
                renderItem={({item}) => <TodoItem todoItem={item}/>}
                renderSectionHeader={({section:{title}})=> 
                    <Text variant="titleMedium">{title}</Text>
                }
            />
        </View>
    )
}