import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View,ScrollView, Text,TouchableOpacity } from 'react-native'
import CustomListItems from '../components/CustomListItems'
import {Avatar} from 'react-native-elements'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import firebase from 'firebase'
const Home = ({navigation}) => {
    const [userImage,setUserImage]=useState(null)
    const [chats,setChats]=useState([])
    const logout=()=>{
        firebase.auth().signOut()
        .then(()=>{
            console.log('signOut success');
        })
    }
const onEnterChat=(id,chatname)=>{
    navigation.navigate('chatroom',{
        id,
        chatname
    })
}
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Signal',
            headerRight:()=>(
                <View style={{marginRight:20,
                flexDirection:'row',
                justifyContent:'space-between',
                width:70}}>
                <TouchableOpacity  >
                    <AntDesign name="camera" color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('add')}>
                    <SimpleLineIcons name="pencil" color="white" size={24} />
                </TouchableOpacity>
                </View>
            ),
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                <TouchableOpacity onPress={logout} >
                     <Avatar 
                     rounded 
                     source={{uri:userImage ? userImage : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" }} />
                </TouchableOpacity>
                </View>
            )
        })
    })

    useEffect(()=>{
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
          .get().then((data)=>{
                console.log('data recivied');
                setUserImage(data.data().imageURL)
            })

         firebase.firestore().collection('chats')
          .onSnapshot(snapshot=>{
              setChats(snapshot.docs.map(chat=>{
                 return {
                    id:chat.id,
                    data:chat.data()
                 }
              }))
           
          })

    },[userImage])

    return (
        <ScrollView>
        {chats.map(({id,data})=>{
            return <CustomListItems 
            enterChat={onEnterChat}
            key={id} id={id} chatname={data.chatname} />
        })}
           
        </ScrollView>
    )
}

export default Home
