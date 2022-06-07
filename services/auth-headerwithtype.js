import AsyncStorage from '@react-native-async-storage/async-storage';

export default  function authHeaderWithType(value) {
  
    const user =  JSON.parse(value);
  
    if (user && user.token) {
            return { 
                Authorization: 'Bearer ' + user.token,
                'Content-Type': 'application/json'  
            };
       } else {
            return {};
    }
  }