import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Alert } from 'react-native'

let domain = 'http://play2api.ddns.net:3001/api/v1'


export const SignInAction = (phone_number, password) => {
    return ((dispatch) => {
        axios.post(`${domain}/sign_in`, {
            phone_number: phone_number,
            password: password
        }).then((res) => {
            if (res.data.invalid_user) {
                Alert.alert("Phone number or Password is wrong")
            } else {
                console.log(res.data)
                AsyncStorage.setItem('token', res.data.token)
                dispatch({
                    type: 'SIGN_IN',
                    payload: { user_id: res.data.user_id, role: res.data.role }
                })
            }
        })
    })
}


export const LoadAction = () => {
    return ((dispatch) => {
        AsyncStorage.getItem('token').then((token) => {
            if (token) {
                axios.get(`${domain}/check_token`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    console.log("Test : ", res.data)
                    if (res.data.expired) {
                        AsyncStorage.removeItem("token")
                        Alert.alert("Expired Token", 'Pls login again')
                        dispatch({
                            type: "LOAD",
                            payload: {user_id: '', role: ''}
                        })
                    } else {
                        console.log("Load :", res.data.data)
                        dispatch({
                            type: "LOAD",
                            payload: res.data.data
                        })
                    }
                })
            }else{
                dispatch({
                    type: "LOAD",
                    payload: { user_id: '', role: '' }
                })
            }
        })
    })
}