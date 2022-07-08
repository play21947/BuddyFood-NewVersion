import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

let api = 'http://play2api.ddns.net:3001/api/v1'



const Products = ({navigation}) => {


    let dispatch = useDispatch()
    let quantity = useSelector((state)=>{
        return state.cart.cart.length
    })
    

    let [products, setProducts] = useState([])


    useEffect(() => {
        axios.get(`${api}/products`).then((res) => {
            // console.log("PRODUCTS : ", res.data)
            setProducts(res.data)
        })
    }, [])


    return (
        <ScrollView style={{backgroundColor: '#EEEEEE'}}>

            {quantity ? <Text>{quantity}</Text> : <Text>0</Text>}

            {/* Headers */}
            <View style={{ backgroundColor: '#292929', width: '100%', height: 130, padding: 20, position: 'relative' }}>

                <TextInput style={{ width: '100%', height: 50, backgroundColor: '#EDEDED', position: 'absolute', bottom: 20, left: '5%', borderRadius: 5, fontFamily: 'IBM-Regular' }} placeholder="ค้นหาด้วย Buddy Food App"></TextInput>

            </View>


            <View style={{ padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingTop: 5 }}>
                {products && products.length > 0 ? products.map((item) => {
                    return (
                        <TouchableOpacity onPress={()=>{
                            console.log(item._id)
                            navigation.navigate("VIEW_PRODUCT", {product_id: item._id})
                        }} style={{width: '48%', borderRadius: 10, marginTop: 20, padding: 10, backgroundColor: 'white', elevation: 4 }} key={item._id}>
                            <Image style={{ width: '100%', height: 150, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} source={{ uri: item.product_image }}></Image>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={{ fontFamily: 'IBM-Regular', color: 'black', fontSize: 16 }}>{item.product_name}</Text>
                                <Text style={{ fontFamily: 'IBM-Regular', fontSize: 14, color: 'green' }}>฿{item.product_price}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }) : null}
            </View>



        </ScrollView>
    )
}


export default Products