import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AuthContext, modifyUserData } from "../firebase/FirebaseAuthControl";
import { Button, Text, TextInput } from "react-native-paper";

export default function AccountView(){
    const {userdata} = useContext(AuthContext);
    const [nickname, setNickname] = useState(userdata ? userdata.nickname : '');
    const [decs, setDesc] = useState(userdata ? userdata.description : '');
    const [email, setEmail] = useState(userdata ? userdata.email : '');
    
    if(!userdata){
        return  <Text variant="titleMedium">User data not found!!!</Text>
    }

    async function saveData(){
        let error = await modifyUserData({nickname, description:decs, email});
        if(error){
            Alert.alert('Error', error.message);
        }
    }

    return(
        <View style={styles.container}>
            <TextInput value={email} label={'Email'} onChangeText={setEmail}/>
            <TextInput value={nickname} label={'Nickname'} onChangeText={setNickname}/>
            <TextInput value={decs} label={'Description'} onChangeText={setDesc}/>
            <Button mode={"contained"} onPress={saveData}>
                    Save user data
            </Button>
        </View>
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

