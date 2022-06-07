import React, { useContext } from 'react';
import axios from "axios";
import UserService from "./user.service";
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = "https://respoapi.azurewebsites.net/api/UserManagement/Login";



//TODO Update ti
const MockedEmail = "defaultwtwet235235@yahoo.com";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login =  async(email, password, signIn) => {
 return axios
    .post(API_URL , {
      email,
      password,
    })
    .then(async(response) => {
      if (response.data.token) {
/*         localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("email", JSON.stringify(email)); */
        
      /*   await SecureStore.setItemAsync('user', JSON.stringify(response.data))
        await SecureStore.setItemAsync('email', JSON.stringify(email))
 */   
await AsyncStorage.setItem('user', JSON.stringify(response.data))
        await AsyncStorage.setItem('email', JSON.stringify(email)) 
       console.log('inside authsercive login giwht user', response.data)
        // userProfile(MockedEmail);
        signIn(response.data);
//Back Up
  
      }
  });
};


const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("userProfile");
};

const getCurrentUser = async () => {
  const value = await AsyncStorage.getItem('user');
  console.log(value);
/*   const user =  JSON.parse(value);
  return JSON.parse(user); */
  return value;
};

const getCurrentUserEmail = () => {
  return MockedEmail;
  //TODO Uncomment
  //return JSON.parse(localStorage.getItem("email"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserEmail
};

export default AuthService;

function userProfile(email) {
 UserService.GetPatientProfile(email).then(
    (response) => {
      //localStorage.setItem("userProfile", JSON.stringify(response.data));
      setUserProfile(response)
      //  await AsyncStorage.setItem('userProfile', JSON.stringify(response.data))
    },
    (error) => {
      const _content = (error.response && error.response.data) ||
        error.message ||
        error.toString();
    }
  );
}



async function setUserProfile(response) {
  // You can await here
  await AsyncStorage.setItem('userProfile', JSON.stringify(response.data))
  
  // ...
}