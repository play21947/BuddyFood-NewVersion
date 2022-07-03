const initialState = {
    user_id: '',
    role: null,
    isLoading: true
}


const AuthenticationReducer = (state = initialState, action) => {
    if (action.type === "SIGN_IN") {
        return {
            user_id: action.payload.user_id,
            role: action.payload.role,
            isLoading: false
        }
    }else if(action.type === "LOAD"){
        return{
            user_id: action.payload.user_id,
            role: action.payload.role,
            isLoading: false
        }
    } else {
        return state
    }
}


export default AuthenticationReducer