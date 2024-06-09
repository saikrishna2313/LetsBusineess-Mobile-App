import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
const TypeCard = ({item}) => {
    
  return (
    <View style={{
        display:"flex",
        justifyContent:"flex-start",

        alignItems:'flex-start',
        flexDirection:'row',
        padding:10,
        backgroundColor:"#fff",
        borderRadius:10,
        marginRight:12,
        margin:10
      }}>
    <Image source={{uri:item.image}} style={{ width: 120, height: 120,borderRadius:15,margin:3,objectFit:'cover' }} />
    
     <View style={{
        padding:10
     }}>
     <Text style={{fontSize:20 ,fontWeight:"700", marginTop:3}}>{item?.name}</Text>
     <Text style={{fontSize:12 ,marginTop:3}}><Entypo name="location-pin" size={16} color="#3399ff" />{item?.address}</Text>
       <Text style={{
         color:"#000",marginTop:3
       }}>4.5  <FontAwesome name="star" size={16} color="#FFD700" /> </Text>
      
     </View>
     </View>
  )
}

export default TypeCard