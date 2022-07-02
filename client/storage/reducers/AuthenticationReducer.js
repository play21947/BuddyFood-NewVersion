const initialState = {
    token: '',
    loaded: false
}


const AuthenticationReducer = (state = initialState, action) => {
    if(action.type === "SIGN_IN"){
        return{
            token: action.token,
            loaded: true
        }
    }else{
        return state
    }
}


export default AuthenticationReducer