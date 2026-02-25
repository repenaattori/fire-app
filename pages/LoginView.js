import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { signIn, signUp } from "../firebase/FirebaseAuthControl";


export default function LoginView() {

    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');

    async function sign() {
        let error = register ?
            await signUp(nickname, email, pw) :
            await signIn(email, pw);
        if (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.register}>
                <Text>Login/Register</Text>
                <Switch value={register} onValueChange={setRegister} />
            </View>

            <TextInput
                value={email}
                onChangeText={setEmail}
                label={'Email'}
                right={<TextInput.Icon icon={'email'} />}
            />
            <TextInput
                value={pw}
                onChangeText={setPw}
                label={'Password'}
                right={<TextInput.Icon icon={'lock'} />}
                secureTextEntry
            />
            {
                register &&
                <TextInput
                    value={nickname}
                    onChangeText={setNickname}
                    label={'Nickname'}
                />
            }
            <Button
                mode="contained"
                onPress={sign}>
                {register ? 'Register' : 'Login'}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        gap: 10
    },
    register: {
        flexDirection: 'row',
        alignItems: "center"
    }
});