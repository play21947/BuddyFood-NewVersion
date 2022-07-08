export const AddToCart=(product)=>{
    return((dispatch)=>{
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        })
    })
}


export const DeleteFromCart=(id_proudct)=>{
    return((dispatch)=>{
        dispatch({
            type: "DELETE_FROM_CART",
            payload: id_proudct
        })
    })
}