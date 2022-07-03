import React from "react"
import {View, Text, TextInput} from 'react-native'



const Products=()=>{
    return(
        <View>

            {/* Headers */}
            <View style={{backgroundColor: '#292929', width: '100%', height: 130, padding: 20, position: 'relative'}}>

                <TextInput style={{width: '100%', height: 50, backgroundColor: '#EDEDED', position: 'absolute', bottom: 20, left: '5%', borderRadius: 5, fontFamily: 'IBM-Regular'}} placeholder="ค้นหาด้วย Buddy Food App"></TextInput>

            </View>



        </View>
    )
}


export default Products