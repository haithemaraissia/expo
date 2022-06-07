import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './auth.service';

const useToken = () => {
    const [currentUser, setCurrentUser] = useState("");

 useEffect(() => {
     async function fetchData() {
        await AuthService.getCurrentUser().then((data) => {
        const result = JSON.parse(data)
        setCurrentUser(result) 
    }, [])
  }

  fetchData();

}, []);

   return currentUser
}


export default useToken;