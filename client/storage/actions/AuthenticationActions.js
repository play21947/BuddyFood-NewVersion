import axios from 'axios'
import { Alert } from 'react-native'

let domain = 'http://play2api.ddns.net:3001/api/v1'


export const SignInAction=(phone_number, password)=>{
    return((dispatch)=>{
        axios.post(`${domain}/sign_in`,{
            phone_number: phone_number,
            password: password
        }).then((res)=>{
            if(res.data.invalid_user){
                Alert.alert("Phone number or Password is wrong")
            }else{
                console.log(res.data)
                // dispatch({
                //     type: 'SIGN_IN',
                //     payload: res.data
                // })
            }
        })
    })
}