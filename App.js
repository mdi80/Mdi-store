import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import LoginScreen from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
import SingupScreen from './screens/signup';
import { loadUserSession } from './utils';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { login, logout } from './reducers/authReducer';
import * as SecureStore from 'expo-secure-store';
import HomeScreen, { HomeHeader } from './screens/homeScreen';
import ErrorScreen from './screens/errorScreen';
import { setError } from './reducers/appReducer';
import theme from './theme';
import ProductScreen from './screens/product';

const Stack = createStackNavigator()



function AppContainer() {

  const isLoggedin = true//TODO must be : useSelector(state => state.auth.isLogin)
  const [isLoading, setIsLoading] = useState(true)//TODO must be false

  dispatch = useDispatch()
  error = useSelector(state => state.app.networkError)

  //This useEffet Checks there is any token in storage and if exists send request to api to test the token
  useEffect(() => {
    const fetchdata = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token == null) {
        dispatch(logout())
      } else {
        try {
          const res = await fetch("https://mdi80nz.pythonanywhere.com/api/get-user/", {
            method: 'GET',
            headers: {
              'Authorization': 'Token ' + token
            }
          })
          const json = await res.json()
          if (res.ok) {
            dispatch(login({ username: json['username'], email: json['email'], token: token }))
          } else {
            dispatch(logout())
          }

        } catch (error) {
          console.error('Error:', error);
          dispatch(setError({ networkError: true }))
        }

      }
      setIsLoading(false)
    }

    fetchdata()
  }, [])

  return (
    <NavigationContainer >
      {console.log(useSelector(state => state.auth.token))}
      {isLoading ?
        <View style={styles.container}>
          <Image
            style={styles.mainImage}
            source={require('./assets/first-page-icon.png')} />
          <ActivityIndicator size={50} color="#fff" />
          <StatusBar style="auto" />
        </View>
        :
        <Stack.Navigator>
          {!isLoggedin &&
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SingupScreen} options={{ headerShown: false }} />
            </>
          }

          {error ?
            <Stack.Screen name="ErrorScreen" component={ErrorScreen} options={{
              headerShown: false
            }} />

            :
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
              }} />

              <Stack.Screen name="Product" component={ProductScreen} options={{
                headerShown: false
              }} />

            </>
          }

        </Stack.Navigator>
      }
    </NavigationContainer >
  )
}

export default function App() {


  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 200,
    justifyContent: 'space-between',
  },
  mainImage: {
    width: 100,
    height: 100,
    marginBottom: 40,
  }
})