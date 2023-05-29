import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { saveUserSession } from '../utils';
import * as SecureStore from 'expo-secure-store';


export default function LoginScreen() {

    const usernameInput = useRef(null)
    const passwordInput = useRef(null)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    /** start States **/
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    /** end States **/

    /** start Handlers ***/
    const onLoginClicked = (e) => {
        setErrorMessage('')

        if (username.trim() == "") {
            usernameInput.current?.focus()
            return;
        } else if (password.trim() == "") {
            passwordInput.current?.focus()
            return;
        }
        setIsLoading(true)

        fetch('https://mdi80nz.pythonanywhere.com/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json()).then(async (json) => {
            if ('token' in json) {
                await SecureStore.setItemAsync('token', json['token'])
                dispatch(login({ user: json['token'] }))
            } else if ('username' in json) {
                setErrorMessage('Please enter your username!')
            } else if ('password' in json) {
                setErrorMessage('Please enter your password!')
            } else if ('non_field_errors' in json) {
                setErrorMessage(json.non_field_errors[0])
            }
        }).catch(e => setErrorMessage(e.message)).finally(() => setIsLoading(false))

    }

    const onSignupClicked = (e) => {
        navigation.navigate('Signup')
    }
    /** end Handlers **/


    return (

        <View style={styles.container}>

            <Image
                style={styles.mainImage}
                source={require('../assets/first-page-icon.png')} />

            <View>
                <Text style={styles.message}>{errorMessage}</Text>

                <TextInput ref={usernameInput} returnKeyType='next' onSubmitEditing={() => passwordInput.current?.focus()}
                    style={styles.input} placeholder='Username' backgroundColor="#eee" value={username} onChangeText={setUsername} />
                <TextInput ref={passwordInput} returnKeyType='done' style={styles.input} placeholder='Password' secureTextEntry={true} backgroundColor="#eee" value={password} onChangeText={setPassword} />

            </View>


            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7} onPress={onLoginClicked} disabled={isLoading} >
                {isLoading ? (<ActivityIndicator size='small' color="#3700b3" />) : (
                    <Text style={styles.loginBtn.text}>Log in</Text>
                )}

            </TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn} activeOpacity={0.7} onPress={onSignupClicked}>
                <Text style={styles.signupBtn.text}>Don't have an account?</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3700b3',
        alignItems: 'center',
        paddingTop: 200,
    },
    mainImage: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    loginText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        textAlign: 'center',
        padding: 10,
        color: '#B71c1c',
        fontWeight: 'bold',
        fontSize: 13,
        width: 250,
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ffffff36',
        padding: 10,
        height: 40,
        marginBottom: 10,
    },
    loginBtn: {
        color: 'white',
        backgroundColor: '#018786',
        padding: 10,
        width: 250,
        alignItems: 'center',
        text: {
            color: "white",
            fontSize: 17,
            fontFamily: 'Roboto'
        }
    },

    signupBtn: {
        color: 'white',
        padding: 10,

        text: {
            color: "white",
            fontSize: 13,
            fontFamily: 'Roboto'
        }
    }

});
