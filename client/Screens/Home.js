import React from 'react'
import {View, Text, Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home=()=>{
    return(
        <View>
            <Text>Home</Text>
            <Button title='check' onPress={()=>{
                AsyncStorage.getItem('token').then((res)=>{
                    console.log(res)
                })
            }}></Button>
        </View>
    )
}

export default Home