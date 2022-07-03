import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import SignIn from './Screens/SignIn'
import AllReducers from './storage/AllReducers'
import {useSelector} from 'react-redux'
import Home from './Screens/Home'
import LoadingScreen from './Screens/LoadingScreen'

let store = createStore(AllReducers, applyMiddleware(thunk))

const Stack = createNativeStackNavigator()


const App = () => {

  let auth = useSelector((state)=>{
    return state.auth
  })

  console.log("Auth : ", auth)



  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.isLoading ? <Stack.Screen name='LOADING_SCREEN' component={LoadingScreen} options={{headerShown: false}}></Stack.Screen> : !auth.user_id || auth.user_id == null || auth.user_id == '' ? <Stack.Screen name='SIGN_IN' component={SignIn} options={{ headerShown: false }}></Stack.Screen> : <Stack.Screen name='HOME' component={Home} options={{ headerShown: false }}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const Warpped = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


export default Warpped