import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddChat from './components/AddChat';
import ChatRoom from './components/ChatRoom';
var firebaseConfig = {
  apiKey: "AIzaSyDcy6l9c840znduBBuybNaSjXAEpVbqtV8",
  authDomain: "signalapp-918d6.firebaseapp.com",
  projectId: "signalapp-918d6",
  storageBucket: "signalapp-918d6.appspot.com",
  messagingSenderId: "826904632726",
  appId: "1:826904632726:web:781cde289a46308d3b11b7",
  measurementId: "G-X4FYHJZMJP"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig)
}

const stack=createStackNavigator()

export default function App() {
  const [loading,setLoading]=useState(true)
  const [loggedIn,SetLoggedIn]=useState(false)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setLoading(false)
        SetLoggedIn(true)
      }else{
        setLoading(false)
        SetLoggedIn(false)
      }
    })
  })

  if(loading){
    return <View style={styles.container}>
    <ActivityIndicator color="black" size='large' />
    </View>
  }

  if(!loggedIn){
    return <NavigationContainer>
    <stack.Navigator initialRouteName='login'>
    <stack.Screen component={Login} name='login' options={{headerShown:false}}/>
    <stack.Screen component={SignUp} name='signUp' options={{headerShown:false}} />
    </stack.Navigator>
    </NavigationContainer>
  }

  return (
    <NavigationContainer>
    <stack.Navigator initialRouteName='home'>
    <stack.Screen component={Home} name='home' 
    options={{headerStyle:{
      backgroundColor:'#2C6BED'
    }}}  />
     <stack.Screen component={AddChat} name='add' 
    options={{headerStyle:{
      backgroundColor:'#2C6BED'
    }}}  />
     <stack.Screen component={ChatRoom} name='chatroom' 
    options={{headerStyle:{
      backgroundColor:'#2C6BED'
    }}}  />
    </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
