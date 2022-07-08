const initialState = {
    cart: []
}


const CartReducer=(state = initialState, action)=>{
    if(action.type === "ADD_TO_CART"){

        let updateCart = []

        // console.log("Payload : ", action.payload._id)

        let findItemInCart = state.cart.filter((item)=>{
            return item._id == action.payload._id
        })

        // console.log("Found : ", findItemInCart)

        if(!findItemInCart || findItemInCart.length <= 0){
            updateCart = [...state.cart, action.payload]
        }else{
            updateCart = state.cart.map((item)=>{
                return{
                    ...item,
                    quantity: findItemInCart[0]._id == item._id ? item.quantity = item.quantity + 1 : item.quantity
                }
            })
        }

        return{
            cart: updateCart
        }
    }else if(action.type === "DELETE_FROM_CART"){

        console.log("DELETE : ", action.payload)

        let deletedCart = state.cart.filter((item)=>{
            return item._id !== action.payload
        })

        // console.log(deletedCart)

        return{
            cart: deletedCart
        }
    }else{
        return state
    }
}


export default CartReducer