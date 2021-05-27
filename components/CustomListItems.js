import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,} from 'react-native'
import {ListItem,Avatar} from 'react-native-elements'
import firebase from 'firebase'
require('firebase/firestore')
const CustomListItems = ({id,chatname,enterChat}) => {
    const [chatMessages,setChatMessages]=useState([])
    useEffect(()=>{
     const unsubscribe=firebase.firestore()
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timeStamp','desc')
        .onSnapshot(snapshot=>{
            setChatMessages(snapshot.docs.map(doc=>doc.data()))
        })
        return unsubscribe

    })
    return (
        
            <ListItem key={id} onPress={()=>enterChat(id,chatname)} >
            <Avatar 
            rounded 
            source={{uri: chatMessages?.[0]?.imageURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}} />
            <ListItem.Content>
            <ListItem.Title style={{fontWeight:"900"}} >
            {chatname}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}  
            </ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>

    )
}

export default CustomListItems
