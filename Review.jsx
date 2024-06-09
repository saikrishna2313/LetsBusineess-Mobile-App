import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { db } from '../../configs/conifgFirebase'
import CommentsList from './CommentsList'


const Review = ({item,docId}) => {
    
    const [rating,setRating]=useState(0)
    const [userInput,setUserInput]=useState('')

    const {user}=useUser()
    const addReview=async()=>{
        const docRef=doc(db,'bussinessList',docId)
         await updateDoc(docRef,{
            reviews:arrayUnion({ rating:rating,
                comment:userInput,
                username:user?.fullName,
                userimage:user?.imageUrl,
                useEmail:user?.primaryEmailAddress?.emailAddress})
         })
     ToastAndroid.show('Review added Successfully',ToastAndroid.TOP)
    }

  return (
    <View style={{
        padding:10,
        backgroundColor:"#fff"
    }}>
      <Text style={{fontSize:20,fontWeight:"600"}}>Reviews</Text>
      <View>
      <Rating
      imageSize={20}
  onFinishRating={(rating)=>{setRating(rating)}}
  style={{ paddingVertical: 4}}
/>
<TextInput onChangeText={(value)=>setUserInput(value)} placeholder='Add comment' numberOfLines={3} style={{

    borderWidth:1,
    margin:10,
    padding:10,
    borderRadius:10,
    borderColor:"#3344ff",
    textAlignVertical:"top"
}}/>

<TouchableOpacity disabled={!userInput} onPress={()=>addReview()} style={{
    padding:10,
    margin:2,
    width:"100%",
    backgroundColor:"#3344ff",
    borderRadius:10,
    marginTop:6,
    display:'flex',
    justifyContent:'center',
    alignItems:"center"
}}>
    <Text style={{
        fontSize:20,
        color:"#fff"
    }}>Submit</Text>
</TouchableOpacity>
  
   <CommentsList  reviews={item?.reviews}/>
      </View>
    </View>
  )
}

export default Review