import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {AddToCart} from '../storage/actions/CartActions'

let api = 'http://play2api.ddns.net:3001/api/v1'


const ViewProduct = ({ route }) => {

    let dispatch = useDispatch()

    let product_id = route.params.product_id

    let [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`${api}/product_id/${product_id}`).then((res) => {
            setProduct([res.data])
        })
    }, [])

    // console.log("Product : ", product)

    return (
        <View style={{ flex: 1 }}>
            {product && product.length > 0 ? product.map((item) => {
                return (

                    <View key={item._id} style={{flex: 1}}>
                        <View>
                            <Image source={{ uri: item.product_image }} style={{ width: '100%', height: 250 }}></Image>
                        </View>

                        <View style={{ width: '100%', height: '60%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0, padding: 20 }}>
                            <Text style={{fontSize: 22, fontFamily: 'IBM-Regular', color: 'black'}}>{item.product_name}</Text>
                            <TouchableOpacity onPress={()=>{

                                // console.log(product[0])

                                let add_product = {
                                    ...product[0],
                                    quantity: 1
                                }
                                

                                console.log(add_product)

                                dispatch(AddToCart(add_product))
                            }} style={{width: 200, height: 50, backgroundColor: 'mediumseagreen', borderRadius: 10, position: 'absolute', bottom: 10, right: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 18, fontFamily: 'IBM-Regular', color:'white'}}>{item.product_price} | ใส่ตะกร้า</Text></TouchableOpacity>
                        </View>

                    </View>
                )
            }) : null}
        </View>
    )
}


export default ViewProduct