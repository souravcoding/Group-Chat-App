import React, { useState } from 'react'
import { View, Text,StyleSheet,TextInput,Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
const AddChat = ({navigation}) => {
    const [input,setInput]=useState('')
    
    const createChat=async ()=>{
        await firebase.firestore()
        .collection('chats')
        .add({
            chatname:input
        }).then(()=>{
            navigation.navigate('home')
        })
    }
    return (
        <View style={styles.screen}>
            <TextInput autoFocus style={styles.input} value={input} 
            onChangeText={(e)=>setInput(e)}
             placeholder='Enter chat name' />
             <Button
             onPress={createChat}
              title="start chat" />

        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        padding:20
    },
    input:{
        borderBottomWidth:1,
        borderColor:'black',
        height:30,
        marginBottom:20
    }
})

export default AddChat
