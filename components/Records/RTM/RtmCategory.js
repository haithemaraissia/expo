import React, { useState, useEffect } from "react";

import UserService from "../../../services/user.service";
import EventBus from "../../../common/EventBus";
import { Link } from 'react-router-dom'
import AsyncStorage from '@react-native-async-storage/async-storage';

const RtmCategory = () => {
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
  useEffect(() => {
    async function fetchData() {
      let user = await getData('user');
      setGetValue(user);
      console.log(user)

    UserService.getRtmCategories(1052,user).then(
      (response) => {
        console.log(response.data)
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
      {/*   <h3>{content}</h3> */}


      {{content} && content.map((movie)=> (
                <div className='List' key={movie.id}>
                   <div className="id"> ID: {movie.id}</div> 
                     <div className="patientId">Patient ID: {movie.patientId}</div> 
                    <div className="rtmProviderCategoryId">RTM Provider Category ID: {movie.rtmProviderCategoryId}</div> 
                  
                  {/*   <div className="rtmRecords">RTM Records: {movie.rtmRecords}</div> */}

                    <div className="title">Title: {movie.title}</div> 
                    <div className="right">
                        <Link to={`/rtmrecordlist/${movie.id}`}>See Records</Link>
                        
                    </div> 
                   <p><br/></p>
                </div> 
        ))}

      </header>
    </div>
  );
};

export default RtmCategory;
