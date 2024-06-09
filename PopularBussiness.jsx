import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../configs/conifgFirebase';
import BussinessCard from './BussinessCard';
import { useRouter } from 'expo-router';


const PopularBussiness = () => {
const [Bussiness, setBussiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const router=useRouter()
  const getBussiness = async () => {
    try {
       setBussiness([])
      const dataGot = await getDocs(collection(db, 'bussinessList'));
      const dataList = dataGot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBussiness(dataList);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBussiness();
    
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading slider data: {error.message}</Text>;
  }
  return (
    <View style={{
        marginTop:2,
        paddingHorizontal:10
    }}>
      <View style={{
        display:"flex",
        flexDirection:'row',
        padding:5,
        justifyContent:"space-between",
        alignItems:'center'
      }}>
      <Text style={{
         fontSize: 16,
         fontFamily: 'primary',
         fontWeight: '700',
      }}>Bussiness</Text>
      <Text style={{color:"#3399ff"}}>View all</Text>

      </View>
      
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Bussiness}
        horizontal
        renderItem={({ item }) => (
          <BussinessCard item={item} onPress={()=>router.push('/bussinessDetail/'+item?.id)}/>
        )}
        keyExtractor={(item) => item.id}
      />
      </View>

  )
}

export default PopularBussiness