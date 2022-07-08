import React, { useState } from 'react'
import {View ,Text, TouchableOpacity} from 'react-native'
import {useDispatch ,useSelector} from 'react-redux'
import { DeleteFromCart } from '../storage/actions/CartActions'

const CartScreen=()=>{



    let dispatch = useDispatch()

    let quantity_cart = useSelector((state)=>{
        return state.cart.cart
    })

    return(
        <View>
            <Text>CartScreen</Text>
            {quantity_cart && quantity_cart.length > 0 ? quantity_cart.map((item)=>{
                return(
                    <View key={item._id}>
                        <Text>{item.product_name} : {item.quantity}</Text>
                        <TouchableOpacity onPress={()=>{
                            dispatch(DeleteFromCart(item._id))
                        }}><Text>X</Text></TouchableOpacity>
                    </View>
                )
            }) : <Text>ไม่มีสินค้าในตะกร้า</Text>}
        </View>
    )
}

export default CartScreen