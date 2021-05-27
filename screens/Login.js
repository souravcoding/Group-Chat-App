import React, { useState } from 'react'
import { View,Image, Text,TextInput,StyleSheet,Button } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')

const Login = (props) => {
    const [mail,setMail]=useState('')
    const [password,setPassword]=useState('')

        const login=(mail,password)=>{
         firebase.auth().signInWithEmailAndPassword(mail,password)
         .then(()=>{
             console.log('logged In');
         })

    }

    return (

        <View style={styles.container}>
        <Image style={styles.logo} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png'}}/>
            <TextInput value={mail} onChangeText={text=>setMail(text)} style={styles.input} autoFocus placeholder='Enter e-mail' />
            <TextInput value={password} onChangeText={text=>setPassword(text)} style={styles.input} secureTextEntry  placeholder='Enter password' />
            <View style={styles.btn}>
            <Button onPress={()=>login(mail,password)} title="login"  />
            </View>
            <View style={styles.btn}>
            <Button onPress={()=>props.navigation.navigate('signUp')} color='black' title="Register"  />
            </View>
            
        </View>
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
    logo:{
        width:150,
        height:150,
        borderRadius:20,
        marginBottom:10
    }
  });
  

export default Login
