import React, { useEffect } from 'react'
import {View, Text, Button} from 'react-native'
import { LoadAction } from '../storage/actions/AuthenticationActions'
import { useDispatch, useSelector } from 'react-redux'

const LoadingScreen=()=>{

    let dispatch = useDispatch()

    let auth = useSelector((state)=>{
        return state.auth.isLoading
    })

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(LoadAction())   
        }, 2000)
    }, [])


    return(
        <View>
            <Text>Loading...</Text>
            <Button title="Loading" onPress={()=>{
                console.log(auth)
            }}></Button>
        </View>
    )
}

export default LoadingScreen