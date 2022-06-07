// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';


import RpmCategoryScreen from './pages/RPM/RpmCategoryScreen';
import RpmRecordListScreen from './pages/RPM/RpmRecordListScreen';
import EditRpmScreen from './pages/RPM/EditRpmScreen';
import AddRmpScreen from './pages/RPM/AddRpmScreen';

import LoginScreen from './pages/Authenticate/LoginScreen';

import { AuthContext } from './pages/Authenticate/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackScreen from './pages/Root/RootStackScreen';
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />

    </Stack.Navigator>
  );
}

function RpmStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="RpmCategory"
        component={RpmCategoryScreen}
        options={{ title: 'Home Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="RecordsList"
        component={RpmRecordListScreen}
        options={{ title: 'Record List Screen' }}
      />
      <Stack.Screen
        name="EditRecord"
        component={EditRpmScreen}
        options={{ title: 'Edit Record' }}
      />
            <Stack.Screen
        name="AddRecord"
        component={AddRmpScreen}
        options={{ title: 'Add Record' }}
      />

      
    </Stack.Navigator>
  );
}

function RtmStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Welcome' }}
      />
      
    </Stack.Navigator>
  );
}

const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      console.log('data passed', foundUser)
      const userToken = foundUser.token;
      const userName = "test";
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);



  const [currentUser, setCurrentUser] = useState("");

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // process error
    }
  }

  useEffect(() => {
      async function fetchData() {
        let token = await getData('user');
         if (token == null)
         {

         }else
         {



          const email =  AuthService.getCurrentUserEmail();

          let token = await getData('user');
         
            UserService.GetPatientProfile(email, token).then(
            (response) => {
                console.log('response' + response.data);
                let status = response.data.isActive;
                console.log("status:" + status)


          dispatch({ type: 'LOGIN', id: "fakeusername", token: token });
           console.log('token: ' ,token)
            },
            (error) => {
              //expired token
              //navigation.navigate("Login");
              console.log(navigation);
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
  
                //setContent(_content);
            })

          }

         setCurrentUser(token) 

   }
 
   fetchData();
  }, []);
/* 
  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  } */
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
       { loginState.userToken !== null ? (
  <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#009387',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        

        <Tab.Screen
          name="RPMStack"
          component={RpmStack}
          options={{
            tabBarLabel: 'Rpm',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="feather"
                color={color}
                size={size}
              />
            ),
          }}
        />



        <Tab.Screen
          name="RTMStack"
          component={RtmStack}
          options={{
            tabBarLabel: 'RTM',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="shield"
                color={color}
                size={size}
              />
            ),
          }}
        />


      <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="wrench"
                color={color}
                size={size}
              />
            ),
          }}
        />


<Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            tabBarLabel: 'LogIn',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="User"
                color={color}
                size={size}
              />
            ),
          }}
        />
  </Tab.Navigator>
  )
  :
    <RootStackScreen/>
  }

    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
