import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [content, setContent] = useState("");
  const email = AuthService.getCurrentUserEmail();
  const [getValue, setGetValue] = useState('');
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
        setGetValue(token);

        UserService.GetPatientProfile(email, token).then(
            (response) => {
                console.log('response' + response.data);
                let status = response.data.isActive;
                console.log("status:" + status)
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }, [])
    }

    fetchData();

}, []);


  return (
    <div className="container">
      <header className="jumbotron">

      <h3>
        {getValue}
       {content && ( 
        <strong>Profile: {content.id} </strong> )}
        </h3>
        
      <h3> id:{content.id}</h3>
        <h3>firstName:{content.firstName}</h3>
        <h3>lastName:{content.lastName}</h3>
        <h3>phoneNumber:{content.phoneNumber}</h3>
        <h3>dateJoined:{content.dateJoined}</h3>
        <h3>enrollmentStartDate:{content.enrollmentStartDate}</h3>
        <h3>providerId:{content.providerId}</h3>
        <h3>gender:{content.gender}</h3>
        <h3>birthday:{content.birthday}</h3>
        <h3>providerName:{content.providerName}</h3>
        <h3>primaryDoctor:{content.primaryDoctor}</h3>
        <h3>primaryPhoneNumber:{content.primaryPhoneNumber}</h3>
        <h3>street1:{content.street1}</h3>
        <h3>street2:{content.street2}</h3>
        <h3>city:{content.city}</h3>
        <h3>postCode:{content.postCode}</h3>
        <h3>state:{content.state}</h3>
        <h3>country:{content.country}</h3>
        <h3>photoPath:{content.photoPath}</h3>
        <h3>isActive:{content.isActive}</h3>
    
      </header>
    </div>
  );
};

export default Home;
