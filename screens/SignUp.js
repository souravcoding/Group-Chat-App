import React, { useState } from 'react'
import { View,Image,KeyboardAvoidingView, Text,TextInput,StyleSheet,Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
const SignUp = (props) => {
    const [name,setName]=useState('')
    const [mail,setMail]=useState('')
    const [password,setPassword]=useState('')
    const [imageURL,setImageURL]=useState('')
     
    const signUp=async (mail,password)=>{
        await firebase.auth().createUserWithEmailAndPassword(mail,password)
        .then(()=>{
            let url;
            if(imageURL){
                url=imageURL
            }else{
                url="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                username:name,
                mail,
                imageURL:url
            }).then(()=>{
                console.log('data transferd');
            })
        })
        .catch((e)=>console.log(e))

    }
    return (

        <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Text style={styles.text}>Create a Signal Account</Text>
             <TextInput require value={name} onChangeText={text=>setName(text)} style={styles.input}  placeholder='Enter Username' />
            <TextInput value={mail} onChangeText={text=>setMail(text)} style={styles.input} placeholder='Enter e-mail' />
            <TextInput value={password} onChangeText={text=>setPassword(text)} style={styles.input} secureTextEntry  placeholder='Enter password' />
            <TextInput value={imageURL} onChangeText={text=>setImageURL(text)} style={styles.input}  placeholder='Enter Image URL (optional)' />
            <View style={styles.btn}>
            <Button  onPress={()=>signUp(mail,password)}  title="Register"  />
            </View>
            <View style={styles.btn}>
            <Button color='black' onPress={()=>props.navigation.goBack()} title="login"  />
            </View>
            {/* <View style={{height:100}} /> */}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        borderBottomWidth:1,
        width:'60%',
        padding:10,
        marginBottom:10
    },
    btn:{
        marginTop:10,
        width:'60%'
    },
    text:{
        fontSize:20,
        marginBottom:10
    }
  });
  

export default SignUp
