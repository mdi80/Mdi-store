import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { saveUserSession } from '../utils';
import * as SecureStore from 'expo-secure-store';


export default function SingupScreen() {

    const usernameInput = useRef(null)
    const passwordInput = useRef(null)
    const fnameInput = useRef(null)
    const lnameInput = useRef(null)
    const emailInput = useRef(null)
    const conpasswordInput = useRef(null)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    /** start States **/
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [conPassword, setConPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    /** end States **/

    /** start Handlers ***/
    const onSignupClicked = async (e) => {
        setErrorMessage('')

        if (fname.trim() == "") {
            fnameInput.current?.focus()
            return;
        } else if (lname.trim() == "") {
            lnameInput.current?.focus()
            return;
        } else if (email.trim() == "") {
            emailInput.current?.focus()
            return;
        } else if (username.trim() == "") {
            usernameInput.current?.focus()
            return;
        } else if (password.trim() == "") {
            passwordInput.current?.focus()
            return;
        } else if (conPassword.trim() == "") {
            conpasswordInput.current?.focus()
            return;
        }

        if (conPassword !== password) {
            setErrorMessage("Password dosn't match!")
            return;
        }
        setIsLoading(true)


        // const response = await fetch('https://mdi80nz.pythonanywhere.com/api/users/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //         email: email,
        //     }),
        // });
        // const data = await response.json()

        // if (response.ok) {
        //     dispatch(login({ user: data['token'] }))
        //     saveUserSession(data['token'])
        //     navigation.navigate('Home')
        // } else {
        //     setErrorMessage(JSON.stringify(data))
        // }


        fetch('https://mdi80nz.pythonanywhere.com/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            })
        }).then(async response => {

            if (response.status >= 200 && response.status <= 299) {
                return response.json()
            } else {
                const error = await response.text();
                let err = JSON.parse(error);
                if ('message' in err) {
                    throw new Error(err['message']);
                } else {
                    throw new Error("An error occurred!");
                }
            }
        }).then(async (json) => {
            if ('token' in json) {
                await SecureStore.setItemAsync('token', json['token'])
                navigation.navigate('Home')
                dispatch(login({ user: json['token'] }))
            } else {
                throw new Error("An error occurred!")
            }
        }).catch(e => setErrorMessage(e.message)).finally(() => setIsLoading(false))

    }

    const onLoginClicked = (e) => {
        navigation.navigate("Login")
    }
    /** end Handlers **/


    return (
        <View style={styles.container} >

            <Image
                style={styles.mainImage}
                source={require('../assets/first-page-icon.png')} />

            <View>
                <Text style={styles.message}>{errorMessage}</Text>

                <View style={styles.nameContainerView}>
                    <TextInput ref={fnameInput} returnKeyType='next' onSubmitEditing={() => lnameInput.current?.focus()}
                        style={{ ...styles.nameContainerView.input, marginRight: 5 }} placeholder='First Name' backgroundColor="#eee" value={fname} onChangeText={setFname} />
                    <TextInput ref={lnameInput} returnKeyType='next' onSubmitEditing={() => emailInput.current?.focus()}
                        style={{ ...styles.nameContainerView.input, marginLeft: 5 }} placeholder='Last Name' backgroundColor="#eee" value={lname} onChangeText={setLname} />
                </View>
                <TextInput ref={emailInput} returnKeyType='next' onSubmitEditing={() => usernameInput.current?.focus()}
                    style={styles.input} placeholder='Email' backgroundColor="#eee" value={email} onChangeText={setEmail} />

                <TextInput ref={usernameInput} returnKeyType='next' onSubmitEditing={() => passwordInput.current?.focus()}
                    style={styles.input} placeholder='Username' backgroundColor="#eee" value={username} onChangeText={setUsername} />
                <TextInput ref={passwordInput} returnKeyType='next' style={styles.input} placeholder='Password' secureTextEntry={true} backgroundColor="#eee" value={password} onChangeText={setPassword} onSubmitEditing={() => conpasswordInput.current?.focus()} />
                <TextInput ref={conpasswordInput} returnKeyType='done' style={styles.input} placeholder='Confirm Password' secureTextEntry={true} backgroundColor="#eee" value={conPassword} onChangeText={setConPassword} />

            </View>


            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7} onPress={onSignupClicked} disabled={isLoading}>
                {isLoading ? (<ActivityIndicator size='small' color="#3700b3" />) : (
                    <Text style={styles.loginBtn.text}>Sign up</Text>
                )}

            </TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn} activeOpacity={0.7} onPress={onLoginClicked} >
                <Text style={styles.signupBtn.text}>You have an account?</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5C6BC0',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 100,
    },
    nameContainerView: {
        marginBottom: 10,
        flexDirection: 'row',
        input: {
            flex: 6,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ffffff36',
            padding: 10,
            height: 40,

        },
    },
    mainImage: {
        width: 100,
        height: 100,
        marginBottom: 40,
        alignSelf: 'center',
    },
    message: {
        textAlign: 'center',
        padding: 10,
        color: '#EC407A',
        fontWeight: 'bold',
        fontSize: 13,
        width: 250,
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff36',
        padding: 10,
        height: 40,
        marginBottom: 10,
    },
    loginBtn: {
        color: 'white',
        backgroundColor: '#9FA8DA',
        padding: 10,
        marginTop: 20,
        width: 125,
        alignItems: 'center',
        borderRadius: 10,
        text: {
            color: "white",
            fontSize: 17,
            fontFamily: 'Roboto'
        }
    },

    signupBtn: {
        color: 'white',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        text: {
            color: "white",
            fontSize: 13,
            fontFamily: 'Roboto'
        }
    }

});
