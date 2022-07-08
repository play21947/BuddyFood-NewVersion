import React from 'react'
import { View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Products from './Products'
import Account from './Account'
import ViewProduct from './ViewProduct'
import CartScreen from './CartScreen'
import {useSelector} from 'react-redux'

const Bottom = createBottomTabNavigator()

const Home = () => {

    let quantity_cart = useSelector((state)=>{
        return state.cart.cart.length
    })

    return (
        <Bottom.Navigator screenOptions={{ tabBarActiveTintColor: 'black', tabBarStyle:{height: 60} }}>
            <Bottom.Screen name='PRODUCTS' component={Products} options={{
                headerShown: false,
                tabBarLabel: 'หน้าหลัก',
                tabBarLabelStyle: [{fontFamily: 'IBM-Regular', fontSize: 12}],
                tabBarIcon: (({ color }) => {
                    return (
                        <Image style={{ tintColor: color, width: 30, height: 30 }} source={require('../Icon/compass.png')} />
                    )
                })
            }}></Bottom.Screen>


            <Bottom.Screen name="CART" component={CartScreen} options={{tabBarBadge: quantity_cart > 0 ? quantity_cart : null, tabBarIcon: ({color})=>{
                return(
                    <Image style={{width: 30, height: 30, tintColor: color}} source={require('../Icon/shopping-cart.png')}></Image>
                )
            }}}></Bottom.Screen>

            <Bottom.Screen name="ACCOUNT" component={Account} options={{ headerShown: false, tabBarLabel: 'บัญชี', tabBarLabelStyle: [{fontFamily: 'IBM-Regular', fontSize: 12}] ,tabBarIcon:(({color})=>{
                return(
                    <Image style={{width: 30, height: 30, tintColor: color}} source={require('../Icon/account.png')}/>
                )
            }) }}></Bottom.Screen>
            
            <Bottom.Screen name="VIEW_PRODUCT" component={ViewProduct} options={{tabBarItemStyle: {display: 'none'},headerShown: false ,unmountOnBlur: true}}></Bottom.Screen>
        </Bottom.Navigator>
    )
}

export default Home