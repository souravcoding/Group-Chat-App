import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text,TouchableOpacity,StyleSheet,TextInput,KeyboardAvoidingView,Keyboard } from 'react-native'
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import firebase from 'firebase'
import {Avatar} from 'react-native-elements'
require('firebase/firestore')
const ChatRoom = ({navigation,route}) => {
    const [input,setInput]=useState('')
    const [data,setData]=useState({})
    const [messages,setMessages]=useState([])
    const chatname=route.params.chatname
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:chatname,
            headerRight:()=>(
                <View style={{marginRight:20,
                flexDirection:'row',
                justifyContent:'space-between',
                width:70}}>
                <TouchableOpacity  >
                    <FontAwesome name="video-camera" color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="call" color="white" size={24} />
                </TouchableOpacity>
                </View>
            ),
        })
    },[navigation])
    
    useEffect(()=>{
      firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get().then((data)=>{
            setData(data.data())
        })    

    })
    const sendMsg=()=>{
        Keyboard.dismiss()
        firebase.firestore()
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:data.username,
            email:data.mail,
            imageURL:data.imageURL
        })
        setInput('')
    }

    useLayoutEffect(()=>{
        firebase.firestore()
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timeStamp','desc')
        .onSnapshot(snapshot=>{
            setMessages(
                snapshot.docs.map(doc=>{
                    return {
                        id:doc.id,
                        data:doc.data()
                    }
                })
            )    
        })
        console.log(messages);
    },[route])
    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView 
            behavior='height'
            keyboardVerticalOffset={90}
            style={styles.container}
            >
            <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
            {messages.map((msg)=>{
                 return  (msg.data.email===data.mail) ? (
                        <View key={msg.id} style={styles.reciever}>
                        <Avatar 
                            rounded 
                            size={30}
                            position='absolute'
                            bottom={-15}
                            right={-5}
                            source={{uri:data.imageURL}} />
                            <Text style={styles.recieverText}>{msg.data.message}</Text>

                        </View>
                    ): (
                        <View key={msg.id} style={styles.sender}>
                        <Avatar 
                         size={30}
                            position='absolute'
                            bottom={-15}
                            left={-5}
                            rounded 
                            source={{uri:msg.data.imageURL}} />
                            <Text style={styles.senderText}>{msg.data.message}</Text>
                            <Text style={styles.senderName}>{msg.data.displayName}</Text>
                        </View>
                    )
            })}
            </ScrollView>
            <View style={styles.footer}>
            <TextInput
             placeholder='enter msg' 
             value={input}
             onChangeText={(e)=>setInput(e)}
             style={styles.input}/>
             <TouchableOpacity onPress={sendMsg}>
                 <Ionicons name="send" color="#2B68E6" size={24} />
             </TouchableOpacity>
            </View>
            </>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        backgroundColor:'white',
        flex:1
    },
    container:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    input:{
        bottom:0,
        height:50,
        flex:1,
        marginRight:15,
        borderRadius:30,
        color:'grey',
        backgroundColor:'#ECECEC',
        padding:10
    },
    reciever:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        marginLeft:8,
        maxWidth:'80%', 
         marginBottom:20,
        position:'relative'
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:10
    },
    recieverText:{
        color:'black',
        fontWeight:'500',
        marginLeft:10,
    }



})

export default ChatRoom
