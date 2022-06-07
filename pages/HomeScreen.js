// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useEffect } from "react";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {


/*   const { signIn } = React.useContext(AuthContext); */
 /*  console.log("reading from Context", signIn) */


 const [content, setContent] = useState("");
 const email = AuthService.getCurrentUserEmail();
 const [getValue, setGetValue] = useState('');

 /* function ReturnToLogin(navigation)
 {
   console.log(navigation);
  navigation.navigate("Login");
 } */
 useEffect(() => {
 async function getData(key) {
   try {
     const value = await AsyncStorage.getItem(key);
     return value;
   } catch (e) {
     // process error
   }
 }
  async function fetchData() {
      let token = await getData('user');
     //setGetValue(token);
console.log('inside Home token' + token);
      UserService.GetPatientProfile(email, token).then(
          (response) => {
              console.log('response' + response.data);
              let status = response.data.isActive;
              console.log("status:" + status)
              setContent(response.data);
          },
          (error) => {
            //expired token
              const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();

              //setContent(_content);
          }, [])
  }

  fetchData();

}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
              {content && (  <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Welcome back  <Text style={{ color: '#009387' ,fontWeight: 'bold' }}>{content.firstName} {content.lastName}</Text>
          </Text>)}
          <TouchableOpacity
            style={styles.button} 
            onPress={() =>
              navigation.navigate('SettingsStack', { screen: 'Settings' })
            }>
            <Text>Go to setting Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details')}>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Native Bottom Navigation
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default HomeScreen;
