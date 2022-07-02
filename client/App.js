import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import SignIn from './Screens/SignIn'
import AllReducers from './storage/AllReducers'

let store = createStore(AllReducers, applyMiddleware(thunk))

const Stack = createNativeStackNavigator()


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SIGN_IN' component={SignIn} options={{ headerShown: false }}></Stack.Screen>
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