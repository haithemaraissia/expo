import React, { useState, useEffect } from "react";
import UserService from "../../../services/user.service";
import EventBus from "../../../common/EventBus";
import { Link } from 'react-router-dom'
import AsyncStorage from '@react-native-async-storage/async-storage';


const RpmCategory = () => {
  const [content, setContent] = useState([]);
  const [getValue, setGetValue] = useState('');
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // process error
    }
  }

/*   useEffect(() => {
    UserService.getRpmCategories(1052).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
 */

  useEffect(() => {

    async function fetchData() {
        let user = await getData('user');
        setGetValue(user);
        console.log(user)

        UserService.getRpmCategories(1052, user).then(
          (response) => {
            setContent(response.data);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setContent(_content);
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }
        );
    }

    fetchData();

}, []);


  return (
    <div className="container">
      <header className="jumbotron">
      {{content} && content.map((record)=> (
                <div className='List' key={record.id}>
                   <div className="id"> Rtm Patient Category ID: {record.id}</div> 
                     <div className="patientId">Patient ID: {record.patientId}</div> 
                    <div className="ProviderCategoryId">RPM Provider Category ID: {record.providerCategoryId}</div> 
                    <div className="title">Title: {record.title}</div> 
                    <div className="right">
                        <Link to={`/rpmrecordlist/${record.id}/${record.patientId}`}>See Records</Link>
                    </div> 
                   <p><br/></p>
                </div> 
        ))}
      </header>
    </div>
  );
};

export default RpmCategory;
