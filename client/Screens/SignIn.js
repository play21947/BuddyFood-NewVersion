import React, { useState } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { SignInAction } from '../storage/actions/AuthenticationActions'


const SignIn=()=>{

    let [phone, setPhone] = useState('')
    let [password, setPassword] = useState('')
    let dispatch = useDispatch()

    return(
        <View style={styles.container}>
            <Text style={{fontFamily: 'IBM-Bold', fontSize: 25, color: 'black'}}>BuddyFood</Text>
            <Text style={{fontFamily: 'IBM-Regular', fontSize: 18, color: 'gray'}}>caption this here</Text>
            <TextInput style={styles.input} placeholder='Phone' onChangeText={(text)=>{
                setPhone(text)
            }}></TextInput>
            <TextInput style={styles.input} placeholder='password' onChangeText={(text)=>{
                setPassword(text)
            }}></TextInput>
            <TouchableOpacity onPress={()=>{
                dispatch(SignInAction(phone, password))
            }} style={{backgroundColor: '#16a34a', display: 'flex', justifyContent: 'center', height: 45, alignItems: 'center', marginTop: 20, borderRadius: 5, elevation: 3}}><Text style={{fontFamily: 'IBM-Regular', fontSize: 22, color: 'white'}}>เข้าสู่ระบบ</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        marginTop: 10,
        fontFamily: 'IBM-Medium',
        color: 'black',
        borderRadius: 5
    },
    container: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        flex: 1
    }
})

export default SignIn