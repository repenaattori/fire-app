import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Chip, IconButton, MD3LightTheme } from "react-native-paper";
import { removeTodo } from "./FirestoreController";


export default function TodoItem({todoItem}){
    const [done, setDone] = useState(todoItem.done);

    const chipStyle = {
        ...styles.todoChip,
        backgroundColor: done ? MD3LightTheme.colors.primaryContainer
            : MD3LightTheme.colors.onTertiary
    }
    
    return( 
        <View style={styles.todoItem}>
            <Checkbox
                status={done ? 'checked' : 'unchecked'}
                onPress={()=>setDone(prev => !prev)}
            />
            <Chip style={chipStyle}>{todoItem.todoText}</Chip>
            <IconButton
                disabled={!done}
                icon={'trash-can'}
                iconColor='black'
                onPress={()=> removeTodo(todoItem.id)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    todoItem:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    todoChip:{
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        padding: 2
    }
})